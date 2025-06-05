import AuthContainer from "@/components/screen/auth/auth-container";
import LoginForm from "@/components/screen/auth/login-form";
import React from "react";

const LoginPage = () => {
  return <AuthContainer rightContent={<div />} leftContent={<LoginForm />} />;
};

export default LoginPage;
