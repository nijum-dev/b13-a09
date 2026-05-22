"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaSearch, 
  FaFolder, 
  FaDollarSign, 
  FaUsers, 
  FaArrowRight, 
  FaSlidersH,
  FaChevronDown,
  FaThumbsUp
} from 'react-icons/fa';

export default function IdeasPageClient({ initialIdeas }) {
  const [ideas, setIdeas] = useState(initialIdeas || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Categories list
  const categories = ['All', 'Tech', 'Health', 'AI', 'Education', 'Finance'];

  // Parse budget string to numeric value for sorting
  const parseBudget = (budgetString) => {
    if (!budgetString) return 0;
    const cleanStr = budgetString.replace(/[^0-9.]/g, '');
    const val = parseFloat(cleanStr);
    return isNaN(val) ? 0 : val;
  };

  // Filter and Sort ideas
  const filteredAndSortedIdeas = useMemo(() => {
    let result = [...ideas];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(idea => 
        idea.title?.toLowerCase().includes(query) ||
        idea.shortDescription?.toLowerCase().includes(query) ||
        idea.proposedSolution?.toLowerCase().includes(query) ||
        (typeof idea.tags === 'string' && idea.tags.toLowerCase().includes(query)) ||
        (Array.isArray(idea.tags) && idea.tags.some(t => t.toLowerCase().includes(query)))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(idea => idea.category === selectedCategory);
    }

    // 3. Sorting
    if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else if (sortBy === 'Most Upvotes') {
      result.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else if (sortBy === 'Budget: Low to High') {
      result.sort((a, b) => parseBudget(a.estimatedBudget) - parseBudget(b.estimatedBudget));
    } else if (sortBy === 'Budget: High to Low') {
      result.sort((a, b) => parseBudget(b.estimatedBudget) - parseBudget(a.estimatedBudget));
    }

    return result;
  }, [ideas, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="bg-[#F7F5F0] dark:bg-zinc-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Header Panel */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h5 className="text-[#E8A020] font-extrabold text-xs tracking-widest uppercase mb-3 animate__animated animate__fadeInDown">
          💡 DISCOVER INNOVATION
        </h5>
        <h1 className="text-[#1A3C2E] dark:text-[#E8A020] font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4 animate__animated animate__fadeIn">
          Startup Ideas Board
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto animate__animated animate__fadeInUp">
          Browse, validate, and collaborate on cutting-edge startup blueprints shared by developers, visionaries, and builders.
        </p>
      </div>

      {/* Interactive Toolbar */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 mb-10 animate__animated animate__fadeInUp transition-colors">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search title, tech stack, or problem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
              style={{ borderColor: 'transparent' }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full md:w-auto flex items-center gap-2 self-stretch md:self-auto justify-end">
            <span className="text-xs text-gray-400 dark:text-zinc-400 font-bold uppercase whitespace-nowrap flex items-center gap-1">
              <FaSlidersH /> Sort by:
            </span>
            <div className="relative w-full md:w-52">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 pl-4 pr-10 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm font-semibold text-[#1A3C2E] dark:text-white appearance-none cursor-pointer"
                style={{ borderColor: 'transparent' }}
              >
                <option value="Newest">Newest Submissions</option>
                <option value="Oldest">Oldest Submissions</option>
                <option value="Most Upvotes">Most Validated (Upvotes)</option>
                <option value="Budget: Low to High">Budget: Low to High</option>
                <option value="Budget: High to Low">Budget: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#1A3C2E] dark:text-white">
                <FaChevronDown className="text-xs" />
              </div>
            </div>
          </div>

        </div>

        {/* Category Pills */}
        <div className="mt-6 pt-6 border-t border-[#1A3C2E0A] dark:border-zinc-700 flex flex-wrap gap-2 justify-center sm:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#1A3C2E] dark:bg-[#E8A020] border-[#1A3C2E] dark:border-[#E8A020] text-white dark:text-zinc-950 shadow-sm'
                  : 'bg-white dark:bg-zinc-800 border-[#1A3C2E1A] dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-[#E8A020] dark:hover:border-[#E8A020] dark:hover:text-[#E8A020]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Card Grid */}
      <div className="max-w-6xl mx-auto">
        {filteredAndSortedIdeas.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-3xl p-16 text-center shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 max-w-2xl mx-auto transition-colors">
            <div className="w-20 h-20 bg-[#F7F5F0] dark:bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-[#1A3C2E] dark:text-white mb-2">No matching startup blueprints</h3>
            <p className="text-gray-400 dark:text-zinc-400 text-sm mb-6">
              We couldn't find any ideas matching "{searchQuery}" under {selectedCategory} category. Try broadening your keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="py-3 px-6 rounded-xl font-bold text-sm bg-[#E8A020] text-white dark:text-zinc-950 hover:bg-[#d69018] transition shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedIdeas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-md border border-[#1A3C2E1A] dark:border-zinc-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Card Banner Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={idea.imageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'}
                      alt={idea.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    
                    {/* Category Label Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#E8A020] text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow flex items-center gap-1">
                        <FaFolder className="text-[9px]" /> {idea.category}
                      </span>
                    </div>

                    {/* Upvote score bubble */}
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <FaThumbsUp className="text-[#E8A020]" /> {idea.upvotes || 0}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Title */}
                    <h2 className="text-[#1A3C2E] dark:text-white text-2xl font-extrabold mb-3 group-hover:text-[#E8A020] dark:group-hover:text-[#E8A020] transition-colors line-clamp-1">
                      {idea.title}
                    </h2>

                    {/* Short Description */}
                    <p className="text-gray-500 dark:text-zinc-400 text-sm mb-5 leading-relaxed line-clamp-3">
                      {idea.shortDescription}
                    </p>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {idea.tags ? (
                        typeof idea.tags === 'string' ? (
                          idea.tags.split(',').slice(0, 3).map((tag, i) => (
                            <span key={i} className="bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-zinc-200 border border-[#1A3C2E0C] dark:border-zinc-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide">
                              #{tag.trim()}
                            </span>
                          ))
                        ) : Array.isArray(idea.tags) ? (
                          idea.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-zinc-200 border border-[#1A3C2E0C] dark:border-zinc-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide">
                              #{tag}
                            </span>
                          ))
                        ) : null
                      ) : (
                        <span className="text-gray-400 text-xs italic">No tags listed</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="px-6 pb-6 pt-3 border-t border-[#1A3C2E0D] dark:border-zinc-700 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      Budget Needed
                    </span>
                    <span className="text-sm font-extrabold text-[#1A3C2E] dark:text-[#E8A020] flex items-center">
                      <FaDollarSign className="text-xs text-[#E8A020] -mr-0.5" />
                      {idea.estimatedBudget || 'N/A'}
                    </span>
                  </div>

                  <Link
                    href={`/idea/${idea._id}`}
                    className="py-3 px-5 bg-[#E8A020] hover:bg-[#d69018] text-white dark:text-zinc-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow active:scale-95"
                  >
                    View details <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
