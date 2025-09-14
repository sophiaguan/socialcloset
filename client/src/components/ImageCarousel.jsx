import React, { useState } from "react";
import "./ImageCarousel.css";

const ImageCarousel = ({ images, title, type }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3; // Show 3 images at a time
    const maxIndex = Math.max(0, images.length - itemsPerView);

    const nextSlide = () => {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel-container">
            <h3 className="carousel-title">{title}</h3>

            <div className="carousel-wrapper">
                {/* Previous Button */}
                {images.length > itemsPerView && (
                    <button
                        className="carousel-btn carousel-btn-prev"
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                    >
                        ←
                    </button>
                )}

                {/* Carousel Content */}
                <div className="carousel-content">
                    <div
                        className="carousel-track"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                        }}
                    >
                        {images.map((image, index) => (
                            <div key={index} className="carousel-item">
                                <img
                                    src={image}
                                    alt={`${type} ${index + 1}`}
                                    className="carousel-image"
                                />
                                <p className="carousel-item-label">{type} {index + 1}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                {images.length > itemsPerView && (
                    <button
                        className="carousel-btn carousel-btn-next"
                        onClick={nextSlide}
                        disabled={currentIndex === maxIndex}
                    >
                        →
                    </button>
                )}
            </div>

            {/* Dots Indicator */}
            {images.length > itemsPerView && (
                <div className="carousel-dots">
                    {Array.from({ length: maxIndex + 1 }, (_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
