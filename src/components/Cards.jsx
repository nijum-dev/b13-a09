import React from 'react';
import 'animate.css';
import Image from 'next/image';
import Link from 'next/link';

const Cards = async () => {
  let ideas = [];
  try {
    const res = await fetch('http://localhost:5000/idea', { cache: 'no-store' });
    if (res.ok) {
      ideas = await res.json();
    }
  } catch (err) {
    console.warn("Cards component failed to fetch from backend, loading fallback seed:", err.message);
    // Safe static fallback seed to avoid crashing Next.js rendering when server is starting up
    ideas = [
      {
        _id: "seed-1",
        title: "EcoSphere: Carbon Offset Hub",
        shortDescription: "A micro-investment SaaS that automatically offsets daily carbon footprints through transaction-level banking API round-ups.",
        category: "AI",
        estimatedBudget: "$25,000",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
      },
      {
        _id: "seed-2",
        title: "TeleHealth VR: Next-Gen Therapy",
        shortDescription: "Immersive virtual reality sessions connecting certified therapists with post-trauma patients worldwide.",
        category: "Health",
        estimatedBudget: "$45,000",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
      },
      {
        _id: "seed-3",
        title: "EduQuest: Gamified AI Classrooms",
        shortDescription: "Personalized syllabus generation and adaptive game mechanics for K-12 STEM students.",
        category: "Education",
        estimatedBudget: "$12,000",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7"
      }
    ];
  }

  // Cap trending ideas to 6 cards for dashboard focus
  const trendingIdeas = ideas.slice(0, 6);

  return (
    <div className="bg-[#F7F5F0] dark:bg-zinc-900 min-h-screen py-14 transition-colors duration-300">
      
      {/* Heading */}
      <div className="mx-10 mb-12">
        <p className="text-[#E8A020] font-bold text-xs mb-3">
          🔥 TRENDING NOW
        </p>

        <h1 className="text-[#1A3C2E] dark:text-[#E8A020] font-extrabold text-5xl mb-3">
          Ideas Gaining Momentum
        </h1>

        <div className="flex justify-between items-center flex-wrap gap-3">
          <p className="text-gray-500 dark:text-zinc-400">
            Explore what the community is most excited about right now.
          </p>

          <Link 
            href="/ideas" 
            className="text-[#E8A020] font-bold text-sm animate__animated animate__bounce tracking-widest cursor-pointer hover:underline decoration-wavy decoration-2"
          >
            Browse All Ideas →
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-10">

        {trendingIdeas.map((idea) => (
          <div
            key={idea._id}
            className="bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group"
          >
            <div>
              {/* Image banner */}
              <div className="relative w-full h-56 bg-slate-900 overflow-hidden">
                <Image
                  src={idea.imageUrl || "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
                  alt={idea.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
              </div>

              {/* Content body */}
              <div className="p-6">
                {/* Category label */}
                <p className="text-[#E8A020] text-xs font-black mb-2 uppercase tracking-wider">
                  {idea.category}
                </p>

                {/* Idea Title */}
                <h2 className="text-[#1A3C2E] dark:text-white text-2xl font-black mb-3 line-clamp-1 group-hover:text-[#E8A020] transition">
                  {idea.title}
                </h2>

                {/* Short description */}
                <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {idea.shortDescription}
                </p>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-6 pb-6 pt-3 flex justify-between items-center border-t border-[#1A3C2E08] dark:border-zinc-700/60">
              <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                Budget: <span className="font-bold text-[#1A3C2E] dark:text-white">{idea.estimatedBudget || 'TBD'}</span>
              </span>

              <Link
                href={`/idea/${idea._id}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold transition hover:opacity-90 active:scale-95 text-center bg-[#E8A020] text-white dark:text-zinc-950"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Cards;