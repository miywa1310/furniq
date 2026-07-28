import { loginPageImg, logo } from "@/assets";
import {
  useCreateUserMutation,
  useGetUsersQuery,
} from "@/services/Users/users.api";
import { useAuthStore } from "@/store/useAuthPersistStore";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Segmented,
  Typography,
  message,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Text } = Typography;
type Step = "login" | "register";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/";
  const { data: users = [] } = useGetUsersQuery();
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const [step, setStep] = useState<Step>("login");
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createUser } = useCreateUserMutation();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogin = async (values: { phone: string; password: string }) => {
    try {
      setLoading(true);

      const existingUser = users.find((u) => u.phone === values.phone);

      if (!existingUser) {
        message.error("User not found. Please, Sign in");
        return;
      }

      setAuth({
        user: existingUser,
        token: "fake-token",
      });

      message.success("You have successfully logged in!");

      navigate(from);
    } catch {
      message.error("Incorrect phone or password");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const user = await createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        password: values.password,
      });

      setAuth({
        user,
        token: "fake-token",
      });

      message.success("You are registered!");

      navigate("/");
    } catch {
      message.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSegmentChange = (val: string) => {
    setStep(val as Step);
    loginForm.resetFields();
    registerForm.resetFields();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${loginPageImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          border: "none",
        }}
        styles={{ body: { padding: "32px 28px 28px" } }}
      >
        <Flex justify="center" style={{ marginBottom: 28 }}>
          <img src={logo} alt="logo" height={56} />
        </Flex>

        <Segmented
          block
          value={step}
          onChange={handleSegmentChange}
          options={[
            { label: "Login", value: "login" },
            { label: "Sign in", value: "register" },
          ]}
          style={{
            marginBottom: 24,
            fontWeight: 600,
            height: 40,
            lineHeight: "40px",
          }}
        />

        {step === "login" && (
          <Form
            form={loginForm}
            layout="vertical"
            onFinish={handleLogin}
            requiredMark={false}
            size="large"
          >
            <Form.Item
              label={<Text strong>Phone number</Text>}
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Enter phone number",
                },
                {
                  pattern: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
                  message: "Invalid phone number",
                },
              ]}
            >
              <MaskedInput
                mask="+998 00 000 00 00"
                placeholder="+998 90 123 45 67"
                prefix={<PhoneOutlined style={{ color: "#bbb" }} />}
                size="large"
                style={{
                  background: "#F2F4F7",
                  border: "1px solid #E8ECF0",
                  borderRadius: 8,
                  height: 52,
                }}
              />
            </Form.Item>

            <Form.Item
              label={<Text strong>Password</Text>}
              name="password"
              rules={[
                { required: true, message: "Enter password" },
                {
                  min: 4,
                  message: "Password must be at least 4 characters long.",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bbb" }} />}
                placeholder="Password"
                style={{
                  background: "#F2F4F7",
                  border: "1px solid #E8ECF0",
                  borderRadius: 8,
                  height: 52,
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
              <Button
                htmlType="submit"
                block
                loading={loading}
                style={{
                  background: "#E07850",
                  borderColor: "#E07850",
                  color: "#fff",
                  height: 48,
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 8,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#C9653D")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#E07850")
                }
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === "register" && (
          <Form
            form={registerForm}
            layout="vertical"
            onFinish={handleRegister}
            requiredMark={false}
            size="large"
          >
            <Flex gap={12}>
              {/* FIRST NAME */}
              <Form.Item
                label={<Text strong>First name</Text>}
                name="firstName"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: "Enter first name",
                  },
                  {
                    min: 2,
                    message: "First name must be at least 2 characters",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#bbb" }} />}
                  placeholder="First name"
                  style={{
                    background: "#F2F4F7",
                    border: "1px solid #E8ECF0",
                    borderRadius: 8,
                    height: 52,
                  }}
                />
              </Form.Item>

              <Form.Item
                label={<Text strong>Last name</Text>}
                name="lastName"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: "Enter last name",
                  },
                  {
                    min: 2,
                    message: "Last name must be at least 2 characters",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "#bbb" }} />}
                  placeholder="Last name"
                  style={{
                    background: "#F2F4F7",
                    border: "1px solid #E8ECF0",
                    borderRadius: 8,
                    height: 52,
                  }}
                />
              </Form.Item>
            </Flex>

            {/* PHONE */}
            <Form.Item
              label={<Text strong>Phone number</Text>}
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Enter phone number",
                },
                {
                  pattern: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
                  message: "Invalid phone number",
                },
              ]}
            >
              <MaskedInput
                mask="+998 00 000 00 00"
                placeholder="+998 90 123 45 67"
                prefix={<PhoneOutlined style={{ color: "#bbb" }} />}
                size="large"
                style={{
                  background: "#F2F4F7",
                  border: "1px solid #E8ECF0",
                  borderRadius: 8,
                  height: 52,
                }}
              />
            </Form.Item>

            {/* PASSWORD */}
            <Form.Item
              label={<Text strong>Password</Text>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Enter password",
                },
                {
                  min: 4,
                  message: "Password must be at least 4 characters long",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#bbb" }} />}
                placeholder="Password"
                style={{
                  background: "#F2F4F7",
                  border: "1px solid #E8ECF0",
                  borderRadius: 8,
                  height: 52,
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              style={{
                marginBottom: 0,
                marginTop: 8,
              }}
            >
              <Button
                htmlType="submit"
                block
                loading={loading}
                style={{
                  background: "#E07850",
                  borderColor: "#E07850",
                  color: "#fff",
                  height: 48,
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 8,
                }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export { Login };
