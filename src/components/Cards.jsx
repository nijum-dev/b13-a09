import React from 'react';
import 'animate.css';

const Cards = () => {
    return (
        <div className=''>
            <div className='mt-15 mx-10 '>
                <p className='text-[#E8A020] font-bold text-xs mb-3'>🔥 TRENDING NOW</p>
                <h1 className='text-[#1A3C2E] font-extrabold text-5xl mb-3'>Ideas Gaining Momentum</h1>
               <div className='flex justify-between'>
                 <p className='text-gray-600 mb-10'>Explore what the community is most excited about right now.</p>
                 <p className='text-[#E8A020] font-bold text-sm animate__animated animate__bounce'>Browse All Ideas →</p>
               </div>
            </div>
        </div>
    );
};

export default Cards;