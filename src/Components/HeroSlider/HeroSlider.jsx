import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../Button/Button';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const slides = [
    {
        id: 1,
        image: '/updateSliderOne.jpg',
        title: "Caring Dentistry for Your Family",
        description: "Our experienced dental specialists deliver personalized treatments in a modern and relaxing environment for brighter and healthier smiles.",
        cta: 'Book an Appointment',
        link: '/Appointment',
        contentPosition: 'center' // Center aligned content
    },
    {
        id: 3,
        image: '/updateUSSliderFace.jpg',
        title: "Professional Care for Healthy Smiles",

        description:
          "Experience high-quality dental treatments in a modern clinic environment designed for comfort, precision, and long-lasting oral health.",
        cta: 'Meet Our Specialists',
        link: '/contactus',
        contentPosition: 'left' // Left aligned content
    },
    {
        id: 2,
        image: '/coupleSlider.jpg',
        title: "Comfortable & Stress-Free Dental Care",

        description:
          "We provide gentle and patient-focused dental services with advanced techniques to ensure a relaxing and pain-free treatment experience.",
        cta: 'Explore Services',
        link: '/services',
        contentPosition: 'left' // Left aligned content
    },
];

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const sliderRef = useRef(null);
    const timeoutRef = useRef(null);
    const [messages, setMessages] = useState([]);

    // Reset timeout when index changes
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    // Auto-advance slides
    useEffect(() => {
        resetTimeout();
        if (isAutoPlaying) {
            timeoutRef.current = setTimeout(
                () => goToNext(),
                5000 // 5 seconds between slides
            );
        }

        return () => resetTimeout();
    }, [currentIndex, isAutoPlaying]);

    const goToNext = () => {
        setDirection('right');
        setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToPrev = () => {
        setDirection('left');
        setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };

    // Pause on hover
    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };

   

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                goToPrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Calculate animation classes based on direction
    const getAnimationClasses = () => {
        return direction === 'right'
            ? 'slide-in-right'
            : 'slide-in-left';
    };

    // Get content alignment classes based on slide
    const getContentAlignment = () => {
        return slides[currentIndex].contentPosition === 'center' 
            ? 'items-center text-center' 
            : 'items-start text-left';
    };
    
    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const res = await axios.get(`${API_BASE_URL}/api/marquee/active`);
            setMessages(res.data);
          } catch (err) {
            console.error('Failed to load marquee messages:', err);
          }
        };
        fetchMessages();
      }, []);
      if (messages.length === 0) return null;

    return (
        <>
 
            <main className='pt-[80px]'>
                <div
                    ref={sliderRef}
                    className="relative w-full h-screen overflow-hidden group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >

                     {/* 🔔 Emergency Banner inside the slider */}
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-screen-xl px-4">
  <div className="bg-gradient-to-r from-[#003BC4] to-[#00B7AA] text-white py-1 px-3 rounded shadow-md">
  <marquee
      behavior="scroll"
      direction="left"
      scrollamount="6"
      className="text-xs md:text-sm font-semibold tracking-wide leading-tight"
    >
      {messages.map((msg) => (
        <span key={msg.id} className="mr-6 flex items-center gap-1 capitalize">
          {msg.emojiStart && (
            <span className="animate-bounce text-base md:text-lg mt-0.5">
              {msg.emojiStart}
            </span>
          )}
          <span className="tracking-wider">{msg.message}</span>
          {msg.highlightText && (
            <span className="text-yellow-300 font-bold px-1 animate-pulse">
              {msg.highlightText}
            </span>
          )}
          {msg.emojiEnd && (
            <span className="ml-1 animate-wiggle text-base md:text-lg">
              {msg.emojiEnd}
            </span>
          )}
        </span>
      ))}
    </marquee>
  </div>
</div>

                    {/* Slide Content */}
                    <div className="relative w-full h-full">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 flex items-end ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                <div className={`absolute inset-0 w-full h-full ${getAnimationClasses()}`}>
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover mix-blend-overlay"
                                        loading={index === currentIndex ? 'eager' : 'lazy'}
                                    />
                                </div>
                                <div className="absolute h-full w-full inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

                                <div className={`container mx-auto max-w-[1140px] flex flex-col ${slide.contentPosition === 'center' ? 'items-center text-center' : 'items-start text-left pl-8 md:pl-12 lg:pl-16'} mb-24 px-6 relative z-20 text-white transform transition-all duration-700 delay-300`}>
                                    <h2 className={`text-4xl md:text-6xl max-w-4xl font-bold mb-4 slide-up ${slide.contentPosition === 'left' ? 'text-left' : ''}`}>
                                        {slide.title}
                                    </h2>
                                    <p className={`text-xl md:text-2xl max-w-4xl mb-8 slide-up delay-100 ${slide.contentPosition === 'left' ? 'text-left' : ''}`}>
                                        {slide.description}
                                    </p>
                                    <Button
                                        btnContent={slide.cta}
                                        link={slide.link}
                                        className={slide.contentPosition === 'left' ? 'ml-0' : ''}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60"
                        aria-label="Previous slide"
                    >
                        <FiChevronLeft size={28} />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-60"
                        aria-label="Next slide"
                    >
                        <FiChevronRight size={28} />
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 z-20">
                        <div className="container mx-auto">
                            <div className="relative h-1 bg-white bg-opacity-30 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-1000 ease-linear"
                                    style={{
                                        width: isAutoPlaying ? '0%' : '100%',
                                        transitionDuration: isAutoPlaying ? '3000ms' : '0ms'
                                    }}
                                    key={currentIndex}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-6' : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Add CSS for animations */}
                    <style>{`
                        .slide-in-right {
                          animation: slideInRight 1s ease-out forwards;
                        }
                        
                        .slide-in-left {
                          animation: slideInLeft 1s ease-out forwards;
                        }
                        
                        .slide-up {
                          animation: slideUp 0.8s ease-out forwards;
                        }
                        
                        @keyframes slideInRight {
                          from { transform: translateX(100%); opacity: 0; }
                          to { transform: translateX(0); opacity: 1; }
                        }
                        
                        @keyframes slideInLeft {
                          from { transform: translateX(-100%); opacity: 0; }
                          to { transform: translateX(0); opacity: 1; }
                        }
                        
                        @keyframes slideUp {
                          from { transform: translateY(30px); opacity: 0; }
                          to { transform: translateY(0); opacity: 1; }
                        }
                    `}</style>
                </div>
            </main>

        </>
    );
};



export default HeroSlider;