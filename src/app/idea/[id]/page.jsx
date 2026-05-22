import React from 'react';
import InteractiveDetails from './InteractiveDetails';

export const metadata = {
  title: 'Idea Details - IdeaVault',
  description: 'View full details, collaborate with the founder, and give feedback on startup ideas.',
};

export default async function IdeaDetailsPage({ params }) {
  // Await params as required by Next.js 15/16 dynamic route guidelines
  const { id } = await params;

  let idea = null;
  let isMock = false;

  // Try direct fetch
  try {
    const res = await fetch(`http://localhost:5000/idea/${id}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      idea = await res.json();
    }
  } catch (error) {
    console.warn(`Direct fetch to http://localhost:5000/idea/${id} failed, trying fallback:`, error.message);
  }

  // Fallback: Fetch all ideas and filter in-memory (highly robust)
  if (!idea) {
    try {
      const res = await fetch('http://localhost:5000/idea', {
        cache: 'no-store'
      });
      if (res.ok) {
        const ideas = await res.json();
        idea = ideas.find(i => i._id === id);
      }
    } catch (error) {
      console.warn("Fallback fetch also failed:", error.message);
    }
  }

  // Double fallback: If server is down, show a gorgeous demo mock to keep it completely functional & look spectacular
  if (!idea) {
    isMock = true;
    idea = {
      _id: id,
      title: "EcoSphere: Intelligent Carbon Offset Hub",
      shortDescription: "A micro-investment SaaS that automatically offsets daily carbon footprints through transaction-level banking API round-ups.",
      detailedDescription: "EcoSphere is a game-changing carbon offsetting solution tailored for the modern conscious consumer. By integrating directly with banking and credit card APIs via Plaid, EcoSphere calculates the exact carbon footprint of every purchase you make—whether it's buying a cup of coffee, fueling your car, or booking a flight.\n\nOnce the carbon impact is computed, the platform automatically rounds up the purchase or applies a micro-offset fee to purchase verified high-quality carbon credits. Users can track their portfolio of environmental investments, see direct reports on the specific reforestation or clean-energy projects their money is funding, and gain badges and social shareable highlights.\n\nOur platform makes environmental responsibility completely frictionless, engaging, and transparent.",
      category: "AI",
      tags: ["SaaS", "GreenTech", "Fintech", "Ecology"],
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      estimatedBudget: "$25,000",
      targetAudience: "Gen Z & Millennial banking customers, Environmentally conscious shoppers",
      problemStatement: "Most people want to reduce their carbon footprint, but the process is highly manual, confusing, and lacks transparency. Consumers don't know how much carbon they emit daily, nor which offset programs actually make a verifiable impact.",
      proposedSolution: "An automated Plaid-integrated app that calculates carbon footprints in the background of daily expenses and rounds up transactions to fund certified, high-fidelity green projects with real-time updates.",
      upvotes: 42,
      comments: [
        {
          username: "Sarah Jenkins",
          text: "This is a brilliant concept! Connecting this to micro-transactions makes carbon offsetting incredibly practical. I'd sign up immediately.",
          createdAt: "2026-05-20T12:00:00Z"
        },
        {
          username: "David Chen",
          text: "How do you verify the quality of the carbon credits? There are many low-quality forestry programs out there. Direct partnership with Gold Standard would be key here.",
          createdAt: "2026-05-21T08:30:00Z"
        }
      ]
    };
  }

  return (
    <>
      {isMock && (
        <div className="bg-amber-500 text-white text-center py-2 text-xs font-bold font-mono tracking-wide flex justify-center items-center gap-2">
          ⚡ DEMO MODE: Local backend server offline or endpoint not yet loaded. Showing a gorgeous preview.
        </div>
      )}
      <InteractiveDetails idea={idea} />
    </>
  );
}
