"use client";

import type React from "react";
import AuthBanner from "./auth-banner";

interface AuthContainerProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  leftContent,
  rightContent,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left Form */}

      <div className="flex flex-col justify-center">{leftContent}</div>

      {/* Right Form */}
      <div className="flex flex-col justify-center">{rightContent}</div>

      {/* Sliding Banner */}
      <AuthBanner />
    </div>
  );
};

export default AuthContainer;
