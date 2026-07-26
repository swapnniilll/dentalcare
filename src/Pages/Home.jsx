import React from 'react'
import HeroSlider from '../Components/HeroSlider/HeroSlider'
import AboutUs from './AboutUs/AboutUs'
import DentalSpecialities from '../Components/DentalSpecialities/DentalSpecialities'
import WhyChooseUs from '../Components/WhyChooseUs/WhyChooseUs'
import DoctorProfile from '../Components/DoctorProfile/DoctorProfile'
import DentalPractice from '../Components/DentalPractice/DentalPractice'
import MissionAndValues from '../Components/MissionAndAwards/MissionAndAwards'
import AboutPractice from '../Components/AboutPractice/AboutPractice'



function Home() {
  return (
    <>
        <HeroSlider />  
        <DentalPractice />
        <MissionAndValues />
        {/* <AboutPractice /> */}
        <DentalSpecialities />
        <DoctorProfile />
        <WhyChooseUs />
        
        
    </>
  )
}

export default Home