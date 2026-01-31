"use client";

import * as React from "react";
import {
  BookOpen,
  Bookmark,
  FileText,
  GraduationCap,
  Layers,
  NotebookPen,
  Plus,
  Search,
  Hash,
  Upload,
  CheckCircle2,
  XCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const mainSections = [
  { id: "subjects", name: "Subjects", icon: BookOpen },
  { id: "files", name: "Files", icon: FileText },
  { id: "flashcards", name: "Flashcards", icon: Layers },
  { id: "review", name: "Review", icon: Bookmark },
  { id: "notes", name: "Notes", icon: NotebookPen },
  { id: "exam", name: "Exam", icon: GraduationCap },
];

// Icon Sidebar Component (Far Left) - Notion style
function IconSidebar({ activeSection, onSectionChange }) {
  return (
    <div className="flex h-full w-[72px] flex-col items-center border-r border-gray-200 bg-gray-50 py-3 gap-1">
      {/* Workspace Icon */}
      <div className="mb-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
        DN
      </div>

      {/* Navigation Icons with labels (icon above, name below) */}
      {mainSections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-2 min-w-[56px] transition-all duration-150",
            activeSection === section.id
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          )}
        >
          <section.icon className="h-5 w-5 shrink-0" />
          <span className="text-[10px] font-medium leading-tight text-center max-w-full truncate">
            {section.name}
          </span>
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Avatar */}
      <div className="relative">
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-300">
          <span className="text-sm font-medium text-gray-700">U</span>
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gray-50 bg-green-500" />
      </div>
    </div>
  );
}

// Main Sidebar Component - Clean Notion-style
function MainSidebar({
  activeSection,
  subjects,
  selectedSubject,
  onSubjectSelect,
  selectedFile,
  onFileSelect,
  searchQuery,
  onSearchChange,
}) {
  const sectionConfig = mainSections.find((s) => s.id === activeSection);

  // Filter subjects based on search
  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.files.some((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="flex h-full w-[260px] flex-col border-r border-gray-200 bg-white">
      {/* Header - Simple like Slack */}
      <div className="border-b border-gray-100 px-4 py-3">
        <span className="text-sm font-semibold text-gray-900">
          {sectionConfig?.name || "Subjects"}
        </span>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 transition-colors focus-within:bg-gray-50 focus-within:ring-1 focus-within:ring-gray-300">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {/* Section based content */}
        {activeSection === "subjects" && (
          <SubjectsContent
            subjects={filteredSubjects}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        )}

        {activeSection === "files" && (
          <FilesContent />
        )}

        {activeSection === "flashcards" && (
          <FlashcardsContent />
        )}

        {activeSection === "review" && (
          <ReviewContent />
        )}

        {activeSection === "notes" && (
          <NotesContent />
        )}

        {activeSection === "exam" && (
          <ExamContent />
        )}
      </div>
    </div>
  );
}

// Subjects Content - Only file/topic rows (hashtag style), no subject headers
function SubjectsContent({ subjects, selectedFile, onFileSelect }) {
  return (
    <div className="space-y-1">
      {subjects.map((subject) => (
        <div key={subject.name} className="space-y-0.5">
          {subject.files.map((file) => (
            <button
              key={file.name}
              onClick={() => onFileSelect({ ...file, subject: subject.name, color: subject.color })}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-all",
                selectedFile?.name === file.name && selectedFile?.subject === subject.name
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Hash className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
              <span className="flex-1 truncate">{file.name}</span>
              <span className="text-xs text-gray-400">{file.questions}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

// Files Section Content
function FilesContent() {
  const recentFiles = [
    { name: "Cell Biology Notes", uploadedBy: "john", date: "Today" },
    { name: "Organic Chem Formulas", uploadedBy: "sarah", date: "Yesterday" },
    { name: "Physics Problems", uploadedBy: "mike", date: "2 days ago" },
    { name: "Math Theorems", uploadedBy: "emma", date: "3 days ago" },
  ];

  return (
    <div className="space-y-2">
      {/* Upload button at top - fixed position */}
      <button className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
        <Upload className="h-4 w-4" />
        Upload File
      </button>

      <div className="pt-2">
        <span className="px-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Recent</span>
      </div>

      {recentFiles.map((file, i) => (
        <button key={i} className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-gray-50 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
            <FileText className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 truncate">{file.name}</p>
            <p className="text-xs text-gray-400">@{file.uploadedBy} · {file.date}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// Flashcards Section Content - Simple like subjects
function FlashcardsContent() {
  const decks = [
    { name: "Biology Basics", cards: 45 },
    { name: "Chemistry Reactions", cards: 60 },
    { name: "Physics Formulas", cards: 38 },
    { name: "Math Theorems", cards: 52 },
  ];

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Layers className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Decks</span>
        <span className="ml-auto text-xs text-gray-400">{decks.length}</span>
      </div>

      {decks.map((deck, i) => (
        <button key={i} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-gray-50 transition-colors">
          <Hash className="h-3.5 w-3.5 text-gray-400" />
          <span className="flex-1 text-sm text-gray-700">{deck.name}</span>
          <span className="text-xs text-gray-400">{deck.cards}</span>
        </button>
      ))}
    </div>
  );
}

// Review Section Content (formerly Bookmarks/Marks) - hashtag list like Decks
function ReviewContent() {
  const filters = [
    { id: "all", name: "All", count: 12 },
    { id: "correct", name: "Correct", count: 8 },
    { id: "incorrect", name: "Incorrect", count: 3 },
    { id: "bookmarks", name: "Bookmarks", count: 4 },
  ];

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 px-2 py-1.5">
        <CheckCircle2 className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Review</span>
        <span className="ml-auto text-xs text-gray-400">{filters.length}</span>
      </div>

      {filters.map((filter) => (
        <button key={filter.id} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-gray-50 transition-colors">
          <Hash className="h-3.5 w-3.5 text-gray-400" />
          <span className="flex-1 text-sm text-gray-700">{filter.name}</span>
          <span className="text-xs text-gray-400">{filter.count}</span>
        </button>
      ))}
    </div>
  );
}

// Notes Section Content - With hashtag subjects
function NotesContent() {
  const notes = [
    { title: "Mitosis vs Meiosis", subjects: ["Biology", "CellBio"], date: "Today" },
    { title: "Organic Reactions", subjects: ["Chemistry"], date: "Yesterday" },
    { title: "Newton's Laws", subjects: ["Physics", "Mechanics"], date: "2 days ago" },
  ];

  return (
    <div className="space-y-2">
      <button className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
        <Plus className="h-4 w-4" />
        New Note
      </button>

      <div className="pt-2">
        <span className="px-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Recent</span>
      </div>

      {notes.map((note, i) => (
        <button key={i} className="flex w-full items-start gap-3 rounded-md px-2 py-2 text-left hover:bg-gray-50 transition-colors">
          <NotebookPen className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{note.title}</p>
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
              {note.subjects.map((subject, j) => (
                <span key={j} className="text-xs text-gray-400">#{subject}</span>
              ))}
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">{note.date}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// Exam Section Content
function ExamContent() {
  const exams = [
    { name: "Biology Midterm", questions: 50, duration: "60 min", status: "Ready" },
    { name: "Chemistry Quiz", questions: 25, duration: "30 min", status: "In Progress" },
    { name: "Physics Final", questions: 80, duration: "120 min", status: "Scheduled" },
  ];

  return (
    <div className="space-y-2">
      {/* Action buttons */}
      <button className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800 transition-colors">
        <Plus className="h-4 w-4" />
        Create Exam
      </button>

      <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        <BarChart3 className="h-4 w-4" />
        Score Predictor
      </button>

      <div className="pt-2">
        <span className="px-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Practice Exams</span>
      </div>

      {exams.map((exam, i) => (
        <button key={i} className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-gray-50 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
            <GraduationCap className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{exam.name}</p>
            <p className="text-xs text-gray-400">{exam.questions} questions · {exam.duration}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// Main Export Component
export function AppSidebar({
  onFileSelect,
  selectedFile,
  sidebarOpen = true,
  activeSection: controlledSection,
  onSectionChange,
  ...props
}) {
  const [internalSection, setInternalSection] = React.useState("subjects");
  const activeSection = controlledSection ?? internalSection;
  const setActiveSection = onSectionChange ?? setInternalSection;
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleFileSelect = (file) => {
    onFileSelect?.(file);
  };

  return (
    <div className="flex h-screen" {...props}>
      <IconSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div
        className="overflow-hidden transition-[width] duration-500 ease-in-out"
        style={{ width: sidebarOpen ? 260 : 0 }}
      >
        <MainSidebar
          activeSection={activeSection}
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectSelect={setSelectedSubject}
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
    </div>
  );
}
