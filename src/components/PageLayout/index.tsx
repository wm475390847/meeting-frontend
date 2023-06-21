import React, {ReactElement, useEffect, useState} from 'react';
import {Layout, Menu, message, Popover, theme} from 'antd';
import classnames from 'classnames';
import {Link, Outlet} from 'react-router-dom';
import {RouteBase} from '@/routes';
import {getUserInfo} from '@/services';
import styles from './index.module.less';
import logo from '@/assets/svg/logo.svg';
import logoutIcon from '@/assets/svg/logout.svg';
import personIcon from '@/assets/svg/person.svg';
import {Footer} from 'antd/lib/layout/layout';
import * as Icon from '@ant-design/icons';
import {Client} from '@/utils';

type LayoutPropModule = {
  children?: ReactElement | ReactElement[];
  routes: RouteBase[];
};

export const PageLayoutModule: React.FC<LayoutPropModule> = ({routes}) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectKey, setSelectKey] = useState(null);
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [nickName, setNickName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [menuItems, setMenuItem] = useState<any[]>([]);
  const {Sider, Content, Header} = Layout;
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  useEffect(() => {
    handleGetUserInfo();
    const _pathArr: any = location.pathname.split('/');
    if (_pathArr.length === 3) {
      setSelectKey(_pathArr[2]);
    } else {
      setSelectKey(_pathArr[3]);
      setOpenKeys([_pathArr[2]]);
    }
    handleMenuItems()
  }, []);

  const handleGetUserInfo = () => {
    getUserInfo().then((res: any) => {
      const { name: name = '', avatar = '' } = res || {};
      setNickName(name);
      setAvatar(avatar);
    }).catch((errObj: any) => {
      message.destroy();
      message.error(errObj.msg || '获取用户信息失败').then(r => r);
    })
  }

  /**
   * 退出登录
   */
  const handleLogout = () => {
    new Client({}).logout()
  }

  /**
   * 创建icon图标元素
   * @param name 图标名称
   */
  const handleIconToElement = (name: string) =>
    React.createElement(Icon && (Icon as any)[name], {
      style: { fontSize: '15px' }
    })

  /**
   * 人物头像弹窗
   */
  const popoverContent = (
    <div className={styles.popoverWrapper} >
      <div className={classnames(styles.popLine)}>
        <img src={personIcon} className={styles.icon} alt="" />
        <div className={styles.menuText} >个人信息</div>
      </div>

      <div className={styles.popLine} >
        <img src={logoutIcon} className={styles.icon} alt="" />
        <div className={styles.menuText} onClick={handleLogout}>退出登录</div>
      </div>
    </div>
  )

  const handleMenuItems = () => {
    // 处理普通菜单项
    const getMenuItem = (item: RouteBase) => ({
      label: (<Link to={item.path}>{item.name}</Link>),
      key: item.path.split('/')[2],
      icon: handleIconToElement(item.icon),
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
      icon: handleIconToElement(item.icon),
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

  const handleMenuChange = (_menuItem: any) => {
    setSelectKey(_menuItem.key);
  }

  const handleOpenChange = (_keys: string[]) => {
    setOpenKeys(_keys);
  }

  return (
    <>
      <Layout className={styles.layout}>
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
          <div className={styles.logo}>
            <img src={logo} alt=""/>
          </div>
          <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectKey] as unknown as string[]}
              openKeys={openKeys}
              items={menuItems}
              onSelect={handleMenuChange}
              onOpenChange={handleOpenChange}
          />
        </Sider>
        <Layout>

          <Header className={styles.header}>
            <Popover
                placement="bottomRight"
                content={popoverContent}
                trigger="hover"
            >
              <div className={styles.user}>
                {avatar ? (
                    <img src={avatar} alt=""/>
                ) : nickName.split('')[0] || 's'}
              </div>
            </Popover>
          </Header>

          <Content style={{margin: '20px 15px 0', height: '100%'}}>
            <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
              <Outlet/>
            </div>
          </Content>

          <Footer style={{textAlign: 'center'}}>
            数字企业·质量保障平台 | ©2022 - {new Date().getFullYear()} Created by 质量保障组 |
            <a href='https://codeup.aliyun.com/xhzy/xhzy-qa/meeting-frontend/tree/dev' target='_blank'> CodeUp地址 </a>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default PageLayoutModule