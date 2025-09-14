import React, { useEffect, useState } from "react";
import "./MyOutfits.css";

const MyOutfits = () => {
    // Hardcoded clothing data for outfit combinations
    const hatsData = [
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416546251603710063/image4.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416546220025053395/image5.png?ex=68c73cf9&is=68c5eb79&hm=b2c33e777793ede8d0f09f12b090f112ca5d8d0a21780069b30cfc682074f432",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416547830813950113/image6.png?ex=68c73e79&is=68c5ecf9&hm=fc98e3fddb68739158cb31f5d94a4784995e1cbd0ac0311b826c7654e72c7faa",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416622970872533173/image21.png?ex=68c78473&is=68c632f3&hm=6628a55925e3367bd7d53056e1e607b733f927048c5fcb7ba71ec4d721f05e7f",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416622998928097321/image20.png?ex=68c7847a&is=68c632fa&hm=83d57dd6ae5a18218e80bb222fd1befac105f446cc812ce1190fb870c35fd619",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416623024995700836/image19.png?ex=68c78480&is=68c63300&hm=bd0aac72fc970b4ffe720b978474e136cd0b5d900cb6b516ba3f6be23668c712",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416623052422250626/image18.png?ex=68c78487&is=68c63307&hm=fd0f2d5a1fa8bd7a960131a9025184795aa70f8ae9b175191bb3665b119fec71"
    ];

    const topsData = [
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416546251603710063/image4.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416546220025053395/image5.png?ex=68c73cf9&is=68c5eb79&hm=b2c33e777793ede8d0f09f12b090f112ca5d8d0a21780069b30cfc682074f432",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416547830813950113/image6.png?ex=68c73e79&is=68c5ecf9&hm=fc98e3fddb68739158cb31f5d94a4784995e1cbd0ac0311b826c7654e72c7faa",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416622970872533173/image21.png?ex=68c78473&is=68c632f3&hm=6628a55925e3367bd7d53056e1e607b733f927048c5fcb7ba71ec4d721f05e7f",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416622998928097321/image20.png?ex=68c7847a&is=68c632fa&hm=83d57dd6ae5a18218e80bb222fd1befac105f446cc812ce1190fb870c35fd619",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416623024995700836/image19.png?ex=68c78480&is=68c63300&hm=bd0aac72fc970b4ffe720b978474e136cd0b5d900cb6b516ba3f6be23668c712",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416623052422250626/image18.png?ex=68c78487&is=68c63307&hm=fd0f2d5a1fa8bd7a960131a9025184795aa70f8ae9b175191bb3665b119fec71"
    ];

    const bottomsData = [
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416547791685161111/image7.png?ex=68c73e6f&is=68c5ecef&hm=56905ef5fe13446a08d4a183c29ccb5582c17c0bdd82d996b053adff3f93223a",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416548050200957000/image8.png?ex=68c73ead&is=68c5ed2d&hm=de86fe12f4585cde9c67d95050fecc0aab934aaa5a909471c3159a303eaa3b87",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416621874980589628/Screenshot_2025-09-13_at_11.06.19_PM.png?ex=68c7836e&is=68c631ee&hm=47ceea4d7191c740d18b55c990237d8ff224cb99cc3ab9523757e41c9bfb6785&",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416621875324518550/Screenshot_2025-09-13_at_11.06.26_PM.png?ex=68c7836e&is=68c631ee&hm=ad53485949f92601cadc03208f7d47023f1deebce727ecd9835250e141f4ba1c&",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416622600175747162/image14.png?ex=68c7841b&is=68c6329b&hm=73c975aaa478ac68305421f4e6628dee1f2337c7825132892c4bebd1da8f8a6b",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416621875697680465/Screenshot_2025-09-13_at_11.06.38_PM.png?ex=68c7836e&is=68c631ee&hm=75ad61f05006bd7da3f3a89a43256751af0a44ed87c8f3040a7983355e0a9b6c&",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416622631968440370/image16.png?ex=68c78423&is=68c632a3&hm=ef48cd7142f04d84ccc1c9259d79432778d1e2df06d5090c92b159c72e3344f9",
        "https://cdn.discordapp.com/attachments/1416507297726730310/1416622688151011328/image15.png?ex=68c78430&is=68c632b0&hm=0fd41ef6795fa2bbb5bd47154210be8d182ab9a002151ba5b38aa2918448b9c8"
    ];

    // State for carousel navigation
    const [currentHatIndex, setCurrentHatIndex] = useState(0);
    const [currentTopIndex, setCurrentTopIndex] = useState(0);
    const [currentBottomIndex, setCurrentBottomIndex] = useState(0);

    // State for saved outfits
    const [savedOutfits, setSavedOutfits] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Carousel navigation functions
    const nextHat = () => {
        setCurrentHatIndex((prev) => (prev + 1) % hatsData.length);
    };

    const prevHat = () => {
        setCurrentHatIndex((prev) => (prev - 1 + hatsData.length) % hatsData.length);
    };

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

    const randomOutfit = () => {
        const randomHatIndex = Math.floor(Math.random() * hatsData.length);
        const randomTopIndex = Math.floor(Math.random() * topsData.length);
        const randomBottomIndex = Math.floor(Math.random() * bottomsData.length);
        setCurrentHatIndex(randomHatIndex);
        setCurrentTopIndex(randomTopIndex);
        setCurrentBottomIndex(randomBottomIndex);
    };

    const saveOutfit = () => {
        // Check if this combination already exists
        const outfitExists = savedOutfits.some(outfit =>
            outfit.hatIndex === currentHatIndex && outfit.topIndex === currentTopIndex && outfit.bottomIndex === currentBottomIndex
        );

        if (outfitExists) {
            alert("This outfit combination is already saved!");
            return;
        }

        const newOutfit = {
            id: Date.now(), // Simple unique ID
            hatImage: hatsData[currentHatIndex],
            topImage: topsData[currentTopIndex],
            bottomImage: bottomsData[currentBottomIndex],
            hatIndex: currentHatIndex,
            topIndex: currentTopIndex,
            bottomIndex: currentBottomIndex
        };

        setSavedOutfits(prev => [...prev, newOutfit]);
    };

    return (
        <div className="my-outfits-container">
            <div className="outfits-header">
                <h1 className="outfits-title">My Outfits</h1>
                <p className="outfits-subtitle">Mix and match your clothes to create perfect outfits</p>
            </div>

            <div className="outfits-main-content">
                <div className="outfit-combination-section">
                    <div className="combination-instructions">
                        <h2>Create Your Outfit</h2>
                        <p>Swipe through tops and bottoms to find your perfect combination!</p>
                        <div className="outfit-dropdown-container">
                            <select className="outfit-dropdown">
                                <option value="">Select Closet</option>
                                <option value="my-closet">My Closet</option>
                            </select>
                        </div>
                    </div>

                    <div className="outfit-images-stack">
                        {/* Hats Image */}
                        <div className="image-with-controls">
                            <button className="carousel-nav-btn prev-btn" onClick={prevHat}>
                                ←
                            </button>
                            <img
                                src={hatsData[currentHatIndex]}
                                alt={`Hat ${currentHatIndex + 1}`}
                                className="outfit-image"
                            />
                            <button className="carousel-nav-btn next-btn" onClick={nextHat}>
                                →
                            </button>
                        </div>

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
                        <button className="save-outfit-btn" onClick={saveOutfit}>
                            Save This Outfit
                        </button>
                        <button className="random-outfit-btn" onClick={randomOutfit}>
                            Random Outfit
                        </button>
                    </div>
                </div>

                <div className="saved-outfits-section">
                    <h2>Your Saved Outfits</h2>
                    <div className="saved-outfits-content">
                        {savedOutfits.length === 0 ? (
                            <div className="no-outfits-message">
                                <p>No outfits saved yet. Create your first outfit!</p>
                            </div>
                        ) : (
                            <div className="saved-outfits-grid">
                                {savedOutfits.map((outfit) => (
                                    <div key={outfit.id} className="saved-outfit-item">
                                        <div className="outfit-images">
                                            <img
                                                src={outfit.hatImage}
                                                alt="Saved hat"
                                                className="saved-outfit-image"
                                            />
                                            <img
                                                src={outfit.topImage}
                                                alt="Saved top"
                                                className="saved-outfit-image"
                                            />
                                            <img
                                                src={outfit.bottomImage}
                                                alt="Saved bottom"
                                                className="saved-outfit-image"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOutfits;
