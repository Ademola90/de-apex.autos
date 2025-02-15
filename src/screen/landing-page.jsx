// screen/landin-page.jsx

import React, { useEffect, useState } from "react";
import Hero from "../components/home-components/Hero";
import HomeSecondSection from "../components/home-components/SecondSection";
import CarSlider from "../components/home-components/CarSlider";
import CarCard from "../components/home-components/CarCard";
import RentACar from "../components/home-components/RentACar";
import CarAccessoriesCard from "../components/home-components/AccessoriesCard";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

const LandingPage = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <HomeSecondSection />
      <CarSlider />
      <CarCard />
      <RentACar />
      <CarAccessoriesCard />
      <Footer />
    </div>
  );
};

export default LandingPage;
