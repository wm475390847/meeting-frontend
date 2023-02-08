import React, { ReactElement, useEffect, useState } from 'react';
import { Layout, Menu, Popover, message, Button, } from 'antd';
import classnames from 'classnames';
import { Outlet, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import ScrollView from 'react-custom-scrollbars';
import { RouteBase } from '../../routes';
import { PageTitle } from '@/config';
import { getUserInfo } from '@/services';
import styles from './index.module.less';
import adminLogo from '@/assets/svg/adminLogo.svg';
import logoutIcon from '@/assets/svg/menu_logout.svg';

const { Sider, Content, Header } = Layout;

export const PageLayout: React.FC<LayoutProp> = ({ routes }) => {
  const [selectKey, setSelectKey] = useState(null);
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [nickName, setNickName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getUserInfoMethod();
    const _pathArr: any = location.pathname.split('/');
    if (_pathArr.length === 3) {
      setSelectKey(_pathArr[2]);
    } else {
      setSelectKey(_pathArr[3]);
      setOpenKeys([_pathArr[2]]);
    }
  }, []);

  const getUserInfoMethod = () => {
    getUserInfo().then((res: any) => {
      const { name: name = '', avatar = '', userId = '' } = res || {};
      setNickName(name);
      setAvatar(avatar);
      setUserId(userId);
    }).catch((errObj: any) => {
      message.destroy();
      message.error(errObj.msg || '获取用户信息失败');
    })
  }

  const hanldeLogout = () => {
    Cookies.remove('dingtalk_sso_jwt', { path: '/', domain: '.xinhuazhiyun.com' });
    let url = location.href;
    location.href = `http://sso.xinhuazhiyun.com/login.html?redirectUri=${encodeURIComponent(url)}`;
  }

  const popoverContent = (
    <div className={styles.popoverWrapper}>
      <div className={classnames(styles.popLine, styles.noHover)}>{nickName}</div>
      <div className={styles.popLine} onClick={hanldeLogout}>
        <img src={logoutIcon} className={styles.iocn} alt="" />
        <div className={styles.menuText}>退出登录</div>
      </div>
    </div>
  )

  const menuItems = (routes || []).filter((i: RouteBase) => !i.hideInMenu).map(item => {
    if (item.children?.length > 0) {
      const menuItem = {
        label: item.name,
        key: item.path.split('/')[2],
        className: styles.menuFirstItem,
        children: item.children.filter((i: RouteBase) => !i.hideInMenu).map(inItem => ({
          label: (<Link to={inItem.path}>{inItem.name}</Link>),
          key: inItem.path.split('/')[3],
          className: styles.menuItem,
        }))
      }
      return menuItem;
    } else {
      return {
        label: (<Link to={item.path}>{item.name}</Link>),
        key: item.path.split('/')[2],
        className: styles.menuItem,
      }
    }
  });

  const handleMenuChange = (_menuItem: any) => {
    setSelectKey(_menuItem.key);
  }

  const handleOpenChange = (_keys: string[]) => {
    setOpenKeys(_keys);
  }

  return (
    <Layout className={styles.pageLayout}>
      <Sider
        className={styles.pageSider}
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className={styles.logo}>
          <img src={adminLogo} alt="" />
        </div>
        <div className={styles.menuWrapper}>
          <ScrollView autoHide style={{ width: '100%', height: '100%' }}>
            <Menu
              className={styles.menu}
              mode="inline"
              defaultOpenKeys={[menuItems[0].key]}
              selectedKeys={[selectKey] as unknown as string[]}
              openKeys={openKeys}
              items={menuItems}
              onSelect={handleMenuChange}
              onOpenChange={handleOpenChange}
            />
          </ScrollView>
        </div>
      </Sider>
      <Layout>
        <Header className={styles.pageHeader}>
          <div className={styles.pageTitle}>{selectKey && PageTitle[selectKey]}</div>
          <Popover
            placement="bottomRight"
            content={popoverContent}
            trigger="hover"
          >
            <div className={styles.userInfo}>
              {
                avatar ? (
                  <img src={avatar} alt="" />
                ) : nickName.split('')[0] || ''
              }
            </div>
          </Popover>
        </Header>
        <Content>
          <ScrollView autoHide style={{ width: '100%', height: '100%' }}>
            <Outlet />
          </ScrollView>
        </Content>
      </Layout>
    </Layout >
  );
};

type LayoutProp = {
  children?: ReactElement | ReactElement[];
  routes: RouteBase[];
};