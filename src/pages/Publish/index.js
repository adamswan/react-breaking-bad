import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect, useRef } from "react";
import {
  getChannelsAPI,
  createArticleAPI,
  getArticleByIdAPI,
  upgradeArticleAPI
} from "../../apis/publish";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Option } = Select;

function Publish() {
  const [params] = useSearchParams();
  const articleId = params.get("id"); // 文章id

  // 面包屑数据源
  let itemsOfBread = [
    {
      title: <a href="/">首页</a>,
    },
    {
      title: articleId ? "编辑文章" : "发布文章",
    },
  ];

  // 频道下拉数据源
  const [channels, setChannels] = useState([]);

  // 获取频道数据
  async function getChannels() {
    const newVal = await getChannelsAPI();
    setChannels(newVal.data.data.channels);
    console.log("channels1", newVal.data.data.channels);
  }

  useEffect(() => {
    getChannels();
  }, []);

  // 上传的图片
  const [fileList, setFileList] = useState([]);

  // 上传成功回调
  function onUploadChange(info) {
    let fileList = info.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        };
      }
      return file;
    });
    console.log("看", fileList);
    setFileList(fileList);
  }

  // 封面数量
  const [imgCount, setImgCount] = useState(1);

  function changeType(e) {
    let count = e.target.value;
    setImgCount(count);
  }

  const navigate = useNavigate();

  async function handlerFinish(data) {
    if (fileList.length !== imgCount) {
      return message.error("封面数量不够");
    }
    const { title, content, channel_id } = data;

    const body = {
      title,
      content,
      cover: {
        type: imgCount,
        images: fileList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url
          }
        }),
      },
      channel_id,
    };

    if (articleId) {
      await upgradeArticleAPI(body, articleId)
    } else {
      await createArticleAPI(body);
    }
   

    navigate("/article");

    message.success("发布成功");
  }

  // 编辑模式回填数据
  const formRef = useRef(); // 生成form组件的ref对象

  async function getArticleById() {
    let res = await getArticleByIdAPI(articleId);

    formRef.current.setFieldsValue({
      ...res.data.data,
      type: res.data.data.cover.type,
    });

    // 数据结构不一致，单独处理封面图片
    setImgCount(res.data.data.cover.type);

    let newArr = res.data.data.cover.images.map((item) => {
      return { url: item };
    });
    setFileList(newArr);
  }

  useEffect(() => {
    if (articleId) {
      getArticleById();
    }
  }, [articleId]);

  return (
    <div className="publish">
      <Card title={<Breadcrumb separator=">" items={itemsOfBread} />}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
          initialValues={{ content: "", type: 1 }}
          onFinish={handlerFinish}
          ref={formRef}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 有图的时候，才显示上传组件 */}
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={imgCount}
                multiple={imgCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Publish;
