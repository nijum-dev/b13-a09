"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  FaArrowLeft, 
  FaRegThumbsUp, 
  FaThumbsUp, 
  FaFolder, 
  FaDollarSign, 
  FaUsers, 
  FaRegComment, 
  FaArrowRight, 
  FaExclamationTriangle,
  FaLightbulb,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaClock,
  FaTimes,
  FaSpinner,
  FaEdit
} from 'react-icons/fa';

export default function InteractiveDetails({ idea }) {
  const [currentIdea, setCurrentIdea] = useState(idea);
  const [upvotes, setUpvotes] = useState(idea.upvotes || 0);
  const [comments, setComments] = useState(idea.comments || []);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Edit modal state variables
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(idea.title || '');
  const [editShortDesc, setEditShortDesc] = useState(idea.shortDescription || '');
  const [editDetailedDesc, setEditDetailedDesc] = useState(idea.detailedDescription || '');
  const [editCategory, setEditCategory] = useState(idea.category || 'Tech');
  const [editTags, setEditTags] = useState(Array.isArray(idea.tags) ? idea.tags.join(', ') : idea.tags || '');
  const [editImageUrl, setEditImageUrl] = useState(idea.imageUrl || '');
  const [editBudget, setEditBudget] = useState(idea.estimatedBudget || '');
  const [editAudience, setEditAudience] = useState(idea.targetAudience || '');
  const [editProblem, setEditProblem] = useState(idea.problemStatement || '');
  const [editSolution, setEditSolution] = useState(idea.proposedSolution || '');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Local storage flags
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const votedState = localStorage.getItem(`voted_${idea._id}`);
      setHasVoted(!!votedState);

      const bookmarkState = localStorage.getItem(`bookmark_${idea._id}`);
      setIsBookmarked(!!bookmarkState);
    }
  }, [idea._id]);

  // Handle Upvoting
  const handleVote = async () => {
    if (hasVoted) {
      toast.info("You have already voted for this idea! 😊");
      return;
    }

    setIsVoting(true);

    try {
      const res = await fetch(`http://localhost:5000/idea/${idea._id}/upvote`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const updatedIdea = await res.json();
        setUpvotes(updatedIdea.upvotes);
        toast.success("Thank you for your vote! 🎉");
        localStorage.setItem(`voted_${idea._id}`, 'true');
        setHasVoted(true);

        // Store upvote interaction for the My Interactions board
        const voteInteraction = {
          ideaId: idea._id,
          ideaTitle: currentIdea.title,
          category: currentIdea.category,
          imageUrl: currentIdea.imageUrl,
          createdAt: new Date().toISOString()
        };
        const existingVotes = JSON.parse(localStorage.getItem('my_votes') || '[]');
        
        // Avoid duplicate log entry
        if (!existingVotes.some(v => v.ideaId === idea._id)) {
          localStorage.setItem('my_votes', JSON.stringify([voteInteraction, ...existingVotes]));
        }
      } else {
        toast.error("Failed to register your vote. Please try again.");
      }
    } catch (err) {
      console.error("Backend vote error:", err);
      toast.error("Failed to connect to the server.");
    } finally {
      setIsVoting(false);
    }
  };

  // Toggle Bookmark
  const toggleBookmark = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (nextState) {
      localStorage.setItem(`bookmark_${idea._id}`, 'true');
      toast.success("Idea saved to your bookmarks! 🔖");
    } else {
      localStorage.removeItem(`bookmark_${idea._id}`);
      toast.info("Idea removed from bookmarks.");
    }
  };

  // Share Idea
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentIdea.title,
        text: currentIdea.shortDescription,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully! 🌐"))
      .catch((err) => console.log("Share failed or cancelled", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard! 📋");
    }
  };

  // Submit Comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      toast.warning("Please fill in both fields.");
      return;
    }

    setIsSubmittingComment(true);

    try {
      const res = await fetch(`http://localhost:5000/idea/${idea._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: commentName.trim(),
          text: commentText.trim()
        })
      });

      if (res.ok) {
        const updatedIdea = await res.json();
        setComments(updatedIdea.comments);
        toast.success("Comment added successfully! 💬");
        
        // Log comment interaction for the user dashboard
        const commentInteraction = {
          ideaId: idea._id,
          ideaTitle: currentIdea.title,
          category: currentIdea.category,
          imageUrl: currentIdea.imageUrl,
          username: commentName.trim(),
          text: commentText.trim(),
          createdAt: new Date().toISOString()
        };
        const existingInteractions = JSON.parse(localStorage.getItem('my_interactions') || '[]');
        localStorage.setItem('my_interactions', JSON.stringify([commentInteraction, ...existingInteractions]));

        setCommentText('');
      } else {
        toast.error("Failed to post comment. Check server database connection.");
      }
    } catch (err) {
      console.warn("Backend down, saving comment locally:", err);
      // Simulated comment block
      const localComment = {
        username: commentName.trim(),
        text: commentText.trim(),
        createdAt: new Date().toISOString()
      };
      const updatedComments = [localComment, ...comments];
      setComments(updatedComments);
      toast.success("Comment saved locally (Simulation Mode).");
      
      const commentInteraction = {
        ideaId: idea._id,
        ideaTitle: currentIdea.title,
        category: currentIdea.category,
        imageUrl: currentIdea.imageUrl,
        username: commentName.trim(),
        text: commentText.trim(),
        createdAt: new Date().toISOString()
      };
      const existingInteractions = JSON.parse(localStorage.getItem('my_interactions') || '[]');
      localStorage.setItem('my_interactions', JSON.stringify([commentInteraction, ...existingInteractions]));

      setCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Submit Edit Details Form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editShortDesc.trim()) {
      toast.warning("Title and Short Description are required.");
      return;
    }

    setIsSavingEdit(true);

    const updatedData = {
      title: editTitle.trim(),
      shortDescription: editShortDesc.trim(),
      detailedDescription: editDetailedDesc.trim(),
      category: editCategory,
      tags: editTags,
      imageUrl: editImageUrl.trim(),
      estimatedBudget: editBudget.trim(),
      targetAudience: editAudience.trim(),
      problemStatement: editProblem.trim(),
      proposedSolution: editSolution.trim()
    };

    try {
      const res = await fetch(`http://localhost:5000/idea/${idea._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentIdea(data); // Instantly update view states
        toast.success("Startup idea details updated successfully! 🚀");
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update idea. Check backend console.");
      }
    } catch (err) {
      console.error("Save edit error:", err);
      // Sim update locally
      const updatedMock = { ...currentIdea, ...updatedData };
      setCurrentIdea(updatedMock);
      toast.success("Updated locally! (Simulation Mode)");
      setIsEditModalOpen(false);
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div className="bg-[#F7F5F0] dark:bg-zinc-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Navigation & Header Actions */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[#1A3C2E] dark:text-[#E8A020] hover:text-[#E8A020] font-semibold transition group self-start"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        {/* Buttons Panel */}
        <div className="flex gap-3 flex-wrap">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-[#1A3C2E1A] dark:border-zinc-700 hover:bg-[#F7F5F0] dark:hover:bg-zinc-700 hover:border-[#E8A020] dark:hover:border-[#E8A020] transition text-[#1A3C2E] dark:text-[#E8A020] font-bold text-xs cursor-pointer"
            title="Edit Startup Idea"
          >
            <FaEdit className="text-xs" /> Edit Idea
          </button>
          
          <button 
            onClick={toggleBookmark}
            className="flex items-center justify-center p-3 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-[#1A3C2E1A] dark:border-zinc-700 hover:bg-[#F7F5F0] dark:hover:bg-zinc-700 hover:border-[#E8A020] dark:hover:border-[#E8A020] transition text-[#1A3C2E] dark:text-white cursor-pointer"
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Idea"}
          >
            {isBookmarked ? <FaBookmark className="text-[#E8A020]" /> : <FaRegBookmark />}
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center justify-center p-3 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-[#1A3C2E1A] dark:border-zinc-700 hover:bg-[#F7F5F0] dark:hover:bg-zinc-700 hover:border-[#E8A020] dark:hover:border-[#E8A020] transition text-[#1A3C2E] dark:text-white cursor-pointer"
            title="Share Idea"
          >
            <FaShareAlt />
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Detail Cards (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-lg border border-[#1A3C2E1A] dark:border-zinc-700 animate__animated animate__fadeIn transition-colors">
            {/* Banner Image */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900">
              <Image 
                src={currentIdea.imageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'} 
                alt={currentIdea.title}
                fill
                priority
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent flex flex-col justify-end p-6 sm:p-8">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#E8A020] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <FaFolder className="text-xs" /> {currentIdea.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                  {currentIdea.title}
                </h1>

                <p className="text-gray-200 text-sm sm:text-base max-w-2xl font-light">
                  {currentIdea.shortDescription}
                </p>
              </div>
            </div>

            {/* Tags & Time */}
            <div className="px-6 py-4 bg-[#1A3C2E05] dark:bg-zinc-800/50 border-t border-[#1A3C2E1A] dark:border-zinc-700 flex flex-wrap justify-between items-center gap-4 transition-colors">
              <div className="flex flex-wrap gap-2">
                {currentIdea.tags ? (
                  typeof currentIdea.tags === 'string' ? (
                    currentIdea.tags.split(',').map((tag, i) => (
                      <span key={i} className="bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-zinc-200 border border-[#1A3C2E1A] dark:border-zinc-600 px-3 py-1 rounded-full text-xs font-semibold">
                        #{tag.trim()}
                      </span>
                    ))
                  ) : Array.isArray(currentIdea.tags) ? (
                    currentIdea.tags.map((tag, i) => (
                      <span key={i} className="bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-zinc-200 border border-[#1A3C2E1A] dark:border-zinc-600 px-3 py-1 rounded-full text-xs font-semibold">
                        #{tag}
                      </span>
                    ))
                  ) : null
                ) : (
                  <span className="text-gray-400 text-xs italic">No tags listed</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400">
                <FaClock />
                <span>Active Startup Proposal</span>
              </div>
            </div>
          </div>

          {/* Problem & Solution Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate__animated animate__fadeInUp">
            
            {/* Problem Statement Card */}
            <div className="bg-[#FFF5F5] dark:bg-red-950/20 rounded-2xl p-6 border-l-4 border-[#EF4444] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#EF4444]">
                  <div className="p-2 rounded-lg bg-[#EF44441A]">
                    <FaExclamationTriangle className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold text-[#991B1B] dark:text-red-400">The Problem</h3>
                </div>
                <p className="text-[#7F1D1D] dark:text-red-200 text-sm leading-relaxed whitespace-pre-line">
                  {currentIdea.problemStatement || "This section is currently waiting to be populated. The founder is refining the specific problem details."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EF44441A] dark:border-red-900/40 text-xs text-[#EF444499] italic">
                Validating customer pain points
              </div>
            </div>

            {/* Proposed Solution Card */}
            <div className="bg-[#F0FDF4] dark:bg-green-950/20 rounded-2xl p-6 border-l-4 border-[#22C55E] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#22C55E]">
                  <div className="p-2 rounded-lg bg-[#22C55E1A]">
                    <FaLightbulb className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold text-[#166534] dark:text-green-400">The Solution</h3>
                </div>
                <p className="text-[#14532D] dark:text-green-200 text-sm leading-relaxed whitespace-pre-line">
                  {currentIdea.proposedSolution || "This section is currently waiting to be populated. The founder is refining the specific product mechanics."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#22C55E1A] dark:border-green-900/40 text-xs text-[#22C55E99] italic">
                Unique value proposition
              </div>
            </div>

          </div>

          {/* Detailed Description */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 sm:p-8 shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 animate__animated animate__fadeInUp transition-colors">
            <h3 className="text-2xl font-bold text-[#1A3C2E] dark:text-[#E8A020] mb-4 border-b border-[#1A3C2E1A] dark:border-zinc-700 pb-3">
              Detailed Vision
            </h3>
            <div className="text-gray-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              {currentIdea.detailedDescription ? (
                currentIdea.detailedDescription
              ) : (
                <p className="italic text-gray-400 dark:text-zinc-500">No additional details have been provided for this startup vision yet.</p>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar Actions */}
        <div className="space-y-8 animate__animated animate__fadeInRight">
          
          {/* Quick Metrics */}
          <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8A020] opacity-5 rounded-full blur-xl -mr-10 -mt-10"></div>
            
            <h3 className="text-lg font-extrabold text-[#1A3C2E] dark:text-[#E8A020] mb-5 uppercase tracking-wider border-b border-[#1A3C2E1A] dark:border-zinc-700 pb-2">
              Metrics & Status
            </h3>

            <div className="space-y-6">
              {/* Budget Badge */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8A0201A] flex items-center justify-center text-[#E8A020]">
                  <FaDollarSign className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 font-semibold uppercase">Estimated Budget</p>
                  <p className="text-xl font-bold text-[#1A3C2E] dark:text-white">
                    {currentIdea.estimatedBudget || "TBD"}
                  </p>
                </div>
              </div>

              {/* Target Audience */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1A3C2E1A] dark:bg-zinc-700/50 flex items-center justify-center text-[#1A3C2E] dark:text-[#E8A020]">
                  <FaUsers className="text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 font-semibold uppercase">Target Audience</p>
                  <p className="text-md font-bold text-[#1A3C2E] dark:text-white line-clamp-2">
                    {currentIdea.targetAudience || "General Public"}
                  </p>
                </div>
              </div>
            </div>

            {/* Voting block */}
            <div className="mt-8 pt-6 border-t border-[#1A3C2E1A] dark:border-zinc-700">
              <div className="text-center bg-[#F7F5F0] dark:bg-zinc-700 rounded-2xl p-5 border border-[#1A3C2E0D] dark:border-zinc-600 transition-colors">
                <p className="text-sm text-gray-500 dark:text-zinc-400 mb-2">Community Validation</p>
                <div className="text-4xl font-extrabold text-[#1A3C2E] dark:text-white mb-4">
                  {upvotes} <span className="text-xs text-[#E8A020] uppercase font-bold tracking-widest block mt-1">Upvotes</span>
                </div>

                <button
                  onClick={handleVote}
                  disabled={isVoting}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                    hasVoted 
                      ? 'bg-[#1A3C2E] text-white cursor-default dark:bg-[#1a3c2e]' 
                      : 'bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#d69018] hover:shadow-lg'
                  } ${isVoting ? 'opacity-70' : ''}`}
                >
                  {hasVoted ? (
                    <>
                      <FaThumbsUp /> Voted
                    </>
                  ) : (
                    <>
                      <FaRegThumbsUp className="animate-bounce" /> Upvote Idea
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick tips panel */}
          <div className="bg-[#1A3C2E] text-white rounded-3xl p-6 shadow-md border border-[#1A3C2E] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8A020] opacity-10 rounded-full blur-2xl -mr-5 -mt-5"></div>
            
            <h4 className="text-[#E8A020] text-xs font-bold uppercase tracking-wider mb-2">🚀 COLLABORATOR BOARD</h4>
            <h3 className="text-lg font-bold mb-3 leading-snug">Love this idea?</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
              Share your insights below or vote. Your validation helps startup creators know if there's real market demand!
            </p>
            <div className="text-[10px] text-[#E8A020] font-mono bg-[#ffffff0a] py-1 px-2.5 rounded border border-[#ffffff12] inline-block">
              IdeaVault Community Standards
            </div>
          </div>

        </div>

      </div>

      {/* COMMENTS & FEEDBACK SECTION */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 sm:p-8 shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 animate__animated animate__fadeInUp transition-colors">
          <div className="flex items-center gap-3 mb-8 border-b border-[#1A3C2E1A] dark:border-zinc-700 pb-4">
            <div className="p-3 bg-[#E8A0201A] rounded-xl text-[#E8A020]">
              <FaRegComment className="text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1A3C2E] dark:text-white">Community Feedback</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                {comments.length} responses & suggestions on this startup vision
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Comment Form */}
            <div className="lg:col-span-2 bg-[#F7F5F0] dark:bg-zinc-750 p-6 rounded-2xl border border-[#1A3C2E0D] dark:border-zinc-700 transition-colors">
              <h4 className="text-lg font-bold text-[#1A3C2E] dark:text-white mb-4">Leave Feedback</h4>
              
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full p-3 rounded-xl border bg-white dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Constructive Suggestions</label>
                  <textarea 
                    rows="4" 
                    placeholder="What are the strengths? What can be improved? Do you know any competitors?"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-3 rounded-xl border bg-white dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmittingComment}
                  className="w-full py-3 bg-[#1A3C2E] text-white hover:bg-[#255541] dark:bg-[#E8A020] dark:text-zinc-950 dark:hover:bg-[#d69018] active:scale-95 text-sm font-semibold rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmittingComment ? 'Submitting...' : 'Submit Feedback 🚀'}
                </button>
              </form>
            </div>

            {/* Comment List */}
            <div className="lg:col-span-3 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.length === 0 ? (
                <div className="text-center py-12 bg-[#F7F5F00A] dark:bg-zinc-700/10 border-2 border-dashed border-[#1A3C2E1A] dark:border-zinc-700 rounded-2xl">
                  <p className="text-gray-400 dark:text-zinc-500 text-sm mb-2">No feedback has been shared yet.</p>
                  <p className="text-xs text-[#E8A020] font-bold">Be the first to help refine this startup idea!</p>
                </div>
              ) : (
                comments.map((comment, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-[#1A3C2E1A] dark:border-zinc-700 shadow-sm hover:shadow transition animate__animated animate__fadeIn"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1A3C2E] dark:bg-[#E8A020] text-[#F7F5F0] dark:text-zinc-950 flex items-center justify-center font-bold text-sm shadow-sm uppercase">
                          {comment.username ? comment.username.substring(0, 2) : 'AN'}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-[#1A3C2E] dark:text-white">{comment.username || 'Anonymous'}</h5>
                          <span className="text-[10px] bg-[#E8A0201A] text-[#E8A020] font-semibold px-2 py-0.5 rounded-full uppercase">
                            Collaborator
                          </span>
                        </div>
                      </div>
                      
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'Just now'}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-zinc-300 text-sm leading-relaxed pl-13 whitespace-pre-line">
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT STARTUP IDEA OVERLAY MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate__animated animate__fadeIn">
          <div className="bg-white dark:bg-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1A3C2E1A] dark:border-zinc-700 animate__animated animate__zoomIn text-zinc-800 dark:text-white">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1A3C2E1A] dark:border-zinc-700 flex justify-between items-center sticky top-0 bg-white dark:bg-zinc-800 z-10">
              <div>
                <h3 className="text-2xl font-black text-[#1A3C2E] dark:text-[#E8A020]">Edit Startup Idea</h3>
                <p className="text-xs text-gray-400 dark:text-zinc-400">Iterate your details, metrics, and problem statements.</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#F7F5F0] dark:hover:bg-zinc-700 text-gray-400 hover:text-[#E8A020] transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              
              {/* Idea Title */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Idea Title</label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                  style={{ borderColor: 'transparent' }}
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Short Description</label>
                <input 
                  type="text" 
                  value={editShortDesc}
                  onChange={(e) => setEditShortDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                  style={{ borderColor: 'transparent' }}
                  required
                />
              </div>

              {/* Category & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Category</label>
                  <select 
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white transition"
                    style={{ borderColor: 'transparent' }}
                  >
                    <option value="Tech">Tech</option>
                    <option value="Health">Health</option>
                    <option value="AI">AI</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Estimated Budget</label>
                  <input 
                    type="text" 
                    value={editBudget}
                    onChange={(e) => setEditBudget(e.target.value)}
                    placeholder="e.g. $10,000"
                    className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                  />
                </div>
              </div>

              {/* Tags & Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="SaaS, AI, Eco"
                    className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Image URL</label>
                  <input 
                    type="text" 
                    value={editImageUrl}
                    onChange={(e) => setEditImageUrl(e.target.value)}
                    className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                  />
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Target Audience</label>
                <input 
                  type="text" 
                  value={editAudience}
                  onChange={(e) => setEditAudience(e.target.value)}
                  placeholder="Students, SaaS creators, Eco-shoppers"
                  className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                  style={{ borderColor: 'transparent' }}
                />
              </div>

              {/* Problem & Solution Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Problem Statement</label>
                  <textarea 
                    rows="3"
                    value={editProblem}
                    onChange={(e) => setEditProblem(e.target.value)}
                    placeholder="Describe the target customer's pain point"
                    className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Proposed Solution</label>
                  <textarea 
                    rows="3"
                    value={editSolution}
                    onChange={(e) => setEditSolution(e.target.value)}
                    placeholder="Describe how your startup solves the problem"
                    className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                  ></textarea>
                </div>
              </div>

              {/* Detailed Vision */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Detailed Vision & Mechanics</label>
                <textarea 
                  rows="5"
                  value={editDetailedDesc}
                  onChange={(e) => setEditDetailedDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                  style={{ borderColor: 'transparent' }}
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#1A3C2E1A] dark:border-zinc-700 sticky bottom-0 bg-white dark:bg-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="py-3 px-6 rounded-xl font-bold text-sm bg-[#F7F5F0] dark:bg-zinc-700 text-gray-500 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="py-3 px-8 rounded-xl font-bold text-sm bg-[#1A3C2E] dark:bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#255541] dark:hover:bg-[#d69018] active:scale-95 transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {isSavingEdit ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving...
                    </>
                  ) : (
                    'Save Iteration 🚀'
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
