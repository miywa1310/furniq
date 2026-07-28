import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/services/Users/users.api";
import { useAuthStore } from "@/store/useAuthPersistStore";
import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Radio,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

const { Title } = Typography;

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  phone: string;
  gender?: "male" | "female";
  birthDate?: dayjs.Dayjs | null;
};

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const onFinish = async (values: ProfileFormValues) => {
    try {
      const payload = {
        ...values,
        birthDate: values.birthDate ? values.birthDate.toISOString() : null,
      };

      let finalUser;

      if (user?.id) {
        finalUser = await updateUser({
          id: user.id,
          data: payload,
        });
      } else {
        finalUser = await createUser(payload);
      }

      setAuth({
        user: {
          ...user,
          ...finalUser,
        },
        token: "fake-token",
      });

      message.success("Succesfully saved");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phone: user?.phone,
        middleName: user?.middleName,
        email: user?.email,
        gender: user?.gender,
        birthDate: user?.birthDate ? dayjs(user.birthDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  return (
    <div>
      <Card style={{ backgroundColor: "transparent" }}>
        <Title level={3}>My information</Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Flex gap={16}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true }]}
              style={{ flex: 1 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true }]}
              style={{ flex: 1 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="middleName"
              label="Middle Name"
              style={{ flex: 1 }}
            >
              <Input size="large" />
            </Form.Item>
          </Flex>

          <Flex gap={16}>
            <Form.Item name="birthDate" label="Birthday" style={{ flex: 1 }}>
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>

            <Form.Item name="gender" label="Gender" style={{ flex: 1 }}>
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Flex>

          <Flex gap={16}>
            <Form.Item name="email" label="Email" style={{ flex: 1 }}>
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true }]}
              style={{ flex: 1 }}
            >
              <Input size="large" />
            </Form.Item>
          </Flex>

          <Flex justify="space-between" style={{ marginTop: 20 }}>
            <Button danger type="text" onClick={() => logout()}>
              Logout
            </Button>

            <Flex gap={10}>
              <Button
                onClick={() => {
                  form.resetFields();

                  form.setFieldsValue({
                    ...user,
                    birthDate: user?.birthDate ? dayjs(user.birthDate) : null,
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};

export { Profile };
