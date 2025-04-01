import Banner from "../../components/Homepage/Banner";
import Categories from "../../components/Homepage/Categories";
import TopProduct from "../../components/Homepage/TopProduct";
import Other from "../../components/Homepage/Other";
import Popup from "../../components/Popup";

const HomePage = () => {
  return (
    <div className="container">
      <Banner />
      <Categories />
      <TopProduct />
      <Other />
      <Popup />
    </div>
  );
};

export default HomePage;
