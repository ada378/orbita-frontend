import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'
  },
  {
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80'
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="hero-carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="carousel-slide">
            <div className="carousel-image" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="carousel-overlay" />
          </div>
        ))}
      </div>

      <button className="carousel-btn carousel-btn-left" onClick={prev} aria-label="Previous slide">
        <FaChevronLeft />
      </button>
      <button className="carousel-btn carousel-btn-right" onClick={next} aria-label="Next slide">
        <FaChevronRight />
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
