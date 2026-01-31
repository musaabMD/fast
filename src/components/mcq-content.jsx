"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Flag,
  CheckCircle2,
  XCircle,
  BookOpen,
  Sparkles,
  Send,
  MessageCircle,
  X,
  GripVertical,
  Plus,
  Mic,
  Type,
} from "lucide-react";

import { cn } from "@/lib/utils";

const sampleQuestions = {
  "Cell Structure_Biology": [
    {
      id: 1,
      question: "Which organelle is responsible for producing ATP in eukaryotic cells?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      correct: 1,
      explanation: "Mitochondria are known as the 'powerhouse of the cell' because they produce ATP through cellular respiration.",
    },
    {
      id: 2,
      question: "What is the primary function of the rough endoplasmic reticulum?",
      options: ["Lipid synthesis", "Protein synthesis", "DNA replication", "Cell division"],
      correct: 1,
      explanation: "The rough ER is studded with ribosomes that synthesize proteins destined for secretion or membrane insertion.",
    },
    {
      id: 3,
      question: "Which structure controls what enters and leaves the cell?",
      options: ["Cell wall", "Cytoplasm", "Plasma membrane", "Nucleus"],
      correct: 2,
      explanation: "The plasma membrane is selectively permeable and regulates the passage of substances in and out of the cell.",
    },
    {
      id: 4,
      question: "What is the function of lysosomes?",
      options: ["Energy production", "Protein synthesis", "Cellular digestion", "DNA storage"],
      correct: 2,
      explanation: "Lysosomes contain digestive enzymes that break down waste materials and cellular debris.",
    },
    {
      id: 5,
      question: "Which organelle is responsible for photosynthesis in plant cells?",
      options: ["Mitochondria", "Chloroplast", "Vacuole", "Nucleus"],
      correct: 1,
      explanation: "Chloroplasts contain chlorophyll and are the sites of photosynthesis in plant cells.",
    },
    {
      id: 6,
      question: "What is the main component of the cell wall in plants?",
      options: ["Protein", "Lipid", "Cellulose", "Starch"],
      correct: 2,
      explanation: "Cellulose is a polysaccharide that provides structural support to plant cell walls.",
    },
    {
      id: 7,
      question: "Which organelle is responsible for modifying and packaging proteins?",
      options: ["Ribosome", "Golgi apparatus", "Lysosome", "Vacuole"],
      correct: 1,
      explanation: "The Golgi apparatus modifies, sorts, and packages proteins for secretion or use within the cell.",
    },
    {
      id: 8,
      question: "What is the function of the nucleolus?",
      options: ["DNA replication", "Ribosome production", "Protein synthesis", "Cell division"],
      correct: 1,
      explanation: "The nucleolus is responsible for producing ribosomal RNA and assembling ribosomes.",
    },
    {
      id: 9,
      question: "Which structure provides structural support to animal cells?",
      options: ["Cell wall", "Cytoskeleton", "Vacuole", "Chloroplast"],
      correct: 1,
      explanation: "The cytoskeleton is a network of protein filaments that provides structural support and enables cell movement.",
    },
    {
      id: 10,
      question: "What is the role of the central vacuole in plant cells?",
      options: ["Energy production", "Storage and maintaining turgor pressure", "Protein synthesis", "DNA storage"],
      correct: 1,
      explanation: "The central vacuole stores water, nutrients, and waste products, and helps maintain cell turgor pressure.",
    },
  ],
  "Genetics_Biology": [
    {
      id: 1,
      question: "What is the complementary base pair for Adenine in DNA?",
      options: ["Guanine", "Cytosine", "Thymine", "Uracil"],
      correct: 2,
      explanation: "In DNA, Adenine always pairs with Thymine through two hydrogen bonds.",
    },
    {
      id: 2,
      question: "Which type of RNA carries amino acids to the ribosome?",
      options: ["mRNA", "tRNA", "rRNA", "snRNA"],
      correct: 1,
      explanation: "Transfer RNA (tRNA) transports specific amino acids to the ribosome during protein synthesis.",
    },
  ],
  "Organic Chemistry_Chemistry": [
    {
      id: 1,
      question: "What functional group is present in alcohols?",
      options: ["Carbonyl", "Hydroxyl", "Carboxyl", "Amino"],
      correct: 1,
      explanation: "Alcohols contain a hydroxyl (-OH) group bonded to a carbon atom.",
    },
    {
      id: 2,
      question: "Which type of isomers have the same molecular formula but different structural arrangements?",
      options: ["Optical isomers", "Geometric isomers", "Structural isomers", "Conformational isomers"],
      correct: 2,
      explanation: "Structural isomers differ in the connectivity of atoms while having the same molecular formula.",
    },
  ],
};

const defaultQuestions = [
  {
    id: 1,
    question: "Select a topic from the sidebar to start practicing!",
    options: ["Biology", "Chemistry", "Physics", "Mathematics"],
    correct: 0,
    explanation: "Choose any subject and topic to begin your study session.",
  },
];

const QUESTIONS_PER_PAGE = 10;

const PANEL_WIDTH_MIN = 256;
const PANEL_WIDTH_MAX = 560;
const PANEL_WIDTH_DEFAULT = 384;

const DUMMY_EXPLANATION = {
  question: "Which organelle is responsible for producing ATP in eukaryotic cells?",
  options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
  correct: 1,
  explanation: "Mitochondria are known as the 'powerhouse of the cell' because they produce ATP through cellular respiration. This is a sample explanation for testing the panel layout and sources.",
  sources: [
    { title: "Biology Textbook", ref: "Ch. 3, p. 42", url: "https://example.com/textbook" },
    { title: "Khan Academy - Cell Biology", ref: "Cellular respiration", url: "https://www.khanacademy.org/science/biology/cellular-respiration" },
    { title: "NCBI", ref: "Mitochondrial function overview", url: "https://www.ncbi.nlm.nih.gov" },
  ],
};

const PROGRESS_FILTERS = [
  { id: "all", label: "All" },
  { id: "done", label: "Done" },
  { id: "not_done", label: "Not done" },
];

// Full-screen flashcard: one card at a time, Space reveals answer, no click
function FullScreenFlashcard({
  questions,
  currentIndex,
  onNext,
  onPrev,
  onBack,
  correctCount = 0,
  incorrectCount = 0,
  skippedCount = 0,
}) {
  const [answerVisible, setAnswerVisible] = React.useState(false);
  const question = questions[currentIndex];
  const total = questions.length;

  React.useEffect(() => {
    setAnswerVisible(false);
  }, [currentIndex]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        setAnswerVisible((v) => !v);
        return;
      }
      if (e.code === "Escape") {
        e.preventDefault();
        onBack?.();
        return;
      }
      if (answerVisible) {
        if (e.code === "ArrowRight") {
          e.preventDefault();
          onNext?.();
        } else if (e.code === "ArrowLeft") {
          e.preventDefault();
          onPrev?.();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answerVisible, onNext, onPrev, onBack]);

  if (!question) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Minimal top bar: X back, nav, progress counts */}
      <div className="flex shrink-0 items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Go back"
              title="Go back"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-gray-600 tabular-nums">
            {currentIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={currentIndex >= total - 1}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-sm tabular-nums">
          <span className="text-blue-600 font-medium">{correctCount}</span>
          <span className="text-gray-300">+</span>
          <span className="text-red-500 font-medium">{incorrectCount}</span>
          <span className="text-gray-300">+</span>
          <span className="text-green-600 font-medium">{skippedCount}</span>
        </div>
      </div>

      {/* Full-screen card content — centered, same style for question and answer */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-3xl mx-auto w-full"
        onClick={() => setAnswerVisible((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.code === "Space") e.preventDefault();
        }}
        aria-label={answerVisible ? "Click or press Space to hide answer" : "Click or press Space to show answer"}
      >
        <p className="text-xl md:text-2xl font-bold text-gray-900 text-center leading-snug mb-6">
          {question.question}
        </p>

        <div className="w-full space-y-3">
          {question.options.map((opt, i) => {
            const isCorrect = i === question.correct;
            const showAsCorrect = answerVisible && isCorrect;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-lg border-2 px-4 py-3 text-left text-base font-medium transition-colors",
                  !answerVisible && "border-gray-200 text-gray-900 bg-gray-50/50",
                  showAsCorrect && "border-green-500 bg-green-50 text-green-800",
                  answerVisible && !showAsCorrect && "border-gray-200 text-gray-500 opacity-60"
                )}
              >
                <span className="mr-2 font-bold text-gray-500">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </div>
            );
          })}
        </div>

        {answerVisible && (
          <div className="mt-8 w-full rounded-xl border border-gray-200 bg-gray-50/80 p-4 text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Explanation
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {!answerVisible && (
          <p className="mt-6 text-sm text-gray-400 text-center">
            Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 font-mono text-xs">Space</kbd> to show answer
          </p>
        )}
      </div>
    </div>
  );
}

export function MCQContent({ selectedFile, onAnswerQuestion, onBack }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [progressFilter, setProgressFilter] = React.useState("all");
  const [answers, setAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState({});
  const [bookmarked, setBookmarked] = React.useState({});
  const [flagged, setFlagged] = React.useState({});
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const [followUpQuestion, setFollowUpQuestion] = React.useState("");
  const [sidebarVisible, setSidebarVisible] = React.useState(true);
  const [panelWidth, setPanelWidth] = React.useState(PANEL_WIDTH_DEFAULT);
  const [explanationPanelHighlight, setExplanationPanelHighlight] = React.useState(false);
  const [flashcardIndex, setFlashcardIndex] = React.useState(0);
  const [flashcardCorrect, setFlashcardCorrect] = React.useState(0);
  const [flashcardIncorrect, setFlashcardIncorrect] = React.useState(0);
  const [flashcardSkipped, setFlashcardSkipped] = React.useState(0);
  const startXRef = React.useRef(0);
  const startWidthRef = React.useRef(PANEL_WIDTH_DEFAULT);

  React.useEffect(() => {
    if (!explanationPanelHighlight) return;
    const t = setTimeout(() => setExplanationPanelHighlight(false), 1500);
    return () => clearTimeout(t);
  }, [explanationPanelHighlight]);

  const handleResizeStart = React.useCallback((e) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
    const onMove = (ev) => {
      const delta = startXRef.current - ev.clientX;
      const next = Math.min(PANEL_WIDTH_MAX, Math.max(PANEL_WIDTH_MIN, startWidthRef.current + delta));
      setPanelWidth(next);
    };
    const onUp = () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [panelWidth]);

  const fileKey = selectedFile ? `${selectedFile.name}_${selectedFile.subject}` : null;
  const allQuestions = fileKey && sampleQuestions[fileKey] ? sampleQuestions[fileKey] : defaultQuestions;

  const filteredQuestions = React.useMemo(() => {
    if (progressFilter === "all") return allQuestions;
    if (progressFilter === "done") return allQuestions.filter((q) => showResults[q.id]);
    return allQuestions.filter((q) => !showResults[q.id]);
  }, [allQuestions, progressFilter, showResults]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE));
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  React.useEffect(() => {
    setCurrentPage(0);
    setProgressFilter("all");
    setAnswers({});
    setShowResults({});
    setBookmarked({});
    setFlagged({});
    setSelectedQuestion(null);
    setFlashcardIndex(0);
    setFlashcardCorrect(0);
    setFlashcardIncorrect(0);
    setFlashcardSkipped(0);
  }, [selectedFile]);

  React.useEffect(() => {
    setCurrentPage(0);
  }, [progressFilter]);

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (showResults[questionId]) return;

    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));

    setTimeout(() => {
      setShowResults((prev) => ({ ...prev, [questionId]: true }));
      const question = allQuestions.find((q) => q.id === questionId);
      const isCorrect = optionIndex === question?.correct;
      onAnswerQuestion?.(isCorrect);
      setSelectedQuestion(questionId);
      setSidebarVisible(true);
    }, 200);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      setSelectedQuestion(null);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setSelectedQuestion(null);
    }
  };

  const toggleBookmark = (questionId) => {
    setBookmarked((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleFlag = (questionId) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const getSelectedQuestionData = () => {
    if (!selectedQuestion) return null;
    return allQuestions.find((q) => q.id === selectedQuestion);
  };

  const selectedQuestionData = getSelectedQuestionData();

  if (!selectedFile) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50">
        <div className="max-w-md">
          <div className="relative mb-6">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-gray-900 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to DrNote</h2>
          <p className="text-gray-500 mb-6">
            Select a subject and topic from the sidebar to start practicing.
            Track your progress and master your subjects.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>4 Subjects</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>500+ Questions</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full-screen flashcard: one card at a time, Space to show answer (no click)
  if (allQuestions.length > 0) {
    return (
      <FullScreenFlashcard
        questions={allQuestions}
        currentIndex={flashcardIndex}
        onNext={() => {
          if (flashcardIndex < allQuestions.length - 1) {
            setFlashcardIndex((i) => i + 1);
          }
        }}
        onPrev={() => {
          if (flashcardIndex > 0) {
            setFlashcardIndex((i) => i - 1);
          }
        }}
        onBack={selectedFile ? onBack : undefined}
        correctCount={flashcardCorrect}
        incorrectCount={flashcardIncorrect}
        skippedCount={flashcardSkipped}
      />
    );
  }

  return (
    <div className="flex h-full bg-gray-50">
      {/* Main Question Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Questions Grid */}
        <div className="flex-1 overflow-auto p-6 pb-10">
          <div className="max-w-4xl mx-auto space-y-4">
            {currentQuestions.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600 font-medium">
                  {progressFilter === "done"
                    ? "No answered questions yet. Answer some to see them here."
                    : progressFilter === "not_done"
                      ? "No unanswered questions. You’re all caught up!"
                      : "No questions in this set."}
                </p>
              </div>
            ) : null}
            {currentQuestions.map((question, index) => {
              const questionNumber = startIndex + index + 1;
              const isAnswered = showResults[question.id];
              const selectedAnswer = answers[question.id];
              const isCorrect = selectedAnswer === question.correct;

              return (
                <div
                  key={question.id}
                  className={cn(
                    "bg-white rounded-lg border p-4 transition-all",
                    selectedQuestion === question.id ? "border-gray-400 ring-1 ring-gray-200" : "border-gray-200"
                  )}
                  onClick={() => {
                    if (isAnswered) {
                      setSelectedQuestion(question.id);
                      setSidebarVisible(true);
                    }
                  }}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-700">Q{questionNumber}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(question.id); }}
                        className={cn(
                          "h-7 w-7 rounded flex items-center justify-center transition-colors",
                          bookmarked[question.id] ? "bg-amber-50 text-amber-500" : "hover:bg-gray-100 text-gray-400"
                        )}
                      >
                        <Bookmark className={cn("h-4 w-4", bookmarked[question.id] && "fill-current")} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFlag(question.id); }}
                        className={cn(
                          "h-7 w-7 rounded flex items-center justify-center transition-colors",
                          flagged[question.id] ? "bg-red-50 text-red-500" : "hover:bg-gray-100 text-gray-400"
                        )}
                      >
                        <Flag className={cn("h-4 w-4", flagged[question.id] && "fill-current")} />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <p className="text-base font-bold text-gray-900 mb-3">{question.question}</p>

                  {/* Options - one per line */}
                  <div className="flex flex-col gap-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswer === optionIndex;
                      const isCorrectOption = optionIndex === question.correct;
                      const showCorrect = isAnswered && isCorrectOption;
                      const showIncorrect = isAnswered && isSelected && !isCorrectOption;

                      return (
                        <button
                          key={optionIndex}
                          onClick={(e) => { e.stopPropagation(); handleAnswerSelect(question.id, optionIndex); }}
                          disabled={isAnswered}
                          className={cn(
                            "text-left p-2.5 rounded-md border text-base font-semibold transition-all w-full",
                            !isAnswered && "hover:border-gray-400 hover:bg-gray-50 cursor-pointer",
                            !isAnswered && isSelected && "border-gray-500 bg-gray-100",
                            !isAnswered && !isSelected && "border-gray-200",
                            showCorrect && "border-green-500 bg-green-50 text-green-700",
                            showIncorrect && "border-red-500 bg-red-50 text-red-700",
                            isAnswered && !showCorrect && !showIncorrect && "border-gray-200 opacity-50",
                            isAnswered && "cursor-default"
                          )}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "flex h-6 w-6 items-center justify-center rounded text-sm font-bold shrink-0",
                                !isAnswered && !isSelected && "bg-gray-100 text-gray-600",
                                !isAnswered && isSelected && "bg-gray-700 text-white",
                                showCorrect && "bg-green-500 text-white",
                                showIncorrect && "bg-red-500 text-white"
                              )}>
                                {showCorrect ? "✓" : showIncorrect ? "✗" : String.fromCharCode(65 + optionIndex)}
                              </span>
                              <span className="flex-1">{option}</span>
                            </div>
                            {showCorrect && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedQuestion(question.id);
                                  setSidebarVisible(true);
                                  setExplanationPanelHighlight(true);
                                }}
                                className="text-left text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline pl-8"
                              >
                                Show Explanation
                              </button>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination - fixed at bottom, visible when scrolling */}
        <div className="fixed bottom-2 left-0 right-0 flex justify-center pointer-events-none z-40">
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl px-4 py-2.5 shadow-md">
            {/* Progress filter: All / Done / Not done */}
            <div className="flex items-center gap-1">
              {PROGRESS_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setProgressFilter(f.id)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    progressFilter === f.id
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="h-4 w-px bg-gray-300" aria-hidden />
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={cn(
                  "flex items-center gap-0.5 px-2 py-1 rounded-md transition-colors",
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <span className="px-2 tabular-nums font-medium text-gray-800 min-w-[3rem] text-center">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={cn(
                  "flex items-center gap-0.5 px-2 py-1 rounded-md transition-colors",
                  currentPage >= totalPages - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show explanation - floating AI button at bottom-right when panel closed */}
      {!sidebarVisible && (
        <button
          onClick={() => setSidebarVisible(true)}
          className="fixed bottom-4 right-4 z-50 w-16 h-16 rounded-2xl rounded-br-xl border-2 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.08)] animate-border-subtle"
          aria-label="Show explanation panel"
          title="Show explanation"
        >
          <img
            src="https://img.icons8.com/3d-fluency/94/bard.png"
            alt="AI"
            className="h-9 w-9 object-contain"
          />
        </button>
      )}

      {/* AI Explanation Sidebar - when open; aligned to bottom so no white strip below */}
      {sidebarVisible && (
      <div
        className={cn(
          "shrink-0 self-end mb-4 mr-4 min-h-[360px] max-h-[calc(100vh-8rem)] rounded-xl rounded-br-2xl border-2 bg-white flex flex-col overflow-hidden relative transition-shadow duration-300",
          explanationPanelHighlight ? "border-blue-400 shadow-[0_0_0_3px_rgba(59,130,246,0.25)]" : "border-gray-200 shadow-none"
        )}
        style={{ width: panelWidth, minWidth: panelWidth }}
      >
        {/* Resize handle - drag left edge */}
        <div
          onMouseDown={handleResizeStart}
          className="absolute left-0 top-0 bottom-0 w-3 cursor-col-resize z-10 flex items-center justify-center rounded-l-xl hover:bg-gray-100 transition-colors border-r border-transparent hover:border-gray-200"
          title="Drag to resize"
          aria-label="Resize explanation panel"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex-1 flex flex-col min-w-0 pl-3">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-gray-500" />
            <span className="text-base font-semibold text-gray-900">Explanation</span>
          </div>
          <button
            onClick={() => setSidebarVisible(false)}
            className="h-7 w-7 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Hide explanation panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 min-h-0">
          {selectedQuestionData && showResults[selectedQuestionData.id] ? (
            <div className="space-y-4">
              {/* Question details */}
              <div className="pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Question</p>
                <p className="text-lg font-bold text-gray-900 leading-relaxed">
                  {selectedQuestionData.question}
                </p>
                <div className="mt-2 space-y-1.5">
                  {selectedQuestionData.options.map((opt, i) => (
                    <p
                      key={i}
                      className={cn(
                        "text-base",
                        i === selectedQuestionData.correct
                          ? "text-green-700 font-semibold"
                          : i === answers[selectedQuestionData.id] && i !== selectedQuestionData.correct
                            ? "text-red-600 font-medium"
                            : "text-gray-600"
                      )}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </p>
                  ))}
                </div>
              </div>

              {/* Result indicator */}
              <div className={cn(
                "flex items-center gap-2 p-3 rounded-lg text-base",
                answers[selectedQuestionData.id] === selectedQuestionData.correct
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              )}>
                {answers[selectedQuestionData.id] === selectedQuestionData.correct ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">Correct</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">Incorrect</span>
                  </>
                )}
              </div>

              {/* Explanation - scrollable when text is large */}
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-3 max-h-48 min-h-0 overflow-y-auto">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Explanation</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {selectedQuestionData.explanation}
                </p>
              </div>

              {/* Correct Answer (when user was wrong) */}
              {answers[selectedQuestionData.id] !== selectedQuestionData.correct && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-400 mb-1">Correct Answer</p>
                  <p className="text-base font-medium text-gray-900">
                    {String.fromCharCode(65 + selectedQuestionData.correct)}. {selectedQuestionData.options[selectedQuestionData.correct]}
                  </p>
                </div>
              )}

              {/* Sources */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Sources</p>
                <ul className="space-y-1.5 text-sm">
                  {(selectedQuestionData.sources ?? DUMMY_EXPLANATION.sources).map((src, i) => (
                    <li key={i}>
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {src.title} — {src.ref}
                        </a>
                      ) : (
                        <span className="text-gray-600">{src.title} — {src.ref}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* First-time / no question selected: intro text + chatbox */
            <div className="flex flex-col flex-1 min-h-0">
              <div className="p-4">
                <p className="text-base text-gray-600 leading-relaxed">
                  Answer a question to see the explanation here. Or ask me anything below.
                </p>
              </div>
              {/* Chatbox — plus/mic/type are visual only, no upload or audio */}
              <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-gray-100 rounded-lg border border-gray-200 min-h-[44px] pl-3 pr-2">
                    <input
                      type="text"
                      value={followUpQuestion}
                      onChange={(e) => setFollowUpQuestion(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder-gray-400 text-gray-900"
                    />
                  </div>
                  <button
                    type="button"
                    className="shrink-0 w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1 text-gray-400">
                    <span className="p-1.5 rounded cursor-default" aria-hidden title="Add (disabled)">
                      <Plus className="h-4 w-4" />
                    </span>
                    <span className="p-1.5 rounded cursor-default" aria-hidden title="Voice (disabled)">
                      <Mic className="h-4 w-4" />
                    </span>
                  </div>
                  <span className="p-1.5 rounded text-gray-400 cursor-default" aria-hidden title="Format">
                    <Type className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Follow-up Question Input */}
        {selectedQuestionData && showResults[selectedQuestionData.id] && (
          <div className="p-3 border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 px-3 py-2">
              <input
                type="text"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="Ask a follow-up..."
                className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder-gray-400"
              />
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
      )}
    </div>
  );
}
