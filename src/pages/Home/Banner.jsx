import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

import TextType from "../../utils/TextType";

import bnner1 from "/public/newfullbanner.jpg";
import bnner2 from "/public/newfullbanner2.jpg";
import bnner3 from "/public/newbanner3.jpg";
import bnner4 from "/public/bannernew4.jpg";
import { Link } from "react-router";
import { GiBookmarklet, GiSpellBook } from "react-icons/gi";
import { GiBookPile } from "react-icons/gi";
import { GiBookAura } from "react-icons/gi";




const Banner = () => {
  return (
    <div className=" ">
      <div className=" ">
        <Swiper
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          speed={900}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="relative flex flex-col items-center justify-center text-center px-5 md:px-15 py-16 gap-6 mx-auto h-[700px] bg-center bg-cover"
              style={{ backgroundImage: `url(${bnner1})` }}
            >
              {/* Overlay: full div with black bg and opacity */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content - make sure this is above the overlay */}
              <div className="relative z-10  ">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md m-w-[660px] md:w-[660px]">
                  <TextType
                    text={
                      "📘 Buy Authentic Library Books At A Student-Friendly Low Price"
                    }
                    typingSpeed={90}
                    deletingSpeed={80}
                    pauseDuration={2000}
                    loop={true}
                    showCursor={false}
                    cursorCharacter="|"
                  />
                </h1>

                <div>
                  <p className=" text-lg mx-auto md:text-xl my-4 text-white max-w-lg font-medium leading-relaxed">
                    Get original books directly from libraries with trusted
                    quality assurance.
                  </p>

                  <Link
                    to="/books"
                    className="px-12 max-w-[300px] mx-auto flex items-center gap-3 p-2.5 mt-4 md:py-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg text-white font-semibold text-lg tracking-wide transition-transform transform hover:scale-105 hover:shadow-xl "
                  >
                    Shop Library Books <GiBookmarklet className=" w-4 h-4 animate-bounce"/>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="relative flex flex-col items-center justify-center text-center px-5 md:px-15 py-16 gap-6 mx-auto h-[700px] bg-center bg-cover"
              style={{ backgroundImage: `url(${bnner2})` }}
            >
              {/* Overlay: full div with black bg and opacity */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content - make sure this is above the overlay */}
              <div className="relative z-10  ">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md m-w-[660px] md:w-[660px]">
                  <TextType
                    text={
                      "📚 Discover Rare Library Collections Available For Purchase Online"
                    }
                    typingSpeed={90}
                    deletingSpeed={80}
                    pauseDuration={2000}
                    loop={true}
                    showCursor={false}
                    cursorCharacter="|"
                  />
                </h1>

                <div>
                  <p className=" text-lg mx-auto md:text-xl my-4 text-white max-w-lg font-medium leading-relaxed">
                  Find unique, limited, and archived books delivered securely to you.
                  </p>

                  <Link
                    to="/books"
                    className="px-12 p-2.5 mt-4 max-w-[300px] mx-auto flex items-center gap-3 md:py-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg text-white font-semibold text-lg tracking-wide transition-transform transform hover:scale-105 hover:shadow-xl"
                  >

                    Explore Rare Books <GiSpellBook  className=" w-4 h-4 animate-bounce"/>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="relative flex flex-col items-center justify-center text-center px-5 md:px-15 py-16 gap-6 mx-auto h-[700px] bg-center bg-cover"
              style={{ backgroundImage: `url(${bnner3})` }}
            >
              {/* Overlay: full div with black bg and opacity */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content - make sure this is above the overlay */}
              <div className="relative z-10  ">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md m-w-[660px] md:w-[660px]">
                  <TextType
                    text={
                      "📖 Order Your Favorite Library Books With Fast Home Delivery"
                    }
                    typingSpeed={90}
                    deletingSpeed={80}
                    pauseDuration={2000}
                    loop={true}
                    showCursor={false}
                    cursorCharacter="|"
                  />
                </h1>

                <div>
                  <p className=" text-lg mx-auto md:text-xl my-4 text-white max-w-lg font-medium leading-relaxed">
                    Enjoy quick book delivery services from your nearest partnered libraries.
                  </p>

                  <Link
                    to="/books"
                    className="px-12 p-2.5 max-w-[300px] mx-auto flex items-center gap-3 mt-4 md:py-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg text-white font-semibold text-lg tracking-wide transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                  Order Books Now  <GiBookPile  className=" w-4 h-4 animate-bounce"/>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="relative flex flex-col items-center justify-center text-center px-5 md:px-15 py-16 gap-6 mx-auto h-[700px] bg-center bg-cover"
              style={{ backgroundImage: `url(${bnner4})` }}
            >
              {/* Overlay: full div with black bg and opacity */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content - make sure this is above the overlay */}
              <div className="relative z-10  ">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md m-w-[660px] md:w-[660px]">
                  <TextType
                    text={
                      "📕 Get Newly Published Library Books At Exclusive Discount Offers"
                    }
                    typingSpeed={90}
                    deletingSpeed={80}
                    pauseDuration={2000}
                    loop={true}
                    showCursor={false}
                    cursorCharacter="|"
                  />
                </h1>

                <div>
                  <p className=" text-lg mx-auto md:text-xl my-4 text-white max-w-lg font-medium leading-relaxed">
                  Save more on trending academic and story books every day
                  </p>

                  <Link
                    to="/books"
                    className="px-12 p-2.5 mt-4 max-w-[300px] mx-auto flex items-center gap-3 md:py-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg text-white font-semibold text-lg tracking-wide transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                 View Discount   <GiBookAura  className=" w-4 h-4 animate-bounce"/>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
