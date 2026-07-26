import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Services from "./Pages/Services/Services";
import LaserDentistry from "./Pages/LaserDentistry/LaserDentistry";
import DentalVeneers from "./Pages/DentalVeneers/DentalVeneers";
import KidsDentalCare from "./Pages/KidsDentalCare/KidsDentalCare";
import FullMouthRehabilitation from "./Pages/FullMouthRehabilitation/FullMouthRehabilitation";
import Reviews from "./Pages/Reviews/Reviews";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Loader from "./Components/Loader/Loader"; 
import Practice from "./Pages/Practice/Practice";
import Blog from "./Pages/Blog/Blog";
import Appointment from "./Components/Appointment/Appointment";
import Insurance from "./Pages/Insurance/Insurance";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Treatments from "./Pages/Treatments/Treatments";
import Gallery from "./Pages/Gallery/Gallery";
import DigitalSmileDesign from "./Pages/DigitalSmileDesign/DigitalSmileDesign";
import OrthodonticTreatment from "./Pages/OrthodonticTreatment/OrthodonticTreatment";
import TeethWhitening from "./Pages/TeethWhitening/TeethWhitening";
import PeriodonticTreatment from "./Pages/PeriodonticTreatment/PeriodonticTreatment";
import Dentures from "./Pages/Dentures/Dentures";
import EmergencyService from "./Pages/EmergencyService/EmergencyService";


// ✅ Lazy load admin app
const AdminApp = React.lazy(() => import("./admin/App"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Loader for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about-doctor" element={<AboutUs />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/LaserDentistry" element={<LaserDentistry />} />
          <Route path="/DentalVeneers" element={<DentalVeneers />} />
          <Route path="/KidsDentalCare" element={<KidsDentalCare />} />
          <Route path="/FullMouthRehabilitation" element={<FullMouthRehabilitation />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/Insurance" element={<Insurance />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/Treatments" element={<Treatments />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/DigitalSmileDesign" element={<DigitalSmileDesign />} />
          <Route path="/orthodontic-treatments" element={<OrthodonticTreatment />} />
          <Route path="/TeethWhitening" element={<TeethWhitening />} />
          <Route path="/periodontic-treatments" element={<PeriodonticTreatment />} />
          <Route path="/dentures" element={<Dentures />} />
          <Route path="/emergency-service" element={<EmergencyService />} />
         
        </Route>
      

        {/* ✅ Admin routes are lazy-loaded */}
<Route path="/admin" element={<Navigate to="/admin/login" replace />} />
<Route
  path="/admin/*"
  element={
    <Suspense fallback={<Loader />}>
      <AdminApp />
    </Suspense>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
