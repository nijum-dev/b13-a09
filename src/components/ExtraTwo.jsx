import React from 'react';

const ExtraTwo = () => {
    const categories = [
        { emoji: "🤖", name: "Artificial Intelligence", count: "348 ideas" },
        { emoji: "💊", name: "Health & Wellness", count: "214 ideas" },
        { emoji: "📚", name: "Education", count: "189 ideas" },
        { emoji: "💰", name: "Fintech", count: "267 ideas" },
        { emoji: "🌿", name: "Sustainability", count: "143 ideas" },
        { emoji: "🏠", name: "PropTech", count: "98 ideas" },
        { emoji: "🛒", name: "E-Commerce", count: "176 ideas" },
        { emoji: "🎮", name: "Gaming & VR", count: "122 ideas" }
    ];

    return (
        <div className="bg-[#F7F5F0] dark:bg-zinc-900 pb-16 transition-colors duration-300">
            
            {/* Header */}
            <div className="px-8 py-8 pt-12 mx-auto">
                <h5 className="text-[#E8A020] font-semibold text-xs tracking-widest mb-2 uppercase">
                    BROWSE BY CATEGORY
                </h5>
                <h1 className="text-4xl font-extrabold text-[#1A3C2A] dark:text-[#E8A020]">
                    Explore Every Domain
                </h1>
            </div>

            {/* Grid */}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-5">
                {categories.map((cat, i) => (
                    <div 
                        key={i}
                        className="bg-white dark:bg-zinc-800 p-6 border border-[#1A3C2E1A] dark:border-zinc-700 rounded-3xl items-center text-center shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                        <p className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                            {cat.emoji}
                        </p>
                        <p className="text-[#1A3C2A] dark:text-white font-extrabold mb-1">
                            {cat.name}
                        </p>
                        <p className="text-gray-500 dark:text-zinc-400 text-xs">
                            {cat.count}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ExtraTwo;