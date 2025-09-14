import React, { useState, useEffect } from "react";
import "./ScrollToTop.css";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <span className="scroll-to-top-icon">↑</span>
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
