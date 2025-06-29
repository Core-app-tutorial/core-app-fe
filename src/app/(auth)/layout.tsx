import Background from "@/components/organisms/background";
import AuthTemplate from "@/components/templates/auth-template";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      <AuthTemplate>{children}</AuthTemplate>
    </>
  );
}
