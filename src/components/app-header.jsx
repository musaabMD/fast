"use client";

import * as React from "react";
import {
  Flame,
  Crown,
  Zap,
  Gem,
  Copy,
  Check,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const sectionNames = {
  subjects: "Subjects",
  files: "Files",
  flashcards: "Flashcards",
  review: "Review",
  notes: "Notes",
  exam: "Exam",
};

export function AppHeader({ userData, selectedFile, sidebarOpen, onSidebarToggle, activeSection = "subjects" }) {
  const [copied, setCopied] = React.useState(false);

  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://drnote.app/ref/" + userData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usagePercentage = (userData.questionsUsed / userData.dailyLimit) * 100;

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 px-4 bg-white">
      {/* Left side - Sidebar toggle + Topic info */}
      <div className="flex items-center gap-3">
        {typeof onSidebarToggle === "function" && (
          <button
            type="button"
            onClick={onSidebarToggle}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </button>
        )}
        {selectedFile && activeSection === "subjects" ? (
          <div className="flex items-center gap-3">
            <div className={cn("h-7 w-7 rounded-md flex items-center justify-center", selectedFile.color || "bg-gray-500")}>
              <span className="text-white text-xs font-bold">{selectedFile.subject?.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">{selectedFile.name}</h1>
              <p className="text-xs text-gray-500">{selectedFile.subject} · {selectedFile.questions} questions</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gray-900 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">{sectionNames[activeSection] ?? "DrNote"}</span>
          </div>
        )}
      </div>

      {/* Right side - Stats */}
      <div className="flex items-center gap-1">
        {/* Streak - Fire icon */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
              <span className="text-sm font-semibold text-gray-700">{userData.streak}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 overflow-hidden" align="end">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 text-white">
              <div className="flex items-center gap-2">
                <Flame className="h-8 w-8 fill-white" />
                <div>
                  <p className="text-lg font-bold">{userData.streak} day streak</p>
                  <p className="text-orange-100 text-xs">Keep it going!</p>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-3">
              <div className="grid grid-cols-7 gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                  <div key={i} className="text-center">
                    <span className="text-[10px] text-gray-400">{day}</span>
                    <div className={cn(
                      "mt-1 h-6 w-6 mx-auto rounded-full flex items-center justify-center",
                      i < (userData.streak % 7)
                        ? "bg-orange-500"
                        : i === (userData.streak % 7)
                        ? "border border-dashed border-orange-300"
                        : "bg-gray-100"
                    )}>
                      {i < (userData.streak % 7) && (
                        <Flame className="h-3 w-3 text-white fill-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t">
                <span className="text-gray-500">Longest streak</span>
                <span className="font-semibold text-orange-500">{userData.longestStreak} days</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Energy/Questions - Lightning bolt */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-gray-700">{userData.questionsUsed}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 overflow-hidden" align="end">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 text-white">
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8 fill-white" />
                <div>
                  <p className="text-lg font-bold">Daily Energy</p>
                  <p className="text-amber-100 text-xs">Keep practicing!</p>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Questions today</span>
                  <span className="font-semibold">{userData.questionsUsed} / {userData.dailyLimit}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {userData.dailyLimit - userData.questionsUsed} remaining
                </p>
              </div>
              <button className="w-full py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                <Crown className="h-4 w-4" />
                Get Unlimited
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Rank */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <img
                src="https://img.icons8.com/color/48/sergeant-sgt.png"
                alt="Rank"
                className="h-5 w-5 object-contain"
              />
              <span className="text-sm font-semibold text-gray-700">{userData.rank}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 overflow-hidden" align="end">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white">
              <div className="flex items-center gap-2">
                <img
                  src="https://img.icons8.com/color/48/sergeant-sgt.png"
                  alt="Rank"
                  className="h-8 w-8 object-contain"
                />
                <div>
                  <p className="text-lg font-bold">Rank {userData.rank}</p>
                  <p className="text-blue-100 text-xs">Keep climbing!</p>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-green-600">{userData.accuracy}%</p>
                  <p className="text-[10px] text-green-600">Accuracy</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-blue-600">{userData.score}%</p>
                  <p className="text-[10px] text-blue-600">Score</p>
                </div>
              </div>
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Total answered</span>
                  <span className="font-medium">{userData.totalAnswered}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Correct answers</span>
                  <span className="font-medium text-green-600">{userData.correctAnswers}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Avg time/question</span>
                  <span className="font-medium">{userData.avgTime}s</span>
                </div>
              </div>
              <button className="w-full py-2 rounded-md border border-blue-500 text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors">
                View Leaderboard
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Share */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-md border border-black bg-white text-black hover:bg-gray-50 transition-colors">
              <span className="text-sm font-semibold">Share</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 overflow-hidden" align="end">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-3 text-white">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Gem className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold">Invite Friends</p>
                  <p className="text-gray-300 text-xs">Get 1 day free each</p>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-3">
              <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Bonus days earned</p>
                  <p className="text-xl font-bold text-gray-900">{userData.referralDays} days</p>
                </div>
                <div className="h-10 w-10 bg-gray-900 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Your invite link</label>
                <div className="flex gap-1">
                  <div className="flex-1 bg-gray-100 rounded-md px-2 py-1.5 text-xs text-gray-600 truncate">
                    drnote.app/ref/{userData.referralCode}
                  </div>
                  <button
                    onClick={copyReferralLink}
                    className={cn(
                      "px-3 rounded-md text-sm font-medium transition-all",
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    )}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 rounded-md bg-[#1DA1F2] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                  Twitter
                </button>
                <button className="py-2 rounded-md bg-[#25D366] text-white text-xs font-medium hover:opacity-90 transition-opacity">
                  WhatsApp
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Premium button */}
        <button className="ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
          <Crown className="h-4 w-4" />
          <span className="hidden sm:inline">Premium</span>
        </button>
      </div>
    </header>
  );
}
