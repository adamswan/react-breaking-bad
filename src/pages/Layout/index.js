import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  const items = [
    {
      key: "1",
      label: "数据概览",
      icon: <HomeOutlined />,
      children: [
        {
          key: "1.1",
          label: "Option 5",
        },
      ],
    },
    {
      key: "2",
      label: "内容管理",
      icon: <DiffOutlined />,
    },
    {
      key: "3",
      label: "发布文章",
      icon: <EditOutlined />,
    },
  ];

  return (
    <Layout>
      {/* 顶部栏 */}
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>

      {/* 左侧导航栏 */}
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1.1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          内容
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
