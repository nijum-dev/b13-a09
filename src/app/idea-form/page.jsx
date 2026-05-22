"use client"

import React from 'react';
import { toast } from 'react-toastify';


const Form = () => {
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const idea = Object.fromEntries(formData.entries())

        console.log(idea)

       const res = await fetch('http://localhost:5000/idea', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idea)
        })
            const data = await res.json()

            console.log(data)
            if(data){
                toast.success("Idea submitted successfully🎉")
            }


    }
    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{ backgroundColor: '#F7F5F0' }}
        >
            <form
                onSubmit={onSubmit}
                className="w-full max-w-2xl p-6 rounded-2xl shadow-lg space-y-4"
                style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #1A3C2E22',
                }}
            >

                <h2
                    className="text-3xl font-bold text-center mb-6"
                    style={{ color: '#1A3C2E' }}
                >
                    Submit Startup Idea
                </h2>

                {/* Idea Title */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Idea Title
                    </label>

                    <input
                        name="title"
                        type="text"
                        placeholder="Enter idea title"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Short Description
                    </label>

                    <input
                        name="shortDescription"
                        type="text"
                        placeholder="Short description"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    />
                </div>

                {/* Detailed Description */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Detailed Description
                    </label>

                    <textarea
                        name="detailedDescription"
                        rows="4"
                        placeholder="Describe your startup idea"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Category
                    </label>

                    <select
                        name="category"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    >
                        <option value="Tech">Tech</option>
                        <option value="Health">Health</option>
                        <option value="AI">AI</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>

                {/* Tags */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Tags (optional)
                    </label>

                    <input
                        name="tags"
                        type="text"
                        placeholder="e.g. SaaS, AI, Startup"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Image URL
                    </label>

                    <input
                        name="imageUrl"
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    />
                </div>

                {/* Estimated Budget */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Estimated Budget
                    </label>

                    <input
                        name="estimatedBudget"
                        type="text"
                        placeholder="$10,000"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    />
                </div>

                {/* Target Audience */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Target Audience
                    </label>

                    <input
                        name="targetAudience"
                        type="text"
                        placeholder="Students, Businesses, Parents"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    />
                </div>

                {/* Problem Statement */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Problem Statement
                    </label>

                    <textarea
                        name="problemStatement"
                        rows="3"
                        placeholder="What problem does your idea solve?"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    ></textarea>
                </div>

                {/* Proposed Solution */}
                <div>
                    <label
                        className="block mb-2 font-medium"
                        style={{ color: '#1A3C2E' }}
                    >
                        Proposed Solution
                    </label>

                    <textarea
                        name="proposedSolution"
                        rows="3"
                        placeholder="How does your idea solve the problem?"
                        className="w-full p-3 rounded-lg border"
                        style={{
                            borderColor: '#1A3C2E33',
                            backgroundColor: '#F7F5F0',
                            color: '#1A3C2E',
                        }}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold"
                    style={{
                        backgroundColor: '#E8A020',
                        color: '#F7F5F0',
                    }}
                >
                    Submit Idea
                </button>

            </form>
        </div>

    );
};

export default Form;