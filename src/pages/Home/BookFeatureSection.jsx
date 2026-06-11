import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { GiSpellBook } from "react-icons/gi";
import { GiBookAura } from "react-icons/gi";
import CountUp from "react-countup";

const BookFeatureSection = () => {
  return (
    <section className="w-full ">
      <div className=" mx-auto md:px-20 grid md:grid-cols-2 gap-16 ">
        {/* LEFT IMAGE BLOCK */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full flex justify-center"
        >
          {/* Outer Gradient Border */}
          <div
            className="
        absolute inset-0 p-1 
        rounded-3xl 
        z-0
      "
          ></div>

          {/* Glass Effect Wrapper */}
          <div
            className="
        w-full
        rounded-2xl
        backdrop-blur-xl 
        relative z-10 overflow-hidden
      "
          >
            {/* Tilt Hover + Scroll Reveal Image */}
            <motion.img
              src="/newfullbanner2.jpg"
              alt="main"
              className="
   h-[300px] md:h-[400px] 
     rounded-2xl 
    transition duration-300
  "
              whileHover={{ scale: 1.03 }}
              whileInView={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
          </div>

          {/* Soft Glow Behind */}
          <div
            className="
        absolute w-64 h-64 
        bg-purple-400/40 
        blur-[120px] 
        -z-10 
        top-10 left-10
      "
          ></div>

          {/* Floating 50+ Card (Glass + Gradient) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
    absolute -bottom-9 md:bottom-15 right-8 
    px-7 py-4 
    rounded-2xl 
    shadow-xl 
    border border-white/40 
    z-20

    /* Glass + Gradient */
    backdrop-blur-xl 
    bg-gradient-to-r from-orange-500/80 to-pink-500/80 
    text-white

    /* Glow effect */
    shadow-pink-500/40
  "
          >
            {/* Floating Animation Wrapper */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex items-center gap-3"
            >
              {/* Book Icon (Shiny) */}
              <motion.div
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="
        p-2 rounded-lg 
        bg-white/20 
        backdrop-blur-md 
        shadow-inner
      "
              >
                <GiSpellBook className="w-7 h-7 text-white drop-shadow-md" />
              </motion.div>

              <div>
                <h3 className=" text-3xl md:text-5xl font-bold drop-shadow-md">
                  <CountUp start={0} end={11} duration={0} />+
                </h3>
                <p className="text-sm tracking-wide opacity-90">
                  Years of Discover
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-3xl  font-extrabold text-primary leading-tight">
            BookCourier is Best Choice For Learners
          </h2>

          <p className="text-thired mt-4 text-base leading-relaxed">
            BookCourier offers easy and quick access to a wide range of books
            from our library. It connects readers with their favorite titles
            anytime, anywhere. Enjoy a seamless borrowing experience with just a
            few clicks.
          </p>

          {/* FEATURE LIST */}
          <div className="mt-6 space-y-4">
            {[
              "Access to thousands of books across various genres.",
              "Convenient online book reservation and delivery",
              "Quiet and comfortable reading spaces",
              "Expert guidance from knowledgeable librarians.",
              "Free Wi-Fi and digital resources.",
              "Regular events and workshops for readers and learners.",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div
                  className="
                bg-gradient-to-br from-orange-500 to-pink-500 
                rounded-full p-1.5
                transition-all duration-300 
                group-hover:scale-125
                flex items-center justify-center
              "
                >
                  <CheckCircle className="text-white" size={20} />
                </div>

                <p className="text-thired text-base group-hover:text-orange-500 transition">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            className="
          mt-8 
          bg-gradient-to-r from-orange-500 to-pink-500 
          hover:opacity-90 
          text-white px-7 py-2.5 
          rounded-xl shadow-lg shadow-orange-400/40 
          transition flex  items-center gap-3
        "
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="
         rounded-lg 
        bg-white/20 
        backdrop-blur-md 
        shadow-inner
      "
            >
              <GiBookAura className="w-6 h-6 text-white drop-shadow-md" />
            </motion.div>
            Parces Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookFeatureSection;
