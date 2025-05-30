import {
  Button,
  Form,
  Input,
  Checkbox,
  Layout,
  theme,
  Dropdown,
  Space,
  MenuProps,
  message,
  Card,
} from "antd";
import { useState } from "react";
import authAction from "store/auth/actions";
import profileActions from "store/profile/actions";
import { useDispatch } from "react-redux";
import middleware from "utlis/navigation/mw";
import { useSelector } from "react-redux";
import { LoggedUserCanNotOpen } from "middlewares";
import axios from "axios";
// import axios from "utlis/library/helpers/axios";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { permissionsTransform } from "utlis/library/helpers/permissions";
import { useForm } from "antd/lib/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PhoneNumberUtil } from "google-libphonenumber";
import { URL } from "utlis/library/helpers/axios";

const { Title } = Typography;

const { login } = authAction;
const { fetchProfileDataSuccess } = profileActions;
const phoneUtil = PhoneNumberUtil.getInstance();

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );

  const [form] = useForm();

  const mutation = useMutation({
    mutationFn: (values) => axios["post"](`${URL}/api/admin/login`, values),
    onSuccess: (res: { data: { token: string; user: any } }) => {
      const { token, user } = res.data;

      console.log(token);
      user.isVerified = true; // toClear
      user.isActivated = true; // toClear
      user.isApproved = true; // toClear

      dispatch(login(token));
      dispatch(fetchProfileDataSuccess(user));

      // if (data.permissions) {
      //   data.permissions = permissionsTransform(data.permissions);
      // }
      // dispatch(fetchProfileDataSuccess(data));
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (err) => {
      // const {status , data:{message}} =(err as any).response;
      // console.log(err);
      // dispatch(login('token'));
      // dispatch(fetchProfileDataSuccess({
      //   isVerified :true,
      // isActivated  :true,
      // isApproved:true,
      // }));
      // toast.error(message, {
      //   position: "top-center",
      //   duration: 5000,
      //   } );
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };
  return (
    <div className="bg-texture-light dark:bg-texture-dark">
      <div className="box-border absolute inset-x-0 top-0 w-full flex items-center justify-between container mx-auto py-5 px-2">
        <div className="brightness-90 flex items-center text-[#3730a3] no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
          <Link to={"/"}>
            <img
              className="w-20 h-auto"
              src="/Logo-Satr.png"
              width={48}
              height={73}
              alt="masrad-admin"
            />
          </Link>{" "}
        </div>
        <ul className="flex gap-3 items-center">
          {/* <li className="isoUser flex">
              <LangSwitcher />
            </li> */}
          {/* <li className="isoUser">
              <ThemesSwitcher />
            </li> */}
        </ul>
      </div>

      <div className="min-h-[100dvh] box-border w-full flex flex-col items-center justify-center px-3 sm:px-6 py-8 mx-auto lg:py-0">
        <motion.div
          initial={{ y: -150, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full max-w-md"
        >
          <Card className=" w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="space-y-4 sm:p-4">
              <Title className="!text-xl font-bold leading-tight tracking-tight   md:!text-2xl ">
                <FormattedMessage id="signin.signToYourAccount" />
              </Title>
              <Form
                layout="vertical"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label={<FormattedMessage id="email" />}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="email" />,
                    },
                    {
                      type: "email",
                      message: <FormattedMessage id="invalid-email" />,
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label={<FormattedMessage id="password" />}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="password" />,
                    },
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
                <div className="flex justify-between mb-5">
                  <Form.Item
                    className="mb-0"
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>
                      <FormattedMessage id="page.signInRememberMe" />
                    </Checkbox>
                  </Form.Item>
                  {/* <Dropdown menu={{ items, onClick }}>
                    <a className="py-[5px]" onClick={(e) => e.preventDefault()}>
                      <Space>
                        <FormattedMessage id="page.forgetPassSubTitle" />
                      </Space>
                    </a>
                  </Dropdown> */}
                  {/* <Link to="/signup"><FormattedMessage id="register-new-account" /></Link> */}
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    className="w-full"
                    htmlType="submit"
                    loading={mutation.isPending}
                  >
                    <FormattedMessage id="page.signInButton" />
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default middleware(Login, [LoggedUserCanNotOpen]);
