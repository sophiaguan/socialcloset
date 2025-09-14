import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../utilities.css";
import "./AllClothes.css";
import BackButton from "../BackButton";

const AllClothes = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [clothingData, setClothingData] = useState({
    tops: [],
    bottoms: [],
    heads: [],
    shoes: []
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch clothes once
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await fetch("/api/clothing-images");
        console.log("connie connie");
        const data = await res.json();
        console.log("fetched clothing data:", data);
        setClothingData(data);
      } catch (err) {
        console.error("Failed to fetch clothing images", err);
      }
    };

    fetchClothes();
  }, []);

  // Flatten all clothes into one array
  const allClothes = [
    ...clothingData.tops.map((url, index) => ({
      url,
      type: "top",
      id: `top-${index}`,
    })),
    ...clothingData.bottoms.map((url, index) => ({
      url,
      type: "bottom",
      id: `bottom-${index}`,
    })),
    ...clothingData.heads.map((url, index) => ({
      url,
      type: "head",
      id: `head-${index}`,
    })),
    ...clothingData.shoes.map((url, index) => ({
        url,
        type: "shoe",
        id: `shoe-${index}`,
      })),
  ];

  return (
    <div className="all-clothes-container">
      <div className="all-clothes-header">
        <BackButton destination="/my-closet" label="Back to My Closet" />
        <h1 className="all-clothes-title">All Clothes</h1>
        <p className="all-clothes-subtitle">
          Browse through your entire wardrobe collection.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="all-clothes-gallery">
        {allClothes.map((clothing) => (
          <div key={clothing.id} className="all-clothes-card">
            <img src={clothing.url} alt={`${clothing.type} item`} />
            <div className="all-clothes-card-content">
              <span className="all-clothes-label">{clothing.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClothes;
