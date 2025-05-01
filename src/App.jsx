import React, { useEffect, useLayoutEffect } from "react";
import { Routes, Route, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import ShowMovie from "./pages/ShowMovie";
import ShowSeries from "./pages/ShowSeries";
import PersonDetails from "./pages/PersonDetails";
import CastMovie from "./pages/CastMovie";
import CastSeries from "./pages/CastSeries";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"; // إيقاف التمرير التلقائي
    }
    AOS.init({
      duration: 2000, // مدة الحركة
      once: true, // الحركة مرة واحدة فقط
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="text-center flex justify-center items-center flex-col  bg-black text-white">
        {/* <ScrollRestoration> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movies/:movieId" element={<ShowMovie />} />
          <Route path="/person/:personId" element={<PersonDetails />} />
          <Route path="/series/:seriesId" element={<ShowSeries />} />
          <Route path="/castmovie/:MovieId" element={<CastMovie />} />
          <Route path="/castserie/:SeriesId" element={<CastSeries />} />
        </Routes>
        {/* </ScrollRestoration> */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
