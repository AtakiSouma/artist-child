import { Button, Divider, Typography } from "antd";
import React from "react";
import { ImagesComponents } from "../../components";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { MyInputComponents } from "../../components/inputs/InputComponents";
import { GoogleLoginButton } from "../../components/buttons/GoogleButton";
import { ErrorMessageLogin } from "../../constants/ErrorMessage";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { userLoginParams } from "../../models/auth.models";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const validate = ErrorMessageLogin;
  const { state, handleLogin } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(validate.email.invalid)
      .required(validate.email.required),
    password: Yup.string()
      .min(6, validate.password.length)
      .required(validate.password.required),
  });
  const handleSubmit = async (values: userLoginParams) => {
    handleLogin(values, navigate);
  };
  return (
    <div className="bg-[#77B0AA] bg-gradient-to-r flex  from-[#77B0AA] to-[#135D66] items-center justify-center min-h-screen w-full">
      <div
        className="flex relative shadow-md  drop-shadow-2xl rounded-sm bg-[#ffffff]
      overflow-hidden w-[1200px] max-w-[100%] min-h-[480px] h-[65%] mx-10"
      >
        <div className="w-full h-full flex-col flex-1  hidden md:block lg:block 2xl:block">
          <ImagesComponents
            width={"100%"}
            height={"520px"}
            photoUrl={
              "https://pbs.twimg.com/media/Fo37uOKWIAkn6Xc?format=jpg&name=4096x4096"
            }
          />
        </div>
        <div className="flex flex-col items-center justify-center  shadow-2xl px-16 md:px-32">
          <h1 className="font-[800] text-5xl text-[#000000] mb-[20px]">
            Login
          </h1>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form
              className="flex flex-col gap-3 mb-[10px] justify-center items-center"
            >
              <div className="flex flex-col gap-3">
                <Field
                  name="email"
                  icon={<MdEmail color="#003C43" />}
                  component={MyInputComponents}
                  placeholder={"Email"}
                />
                <Field
                  isPassword
                  name="password"
                  icon={<RiLockPasswordLine color="#003C43" />}
                  component={MyInputComponents}
                  placeholder={"Password"}
                />
                <Button
                  className="bg-purple border-none hover:text-pretty "
                  htmlType="submit"
                  size="large"
                  type="primary"
                  loading={state.isFetching}
                  >
                  Login
                </Button>
                {state.error && (
                  <article className="text-red-500">
                    {state.displayError}
                  </article>
                )}
              </div>
            </Form>
          </Formik>
          <Divider />
          <GoogleLoginButton />
          <Typography>
            You don't have account?
            <Link className="text-[#135D66]" to="/register">
              <span className="text-[#135D66]"> Register now!</span>{" "}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
