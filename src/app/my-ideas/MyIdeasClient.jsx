"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  FaEdit, 
  FaTrashAlt, 
  FaFolder, 
  FaDollarSign, 
  FaUsers, 
  FaPlus,
  FaTimes,
  FaExclamationTriangle,
  FaArrowRight,
  FaSpinner
} from 'react-icons/fa';

import { useAuth } from '@/providers/AuthContext';
import { useRouter } from 'next/navigation';

export default function MyIdeasClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [editIdea, setEditIdea] = useState(null);
  const [deleteIdeaId, setDeleteIdeaId] = useState(null);
  const [deleteIdeaTitle, setDeleteIdeaTitle] = useState('');
  
  // Edit Form Fields State
  const [editTitle, setEditTitle] = useState('');
  const [editShortDesc, setEditShortDesc] = useState('');
  const [editDetailedDesc, setEditDetailedDesc] = useState('');
  const [editCategory, setEditCategory] = useState('Tech');
  const [editTags, setEditTags] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editBudget, setEditBudget] = useState('');
  const [editAudience, setEditAudience] = useState('');
  const [editProblem, setEditProblem] = useState('');
  const [editSolution, setEditSolution] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast.info("Please sign in to access your startup blueprints workspace. 🔐");
      router.push('/login?redirect=/my-ideas');
    }
  }, [user, authLoading, router]);

  // Fetch Ideas
  const fetchMyIdeas = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/idea');
      if (res.ok) {
        const allIdeas = await res.json();
        
        // Filter: local user created IDs OR creatorEmail matching active user email
        const localCreatedIds = JSON.parse(localStorage.getItem('my_created_ideas') || '[]');
        const myFiltered = allIdeas.filter(idea => 
          idea.creatorEmail === user.email || 
          localCreatedIds.includes(idea._id)
        );

        setIdeas(myFiltered);
      } else {
        toast.error("Failed to load your ideas from database.");
      }
    } catch (err) {
      console.error("Error loading user ideas:", err);
      // Fallback local simulation if backend is down
      const savedMock = localStorage.getItem('mock_my_ideas');
      const localCreatedIds = JSON.parse(localStorage.getItem('my_created_ideas') || '[]');
      if (savedMock) {
        const parsedMock = JSON.parse(savedMock);
        setIdeas(parsedMock.filter(idea => idea.creatorEmail === user.email || localCreatedIds.includes(idea._id)));
      } else {
        // High fidelity demo seed
        const demoSeed = [
          {
            _id: "my-demo-1",
            title: "EcoSphere: Intelligent Carbon Offset Hub",
            shortDescription: "A micro-investment SaaS that automatically offsets daily carbon footprints through transaction-level banking API round-ups.",
            detailedDescription: "EcoSphere connects with users' bank accounts using secure APIs. Every time a purchase is made, the transaction is rounded up to the nearest dollar. The accumulated change is directed into audited, premium carbon offset programs such as reforestation, soil regeneration, and renewable energy grids.",
            category: "AI",
            tags: ["SaaS", "GreenTech", "Fintech", "Ecology"],
            imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
            estimatedBudget: "$25,000",
            targetAudience: "Eco-conscious millennials & retail banking clients",
            problemStatement: "Indivuduals want to help offset their environmental footprint but face complex donation flows and lack transparency on carbon credits.",
            proposedSolution: "Automate micro-investments seamlessly via transactions, providing real-time trees planted counter on a mobile app.",
            creatorEmail: user.email,
            upvotes: 42,
            comments: []
          }
        ];
        setIdeas(demoSeed);
        localStorage.setItem('mock_my_ideas', JSON.stringify(demoSeed));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyIdeas();
  }, [user]);

  // Open Edit Modal & Populate Form
  const openEditModal = (idea) => {
    setEditIdea(idea);
    setEditTitle(idea.title || '');
    setEditShortDesc(idea.shortDescription || '');
    setEditDetailedDesc(idea.detailedDescription || '');
    setEditCategory(idea.category || 'Tech');
    setEditTags(Array.isArray(idea.tags) ? idea.tags.join(', ') : idea.tags || '');
    setEditImageUrl(idea.imageUrl || '');
    setEditBudget(idea.estimatedBudget || '');
    setEditAudience(idea.targetAudience || '');
    setEditProblem(idea.problemStatement || '');
    setEditSolution(idea.proposedSolution || '');
  };

  // Submit Edit Form
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editShortDesc.trim()) {
      toast.warning("Title and Short Description are required.");
      return;
    }

    setIsSaving(true);
    const updatedFields = {
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
      const res = await fetch(`http://localhost:5000/idea/${editIdea._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });

      if (res.ok) {
        const updatedDoc = await res.json();
        // Update local state list
        setIdeas(ideas.map(item => item._id === editIdea._id ? updatedDoc : item));
        toast.success("Startup idea successfully updated! 🚀");
        setEditIdea(null);
      } else {
        toast.error("Failed to update idea. Check backend database.");
      }
    } catch (err) {
      console.warn("Backend down, saving update locally:", err);
      // Local fallback simulation
      const updatedMock = ideas.map(item => 
        item._id === editIdea._id ? { ...item, ...updatedFields } : item
      );
      setIdeas(updatedMock);
      localStorage.setItem('mock_my_ideas', JSON.stringify(updatedMock));
      toast.success("Idea updated locally! (Running in simulation mode)");
      setEditIdea(null);
    } finally {
      setIsSaving(false);
    }
  };

  // Open Delete Dialog
  const openDeleteModal = (id, title) => {
    setDeleteIdeaId(id);
    setDeleteIdeaTitle(title);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/idea/${deleteIdeaId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setIdeas(ideas.filter(item => item._id !== deleteIdeaId));
        toast.success("Startup idea deleted successfully.");
        setDeleteIdeaId(null);
      } else {
        toast.error("Failed to delete idea from database.");
      }
    } catch (err) {
      console.warn("Backend down, simulated delete locally:", err);
      // Local fallback simulation
      const updatedMock = ideas.filter(item => item._id !== deleteIdeaId);
      setIdeas(updatedMock);
      localStorage.setItem('mock_my_ideas', JSON.stringify(updatedMock));
      toast.success("Idea deleted locally. (Simulation mode)");
      setDeleteIdeaId(null);
    } finally {
      setIsDeleting(false);
    }
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
      {/* Page Title & Dashboard Intro */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h5 className="text-[#E8A020] font-extrabold text-xs tracking-widest uppercase mb-2">
            🚀 FOUNDER'S WORKSPACE
          </h5>
          <h1 className="text-[#1A3C2E] dark:text-[#E8A020] font-black text-4xl sm:text-5xl tracking-tight mb-3">
            My Startup Blueprint Hub
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base max-w-xl">
            Review, update details, or delete any ideas you submitted. These blueprints are visible on the public Ideas board for validation.
          </p>
        </div>

        <Link
          href="/idea-form"
          className="flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[#1A3C2E] text-white hover:bg-[#255541] dark:bg-[#E8A020] dark:text-zinc-950 dark:hover:bg-[#d69018] font-bold text-sm transition shadow-md active:scale-95 flex-shrink-0"
        >
          <FaPlus /> Submit New Idea
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#1A3C2E] dark:text-[#E8A020]">
            <FaSpinner className="animate-spin text-4xl mb-4" />
            <p className="font-bold text-sm uppercase tracking-widest">Loading Blueprint Repository...</p>
          </div>
        ) : ideas.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-3xl p-16 text-center shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#F7F5F0] dark:bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              💡
            </div>
            <h3 className="text-xl font-bold text-[#1A3C2E] dark:text-white mb-2">No startup blueprints posted yet</h3>
            <p className="text-gray-400 dark:text-zinc-400 text-sm mb-6">
              You haven't posted any startup ideas under this profile session. Share your first startup vision to receive feedback!
            </p>
            <Link
              href="/idea-form"
              className="py-3 px-6 rounded-xl font-bold text-sm bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#d69018] transition shadow-md"
            >
              Submit Idea Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Card Banner Image */}
                  <div className="relative h-48 w-full bg-slate-900">
                    <Image
                      src={idea.imageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'}
                      alt={idea.title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-102 transition duration-500"
                    />
                    
                    {/* Category Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#E8A020] text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase shadow">
                        {idea.category}
                      </span>
                    </div>

                    {/* Upvote Count Bubble */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1">
                      👍 {idea.upvotes || 0} upvotes
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-[#1A3C2E] dark:text-white line-clamp-1 mb-2 group-hover:text-[#E8A020] transition">
                      {idea.title}
                    </h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                      {idea.shortDescription}
                    </p>

                    <div className="space-y-2.5 border-t border-[#1A3C2E0A] dark:border-zinc-700 pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-bold uppercase flex items-center gap-1">
                          <FaDollarSign /> Budget:
                        </span>
                        <span className="font-extrabold text-[#1A3C2E] dark:text-white">{idea.estimatedBudget || "TBD"}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-bold uppercase flex items-center gap-1">
                          <FaUsers /> Audience:
                        </span>
                        <span className="font-bold text-[#1A3C2E] dark:text-white truncate max-w-40">{idea.targetAudience || "General"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-6 pb-6 pt-3 flex justify-between items-center border-t border-[#1A3C2E0A] dark:border-zinc-700">
                  <Link
                    href={`/idea/${idea._id}`}
                    className="text-xs font-bold text-[#1A3C2E] dark:text-white hover:text-[#E8A020] flex items-center gap-1 transition"
                  >
                    View Details <FaArrowRight className="text-[10px]" />
                  </Link>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(idea)}
                      className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-[#1A3C2E1A] dark:border-zinc-700 hover:bg-[#F7F5F0] dark:hover:bg-zinc-700 text-gray-500 hover:text-[#E8A020] transition"
                      title="Edit details"
                    >
                      <FaEdit className="text-xs" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(idea._id, idea.title)}
                      className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-[#1A3C2E1A] dark:border-zinc-700 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-600 transition"
                      title="Delete idea"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPDATE/EDIT IDEA MODAL */}
      {editIdea && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate__animated animate__fadeIn">
          <div className="bg-white dark:bg-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1A3C2E1A] dark:border-zinc-700 animate__animated animate__zoomIn text-zinc-800 dark:text-white">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1A3C2E1A] dark:border-zinc-700 flex justify-between items-center sticky top-0 bg-white dark:bg-zinc-800 z-10">
              <div>
                <h3 className="text-2xl font-black text-[#1A3C2E] dark:text-[#E8A020]">Edit Startup Idea</h3>
                <p className="text-xs text-gray-400 dark:text-zinc-400">Modify metrics, core blueprints, or visual branding.</p>
              </div>
              <button 
                onClick={() => setEditIdea(null)}
                className="p-2 rounded-full hover:bg-[#F7F5F0] dark:hover:bg-zinc-700 text-gray-400 hover:text-[#E8A020] transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-6">
              
              {/* Title */}
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
                    placeholder="SaaS, AI, Tech"
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
                    className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                    style={{ borderColor: 'transparent' }}
                  ></textarea>
                </div>
              </div>

              {/* Detailed Vision */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">Detailed Vision</label>
                <textarea 
                  rows="5"
                  value={editDetailedDesc}
                  onChange={(e) => setEditDetailedDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                  style={{ borderColor: 'transparent' }}
                ></textarea>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#1A3C2E1A] dark:border-zinc-700 sticky bottom-0 bg-white dark:bg-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditIdea(null)}
                  className="py-3 px-6 rounded-xl font-bold text-sm bg-[#F7F5F0] dark:bg-zinc-700 text-gray-500 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="py-3 px-8 rounded-xl font-bold text-sm bg-[#1A3C2E] dark:bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#255541] dark:hover:bg-[#d69018] active:scale-95 transition flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving Changes...
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

      {/* CONFIRM DELETE MODAL */}
      {deleteIdeaId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate__animated animate__fadeIn">
          <div className="bg-white dark:bg-zinc-800 rounded-3xl w-full max-w-md p-6 shadow-2xl border border-[#1A3C2E1A] dark:border-zinc-700 text-center animate__animated animate__zoomIn text-zinc-800 dark:text-white">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaExclamationTriangle />
            </div>
            
            <h3 className="text-xl font-black text-[#1A3C2E] dark:text-white mb-2">Delete Startup Blueprint?</h3>
            <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-extrabold text-red-600">"{deleteIdeaTitle}"</span>? This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteIdeaId(null)}
                className="py-3 px-6 rounded-xl font-bold text-sm bg-[#F7F5F0] dark:bg-zinc-700 text-gray-500 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="py-3 px-6 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 active:scale-95 transition flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Deleting...
                  </>
                ) : (
                  'Yes, Delete 🗑️'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
