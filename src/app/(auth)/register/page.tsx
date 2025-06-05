import AuthContainer from "@/components/screen/auth/auth-container";
import RegisterForm from "@/components/screen/auth/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <AuthContainer leftContent={<div />} rightContent={<RegisterForm />} />
  );
};

export default RegisterPage;
