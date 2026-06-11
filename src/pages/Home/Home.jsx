import React from "react";
import Banner from "./Banner";
import WhyChooseBook from "./WhyChooseBook";
import BookFicher from "./BookFicher";
import PremiumBook from "./PremiumBook";
import BookFeatureSection from "./BookFeatureSection";
import LetasCard from "./LetasCard";
// import MapNow from "./MapNow";
import Cousebooksconires from "./Cousebooksconires";
import Marqey from "./Marqey";
import CategoriesGrid from "./CategoriesGrid";
import ReadingChallenge from "./ReadingChallenge";
import AuthorSpotlight from "./AuthorSpotlight";
import EventsCalendar from "./EventsCalendar";
import ReaderTestimonials from "./ReaderTestimonials";
import NewsletterSignup from "./NewsletterSignup";
// import MewSections from "./NewSections/MewSections";
// import { Typed } from 'react-typed';

const Home = () => {
  return (
    <div>
      <section className=" mt-6">
        <Banner></Banner>
      </section>

      <div className=" w-11/12 mx-auto">
        {/* New Section: Categories */}
        <section className=" mt-20">
          <CategoriesGrid />
        </section>

        <section className=" mt-20">
          <PremiumBook></PremiumBook>
        </section>

        {/* New Section: Reading Challenge */}
        <section className=" mt-20">
          <ReadingChallenge />
        </section>

        <section className=" w-10/12 mx-auto mt-20">
          <BookFeatureSection></BookFeatureSection>
        </section>

        <section className=" w-11/12 mx-auto mt-20">
          <LetasCard></LetasCard>
        </section>

        {/* New Section: Author Spotlight */}
        <section className=" mt-20">
          <AuthorSpotlight />
        </section>

        <section className=" mt-20">
          <BookFicher></BookFicher>
        </section>

        {/* New Section: Events */}
        <section className=" mt-20">
          <EventsCalendar />
        </section>

        <section className=" mt-20">
          <Cousebooksconires></Cousebooksconires>
        </section>

        {/* New Section: Testimonials */}
        <section className=" mt-20">
          <ReaderTestimonials />
        </section>

        <section className=" w-11/12 mx-auto mt-20">
          <WhyChooseBook></WhyChooseBook>
        </section>
        
        {/* New Section: Newsletter */}
        <section className=" mt-20">
          <NewsletterSignup />
        </section>

        <section className=" mt-20 ">
          <Marqey></Marqey>
        </section>
      </div>
    </div>
  );
};

export default Home;
