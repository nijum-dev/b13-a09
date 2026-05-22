"use client"

import { useAuth } from '@/providers/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Form = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            toast.info("Please log in to submit a startup idea! 🔐");
            router.push('/login?redirect=/idea-form');
        }
    }, [user, loading, router]);

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error("You must be logged in to submit ideas.");
            return;
        }

        const formData = new FormData(e.currentTarget)
        const idea = Object.fromEntries(formData.entries())

        // Attach actual logged-in user email and metadata
        idea.creatorEmail = user.email;
        idea.creatorName = user.name;
        idea.creatorPhoto = user.photoUrl;
        idea.upvotes = 0
        idea.comments = []

        console.log(idea)

        try {
            const res = await fetch('http://localhost:5000/idea', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(idea)
            })
            const data = await res.json()

            console.log(data)
            if (data && data._id) {
                // Save to localStorage for tracking user created ideas
                const createdIdeas = JSON.parse(localStorage.getItem('my_created_ideas') || '[]');
                createdIdeas.push(data._id);
                localStorage.setItem('my_created_ideas', JSON.stringify(createdIdeas));

                toast.success("Idea submitted successfully! 🎉")
                e.target.reset(); // clear form
                router.push('/my-ideas'); // redirect to founders workspace
            } else {
                toast.error("Failed to submit idea")
            }
        } catch (error) {
            console.error("Submission error:", error);
            // Simulated local storage fallback
            const localCreatedId = `local-${Date.now()}`;
            const createdIdeas = JSON.parse(localStorage.getItem('my_created_ideas') || '[]');
            createdIdeas.push(localCreatedId);
            localStorage.setItem('my_created_ideas', JSON.stringify(createdIdeas));

            // Load saved mocks
            const savedMock = JSON.parse(localStorage.getItem('mock_my_ideas') || '[]');
            const localDoc = {
                _id: localCreatedId,
                ...idea,
                upvotes: 0,
                comments: []
            };
            localStorage.setItem('mock_my_ideas', JSON.stringify([localDoc, ...savedMock]));

            toast.success("Saved startup idea locally (Simulation mode)! 💡");
            e.target.reset();
            router.push('/my-ideas');
        }
    }

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F5F0] dark:bg-zinc-900 transition-colors">
                <span className="loading loading-spinner loading-lg text-[#1A3C2E] dark:text-[#E8A020]"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F5F0] dark:bg-zinc-900 transition-colors duration-300">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-2xl p-8 rounded-3xl shadow-lg space-y-6 bg-white dark:bg-zinc-800 border border-[#1A3C2E1A] dark:border-zinc-700 transition-colors"
            >
                <h2 className="text-3xl font-black text-center mb-6 text-[#1A3C2E] dark:text-[#E8A020]">
                    Submit Startup Idea
                </h2>

                {/* Idea Title */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Idea Title
                    </label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Enter idea title"
                        required
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Short Description
                    </label>
                    <input
                        name="shortDescription"
                        type="text"
                        placeholder="e.g. A micro-investment platform for carbon offsets"
                        required
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    />
                </div>

                {/* Detailed Description */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Detailed Description
                    </label>
                    <textarea
                        name="detailedDescription"
                        rows="4"
                        placeholder="Provide detailed information regarding features, technologies, workflow, and long-term vision."
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Category
                    </label>
                    <select
                        name="category"
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
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
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Tags (comma separated)
                    </label>
                    <input
                        name="tags"
                        type="text"
                        placeholder="e.g. SaaS, Fintech, Eco"
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Image URL
                    </label>
                    <input
                        name="imageUrl"
                        type="text"
                        placeholder="https://images.unsplash.com/... or blank for default"
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    />
                </div>

                {/* Estimated Budget */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Estimated Budget
                    </label>
                    <input
                        name="estimatedBudget"
                        type="text"
                        placeholder="e.g. $15,000"
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    />
                </div>

                {/* Target Audience */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Target Audience
                    </label>
                    <input
                        name="targetAudience"
                        type="text"
                        placeholder="e.g. Remote developers, local communities"
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    />
                </div>

                {/* Problem Statement */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Problem Statement
                    </label>
                    <textarea
                        name="problemStatement"
                        rows="3"
                        placeholder="Describe the exact pain point users face today..."
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    ></textarea>
                </div>

                {/* Proposed Solution */}
                <div>
                    <label className="block mb-2 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        Proposed Solution
                    </label>
                    <textarea
                        name="proposedSolution"
                        rows="3"
                        placeholder="Describe how your startup blueprint solves this problem uniquely..."
                        className="w-full p-3.5 rounded-xl border border-[#1A3C2E20] dark:border-zinc-600 bg-[#F7F5F0] dark:bg-zinc-700 text-[#1A3C2E] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8A020] transition"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold bg-[#E8A020] hover:bg-[#d69018] text-white dark:text-zinc-950 transition shadow-md active:scale-95 cursor-pointer"
                >
                    Submit Idea 🚀
                </button>

            </form>
        </div>
    );
};

export default Form;