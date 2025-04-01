import Navbar from "../Navbar";
import Footer from "../Footer";
import ChatPopup from "../ChatPopup";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}
          <ChatPopup />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
