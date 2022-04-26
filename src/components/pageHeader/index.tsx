import React from "react";
import MHeader from "../Base/Header";

type PageHeaderProps = {
  title: string
}

// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a>
//         退出登陆
//       </a>
//     </Menu.Item>
//   </Menu>
// )

const PageHeader: React.FC<PageHeaderProps> = props => {
  const { title } = props

  return (
    <MHeader
      title={title}
      // right={
      //   <Dropdown overlay={menu}>
      //     <div className={styles.name}>{userInfo.name || '未知场馆'}
      //       <Icon type="down" style={{ marginLeft: '4px' }} />
      //     </div>
      //   </Dropdown>
      // }
    />
  )
}

export default PageHeader