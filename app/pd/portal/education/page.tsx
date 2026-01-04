"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface ModuleProgress {
  moduleId: string;
  status: "not-started" | "in-progress" | "completed";
  score: number | null;
  completedAt: string | null;
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  questionCount: number;
  passScore: number;
  prerequisite: string | null;
}

interface LabCategory {
  id: string;
  title: string;
  description: string;
  scenarioCount: number;
  icon: React.ReactNode;
}

const modules: Module[] = [
  {
    id: "fundamentals",
    title: "PD Fundamentals",
    description: "Understand what a Pathway Developer is, core responsibilities, and platform boundaries.",
    duration: "15 min",
    questionCount: 10,
    passScore: 80,
    prerequisite: null,
  },
  {
    id: "target-hints",
    title: "Target Hints Masterclass",
    description: "Learn conflict-free profession targeting and ethical channel development strategies.",
    duration: "20 min",
    questionCount: 10,
    passScore: 80,
    prerequisite: "fundamentals",
  },
  {
    id: "second-opinion",
    title: "Second Opinion Strategy",
    description: "Master the free Second Opinion service - your strongest tool for cancer and general surgery cases.",
    duration: "15 min",
    questionCount: 8,
    passScore: 80,
    prerequisite: "fundamentals",
  },
  {
    id: "compliance",
    title: "Compliance & Ethics",
    description: "GDPR basics, medical advice boundaries, patient privacy, and ethical scenarios.",
    duration: "20 min",
    questionCount: 12,
    passScore: 83,
    prerequisite: "fundamentals",
  },
  {
    id: "communication",
    title: "Patient Communication",
    description: "How to explain MrClinc, manage expectations, professional language, and when to escalate.",
    duration: "15 min",
    questionCount: 10,
    passScore: 80,
    prerequisite: "fundamentals",
  },
];

const labCategories: LabCategory[] = [
  {
    id: "first-contact",
    title: "First Contact",
    description: "Initial patient interactions - how to introduce yourself and MrClinc professionally.",
    scenarioCount: 10,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    id: "boundary-enforcement",
    title: "Boundary Enforcement",
    description: "Saying 'no' professionally - maintaining boundaries without damaging relationships.",
    scenarioCount: 10,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    id: "channel-development",
    title: "Channel Development",
    description: "Approaching target professions - permission, win-win explanation, and relationship building.",
    scenarioCount: 10,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "complex-cases",
    title: "Complex Cases",
    description: "Difficult situations requiring careful handling - distressed patients, unrealistic expectations, escalation.",
    scenarioCount: 10,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: "communication-skills",
    title: "Communication Skills",
    description: "Professional language, tone, empathy, and managing patient emotions effectively.",
    scenarioCount: 10,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

const moduleIcons: Record<string, React.ReactNode> = {
  fundamentals: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "target-hints": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "second-opinion": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  compliance: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  communication: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

const getDefaultProgress = (): Record<string, ModuleProgress> => {
  const progress: Record<string, ModuleProgress> = {};
  modules.forEach((m) => {
    progress[m.id] = {
      moduleId: m.id,
      status: "not-started",
      score: null,
      completedAt: null,
    };
  });
  return progress;
};

const getDefaultLabProgress = (): Record<string, { completed: number; score: number }> => {
  const progress: Record<string, { completed: number; score: number }> = {};
  labCategories.forEach((c) => {
    progress[c.id] = { completed: 0, score: 0 };
  });
  return progress;
};

export default function EducationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [pdInfo, setPdInfo] = useState<{ name: string; code: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"modules" | "training-lab">("modules");
  const [moduleProgress, setModuleProgress] = useState<Record<string, ModuleProgress>>(getDefaultProgress());
  const [labProgress, setLabProgress] = useState<Record<string, { completed: number; score: number }>>(getDefaultLabProgress());

  useEffect(() => {
    const session = localStorage.getItem("pdSession");
    if (!session) {
      router.push("/pd/login");
      return;
    }

    const parsed = JSON.parse(session);
    if (!parsed.loggedIn) {
      router.push("/pd/login");
      return;
    }

    setPdInfo({ name: parsed.name, code: parsed.code });

    // Load module progress
    const savedModuleProgress = localStorage.getItem("pdEducationProgress");
    if (savedModuleProgress) {
      setModuleProgress(JSON.parse(savedModuleProgress));
    }

    // Load lab progress
    const savedLabProgress = localStorage.getItem("pdTrainingLabProgress");
    if (savedLabProgress) {
      setLabProgress(JSON.parse(savedLabProgress));
    }

    setIsLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("pdSession");
    router.push("/pd/login");
  };

  // Calculate module progress
  const completedModules = Object.values(moduleProgress).filter((p) => p.status === "completed").length;
  const moduleOverallProgress = Math.round((completedModules / modules.length) * 100);

  // Calculate lab progress
  const totalLabScenarios = labCategories.reduce((sum, c) => sum + c.scenarioCount, 0);
  const completedLabScenarios = Object.values(labProgress).reduce((sum, p) => sum + p.completed, 0);
  const labOverallProgress = Math.round((completedLabScenarios / totalLabScenarios) * 100);

  // Check if module is unlocked
  const isModuleUnlocked = (module: Module): boolean => {
    if (!module.prerequisite) return true;
    const prereqProgress = moduleProgress[module.prerequisite];
    return prereqProgress?.status === "completed";
  };

  // Get status badge
  const getStatusBadge = (progress: ModuleProgress | undefined, isUnlocked: boolean) => {
    if (!isUnlocked) return <Badge variant="secondary" size="sm">Locked</Badge>;
    if (!progress) return <Badge variant="secondary" size="sm">Not Started</Badge>;
    switch (progress.status) {
      case "completed": return <Badge variant="success" size="sm">Completed</Badge>;
      case "in-progress": return <Badge variant="primary" size="sm">In Progress</Badge>;
      default: return <Badge variant="secondary" size="sm">Not Started</Badge>;
    }
  };

  // Get lab badge
  const getLabBadge = (categoryId: string) => {
    const progress = labProgress[categoryId];
    const category = labCategories.find(c => c.id === categoryId);
    if (!category) return null;
    
    if (!progress || progress.completed === 0) return <Badge variant="secondary" size="sm">Not Started</Badge>;
    if (progress.completed === category.scenarioCount) return <Badge variant="success" size="sm">Completed</Badge>;
    return <Badge variant="primary" size="sm">{progress.completed}/{category.scenarioCount}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex-shrink-0"><img src="/images/logo.svg" alt="MrClinc" className="h-[42px] w-auto" /></Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">PD Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{pdInfo?.name}</p>
                <p className="text-xs text-gray-500 font-mono">{pdInfo?.code}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Portal Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <Link href="/pd/portal" className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
              Dashboard
            </Link>
            <Link href="/pd/portal/earnings" className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
              Earnings
            </Link>
            <Link href="/pd/portal/education" className="py-4 text-sm font-medium text-primary-600 border-b-2 border-primary-600">
              Education
            </Link>
            <Link href="/pd/portal/profile" className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
              Profile
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Education</h1>
            <p className="text-gray-600 mt-1">Learn and practice to become a certified Pathway Developer</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("modules")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "modules"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Modules
            <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
              activeTab === "modules" ? "bg-primary-500" : "bg-gray-100"
            }`}>
              {completedModules}/{modules.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("training-lab")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "training-lab"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Training Lab
            <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
              activeTab === "training-lab" ? "bg-primary-500" : "bg-gray-100"
            }`}>
              {completedLabScenarios}/{totalLabScenarios}
            </span>
          </button>
        </div>

        {/* Modules Tab */}
        {activeTab === "modules" && (
          <>
            {/* Progress Card */}
            <Card variant="bordered" className="mb-6">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Module Progress</h3>
                    <p className="text-sm text-gray-500 mt-1">Complete all 5 modules to earn your certificate</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">{moduleOverallProgress}%</p>
                      <p className="text-xs text-gray-500">{completedModules} of {modules.length} completed</p>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                        <circle
                          cx="32" cy="32" r="28"
                          stroke="#2563EB" strokeWidth="6" fill="none"
                          strokeDasharray={`${moduleOverallProgress * 1.76} 176`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Banner */}
            {completedModules === modules.length && (
              <Card variant="bordered" className="mb-6 bg-success-50 border-success-200">
                <CardContent className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-success-800">All Modules Completed</h3>
                      <p className="text-success-700 text-sm">You are now a MrClinc Certified Pathway Developer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Module List */}
            <div className="space-y-4">
              {modules.map((module, index) => {
                const progress = moduleProgress[module.id];
                const isUnlocked = isModuleUnlocked(module);

                return (
                  <Card key={module.id} variant="bordered" className={`transition-all ${!isUnlocked ? "opacity-60" : "hover:shadow-md"}`}>
                    <CardContent className="py-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          progress?.status === "completed" ? "bg-success-100 text-success-600"
                            : isUnlocked ? "bg-primary-100 text-primary-600"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {moduleIcons[module.id]}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">Module {index + 1}</span>
                            {getStatusBadge(progress, isUnlocked)}
                          </div>
                          <h3 className="font-bold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {module.duration}
                            </span>
                            <span>{module.questionCount} questions</span>
                            <span>{module.passScore}% to pass</span>
                          </div>
                          {progress?.status === "completed" && progress?.score !== null && (
                            <p className="text-sm text-success-600 mt-2">Score: {progress.score}%</p>
                          )}
                        </div>

                        <div className="flex-shrink-0">
                          {isUnlocked ? (
                            <Link href={`/pd/portal/education/${module.id}`}>
                              <Button variant={progress?.status === "completed" ? "outline" : "primary"} size="sm">
                                {progress?.status === "completed" ? "Review" : progress?.status === "in-progress" ? "Continue" : "Start"}
                              </Button>
                            </Link>
                          ) : (
                            <div className="text-center">
                              <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              <p className="text-xs text-gray-400 mt-1">Complete Fundamentals</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Training Lab Tab */}
        {activeTab === "training-lab" && (
          <>
            {/* Progress Card */}
            <Card variant="bordered" className="mb-6">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Training Lab Progress</h3>
                    <p className="text-sm text-gray-500 mt-1">Practice real-world scenarios with decision-based training</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">{labOverallProgress}%</p>
                      <p className="text-xs text-gray-500">{completedLabScenarios} of {totalLabScenarios} scenarios</p>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                        <circle
                          cx="32" cy="32" r="28"
                          stroke="#F97316" strokeWidth="6" fill="none"
                          strokeDasharray={`${labOverallProgress * 1.76} 176`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lab Master Badge */}
            {completedLabScenarios === totalLabScenarios && (
              <Card variant="bordered" className="mb-6 bg-accent-50 border-accent-200">
                <CardContent className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-accent-800">Training Lab Master</h3>
                      <p className="text-accent-700 text-sm">You have completed all 50 scenarios</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Category List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {labCategories.map((category) => {
                const progress = labProgress[category.id] || { completed: 0, correct: 0 };
                const isCompleted = progress.completed === category.scenarioCount;

                return (
                  <Card key={category.id} variant="bordered" className="hover:shadow-md transition-all">
                    <CardContent className="py-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isCompleted ? "bg-success-100 text-success-600" : "bg-accent-100 text-accent-600"
                        }`}>
                          {category.icon}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getLabBadge(category.id)}
                          </div>
                          <h3 className="font-bold text-gray-900">{category.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${isCompleted ? "bg-success-500" : "bg-accent-500"}`}
                                style={{ width: `${(progress.completed / category.scenarioCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{progress.completed}/{category.scenarioCount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Link href={`/pd/portal/education/training-lab/${category.id}`}>
                          <Button variant={isCompleted ? "outline" : "primary"} size="sm" className="w-full">
                            {isCompleted ? "Review Scenarios" : progress.completed > 0 ? "Continue" : "Start Practice"}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Info Note */}
            <Card variant="bordered" className="mt-6 bg-gray-50">
              <CardContent className="py-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">About Training Lab</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Training Lab presents real-world scenarios you&apos;ll encounter as a PD. 
                      Each scenario has multiple options - choose the best response and get immediate feedback.
                      Practice until you feel confident handling any situation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
