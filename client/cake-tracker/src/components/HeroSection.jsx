import React from 'react';

const HeroSection = () => {
  return (
    <div className="hero bg-blue-500 text-white py-24 relative">
      <div className="container mx-auto flex xl:flex-row flex-col gap-5 max-w-[1440px]">
        <div className="flex-1 pt-36 px-10 xl:p-0">
          <h1 className="hero__title text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to Cake Tracker
          </h1>
          <p className="hero__subtitle text-lg sm:text-xl md:text-2xl">
            Discover birthdays and more with us!
          </p>
        </div>
        <div className="hero__image-container xl:flex-1 flex justify-end items-end">
          <div className="hero__image relative xl:w-full w-[90%] xl:h-full h-[590px] z-0">
            <img src="public/tort.PNG" alt="hero" className="object-contain" />
          </div>
          <div className="hero__image-overlay absolute xl:-top-24 xl:-right-1/2 -right-1/4 bg-hero-bg bg-repeat-round z-[-10] w-full xl:h-screen h-[590px] overflow-hidden" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
