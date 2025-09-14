import React, { useEffect, useState } from "react";
import "./MyOutfits.css";

const MyOutfits = () => {
    // Hardcoded clothing data for outfit combinations
    const topsData = [
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416546251603710063/image4.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416546220025053395/image5.png?ex=68c73cf9&is=68c5eb79&hm=b2c33e777793ede8d0f09f12b090f112ca5d8d0a21780069b30cfc682074f432",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416547830813950113/image6.png?ex=68c73e79&is=68c5ecf9&hm=fc98e3fddb68739158cb311b826c7654e72c7faa",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416621874980589628/Screenshot_2025-09-13_at_11.06.19_PM.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416621874980589628/Screenshot_2025-09-13_at_11.06.19_PM.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405"
    ];

    const bottomsData = [
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416547791685161111/image7.png?ex=68c73e6f&is=68c5ecef&hm=56905ef5fe13446a08d4a183c29ccb5582c17c0bdd82d996b053adff3f93223a",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416548050200957000/image8.png?ex=68c73ead&is=68c5ed2d&hm=de86fe12f4585cde9c67d95050fecc0aab934aaa5a909471c3159a303eaa3b87",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416621874980589628/Screenshot_2025-09-13_at_11.06.19_PM.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416547791685161111/image7.png?ex=68c73e6f&is=68c5ecef&hm=56905ef5fe13446a08d4a183c29ccb5582c17c0bdd82d996b053adff3f93223a",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416548050200957000/image8.png?ex=68c73ead&is=68c5ed2d&hm=de86fe12f4585cde9c67d95050fecc0aab934aaa5a909471c3159a303eaa3b87"
    ];

    // State for carousel navigation
    const [currentTopIndex, setCurrentTopIndex] = useState(0);
    const [currentBottomIndex, setCurrentBottomIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Carousel navigation functions
    const nextTop = () => {
        setCurrentTopIndex((prev) => (prev + 1) % topsData.length);
    };

    const prevTop = () => {
        setCurrentTopIndex((prev) => (prev - 1 + topsData.length) % topsData.length);
    };

    const nextBottom = () => {
        setCurrentBottomIndex((prev) => (prev + 1) % bottomsData.length);
    };

    const prevBottom = () => {
        setCurrentBottomIndex((prev) => (prev - 1 + bottomsData.length) % bottomsData.length);
    };

    return (
        <div className="my-outfits-container">
            <div className="outfits-header">
                <h1 className="outfits-title">My Outfits</h1>
                <p className="outfits-subtitle">Mix and match your clothes to create perfect outfits</p>
            </div>

            <div className="outfit-combination-section">
                <div className="combination-instructions">
                    <h2>Create Your Outfit</h2>
                    <p>Swipe through tops and bottoms to find your perfect combination!</p>
                </div>

                <div className="outfit-images-stack">
                    {/* Tops Image */}
                    <div className="image-with-controls">
                        <button className="carousel-nav-btn prev-btn" onClick={prevTop}>
                            ←
                        </button>
                        <img
                            src={topsData[currentTopIndex]}
                            alt={`Top ${currentTopIndex + 1}`}
                            className="outfit-image"
                        />
                        <button className="carousel-nav-btn next-btn" onClick={nextTop}>
                            →
                        </button>
                    </div>

                    {/* Bottoms Image */}
                    <div className="image-with-controls">
                        <button className="carousel-nav-btn prev-btn" onClick={prevBottom}>
                            ←
                        </button>
                        <img
                            src={bottomsData[currentBottomIndex]}
                            alt={`Bottom ${currentBottomIndex + 1}`}
                            className="outfit-image"
                        />
                        <button className="carousel-nav-btn next-btn" onClick={nextBottom}>
                            →
                        </button>
                    </div>
                </div>

                <div className="outfit-actions">
                    <button className="save-outfit-btn">
                        Save This Outfit
                    </button>
                    <button className="random-outfit-btn">
                        Random Outfit
                    </button>
                </div>
            </div>

            <div className="saved-outfits-section">
                <h2>Your Saved Outfits</h2>
                <div className="no-outfits-message">
                    <p>No outfits saved yet. Create your first outfit above!</p>
                </div>
            </div>
        </div>
    );
};

export default MyOutfits;
