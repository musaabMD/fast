"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { MainContentPages } from "@/components/main-content-pages";

const initialUserData = {
  streak: 7,
  longestStreak: 14,
  questionsUsed: 12,
  dailyLimit: 40,
  rank: 156,
  score: 78,
  accuracy: 82,
  totalAnswered: 423,
  correctAnswers: 347,
  avgTime: 45,
  referralCode: "DRNOTE24",
  referralDays: 3,
};

export default function TestPrepPage() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFlashcardDeck, setSelectedFlashcardDeck] = React.useState(null);
  const [userData, setUserData] = React.useState(initialUserData);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("subjects");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleAnswerQuestion = (isCorrect) => {
    setUserData((prev) => ({
      ...prev,
      questionsUsed: Math.min(prev.questionsUsed + 1, prev.dailyLimit),
      totalAnswered: prev.totalAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      accuracy: Math.round(
        ((prev.correctAnswers + (isCorrect ? 1 : 0)) / (prev.totalAnswered + 1)) * 100
      ),
    }));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        sidebarOpen={sidebarOpen}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader
          userData={userData}
          selectedFile={selectedFile}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen((o) => !o)}
          activeSection={activeSection}
        />
        <main className="flex-1 overflow-hidden">
          <MainContentPages
            activeSection={activeSection}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            onAnswerQuestion={handleAnswerQuestion}
            selectedFlashcardDeck={selectedFlashcardDeck}
            onFlashcardDeckSelect={setSelectedFlashcardDeck}
          />
        </main>
      </div>
    </div>
  );
}
