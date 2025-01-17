// import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Image,
  Popconfirm,
  message
} from "antd";
// import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
// import "./index.scss";
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import img404 from '@/assets/error.png'
import { useGetChannels } from "../../Hooks/useChannels";
import { getArticleListAPI , delArticleAPI} from "../../apis/article";
import { useState, useEffect } from "react";
import { allStatus, allColor } from "./constance";
import {useNavigate} from 'react-router-dom'

const { Option } = Select;
const { RangePicker } = DatePicker;

function Article() {
  const navigate = useNavigate();
  // 面包屑数据源
  let itemsOfBread = [
    {
      title: <a href="/">首页</a>,
    },
    {
      title: "内容管理",
    },
  ];

  // 频道下拉数据源
  const { channels } = useGetChannels();

  // 表格列
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        if (cover.images.length === 0) {
          return <div style={{ width: "80px", height: "60px" }}>无图片</div>;
        }
        return <Image src={cover.images[0]} width={80} height={60} />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (index) => {
        return <Tag color={allColor[index]}>{allStatus[index]}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined  onClick={() => navigate(`/publish?id=${data.id}`)}/>} />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 筛选
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 10,
  });

  // 获取筛选表格的数据
  function handlerFinish(formValue) {
    let newVal = {
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue.status,
    };

    if (formValue.date) {
      newVal["begin_pubdate"] = formValue?.date[0]?.format("YYYY-MM-DD");
      newVal["end_pubdate"] = formValue?.date[1]?.format("YYYY-MM-DD");
    }

    setReqData(newVal);
  }

  // 表格数据源
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(1);

  // 获取表格数据
  async function getTableList(data) {
    const res = await getArticleListAPI(data);
    setTableData(res.data.data.results);
    setCount(res.data.data.total_count);
  }

  useEffect(() => {
    getTableList(reqData);
    // reqData 一变化，表格就会更新
  }, [reqData]);

  function handlerPageChange(page, newPageSize) {
    console.log("newPageSize", newPageSize);
    setReqData({
      ...reqData,
      page,
      per_page: newPageSize,
    });
  }

  // 删除回调
  async function delArticle(data) {
    console.log('data', data)
    await delArticleAPI(data.id);
    message.success("删除成功");
    // 更新列表
    setReqData({
      ...reqData,
      page: 1,
      per_page: 20,
    });
  }

  return (
    <div>
      {/* 筛选栏 */}
      <Card
        title={<Breadcrumb separator=">" items={itemsOfBread} />}
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={handlerFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channels.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale} format="YYYY-MM-DD"></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tableData}
          pagination={{
            total: count,
            onChange: handlerPageChange,
          }}
        />
      </Card>
    </div>
  );
}

export default Article;
