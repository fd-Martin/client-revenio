import React from "react";
import Marquee from "react-fast-marquee";
import H1text from "../../utils/H1text";
import one1 from '../../assets/marqueyBook/mar2.jpg'
import one2 from '../../assets/marqueyBook/mar3.webp'
import one3 from '../../assets/marqueyBook/mar4.jpg'
import one4 from '../../assets/marqueyBook/mar5.jpg'
import one5 from '../../assets/marqueyBook/marr1.jpg'
import one6 from '../../assets/marqueyBook/mar7.jpg'
import one7 from '../../assets/marqueyBook/mar8.webp'
import one8 from '../../assets/marqueyBook/mar9.jpg'
import one9 from '../../assets/marqueyBook/mar10.jpg'

const Marqey = () => {
  return (
    <div className=" mb-15">
        <H1text>
            Our Some BookCourier Collections
        </H1text>
      <Marquee>
          <div className=" flex gap-10 md:gap-32 mt-7 md:mt-14">
            <img src={one1} className=" w-20 h-20 ml-10 md:ml-32"></img>
            <img src={one2} className=" w-20 h-20"></img>
            <img src={one3} className=" w-20 h-20"></img>
            <img src={one4} className=" w-20 h-20"></img>
            <img src={one5} className=" w-20 h-20"></img>
            <img src={one6} className=" w-20 h-20"></img>
            <img src={one7} className=" w-20 h-20"></img>
            <img src={one8} className=" w-20 h-20"></img>
            <img src={one9} className=" w-20 h-20"></img>
          </div>
      </Marquee>
    </div>
  );
};

export default Marqey;
