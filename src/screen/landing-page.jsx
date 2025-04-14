// screen/landin-page.jsx

"use client";

import { useEffect } from "react";
import Hero from "../components/home-components/Hero";
import HomeSecondSection from "../components/home-components/SecondSection";
import CarSlider from "../components/home-components/CarSlider";
import CarCard from "../components/home-components/CarCard";
import RentACar from "../components/home-components/RentACar";
import CarAccessoriesCard from "../components/home-components/AccessoriesCard";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import OurMission from "../components/OurMission";
import OurServices from "../components/OurServices";
import AdContainer from "../components/advertisements/AdContainer";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <Navbar />
      <Hero />
      <HomeSecondSection />

      {/* Top Banner Ad */}
      <div className="lg:px-16 md:px-10 px-8 mt-6 mb-6">
        <AdContainer page="home" type="banner" className="w-full" />
      </div>

      <CarSlider />
      <CarCard />

      {/* Middle Banner Ad */}
      {/* <div className="lg:px-16 md:px-10 px-8 mt-10 mb-10">
        <AdContainer
          page="home"
          category="cars"
          type="banner"
          className="w-full"
        />
      </div> */}

      <RentACar />
      <CarAccessoriesCard />

      {/* Bottom Banner Ad */}
      <div className="lg:px-16 md:px-10 px-8 mt-10 mb-10">
        <AdContainer page="cars" type="sidebar" className="w-full mb-6" />
      </div>

      <div className="mt-20">
        <OurServices />
      </div>
      <div className="mb-20">
        <OurMission />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

// import React, { useEffect, useState } from "react";
// import Hero from "../components/home-components/Hero";
// import HomeSecondSection from "../components/home-components/SecondSection";
// import CarSlider from "../components/home-components/CarSlider";
// import CarCard from "../components/home-components/CarCard";
// import RentACar from "../components/home-components/RentACar";
// import CarAccessoriesCard from "../components/home-components/AccessoriesCard";
// import Footer from "../components/footer/footer";
// import Navbar from "../components/navbar/navbar";
// import OurMission from "../components/OurMission";
// import OurServices from "../components/OurServices";

// const LandingPage = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="">
//       <Navbar />
//       <Hero />
//       <HomeSecondSection />
//       <CarSlider />
//       <CarCard />
//       <RentACar />
//       <CarAccessoriesCard />
//       <div className=" mt-20">
//         <OurServices />
//       </div>
//       <div className=" mb-20">
//         <OurMission />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage;
