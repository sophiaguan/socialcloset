import React from "react";
import "../../utilities.css";

const AllClothes = () => {
    // Hardcoded clothing data (same as MyCloset for now)
    const clothingData = {
        "tops": [
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416546251603710063/image4.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416546220025053395/image5.png?ex=68c73cf9&is=68c5eb79&hm=b2c33e777793ede8d0f09f12b090f112ca5d8d0a21780069b30cfc682074f432",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416547830813950113/image6.png?ex=68c73e79&is=68c5ecf9&hm=fc98e3fddb68739158cb31f5d94a4784995e1cbd0ac0311b826c7654e72c7faa"
        ],
        "bottoms": [
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416547791685161111/image7.png?ex=68c73e6f&is=68c5ecef&hm=56905ef5fe13446a08d4a183c29ccb5582c17c0bdd82d996b053adff3f93223a",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416548050200957000/image8.png?ex=68c73ead&is=68c5ed2d&hm=de86fe12f4585cde9c67d95050fecc0aab934aaa5a909471c3159a303eaa3b87"
        ]
    };

    // Combine all clothes into a single array for grid display
    const allClothes = [
        ...clothingData.tops.map((url, index) => ({ url, type: "top", id: `top-${index}` })),
        ...clothingData.bottoms.map((url, index) => ({ url, type: "bottom", id: `bottom-${index}` }))
    ];

    return (
        <div style={{ padding: "40px 60px" }}>
            <h1 style={{ marginBottom: "10px" }}>All Clothes</h1>
            <p style={{ marginBottom: "15px" }}>Browse through your entire wardrobe collection.</p>

            {/* Gallery Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '25px',
                marginTop: "30px"
            }}>
                {allClothes.map((clothing) => (
                    <div key={clothing.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '15px',
                        backgroundColor: '#f9f9f9',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                            e.currentTarget.style.backgroundColor = '#fff';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            e.currentTarget.style.backgroundColor = '#f9f9f9';
                        }}
                    >
                        <img
                            src={clothing.url}
                            alt={`${clothing.type} item`}
                            style={{
                                width: '100%',
                                height: '250px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '15px'
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <span style={{
                                backgroundColor: clothing.type === 'top' ? '#007bff' : '#28a745',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                textTransform: 'uppercase'
                            }}>
                                {clothing.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllClothes;
