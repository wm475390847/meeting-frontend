import React, {ReactElement, useEffect, useState} from 'react';
import {Affix, Breadcrumb, Layout, Menu, message, Popover, Watermark} from 'antd';
import classnames from 'classnames';
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';
import {RouteBase} from '@/routes';
import {getUserInfo} from '@/services';
import logo from '@/assets/svg/logo.svg';
import logoutIcon from '@/assets/svg/logout.svg';
import personIcon from '@/assets/svg/person.svg';
import {Footer} from 'antd/lib/layout/layout';
import {HttpClient} from '@/utils';
import {PageTitle} from "@/config";
import {codeUpPath} from '@/config/constants'
import styles from './index.module.less';

type LayoutPropModuleProps = {
  children?: ReactElement | ReactElement[];
  routes: RouteBase[];
};

export const PageLayoutModule: React.FC<LayoutPropModuleProps> = ({routes}) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectKey, setSelectKey] = useState(null);
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [nickName, setNickName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [menuItems, setMenuItem] = useState<any[]>([]);
  const {Sider, Content, Header} = Layout;
  const navigate = useNavigate();
  const {productName} = useParams<{ productName: string }>();

  useEffect(() => {
    handleUserInfo();
    const _pathArr: any = location.pathname.split('/');
    if (_pathArr.length === 3) {
      setSelectKey(_pathArr[2]);
    } else {
      setSelectKey(_pathArr[3]);
      setOpenKeys([_pathArr[2]]);
    }
    handleMenuItems()
  }, []);

  const handleUserInfo = () => {
    // 看看缓存里面有没有用户信息，有的话就不重复调用了
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      getUserInfo()
          .then((res: any) => {
            const {name: name = '', avatar = ''} = res || {};
            setNickName(name);
            setAvatar(avatar);
            localStorage.setItem("userInfo", JSON.stringify({"nickName": name, "avatar": avatar}))
          })
          .catch((errObj: any) => {
            message.destroy();
            message.error(errObj.msg || '获取用户信息失败').then(r => r);
          })
    } else {
      const item = JSON.parse(userInfo)
      setNickName(item.nickName)
      setAvatar(item.avatar)
    }
  }

  const handleTitle = (selectKey: string) => {
    if (selectKey) {
      const pathArr: string[] = selectKey.split("/");
      const lastItem = pathArr.pop()
      return lastItem ? (PageTitle as { [key: string]: string })[lastItem] : null;
    }
    return null;
  }

  const handlePath = (name: string, routes: RouteBase[]): string | null => {
    for (const route of routes) {
      if (route.name === name) {
        return route.path;
      } else if (route.children && route.children.length > 0) {
        const childPath = handlePath(name, route.children);
        if (childPath) {
          return childPath;
        }
      }
    }
    return null;
  };

  const handleItems = (selectKey: string) => {
    const title = handleTitle(selectKey as any);
    const path = handlePath(title as string, routes);
    const arr = [];
    if (path) {
      arr.push({
        title: title,
        onClick: () => navigate(path),
        isClickable: true
      });
      if (productName) {
        arr.push({
          title: productName
        });
      }
    } else {
      arr.push({
        title: title,
      });
    }
    return arr;
  };

  const handleItemRender = (item: any) => {
    // 判断是否为上一级面包屑项且可点击
    if (item.isClickable) {
      return <a onClick={() => item.onClick()}>{item.title}</a>; // 给上一级面包屑项添加鼠标小手样式，并添加点击事件
    } else {
      return <span>{item.title}</span>;
    }
  };

  const handleLogout = () => {
    new HttpClient({}).logout()
  }

  const handleMenuChange = (_menuItem: any) => {
    setSelectKey(_menuItem.key);
  }

  const handleOpenChange = (_keys: string[]) => {
    setOpenKeys(_keys);
  }

  const handleMenuItems = () => {
    // 处理普通菜单项
    const getMenuItem = (item: RouteBase) => ({
      label: <Link to={item.path}>{item.name}</Link>,
      key: item.path.split('/')[2],
      icon: <img style={{width: '20px', height: '20px'}} src={item.icon} alt="加载失败"/>,
      className: styles.menuItem,
    });

    // 处理子菜单项
    const getMenuChildren = (item: RouteBase) =>
        item.children
            ?.filter((i: RouteBase) => !i.hideInMenu)
            .map((inItem) => ({
              ...getMenuItem(inItem),
              key: String(inItem.path), // 使用子菜单项的 id 属性作为 key，并转换为字符串类型
            }));

    // 处理一级菜单项
    const getFirstMenuItem = (item: RouteBase) => ({
      label: item.name,
      key: item.path.split('/')[2],
      icon: <img style={{width: '20px', height: '20px'}} src={item.icon} alt="加载失败"/>,
      className: styles.menuFirstItem,
      children: getMenuChildren(item),
    });

    // 根据用户角色不同，生成符合权限的菜单项列表
    let menuList: any[];
    menuList = (routes || [])
      .filter((i: RouteBase) => !i.hideInMenu)
      .map((item) =>
        item.children?.length > 0 ? getFirstMenuItem(item) : getMenuItem(item)
      );
    // 将生成的菜单项列表保存在组件状态中
    setMenuItem(menuList);
  };

  return (
    <>
      <Layout className={styles.layout}>
        <Affix>
          <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{backgroundColor: '#1b1f27'}}
          >
            <div className={styles.logo}>
              <img src={logo} alt="" onClick={() => window.location.href = '/app/page'}/>
            </div>
            <Menu
                className={styles.menu}
                mode="inline"
                selectedKeys={[selectKey] as unknown as string[]}
                openKeys={openKeys}
                onSelect={handleMenuChange}
                onOpenChange={handleOpenChange}
                items={menuItems}
            />
          </Sider>
        </Affix>

        <Layout>
          <Affix>
            <Header className={styles.header}>
              <Popover
                  placement="bottomRight"
                  content={
                    <div className={styles.popover}>
                      <div className={classnames(styles.popLine)}>
                        <img src={personIcon} className={styles.icon} alt=""/>
                        <div className={styles.menuText}>个人信息</div>
                      </div>
                      <div className={styles.popLine}>
                        <img src={logoutIcon} className={styles.icon} alt=""/>
                        <div className={styles.menuText} onClick={handleLogout}>退出登录</div>
                      </div>
                    </div>
                  }
                  trigger="hover"
                  className={styles.popover}
              >
                {avatar ? (
                    <img src={avatar} alt=""/>) : nickName.split('')[0] || 's'}
              </Popover>
            </Header>
          </Affix>

          <Breadcrumb className={styles.breadcrumb}
                      itemRender={handleItemRender}
                      items={handleItems(selectKey as any)}
          />

          <Content className={styles.content}>
            <Watermark
                content={[`新华智云 · ${nickName}`]}
                font={{fontSize: 14, color: 'rgba(0,0,0,.1)'}}
                gap={[120, 120]}
                className={styles.watermark}
            >
              <Outlet/>
            </Watermark>
          </Content>

          <Footer className={styles.footer}>
            <a target="_blank" className={`${styles.a} ${styles.separator}`}>数字企业·质量保障平台</a>
            <a target="_blank" className={`${styles.a} ${styles.separator}`}>
              ©2022 - {new Date().getFullYear()} Created by 质量保障组
            </a>
            <a href={codeUpPath} target='_blank'
               className={styles.a}> CodeUp地址 </a>
          </Footer>

        </Layout>
      </Layout>
    </>
  );
};

export default PageLayoutModule