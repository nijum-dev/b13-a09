"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  FaRegComment, 
  FaThumbsUp, 
  FaFolder, 
  FaTrash, 
  FaArrowRight, 
  FaCalendarAlt,
  FaComments,
  FaLightbulb,
  FaExternalLinkAlt,
  FaSpinner
} from 'react-icons/fa';

import { useAuth } from '@/providers/AuthContext';
import { useRouter } from 'next/navigation';

export default function MyInteractions() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [interactions, setInteractions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [activeTab, setActiveTab] = useState('feedback');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast.info("Please sign in to access your activity dashboard. 🔐");
      router.push('/login?redirect=/my-interactions');
    }
  }, [user, authLoading, router]);

  // Load from localStorage on mount
  useEffect(() => {
    if (!user) return;
    if (typeof window !== 'undefined') {
      const savedInteractions = JSON.parse(localStorage.getItem('my_interactions') || '[]');
      setInteractions(savedInteractions);

      const savedVotes = JSON.parse(localStorage.getItem('my_votes') || '[]');
      setVotes(savedVotes);
    }
  }, [user]);

  // Remove comment interaction
  const removeInteraction = (index, ideaTitle) => {
    const updated = [...interactions];
    updated.splice(index, 1);
    setInteractions(updated);
    localStorage.setItem('my_interactions', JSON.stringify(updated));
    toast.success(`Removed feedback interaction for "${ideaTitle}"`);
  };

  // Remove vote interaction
  const removeVote = (index, ideaTitle) => {
    const updated = [...votes];
    updated.splice(index, 1);
    setVotes(updated);
    localStorage.setItem('my_votes', JSON.stringify(updated));
    toast.success(`Removed upvote interaction for "${ideaTitle}"`);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0] dark:bg-zinc-900 transition-colors">
        <FaSpinner className="animate-spin text-4xl text-[#1A3C2E] dark:text-[#E8A020]" />
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F0] dark:bg-zinc-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Upper Dashboard Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center sm:text-left">
        <h5 className="text-[#E8A020] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">
          👤 MY CONTRIBUTION HUB
        </h5>
        <h1 className="text-[#1A3C2E] dark:text-[#E8A020] font-black text-4xl sm:text-5xl leading-tight mb-4">
          My Interactions
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base max-w-2xl">
          Track, manage, and review your feedback, questions, suggestions, and validation scores for all startup ideas across the platform.
        </p>
      </div>

      {/* Tabs Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-[#1A3C2E1A] dark:border-zinc-800 mb-8 gap-4 justify-center sm:justify-start">
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-4 px-2 font-bold text-sm sm:text-base flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'feedback'
                ? 'border-[#E8A020] text-[#1A3C2E] dark:text-[#E8A020]'
                : 'border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'
            }`}
          >
            <FaComments /> Feedback Comments ({interactions.length})
          </button>
          <button
            onClick={() => setActiveTab('votes')}
            className={`pb-4 px-2 font-bold text-sm sm:text-base flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'votes'
                ? 'border-[#E8A020] text-[#1A3C2E] dark:text-[#E8A020]'
                : 'border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'
            }`}
          >
            <FaThumbsUp /> Upvoted Projects ({votes.length})
          </button>
        </div>

        {/* FEEDBACK COMMENTS TAB */}
        {activeTab === 'feedback' && (
          <div>
            {interactions.length === 0 ? (
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-12 text-center border border-[#1A3C2E1A] dark:border-zinc-700 shadow-md max-w-2xl mx-auto transition-colors">
                <div className="w-20 h-20 bg-[#F7F5F0] dark:bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  💬
                </div>
                <h3 className="text-xl font-bold text-[#1A3C2E] dark:text-white mb-2">No feedback shared yet</h3>
                <p className="text-gray-400 dark:text-zinc-400 text-sm mb-6">
                  Collaborating with founders is the heartbeat of validation. Share your expertise, suggest competitors, or ask questions!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#d69018] transition-all shadow-md"
                >
                  Explore Startup Ideas <FaArrowRight />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interactions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Idea Header */}
                      <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-[#1A3C2E0D] dark:border-zinc-700">
                        <div className="flex items-center gap-3">
                          {item.imageUrl ? (
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                              <Image
                                src={item.imageUrl}
                                alt={item.ideaTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-[#1A3C2E1A] dark:bg-zinc-700 flex items-center justify-center text-[#1A3C2E] dark:text-[#E8A020] flex-shrink-0 font-bold">
                              💡
                            </div>
                          )}
                          <div>
                            <span className="bg-[#E8A0201A] text-[#E8A020] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                              {item.category || 'Tech'}
                            </span>
                            <h3 className="font-bold text-sm sm:text-base text-[#1A3C2E] dark:text-white line-clamp-1">
                              {item.ideaTitle}
                            </h3>
                          </div>
                        </div>

                        <Link
                          href={`/idea/${item.ideaId}`}
                          className="p-2 rounded-xl hover:bg-[#F7F5F0] dark:hover:bg-zinc-700 text-gray-400 hover:text-[#E8A020] transition"
                          title="View Details"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                        </Link>
                      </div>

                      {/* Comment Message */}
                      <div className="bg-[#F7F5F050] dark:bg-zinc-700/35 border border-[#1A3C2E08] dark:border-zinc-700 p-4 rounded-2xl mb-4 relative">
                        <div className="absolute top-2 right-4 text-[10px] font-mono text-gray-400 flex items-center gap-1">
                          <FaCalendarAlt />
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <p className="text-xs font-bold text-[#E8A020] mb-1">
                          As user: <span className="text-[#1A3C2E] dark:text-white font-semibold">{item.username}</span>
                        </p>
                        <p className="text-gray-600 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-line italic">
                          "{item.text}"
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center pt-2">
                      <Link
                        href={`/idea/${item.ideaId}`}
                        className="text-[#1A3C2E] dark:text-[#E8A020] hover:text-[#E8A020] font-bold text-xs sm:text-sm flex items-center gap-1 transition"
                      >
                        Discussion Board <FaArrowRight className="text-xs" />
                      </Link>

                      <button
                        onClick={() => removeInteraction(index, item.ideaTitle)}
                        className="flex items-center gap-1 py-2 px-3.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 text-xs font-semibold transition cursor-pointer"
                      >
                        <FaTrash /> Remove Log
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPVOTED PROJECTS TAB */}
        {activeTab === 'votes' && (
          <div>
            {votes.length === 0 ? (
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-12 text-center border border-[#1A3C2E1A] dark:border-zinc-700 shadow-md max-w-2xl mx-auto transition-colors">
                <div className="w-20 h-20 bg-[#F7F5F0] dark:bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  👍
                </div>
                <h3 className="text-xl font-bold text-[#1A3C2E] dark:text-white mb-2">No upvotes recorded</h3>
                <p className="text-gray-400 dark:text-zinc-400 text-sm mb-6">
                  Upvotes are the ultimate stamp of validity. If you love a startup vision, give them an upvote to push them up the momentum charts!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#d69018] transition-all shadow-md"
                >
                  Find Great Projects <FaArrowRight />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {votes.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 hover:shadow-lg transition flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Card Image Banner */}
                      <div className="relative h-40 bg-slate-800">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.ideaTitle}
                            fill
                            className="object-cover opacity-80"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#1A3C2E] flex items-center justify-center text-4xl">
                            💡
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end p-4">
                          <span className="bg-[#E8A020] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5 self-start">
                            {item.category || 'Tech'}
                          </span>
                          <h3 className="font-extrabold text-sm sm:text-base text-white line-clamp-1">
                            {item.ideaTitle}
                          </h3>
                        </div>
                      </div>

                      {/* Vote Details */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <FaCalendarAlt />
                          <span>Validated on {new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-500 dark:text-zinc-400 text-xs sm:text-sm">
                          You cast a vote of confidence to accelerate this idea's momentum index.
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-5 pb-5 pt-2 flex justify-between items-center">
                      <Link
                        href={`/idea/${item.ideaId}`}
                        className="py-2.5 px-4 bg-[#1A3C2E] dark:bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#255541] dark:hover:bg-[#d69018] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                      >
                        View Idea <FaExternalLinkAlt className="text-[10px]" />
                      </Link>

                      <button
                        onClick={() => removeVote(index, item.ideaTitle)}
                        className="flex items-center gap-1 py-2 px-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 text-xs font-semibold transition cursor-pointer"
                      >
                        <FaTrash /> Remove Log
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
