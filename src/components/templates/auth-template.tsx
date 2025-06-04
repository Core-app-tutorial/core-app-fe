import React from "react";

interface AuthTemplateProps {
  children: React.ReactNode;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-950/30 dark:to-gray-900/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/30 shadow-xl flex flex-col">
        {children}
      </div>
    </section>
  );
};

export default AuthTemplate;
