import Section from "@/components/screen/home/section";

export default async function HomePage() {
  return <MainContent />;
}

function MainContent() {
  return (
    <main className="p-8">
      <Section />
      <Section />
      <Section />
    </main>
  );
}
