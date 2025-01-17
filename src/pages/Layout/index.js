import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo } from "../../store/modules/user";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  // 导航菜单数据源
  const items = [
    {
      key: "/",
      label: "数据概览",
      icon: <HomeOutlined />,
      //   children: [
      //     {
      //       key: "1.1",
      //       label: "Option 5",
      //     },
      //   ],
    },
    {
      key: "/article",
      label: "内容管理",
      icon: <DiffOutlined />,
    },
    {
      key: "/publish",
      label: "发布文章",
      icon: <EditOutlined />,
    },
  ];

  const navigate = useNavigate();

  function handlerClick(route) {
    let path = route.key;
    navigate(path);
  }

  // 让选中菜单项高亮
  let location = useLocation();
  let selectedKey = location.pathname;

  const dispatch = useDispatch();

  // 调用 store 中的异步方法获取用户信息
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  let userName = useSelector((state) => state.user.userInfo.name);

  return (
    <Layout>
      {/* 顶部栏 */}
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userName}</span>
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
            selectedKeys={selectedKey}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            onClick={handlerClick}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
