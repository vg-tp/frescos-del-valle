import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CookieBanner />
    </>
  );
}
