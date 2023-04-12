import Banner from "@/components/Home/Banner";
import Sponser from "components/Home/Sponser";
import Contact from "components/Home/Contact";
import SDGS from "components/Home/SDGS";
import ProductionControl from "components/Home/ProductionControl";
import Product from "components/Home/Product";
import Activity from "components/Home/Activity";
import Certificate from "components/Home/Certificate";
import Delivery from "components/Home/Delivery";
import QAQC from "components/Home/QAQC";
import AboutMe from "components/Home/AboutMe";
import Layout from "@/components/LayoutHome";
import { ReactElement } from "react";

export default function Home() {
  return (
    <>
      <Banner />
      <AboutMe />
      <Product />
      {/* <QAQC /> */}
      {/* <ProductionControl /> */}
      {/* <Delivery /> */}
      {/* <Certificate /> */}
      {/* <Activity /> */}
      {/* <SDGS /> */}
      <Contact />
      <Sponser />
    </>
  );
}
Home.getLayout = function getLayout(component: ReactElement) {
  return <Layout>{component}</Layout>;
};
