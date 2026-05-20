import React from 'react';

const ExtraOne = () => {
    return (
        <div className='bg-[#1A3C2A]'>
            <div className=' text-center items-center pt-15'>
                <h5 className='text-[#E8A020] font-semibold text-sm '>SIMPLE PROCESS</h5>
                <h1 className='text-white font-bold text-5xl mt-2'>How IdeaVault Works</h1>
                <p className='text-gray-400 text-md mt-4'>Four steps from raw idea to community validation.</p>
            </div>

            <div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  max-w-6xl justify-center mt-10 items-center">
                    <div className="bg-[#111e163d] hover:bg-[#0b75343d] border border-[#1E3128] rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#111e163d] rounded-2xl flex items-center justify-center mb-6 text-3xl">💡</div>
                        <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#E8A020] mb-3">Step 01</p>
                        <h3 className="font-display font-black text-white text-xl mb-4 leading-snug">Submit Your Idea</h3>
                        <p className="text-[#6B8C78] text-sm leading-relaxed">Fill a structured form with your problem statement, proposed solution, target audience, and budget estimate.</p>
                    </div>

                    <div className="bg-[#111e163d] hover:bg-[#0b75343d] border border-[#1E3128] rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#111e163d] rounded-2xl flex items-center justify-center mb-6 text-3xl">🌐</div>
                        <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#E8A020] mb-3">Step 02</p>
                        <h3 className="font-display font-black text-white text-xl mb-4 leading-snug">Get Discovered</h3>
                        <p className="text-[#6B8C78] text-sm leading-relaxed">Your idea goes live instantly and becomes searchable by category, tags, and keywords across the community.</p>
                    </div>

                    <div className="bg-[#111e163d] hover:bg-[#0b75343d] border border-[#1E3128] rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#111e163d] rounded-2xl flex items-center justify-center mb-6 text-3xl">💬</div>
                        <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#E8A020] mb-3">Step 03</p>
                        <h3 className="font-display font-black text-white text-xl mb-4 leading-snug">Gather Feedback</h3>
                        <p className="text-[#6B8C78] text-sm leading-relaxed">Community members comment and suggest improvements — giving you real validation before you build.</p>
                    </div>

                    <div className="bg-[#111e163d] hover:bg-[#0b75343d] border border-[#1E3128] rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#111e163d] rounded-2xl flex items-center justify-center mb-6 text-3xl">🚀</div>
                        <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#E8A020] mb-3">Step 04</p>
                        <h3 className="font-display font-black text-white text-xl mb-4 leading-snug">Refine & Launch</h3>
                        <p className="text-[#6B8C78] text-sm leading-relaxed">Iterate your concept with collective intelligence and take your validated idea to the next stage.</p>
                    </div>
                </div>

            </div>




        </div>
    );
};
<h5>SIMPLE PROCESS</h5>
export default ExtraOne;