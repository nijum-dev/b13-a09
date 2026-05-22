import React from 'react';
import 'animate.css';
import Image from 'next/image';

const Cards = async () => {

  const res = await fetch('http://localhost:5000/idea');
  const ideas = await res.json();

  return (

    <div className='bg-[#F7F5F0] min-h-screen py-14'>

      {/* Heading */}
      <div className='mx-10 mb-12'>
        <p className='text-[#E8A020] font-bold text-xs mb-3'>
          🔥 TRENDING NOW
        </p>

        <h1 className='text-[#1A3C2E] font-extrabold text-5xl mb-3'>
          Ideas Gaining Momentum
        </h1>

        <div className='flex justify-between items-center flex-wrap gap-3'>
          <p className='text-gray-500'>
            Explore what the community is most excited about right now.
          </p>

          <p className='text-[#E8A020] font-bold text-sm animate__animated animate__bounce tracking-widest cursor-pointer'>
            Browse All Ideas →
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-10'>

        {ideas.map((idea) => (

          <div
            key={idea._id}
            className='bg-white rounded-2xl overflow-hidden shadow-md border border-[#1A3C2E1A] hover:shadow-xl transition'
          >

            {/* Image */}
            <Image
              src={idea.imageUrl}
              alt={idea.title}
              width={200}
              height={200}
              className='w-full h-52 object-cover'
            />

            {/* Content */}
            <div className='p-5'>

              {/* Category */}
              <p className='text-[#E8A020] text-xs font-bold mb-2 uppercase tracking-wider'>
                {idea.category}
              </p>

              {/* Title */}
              <h2 className='text-[#1A3C2E] text-2xl font-bold mb-3'>
                {idea.title}
              </h2>

              {/* Description */}
              <p className='text-gray-500 text-sm mb-4 line-clamp-3'>
                {idea.shortDescription}
              </p>

              {/* Tags */}
              {/* <div className='flex flex-wrap gap-2 mb-5'>

                {idea.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 rounded-full text-xs font-medium'
                    style={{
                      backgroundColor: '#F7F5F0',
                      color: '#1A3C2E',
                    }}
                  >
                    #{tag}
                  </span>
                ))}

              </div> */}

              {/* Footer */}
              <div className='flex justify-between items-center'>

                <p className='text-sm text-gray-500'>
                  Budget: {idea.estimatedBudget || 'N/A'}
                </p>

                <button
                  className='px-4 py-2 rounded-lg text-sm font-semibold transition'
                  style={{
                    backgroundColor: '#E8A020',
                    color: '#F7F5F0',
                  }}
                >
                  View Details
                </button>

              </div>
            </div>
          </div>

        ))}

      </div>
    </div>
  );
};

export default Cards;