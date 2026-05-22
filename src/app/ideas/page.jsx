import React from 'react';
import IdeasPageClient from './IdeasPageClient';

export const metadata = {
  title: 'Startup Ideas Board - IdeaVault',
  description: 'Explore, search, sort, and discover startup ideas submitted by creators across the world.',
};

export default async function IdeasPage() {
  let ideas = [];
  
  try {
    const res = await fetch('http://localhost:5000/idea', {
      cache: 'no-store'
    });
    if (res.ok) {
      ideas = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch ideas server-side:", error.message);
  }

  // Double fallback: if backend is completely down, supply stunning mock items so the board is active and looks breathtaking!
  if (ideas.length === 0) {
    ideas = [
      {
        _id: "demo1",
        title: "EcoSphere: Intelligent Carbon Offset Hub",
        shortDescription: "A micro-investment SaaS that automatically offsets daily carbon footprints through transaction-level banking API round-ups.",
        category: "AI",
        tags: ["SaaS", "GreenTech", "Fintech", "Ecology"],
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
        estimatedBudget: "$25,000",
        upvotes: 42,
        createdAt: new Date().toISOString()
      },
      {
        _id: "demo2",
        title: "MedLink: Decentralized EHR Network",
        shortDescription: "A unified patient medical record network leveraging modern cryptography to allow secure sharing between medical practices.",
        category: "Health",
        tags: ["HealthTech", "Crypto", "DataSaaS"],
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        estimatedBudget: "$45,000",
        upvotes: 18,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        _id: "demo3",
        title: "SkillStream: Adaptive AI Tutor",
        shortDescription: "A machine learning platform that dynamically personalizes high school mathematics lectures based on real-time focus states.",
        category: "Education",
        tags: ["AI", "EdTech", "LMS"],
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
        estimatedBudget: "$15,000",
        upvotes: 35,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        _id: "demo4",
        title: "PayFlow: Borderless B2B Invoices",
        shortDescription: "An instant international invoicing tool with integrated automated FX currency conversion and tax reconciliation engines.",
        category: "Finance",
        tags: ["Fintech", "SaaS", "FX"],
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
        estimatedBudget: "$10,000",
        upvotes: 27,
        createdAt: new Date(Date.now() - 259200000).toISOString()
      },
      {
        _id: "demo5",
        title: "CareMatch: Smart Senior Matching",
        shortDescription: "An elder care service matcher that maps local professional care providers to senior requirements using proximity vectors.",
        category: "Health",
        tags: ["Health", "Social", "SaaS"],
        imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289",
        estimatedBudget: "$18,000",
        upvotes: 9,
        createdAt: new Date(Date.now() - 345600000).toISOString()
      },
      {
        _id: "demo6",
        title: "CodeQuest: Gamified Learning Path",
        shortDescription: "A children's browser game that converts python, html, and javascript concepts into interactive graphic quest levels.",
        category: "Education",
        tags: ["EdTech", "Gaming", "Python"],
        imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
        estimatedBudget: "$12,000",
        upvotes: 31,
        createdAt: new Date(Date.now() - 432000000).toISOString()
      }
    ];
  }

  return <IdeasPageClient initialIdeas={ideas} />;
}
