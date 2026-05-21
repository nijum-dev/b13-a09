"use client";
import React, { useState } from 'react';

export default function AddIdeaForm() {
  const [tags, setTags] = useState(['SaaS', 'EdTech'])
  const [tagInput, setTagInput] = useState('')
  const [toast, setToast] = useState(false)


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idea = Object.fromEntries(formData.entries());
    idea.tags = tags;
    console.log(idea);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const addTag = (val) => {
    const clean = val.replace(/,$/, '').trim();
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setTagInput('');
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(tagInput)
    }
  }

  const submitIdea = () => {
    setToast(true)

    setTimeout(() => {
      setToast(false)
    }, 3000)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto px-5 pt-8 pb-16 font-sans"
      style={{
        backgroundColor: '#F7F5F0',
        minHeight: '100vh',
        color: '#1A3C2E',
      }}
    >

      {/* Heading */}
      <h2
        className="text-2xl font-bold mb-1"
        style={{ color: '#1A3C2E' }}
      >
        ✨ Submit Your Idea
      </h2>

      <p
        className="text-sm mb-7"
        style={{ color: '#1A3C2E99' }}
      >
        Fill in the details to share your startup concept with the community
      </p>

      {/* Section 1 */}
      <div
        className="bg-white rounded-xl border p-6 mb-4"
        style={{ borderColor: '#E0DAD0' }}
      >
        <h3
          className="text-xs font-bold tracking-widest uppercase pb-3 mb-5 border-b"
          style={{
            color: '#E8A020',
            borderColor: '#E0DAD0',
          }}
        >
          Basic Information
        </h3>

        <label
          className="block text-xs font-semibold mb-1.5"
          style={{ color: '#1A3C2E99' }}
        >
          Idea Title *
        </label>

        <input
          name="title"
          type="text"
          placeholder="A catchy name for your idea"
          className="w-full rounded-lg px-3.5 py-2.5 text-sm mb-4 border transition focus:outline-none"
          style={{
            backgroundColor: '#F7F5F0',
            borderColor: '#E0DAD0',
            color: '#1A3C2E',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#E8A020'
            e.target.style.boxShadow = '0 0 0 3px #E8A02033'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#E0DAD0'
            e.target.style.boxShadow = 'none'
          }}
        />

        <label
          className="block text-xs font-semibold mb-1.5"
          style={{ color: '#1A3C2E99' }}
        >
          Short Description *
        </label>

        <input
          name="shortDesc"
          type="text"
          placeholder="One-liner pitch (max 120 chars)"
          className="w-full rounded-lg px-3.5 py-2.5 text-sm mb-4 border transition focus:outline-none"
          style={{
            backgroundColor: '#F7F5F0',
            borderColor: '#E0DAD0',
            color: '#1A3C2E',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#E8A020'
            e.target.style.boxShadow = '0 0 0 3px #E8A02033'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#E0DAD0'
            e.target.style.boxShadow = 'none'
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: '#1A3C2E99' }}
            >
              Category *
            </label>

            <select
              name="category"
              className="w-full rounded-lg px-3.5 py-2.5 text-sm border transition appearance-none cursor-pointer focus:outline-none"
              style={{
                backgroundColor: '#F7F5F0',
                borderColor: '#E0DAD0',
                color: '#1A3C2E',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#E8A020'
                e.target.style.boxShadow = '0 0 0 3px #E8A02033'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0DAD0'
                e.target.style.boxShadow = 'none'
              }}
            >
              <option>Tech</option>
              <option>AI / ML</option>
              <option>Health</option>
              <option>Education</option>
              <option>Finance</option>
              <option>Environment</option>
            </select>
          </div>

          <div>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: '#1A3C2E99' }}
            >
              Image URL
            </label>

            <input
              name="imageUrl"
              type="text"
              placeholder="https://..."
              className="w-full rounded-lg px-3.5 py-2.5 text-sm border transition focus:outline-none"
              style={{
                backgroundColor: '#F7F5F0',
                borderColor: '#E0DAD0',
                color: '#1A3C2E',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#E8A020'
                e.target.style.boxShadow = '0 0 0 3px #E8A02033'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0DAD0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="bg-white rounded-xl border p-6 mb-4"
        style={{ borderColor: '#E0DAD0' }}
      >
        <h3
          className="text-xs font-bold tracking-widest uppercase pb-3 mb-5 border-b"
          style={{
            color: '#E8A020',
            borderColor: '#E0DAD0',
          }}
        >
          Detailed Description
        </h3>

        {[ 
          {
            label: 'Detailed Description *',
            placeholder: 'Describe your idea in detail...',
            name: 'detailedDesc',
          },
          {
            label: 'Problem Statement *',
            placeholder: 'What problem does this solve?',
            name: 'problem',
          },
          {
            label: 'Proposed Solution *',
            placeholder: 'How does your idea solve it?',
            name: 'solution',
          },
        ].map(({ label, placeholder, name }, i) => (
          <div key={i} className={i < 2 ? 'mb-4' : ''}>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: '#1A3C2E99' }}
            >
              {label}
            </label>

            <textarea
              name={name}
              placeholder={placeholder}
              rows={i === 0 ? 4 : 3}
              className="w-full rounded-lg px-3.5 py-2.5 text-sm border transition resize-y focus:outline-none"
              style={{
                backgroundColor: '#F7F5F0',
                borderColor: '#E0DAD0',
                color: '#1A3C2E',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#E8A020'
                e.target.style.boxShadow = '0 0 0 3px #E8A02033'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0DAD0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        ))}
      </div>

      {/* Section 3 */}
      <div
        className="bg-white rounded-xl border p-6 mb-5"
        style={{ borderColor: '#E0DAD0' }}
      >
        <h3
          className="text-xs font-bold tracking-widest uppercase pb-3 mb-5 border-b"
          style={{
            color: '#E8A020',
            borderColor: '#E0DAD0',
          }}
        >
          Business Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: '#1A3C2E99' }}
            >
              Target Audience
            </label>

            <input
              name="audience"
              type="text"
              placeholder="e.g. Students, SMBs, Parents"
              className="w-full rounded-lg px-3.5 py-2.5 text-sm border transition focus:outline-none"
              style={{
                backgroundColor: '#F7F5F0',
                borderColor: '#E0DAD0',
                color: '#1A3C2E',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#E8A020'
                e.target.style.boxShadow = '0 0 0 3px #E8A02033'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0DAD0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: '#1A3C2E99' }}
            >
              Estimated Budget
            </label>

            <input
              name="budget"
              type="text"
              placeholder="e.g. $50,000 – $200,000"
              className="w-full rounded-lg px-3.5 py-2.5 text-sm border transition focus:outline-none"
              style={{
                backgroundColor: '#F7F5F0',
                borderColor: '#E0DAD0',
                color: '#1A3C2E',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#E8A020'
                e.target.style.boxShadow = '0 0 0 3px #E8A02033'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E0DAD0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        <label
          className="block text-xs font-semibold mb-1.5"
          style={{ color: '#1A3C2E99' }}
        >
          Tags (optional)
        </label>

        <div
          className="flex flex-wrap gap-1.5 rounded-lg px-3 py-2 min-h-10.5 border cursor-text"
          style={{
            backgroundColor: '#F7F5F0',
            borderColor: '#E0DAD0',
          }}
          onClick={() => document.getElementById('tag-field')?.focus()}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-md border"
              style={{
                backgroundColor: '#1A3C2E18',
                borderColor: '#1A3C2E33',
                color: '#1A3C2E',
              }}
            >
              {tag}

              <span
                className="cursor-pointer transition"
                style={{ color: '#1A3C2E66' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1A3C2E'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1A3C2E66'
                }}
                onClick={() => removeTag(tag)}
              >
                ×
              </span>
            </span>
          ))}

          <input
            id="tag-field"
            type="text"
            placeholder="Add tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-none bg-transparent outline-none text-xs w-24 py-0.5 px-1"
            style={{ color: '#1A3C2E' }}
          />
        </div>

        <p
          className="text-xs mt-1.5"
          style={{ color: '#1A3C2E66' }}
        >
          Press Enter or comma to add a tag
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 font-semibold text-sm rounded-xl py-3.5 transition-all duration-150 active:scale-[.98] text-white"
        style={{ backgroundColor: '#E8A020' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#C4881A'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#E8A020'
        }}
      >
        🚀 Publish Idea
      </button>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 text-sm px-4 py-3 rounded-xl shadow-lg border-l-4 text-white"
          style={{
            backgroundColor: '#1A3C2E',
            borderColor: '#E8A020',
          }}
        >
          <span>✓</span>
          <span>Idea published successfully!</span>
        </div>
      )}
    </form>
  )
}
