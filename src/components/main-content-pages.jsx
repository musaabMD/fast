"use client";

import * as React from "react";
import {
  BookOpen,
  FileText,
  Layers,
  Bookmark,
  NotebookPen,
  Upload,
  Plus,
  Hash,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";

import { MCQContent } from "@/components/mcq-content";
import { cn } from "@/lib/utils";

// Mock data aligned with sidebar
const subjects = [
  {
    name: "Biology",
    icon: "🧬",
    color: "bg-emerald-500",
    files: [
      { name: "Cell Structure", questions: 45 },
      { name: "Genetics", questions: 38 },
      { name: "Evolution", questions: 52 },
    ],
  },
  {
    name: "Chemistry",
    icon: "⚗️",
    color: "bg-orange-500",
    files: [
      { name: "Organic Chemistry", questions: 67 },
      { name: "Inorganic Chemistry", questions: 43 },
      { name: "Physical Chemistry", questions: 55 },
    ],
  },
  {
    name: "Physics",
    icon: "⚛️",
    color: "bg-blue-500",
    files: [
      { name: "Mechanics", questions: 48 },
      { name: "Thermodynamics", questions: 35 },
      { name: "Electromagnetism", questions: 62 },
    ],
  },
  {
    name: "Mathematics",
    icon: "📐",
    color: "bg-amber-500",
    files: [
      { name: "Calculus", questions: 72 },
      { name: "Algebra", questions: 58 },
      { name: "Statistics", questions: 41 },
    ],
  },
];

const recentFiles = [
  { name: "Cell Biology Notes", uploadedBy: "john", date: "Today" },
  { name: "Organic Chem Formulas", uploadedBy: "sarah", date: "Yesterday" },
  { name: "Physics Problems", uploadedBy: "mike", date: "2 days ago" },
  { name: "Math Theorems", uploadedBy: "emma", date: "3 days ago" },
];

// Deck name -> synthetic file for MCQContent (reuses same question data as Subjects)
const flashcardDeckToFile = {
  "Biology Basics": { name: "Cell Structure", subject: "Biology", questions: 45 },
  "Chemistry Reactions": { name: "Organic Chemistry", subject: "Chemistry", questions: 60 },
  "Physics Formulas": { name: "Mechanics", subject: "Physics", questions: 38 },
  "Math Theorems": { name: "Calculus", subject: "Mathematics", questions: 52 },
};

const flashcardDecks = [
  { name: "Biology Basics", cards: 45 },
  { name: "Chemistry Reactions", cards: 60 },
  { name: "Physics Formulas", cards: 38 },
  { name: "Math Theorems", cards: 52 },
];

const reviewFilters = [
  { id: "all", name: "All", count: 12, icon: Bookmark },
  { id: "correct", name: "Correct", count: 8, icon: CheckCircle2 },
  { id: "incorrect", name: "Incorrect", count: 3, icon: XCircle },
  { id: "bookmarks", name: "Bookmarks", count: 4, icon: Star },
];

const notes = [
  { title: "Mitosis vs Meiosis", subjects: ["Biology", "CellBio"], date: "Today" },
  { title: "Organic Reactions", subjects: ["Chemistry"], date: "Yesterday" },
  { title: "Newton's Laws", subjects: ["Physics", "Mechanics"], date: "2 days ago" },
];

// Subjects page – overview + pick topic (or MCQ when file selected)
function SubjectsPageContent({ selectedFile, onFileSelect, onAnswerQuestion }) {
  if (selectedFile) {
    return (
      <MCQContent
        selectedFile={selectedFile}
        onAnswerQuestion={onAnswerQuestion}
        onBack={() => onFileSelect(null)}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
            <p className="text-sm text-gray-500">Pick a topic from the sidebar to practice MCQs</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {subjects.map((subject) => (
            <div key={subject.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{subject.icon}</span>
                <h2 className="font-semibold text-gray-900">{subject.name}</h2>
              </div>
              <ul className="space-y-1.5">
                {subject.files.map((file) => (
                  <li key={file.name}>
                    <button
                      onClick={() =>
                        onFileSelect({
                          ...file,
                          subject: subject.name,
                          color: subject.color,
                        })
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-2">
                        <Hash className="h-3.5 w-3.5 text-gray-400" />
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-400">{file.questions} questions</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Files page
function FilesPageContent() {
  return (
    <div className="h-full overflow-y-auto p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Files</h1>
            <p className="text-sm text-gray-500">Upload and manage your study files</p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center mb-8">
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 mb-1">Upload a file</p>
          <p className="text-xs text-gray-500 mb-4">PDF, DOC, or images</p>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:border-gray-400 transition-colors">
            <Upload className="h-4 w-4" />
            Choose file
          </button>
        </div>

        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Recent</h2>
        <ul className="space-y-2">
          {recentFiles.map((file, i) => (
            <li
              key={i}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">@{file.uploadedBy} · {file.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Flashcards page – deck list or full-screen flashcard when a deck is selected
function FlashcardsPageContent({ selectedFlashcardDeck, onDeckSelect, onBack, onAnswerQuestion }) {
  const selectedFile = selectedFlashcardDeck ? flashcardDeckToFile[selectedFlashcardDeck.name] : null;

  if (selectedFile) {
    return (
      <MCQContent
        selectedFile={selectedFile}
        onAnswerQuestion={onAnswerQuestion}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <Layers className="h-6 w-6 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flashcards</h1>
            <p className="text-sm text-gray-500">Study with decks — pick one to start</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {flashcardDecks.map((deck, i) => (
            <button
              key={i}
              onClick={() => onDeckSelect(deck)}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-violet-200 hover:bg-violet-50/30 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                <Layers className="h-6 w-6 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{deck.name}</p>
                <p className="text-sm text-gray-500">{deck.cards} cards</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-violet-200 bg-violet-50/50 p-6 text-center">
          <p className="text-sm font-medium text-gray-800 mb-2">Select a deck above to study full-screen. Press <kbd className="px-1 py-0.5 rounded bg-violet-100 text-violet-700 font-mono text-xs">Space</kbd> to show answer, <kbd className="px-1 py-0.5 rounded bg-gray-200 font-mono text-xs">X</kbd> to go back.</p>
        </div>
      </div>
    </div>
  );
}

// Review page
function ReviewPageContent() {
  const [activeFilter, setActiveFilter] = React.useState("all");

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Bookmark className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Review</h1>
            <p className="text-sm text-gray-500">Filter by correct, incorrect, or bookmarks</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {reviewFilters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  activeFilter === filter.id
                    ? "bg-amber-100 text-amber-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <Icon className="h-4 w-4" />
                {filter.name}
                <span className="text-xs opacity-80">({filter.count})</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500 text-center">
            Showing <strong>{reviewFilters.find((f) => f.id === activeFilter)?.name}</strong> items. Review view coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

// Notes page
function NotesPageContent() {
  return (
    <div className="h-full overflow-y-auto p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center">
            <NotebookPen className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
            <p className="text-sm text-gray-500">Your recent notes</p>
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 text-gray-600 hover:border-teal-300 hover:bg-teal-50/30 hover:text-teal-700 transition-colors mb-8">
          <Plus className="h-5 w-5" />
          New note
        </button>

        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Recent</h2>
        <ul className="space-y-2">
          {notes.map((note, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-teal-200 transition-colors cursor-pointer"
            >
              <NotebookPen className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{note.title}</p>
                <div className="flex items-center gap-1 mt-1 flex-wrap">
                  {note.subjects.map((subject, j) => (
                    <span key={j} className="text-xs text-gray-500">#{subject}</span>
                  ))}
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-500">{note.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Main switcher – renders the right page by activeSection
export function MainContentPages({
  activeSection,
  selectedFile,
  onFileSelect,
  onAnswerQuestion,
  selectedFlashcardDeck,
  onFlashcardDeckSelect,
}) {
  switch (activeSection) {
    case "subjects":
      return (
        <SubjectsPageContent
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          onAnswerQuestion={onAnswerQuestion}
        />
      );
    case "files":
      return <FilesPageContent />;
    case "flashcards":
      return (
        <FlashcardsPageContent
          selectedFlashcardDeck={selectedFlashcardDeck}
          onDeckSelect={onFlashcardDeckSelect}
          onBack={() => onFlashcardDeckSelect(null)}
          onAnswerQuestion={onAnswerQuestion}
        />
      );
    case "review":
      return <ReviewPageContent />;
    case "notes":
      return <NotesPageContent />;
    case "exam":
      return (
        <div className="h-full flex items-center justify-center p-6">
          <p className="text-gray-500">Exam section — main content can be added here.</p>
        </div>
      );
    default:
      return (
        <SubjectsPageContent
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          onAnswerQuestion={onAnswerQuestion}
        />
      );
  }
}
