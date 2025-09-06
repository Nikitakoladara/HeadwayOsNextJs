"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

// Enhanced Dashboard metric components with better interactivity
function MetricCard({ title, value, subtitle, percentage, variant = "default", onClick, trending }) {
  return (
    <div 
      className={`rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 transition-all shadow-lg modern-card group ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      }`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white/80 uppercase tracking-wide">{title}</h3>
          {trending && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              trending > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {trending > 0 ? '+' : ''}{trending}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {value}
          </div>
          {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
          {percentage && (
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CircularProgress({ percentage, size = "large" }) {
  const radius = size === "large" ? 45 : 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <svg 
          className={size === "large" ? "w-32 h-32" : "w-24 h-24"}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgb(255 255 255 / 0.2)"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgb(59 130 246)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-in-out"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

function SidebarNavItem({ icon, label, active = false, onClick, isExpanded }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
        active 
          ? 'bg-white/20 text-white border border-white/30' 
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      } ${!isExpanded ? 'justify-center' : ''}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      {isExpanded && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}

function TaskItem({ task, onComplete, onEdit, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.name);

  const handleSave = () => {
    if (onEdit) {
      onEdit(index, { ...task, name: editedTask });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task.name);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-all group ${
      task.completed 
        ? 'border-green-500/30 bg-green-500/10' 
        : 'border-white/20 bg-black/30 hover:bg-white/10 hover:border-white/30'
    }`}>
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onComplete(index)}
          className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
            task.completed
              ? 'bg-green-500 border-green-500 scale-110'
              : 'border-white/40 hover:border-white/60 hover:scale-110'
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white focus:border-white/40 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <button
                onClick={handleSave}
                className="text-green-400 hover:text-green-300 p-1"
              >
                ✓
              </button>
              <button
                onClick={handleCancel}
                className="text-red-400 hover:text-red-300 p-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <div 
              className="cursor-pointer"
              onDoubleClick={() => setIsEditing(true)}
            >
              <div className={`text-sm ${task.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                {task.name}
              </div>
              <div className="text-xs text-white/60">{task.hours} hours</div>
            </div>
          )}
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-white/80 text-xs p-1 transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeNavItem, setActiveNavItem] = useState("Home");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [learningPlan, setLearningPlan] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    
    // Create comprehensive mock data for the dashboard
    const createMockData = () => {
      const mockDashboardData = {
        city: "San Francisco",
        lastSession: "2 hours ago",
        metrics: {
          atsScore: 78,
          marketFit: 84,
          interviews: 3,
          modulesInProgress: 2,
          readiness: 72,
          coverage: 65,
          projects: 4,
          assessments: 8,
          activeDays: 12
        }
      };

      const mockUserProfile = {
        name: "Aarav",
        role: {
          roles: ["Backend", "Full-Stack"]
        }
      };

      const mockLearningPlan = {
        currentWeek: {
          tasks: [
            { name: "Complete API design patterns", hours: "2.5", completed: false },
            { name: "System design mock interview", hours: "1.0", completed: true },
            { name: "Database optimization project", hours: "3.0", completed: false },
            { name: "Kubernetes deployment lab", hours: "2.0", completed: false },
            { name: "Code review best practices", hours: "1.5", completed: true }
          ]
        }
      };

      const mockWorkspace = {
        name: "Backend SWE Track"
      };

      return { mockDashboardData, mockUserProfile, mockLearningPlan, mockWorkspace };
    };

    // Load data from localStorage or create mock data
    const loadDashboardData = () => {
      // Check if we're on the client side
      if (typeof window === 'undefined') return;
      
      let dashboard = localStorage.getItem('dashboardData');
      let profile = localStorage.getItem('userProfile');
      let plan = localStorage.getItem('learningPlan');
      let ws = localStorage.getItem('workspace');
      
      // If no data exists, create and store mock data
      if (!dashboard || !profile || !plan || !ws) {
        const { mockDashboardData, mockUserProfile, mockLearningPlan, mockWorkspace } = createMockData();
        
        localStorage.setItem('dashboardData', JSON.stringify(mockDashboardData));
        localStorage.setItem('userProfile', JSON.stringify(mockUserProfile));
        localStorage.setItem('learningPlan', JSON.stringify(mockLearningPlan));
        localStorage.setItem('workspace', JSON.stringify(mockWorkspace));
        
        setDashboardData(mockDashboardData);
        setUserProfile(mockUserProfile);
        setLearningPlan(mockLearningPlan);
        setWorkspace(mockWorkspace);
      } else {
        setDashboardData(JSON.parse(dashboard));
        setUserProfile(JSON.parse(profile));
        setLearningPlan(JSON.parse(plan));
        setWorkspace(JSON.parse(ws));
      }
    };
    
    loadDashboardData();
  }, []);

  const toggleRightSidebar = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem);
    setSidebarExpanded(!sidebarExpanded);
  };

  // Function to update metrics (simulate progress)
  const updateMetrics = (metricType, value) => {
    if (dashboardData) {
      const newData = {
        ...dashboardData,
        metrics: {
          ...dashboardData.metrics,
          [metricType]: value
        }
      };
      setDashboardData(newData);
      localStorage.setItem('dashboardData', JSON.stringify(newData));
    }
  };

  // Function to mark tasks as completed
  const completeTask = (taskIndex) => {
    if (learningPlan) {
      const newPlan = { ...learningPlan };
      newPlan.currentWeek.tasks[taskIndex].completed = !newPlan.currentWeek.tasks[taskIndex].completed;
      setLearningPlan(newPlan);
      localStorage.setItem('learningPlan', JSON.stringify(newPlan));
      
      // Update progress metrics
      const completedTasks = newPlan.currentWeek.tasks.filter(task => task.completed).length;
      const progressPercentage = Math.round((completedTasks / newPlan.currentWeek.tasks.length) * 100);
      updateMetrics('coverage', Math.min(progressPercentage, 100));
    }
  };

  // Function to edit tasks
  const editTask = (taskIndex, updatedTask) => {
    if (learningPlan) {
      const newPlan = { ...learningPlan };
      newPlan.currentWeek.tasks[taskIndex] = updatedTask;
      setLearningPlan(newPlan);
      localStorage.setItem('learningPlan', JSON.stringify(newPlan));
    }
  };

  // Function to add new task
  const addTask = () => {
    if (learningPlan) {
      const newTask = {
        name: "New task - double click to edit",
        hours: "1.0",
        completed: false
      };
      const newPlan = { ...learningPlan };
      newPlan.currentWeek.tasks.push(newTask);
      setLearningPlan(newPlan);
      localStorage.setItem('learningPlan', JSON.stringify(newPlan));
    }
  };

  // Enhanced metric click handlers
  const handleMetricClick = (metricType) => {
    switch (metricType) {
      case 'ats':
        updateMetrics('atsScore', Math.min(dashboardData.metrics.atsScore + 5, 100));
        break;
      case 'marketFit':
        updateMetrics('marketFit', Math.min(dashboardData.metrics.marketFit + 3, 100));
        break;
      case 'interviews':
        updateMetrics('interviews', dashboardData.metrics.interviews + 1);
        break;
      case 'readiness':
        updateMetrics('readiness', Math.min(dashboardData.metrics.readiness + 2, 100));
        break;
      default:
        break;
    }
  };

  // Get user's name from profile
  const getUserName = () => {
    if (userProfile?.role?.roles?.length > 0) {
      return "Aarav"; // Default name, could be from user data
    }
    return "User";
  };

  // Get target role
  const getTargetRole = () => {
    if (userProfile?.role?.roles?.length > 0) {
      return userProfile.role.roles[0] + " SWE";
    }
    return "Backend SWE";
  };

  // Early return if data is not loaded
  if (!dashboardData || !userProfile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/20 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white">New</h1>
            <span className="text-sm text-white/60">HeadwayOS</span>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-white/60">🔍 Search</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">New</Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-white/60 hover:text-white transition-all ${rightSidebarVisible ? 'bg-white/10' : ''} hover:bg-white/10`}
              onClick={toggleRightSidebar}
            >
              Insights
            </Button>
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer">
              <span className="text-xs text-white">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className={`${sidebarExpanded ? 'w-64' : 'w-16'} min-h-screen border-r border-white/20 bg-black/60 backdrop-blur-sm p-4 transition-all duration-300`}>
          <nav className="space-y-2">
            <SidebarNavItem 
              icon="🏠" 
              label="Home" 
              active={activeNavItem === "Home"}
              onClick={() => handleNavClick("Home")}
              isExpanded={sidebarExpanded}
            />
            <SidebarNavItem 
              icon="📄" 
              label="Resume / ATS" 
              active={activeNavItem === "Resume"}
              onClick={() => handleNavClick("Resume")}
              isExpanded={sidebarExpanded}
            />
            <SidebarNavItem 
              icon="🗺️" 
              label="Roadmap" 
              active={activeNavItem === "Roadmap"}
              onClick={() => handleNavClick("Roadmap")}
              isExpanded={sidebarExpanded}
            />
            <SidebarNavItem 
              icon="📚" 
              label="Modules" 
              active={activeNavItem === "Modules"}
              onClick={() => handleNavClick("Modules")}
              isExpanded={sidebarExpanded}
            />
            <SidebarNavItem 
              icon="💼" 
              label="Jobs" 
              active={activeNavItem === "Jobs"}
              onClick={() => handleNavClick("Jobs")}
              isExpanded={sidebarExpanded}
            />
            <SidebarNavItem 
              icon="📅" 
              label="Calendar" 
              active={activeNavItem === "Calendar"}
              onClick={() => handleNavClick("Calendar")}
              isExpanded={sidebarExpanded}
            />
            <SidebarNavItem 
              icon="📊" 
              label="Insights" 
              active={activeNavItem === "Insights"}
              onClick={() => handleNavClick("Insights")}
              isExpanded={sidebarExpanded}
            />
            <SidebarNavItem 
              icon="⚙️" 
              label="Settings" 
              active={activeNavItem === "Settings"}
              onClick={() => handleNavClick("Settings")}
              isExpanded={sidebarExpanded}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className={`grid gap-6 ${rightSidebarVisible ? 'grid-cols-12' : 'grid-cols-1'}`}>
            {/* Welcome Section */}
            <div className={rightSidebarVisible ? 'col-span-8' : 'col-span-1'}>
              <div className="rounded-lg border border-white/20 bg-black/60 backdrop-blur-sm p-6 mb-6 hover:bg-white/5 transition-all shadow-sm">
                <div className="mb-4">
                  <span className="text-sm text-white/60 uppercase tracking-wide">WELCOME BACK</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">{getUserName()}, ready to move your {getTargetRole()} plan forward?</h2>
                <p className="text-white/60 text-sm mb-6">City: {dashboardData.city} • Last session: {dashboardData.lastSession} • {workspace?.name || 'Workspace'}</p>
                
                {/* Main Metrics with Enhanced Interactivity */}
                <div className="grid grid-cols-4 gap-4">
                  <MetricCard 
                    title="MATCH"
                    value={dashboardData.metrics.atsScore + "%"}
                    subtitle="ATS Score"
                    percentage={dashboardData.metrics.atsScore}
                    trending={2}
                    onClick={() => handleMetricClick('ats')}
                  />
                  <MetricCard 
                    title="MARKET FIT"
                    value={dashboardData.metrics.marketFit + "%"}
                    subtitle="360° + 3%"
                    percentage={dashboardData.metrics.marketFit}
                    trending={3}
                    onClick={() => handleMetricClick('marketFit')}
                  />
                  <MetricCard 
                    title="INTERVIEWS"
                    value={dashboardData.metrics.interviews}
                    subtitle="scheduled"
                    onClick={() => handleMetricClick('interviews')}
                  />
                  <MetricCard 
                    title="MODULES"
                    value={dashboardData.metrics.modulesInProgress}
                    subtitle="in progress"
                  />
                </div>
              </div>

              {/* Bottom Row Cards */}
              <div className="grid grid-cols-3 gap-4">
                {/* Resume/ATS Card */}
                <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 hover:bg-white/10 transition-all shadow-lg modern-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Resume / ATS</h3>
                    <span className="text-xs text-white/60">v3</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-white">{dashboardData.metrics.atsScore}/100 62%</div>
                    <div className="text-xs text-white/60">Readability Keyword</div>
                  </div>
                  <div className="text-xs text-white/60 mb-3">
                    • Table structure • Dense bullets
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="text-xs bg-white/10 text-white hover:bg-white/20"
                      onClick={() => alert('Export functionality - Resume exported!')}
                    >
                      Export
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-white/20 text-white hover:bg-white/10"
                      onClick={() => updateMetrics('atsScore', Math.min(dashboardData.metrics.atsScore + 5, 100))}
                    >
                      Fix Issues
                    </Button>
                  </div>
                </div>

                {/* Career Intelligence Card */}
                <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 hover:bg-white/10 transition-all shadow-lg modern-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Career Intelligence</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-white">74%</div>
                    <div className="text-xs text-white/60">top percentile 84 • 3% / 30d</div>
                  </div>
                  <div className="text-xs text-white/60 mb-3">
                    Focus skills: Kafka • GraphQL • Go
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs bg-white/10 text-white hover:bg-white/20">Open Intelligence</Button>
                    <Button size="sm" variant="outline" className="text-xs border-white/20 text-white hover:bg-white/10">Add Skill</Button>
                  </div>
                </div>

                {/* Enhanced Roadmap Card with Better Task Management */}
                <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 hover:bg-white/10 transition-all shadow-lg modern-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Roadmap</h3>
                    <div className="flex items-center gap-2">
                      <div className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {learningPlan?.currentWeek?.tasks?.filter(task => task.completed).length || 0}/
                        {learningPlan?.currentWeek?.tasks?.length || 0}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white/60 mb-3">This week</div>
                  
                  {learningPlan && learningPlan.currentWeek ? (
                    <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
                      {learningPlan.currentWeek.tasks.map((task, index) => (
                        <TaskItem 
                          key={index}
                          task={task}
                          onComplete={completeTask}
                          onEdit={editTask}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-white/60 mb-3">
                      Current block: Concurrency → Next due: Wed
                      <br/>AT2 complete
                    </div>
                  )}
                  
                  <div className="flex gap-2 mb-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="text-xs bg-white/10 text-white hover:bg-white/20"
                      onClick={addTask}
                    >
                      Add Task
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-white/20 text-white hover:bg-white/10"
                      onClick={() => setActiveNavItem("Roadmap")}
                    >
                      Open Roadmap
                    </Button>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                      <span>Weekly Progress</span>
                      <span>{Math.round(((learningPlan?.currentWeek?.tasks?.filter(task => task.completed).length || 0) / (learningPlan?.currentWeek?.tasks?.length || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.round(((learningPlan?.currentWeek?.tasks?.filter(task => task.completed).length || 0) / (learningPlan?.currentWeek?.tasks?.length || 1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            {rightSidebarVisible && (
              <aside className="col-span-4 transition-all duration-300">
                <div className="space-y-4">
                  {/* Enhanced Readiness Card */}
                  <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 hover:bg-white/10 transition-all shadow-lg modern-card cursor-pointer group" onClick={() => handleMetricClick('readiness')}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">Readiness</h3>
                      <span className="text-xs text-white/60">{dashboardData.metrics.readiness}%</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-white/60 mb-2">Composite Signal</div>
                      <CircularProgress percentage={dashboardData.metrics.readiness} />
                      <div className="text-xs text-center text-white/60 mt-2">
                        Click to improve +2%
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Coverage & Projects with Better Styling */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 text-center hover:bg-white/10 transition-all shadow-lg modern-card group">
                      <div className="text-xs text-white/60 mb-1">COVERAGE</div>
                      <div className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">{dashboardData.metrics.coverage}%</div>
                      <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                        <div 
                          className="bg-green-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${dashboardData.metrics.coverage}%` }}
                        />
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 text-center hover:bg-white/10 transition-all shadow-lg modern-card group">
                      <div className="text-xs text-white/60 mb-1">PROJECTS</div>
                      <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{dashboardData.metrics.projects}</div>
                      <div className="text-xs text-white/60 mt-1">
                        +{Math.floor(Math.random() * 3) + 1} this month
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Assessments & Active Days */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 text-center hover:bg-white/10 transition-all shadow-lg modern-card group">
                      <div className="text-xs text-white/60 mb-1">ASSESSMENTS</div>
                      <div className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">{dashboardData.metrics.assessments}</div>
                      <div className="text-xs text-white/60 mt-1">
                        {dashboardData.metrics.assessments > 5 ? 'Excellent' : 'Good'} progress
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 text-center hover:bg-white/10 transition-all shadow-lg modern-card group">
                      <div className="text-xs text-white/60 mb-1">ACTIVE DAYS</div>
                      <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{dashboardData.metrics.activeDays}</div>
                      <div className="text-xs text-white/60 mt-1">
                        🔥 {Math.floor(dashboardData.metrics.activeDays / 7)} week streak
                      </div>
                    </div>
                  </div>

                  {/* Skill Radar */}
                  <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 hover:bg-white/10 transition-all shadow-lg modern-card">
                    <div className="mb-3">
                      <h3 className="font-medium text-white">Skill Radar</h3>
                      <div className="text-xs text-white/60">Top categories</div>
                    </div>
                    <div className="relative w-full h-48 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Radar grid */}
                        <polygon
                          points="50,20 80,40 70,80 30,80 20,40"
                          fill="none"
                          stroke="rgb(255 255 255 / 0.2)"
                          strokeWidth="0.5"
                        />
                        <polygon
                          points="50,35 65,45 60,65 40,65 35,45"
                          fill="none"
                          stroke="rgb(255 255 255 / 0.3)"
                          strokeWidth="0.5"
                        />
                        
                        {/* Data area */}
                        <polygon
                          points="50,25 75,42 65,75 35,75 25,42"
                          fill="rgb(59 130 246 / 0.1)"
                          stroke="rgb(59 130 246 / 0.4)"
                          strokeWidth="1"
                        />
                        
                        {/* Labels */}
                        <text x="50" y="20" className="text-xs fill-white/60" textAnchor="middle" dominantBaseline="middle">API</text>
                        <text x="80" y="40" className="text-xs fill-white/60" textAnchor="middle" dominantBaseline="middle">SYS</text>
                        <text x="70" y="80" className="text-xs fill-white/60" textAnchor="middle" dominantBaseline="middle">Tools</text>
                        <text x="30" y="80" className="text-xs fill-white/60" textAnchor="middle" dominantBaseline="middle">Data</text>
                        <text x="20" y="40" className="text-xs fill-white/60" textAnchor="middle" dominantBaseline="middle">Foundations</text>
                      </svg>
                    </div>
                    <div className="text-xs text-white/60 text-center mt-2">Foundations</div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}