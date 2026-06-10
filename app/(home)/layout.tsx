import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-yellow-shade bg-bg-grey overflow-x-clip">
      <Navbar />
      <main className="flex-1 bg-background -mt-19">{children}</main>
      <Footer />
    </div>
  );
}
