import React from 'react';

const Hero = () => {
  return (
    <div>
      <div className="bg-[#1a3c2e] items-center text-center pt-16 px-4 sm:px-8">
        <button className="border text-[#E8A020] bg-[#E8A0202E] mb-5 rounded-2xl p-2 text-xs sm:text-sm font-semibold tracking-widest ">
          ✦ THE STARTUP IDEA ECOSYSTEM
        </button>
        <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-7xl leading-tight">Where Bold Ideas</h1>
        <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-7xl leading-tight">Find</h1>
        <h1 className="text-[#e8a020] font-extrabold text-3xl sm:text-5xl md:text-7xl leading-tight">Their Community</h1>
        <p className="text-[#FFFFFFB3] mt-6 text-sm sm:text-base">
          Share your startup vision, gather feedback from innovators,<br className="hidden sm:inline" /> and collaborate to turn raw concepts into validated realities.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <button className="btn border border-[#E8A020] bg-[#E8A020] text-white w-full sm:w-auto">Explore Ideas</button>
          <button className="btn bg-[#1A3C2A] border border-white text-white hover:border-[#E8A020] hover:text-[#E8A020] w-full sm:w-auto">Share Your Idea</button>
        </div>

        <div className="w-full flex justify-center px-0 sm:px-4 mt-12 sm:mt-16">
          <div
            className="flex flex-col sm:flex-row w-full max-w-2xl rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md mb-10"
          >
            {/* Item */}
            <div className="flex-1 text-center px-6 sm:px-8 py-6 sm:py-8 border-b sm:border-b-0 sm:border-r border-white/10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                2.4<span className="text-amber-400">K</span>
              </h2>
              <p className="text-white/60 mt-2 text-xs sm:text-sm md:text-base">
                Ideas Shared
              </p>
            </div>
            {/* Item */}
            <div className="flex-1 text-center px-6 sm:px-8 py-6 sm:py-8 border-b sm:border-b-0 sm:border-r border-white/10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                890<span className="text-amber-400">+</span>
              </h2>
              <p className="text-white/60 mt-2 text-xs sm:text-sm md:text-base">
                Founders
              </p>
            </div>
            {/* Item */}
            <div className="flex-1 text-center px-6 sm:px-8 py-6 sm:py-8 border-b sm:border-b-0 sm:border-r border-white/10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                14<span className="text-amber-400">K</span>
              </h2>
              <p className="text-white/60 mt-2 text-xs sm:text-sm md:text-base">
                Comments
              </p>
            </div>
            {/* Item */}
            <div className="flex-1 text-center px-6 sm:px-8 py-6 sm:py-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                98<span className="text-amber-400">%</span>
              </h2>
              <p className="text-white/60 mt-2 text-xs sm:text-sm md:text-base">
                Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;