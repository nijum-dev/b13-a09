import React from 'react';
import MyIdeasClient from './MyIdeasClient';

export const metadata = {
  title: "My Blueprints - IdeaVault Workspace",
  description: "View, update, or remove your submitted startup blueprints.",
};

export default function MyIdeasPage() {
  return <MyIdeasClient />;
}
