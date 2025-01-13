import { Card } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
import { Form, Input, Button, Checkbox } from "antd";

function Login() {
  function onFinish(values) {
    console.log(values);
  }
  return (
    <div className="login">
      <Card className="login-container">
        {/* logo图片 */}
        <img className="login-logo" src={logo} alt="" />

        {/* 登录表单 */}
        <Form
          onFinish={onFinish}
          initialValues={{
            mobile: "13911111111",
            code: "246810",
            remember: true,
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式不对",
                validateTrigger: "onChange",
              },
              { required: true, message: "请输入手机号" },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              { len: 6, message: "验证码6个字符", validateTrigger: "onChange" },
              { required: true, message: "请输入验证码" },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
