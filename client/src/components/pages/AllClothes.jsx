import React from "react";
import "../../utilities.css";
import "./AllClothes.css";
import BackButton from "../BackButton";

const AllClothes = () => {
    // Hardcoded clothing data (same as MyCloset for now)
    const clothingData = {
        "tops": [
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416546251603710063/image4.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416546220025053395/image5.png?ex=68c73cf9&is=68c5eb79&hm=b2c33e777793ede8d0f09f12b090f112ca5d8d0a21780069b30cfc682074f432",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416547830813950113/image6.png?ex=68c73e79&is=68c5ecf9&hm=fc98e3fddb68739158cb31f5d94a4784995e1cbd0ac0311b826c7654e72c7faa",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416622970872533173/image21.png?ex=68c78473&is=68c632f3&hm=6628a55925e3367bd7d53056e1e607b733f927048c5fcb7ba71ec4d721f05e7f",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416622998928097321/image20.png?ex=68c7847a&is=68c632fa&hm=83d57dd6ae5a18218e80bb222fd1befac105f446cc812ce1190fb870c35fd619",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416623024995700836/image19.png?ex=68c78480&is=68c63300&hm=bd0aac72fc970b4ffe720b978474e136cd0b5d900cb6b516ba3f6be23668c712",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416623052422250626/image18.png?ex=68c78487&is=68c63307&hm=fd0f2d5a1fa8bd7a960131a9025184795aa70f8ae9b175191bb3665b119fec71"
        ],
        "bottoms": [
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416547791685161111/image7.png?ex=68c73e6f&is=68c5ecef&hm=56905ef5fe13446a08d4a183c29ccb5582c17c0bdd82d996b053adff3f93223a",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416548050200957000/image8.png?ex=68c73ead&is=68c5ed2d&hm=de86fe12f4585cde9c67d95050fecc0aab934aaa5a909471c3159a303eaa3b87",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416621874980589628/Screenshot_2025-09-13_at_11.06.19_PM.png?ex=68c7836e&is=68c631ee&hm=47ceea4d7191c740d18b55c990237d8ff224cb99cc3ab9523757e41c9bfb6785&",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416621875324518550/Screenshot_2025-09-13_at_11.06.26_PM.png?ex=68c7836e&is=68c631ee&hm=ad53485949f92601cadc03208f7d47023f1deebce727ecd9835250e141f4ba1c&",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416622600175747162/image14.png?ex=68c7841b&is=68c6329b&hm=73c975aaa478ac68305421f4e6628dee1f2337c7825132892c4bebd1da8f8a6b",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416621875697680465/Screenshot_2025-09-13_at_11.06.38_PM.png?ex=68c7836e&is=68c631ee&hm=75ad61f05006bd7da3f3a89a43256751af0a44ed87c8f3040a7983355e0a9b6c&",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416622631968440370/image16.png?ex=68c78423&is=68c632a3&hm=ef48cd7142f04d84ccc1c9259d79432778d1e2df06d5090c92b159c72e3344f9",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416622688151011328/image15.png?ex=68c78430&is=68c632b0&hm=0fd41ef6795fa2bbb5bd47154210be8d182ab9a002151ba5b38aa2918448b9c8"
        ],
        "heads": ["https://cdn.discordapp.com/attachments/1416507297726730310/1416631614393417851/image16.png?ex=68c78c80&is=68c63b00&hm=797dc4f180105e567718a6bc22545150f6b22aaf892a81568bed01ff82f54592"]
    };

    // Combine all clothes into a single array for grid display
    const allClothes = [
        ...clothingData.tops.map((url, index) => ({ url, type: "top", id: `top-${index}` })),
        ...clothingData.bottoms.map((url, index) => ({ url, type: "bottom", id: `bottom-${index}` })),
        ...clothingData.heads.map((url, index) => ({ url, type: "head", id: `head-${index}` }))
    ];

    return (
        <div className="all-clothes-container">
            <div className="all-clothes-header">
                <BackButton destination="/my-closet" label="Back to My Closet" />

                <h1 className="all-clothes-title">All Clothes</h1>
                <p className="all-clothes-subtitle">Browse through your entire wardrobe collection.</p>
            </div>

            {/* Gallery Grid */}
            <div className="all-clothes-gallery">
                {allClothes.map((clothing) => (
                    <div key={clothing.id} className="all-clothes-card">
                        <img
                            src={clothing.url}
                            alt={`${clothing.type} item`}
                        />
                        <div className="all-clothes-card-content">
                            <span className="all-clothes-label">
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
