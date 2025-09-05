"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";

// Dashboard metric components with enhanced dark mode design
function MetricCard({ title, value, subtitle, percentage, variant = "default" }) {
  return (
    <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm p-4 hover:bg-white/10 transition-all shadow-lg modern-card">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white/80 uppercase tracking-wide">{title}</h3>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white">{value}</div>
          {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
          {percentage && (
            <div className="text-sm text-white">{percentage}</div>
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
            stroke="rgb(var(--border))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgb(var(--chart-2))"
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
          <span className="text-xl font-bold text-foreground">{percentage}%</span>
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
          ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border' 
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      } ${!isExpanded ? 'justify-center' : ''}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      {isExpanded && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}

function SkillRadarChart() {
  const points = [
    { label: "API", x: 50, y: 20 },
    { label: "SYS", x: 80, y: 40 },
    { label: "Tools", x: 70, y: 80 },
    { label: "Data", x: 30, y: 80 },
    { label: "Foundations", x: 20, y: 40 }
  ];
  
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Radar grid */}
        <polygon
          points="50,20 80,40 70,80 30,80 20,40"
          fill="none"
          stroke="rgb(var(--border))"
          strokeWidth="0.5"
        />
        <polygon
          points="50,35 65,45 60,65 40,65 35,45"
          fill="none"
          stroke="rgb(var(--muted))"
          strokeWidth="0.5"
        />
        
        {/* Data area */}
        <polygon
          points="50,25 75,42 65,75 35,75 25,42"
          fill="rgb(var(--chart-2) / 0.1)"
          stroke="rgb(var(--chart-2) / 0.4)"
          strokeWidth="1"
        />
        
        {/* Labels */}
        {points.map((point, i) => (
          <text
            key={i}
            x={point.x}
            y={point.y}
            className="text-xs fill-muted-foreground"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {point.label}
          </text>
        ))}
      </svg>
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

  useEffect(() => {
    // Load data from localStorage
    const loadDashboardData = () => {
      const dashboard = localStorage.getItem('dashboardData');
      const profile = localStorage.getItem('userProfile');
      const plan = localStorage.getItem('learningPlan');
      const ws = localStorage.getItem('workspace');
      
      if (dashboard) setDashboardData(JSON.parse(dashboard));
      if (profile) setUserProfile(JSON.parse(profile));
      if (plan) setLearningPlan(JSON.parse(plan));
      if (ws) setWorkspace(JSON.parse(ws));
    };
    
    loadDashboardData();
  }, []);

  const toggleRightSidebar = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem);
    // Toggle sidebar on nav click
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
      newPlan.currentWeek.tasks[taskIndex].completed = true;
      setLearningPlan(newPlan);
      localStorage.setItem('learningPlan', JSON.stringify(newPlan));
      
      // Update progress metrics
      const completedTasks = newPlan.currentWeek.tasks.filter(task => task.completed).length;
      const progressPercentage = Math.round((completedTasks / newPlan.currentWeek.tasks.length) * 100);
      updateMetrics('coverage', Math.min(dashboardData?.metrics?.coverage + 5, 100));
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
        <aside className={`${sidebarExpanded ? 'w-64' : 'w-16'} min-h-screen border-r border-sidebar-border bg-sidebar backdrop-blur-sm p-4 transition-all duration-300`}>
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
              <div className="rounded-lg border border-border bg-card p-6 backdrop-blur-sm mb-6 hover:bg-accent transition-all shadow-sm">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">WELCOME BACK</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-card-foreground">Aarav, ready to move your Backend SWE plan forward?</h2>
                <p className="text-muted-foreground text-sm mb-6">City: Bengaluru • Last session: 06:42 • Scenic Resume: Tailor — Orbit</p>
                
                {/* Main Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <MetricCard 
                    title="MATCH"
                    value="68%"
                    subtitle="ATS"
                  />
                  <MetricCard 
                    title="MARKET FIT"
                    value="74%"
                    subtitle="360 + 3%"
                  />
                  <MetricCard 
                    title="INTERVIEWS"
                    value="2"
                    subtitle="scheduled"
                  />
                  <MetricCard 
                    title="MODULES"
                    value="3"
                    subtitle="in progress"
                  />
                </div>
              </div>

              {/* Bottom Row Cards */}
              <div className="grid grid-cols-3 gap-4">
                {/* Resume/ATS Card */}
                <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-card-foreground">Resume / ATS</h3>
                    <span className="text-xs text-muted-foreground">v3</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-card-foreground">68/100 62%</div>
                    <div className="text-xs text-muted-foreground">Readability Keyword</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    • Table structure • Dense bullets
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs">Export</Button>
                    <Button size="sm" variant="outline" className="text-xs">Fix Issues</Button>
                  </div>
                </div>

                {/* Career Intelligence Card */}
                <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-card-foreground">Career Intelligence</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-card-foreground">74%</div>
                    <div className="text-xs text-muted-foreground">top percentile 84 • 3% / 30d</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Focus skills: Kafka • GraphQL • Go
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs">Open Intelligence</Button>
                    <Button size="sm" variant="outline" className="text-xs">Add Skill</Button>
                  </div>
                </div>

                {/* Roadmap Card */}
                <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-card-foreground">Roadmap</h3>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">This week</div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Current block: Concurrency → Next due: Wed
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    AT2 complete
                  </div>
                  <div className="flex gap-2 mb-2">
                    <Button size="sm" variant="secondary" className="text-xs">Adjust destination</Button>
                    <Button size="sm" variant="outline" className="text-xs">Open</Button>
                  </div>
                </div>
              </div>

              {/* Second Bottom Row */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Modules Card */}
                <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                  <div className="mb-3">
                    <h3 className="font-medium text-card-foreground">Modules</h3>
                    <div className="text-xs text-muted-foreground">Tracks</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <div className="text-2xl font-bold text-card-foreground">80</div>
                      <div className="text-xs text-muted-foreground">Foundations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-card-foreground">55</div>
                      <div className="text-xs text-muted-foreground">Systems</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-card-foreground">30</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs">View Modules</Button>
                    <Button size="sm" variant="outline" className="text-xs">Generate quiz</Button>
                  </div>
                </div>

                {/* Interview/Jobs Card */}
                <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                  <div className="mb-3">
                    <h3 className="font-medium text-card-foreground">Interview / Jobs</h3>
                    <div className="text-xs text-muted-foreground">Pipeline & prep</div>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <CircularProgress percentage={76} size="small" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Upcoming 2  Referrals 1
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs">Open Pipeline</Button>
                    <Button size="sm" variant="outline" className="text-xs">Prepare</Button>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                  <h3 className="font-medium text-card-foreground mb-3">Quick Tips</h3>
                  <div className="text-sm text-muted-foreground">High-leverage actions</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                  <h3 className="font-medium text-card-foreground mb-3">Pinned & Recent</h3>
                  <div className="text-sm text-muted-foreground">Jump back in</div>
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground mb-1">PINNED</div>
                    <div className="text-xs text-muted-foreground">RECENT</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            {rightSidebarVisible && (
              <aside className="col-span-4 transition-all duration-300">
                <div className="space-y-4">
                  {/* Readiness Card */}
                  <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-card-foreground">Readiness</h3>
                      <span className="text-xs text-muted-foreground">76%</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-muted-foreground mb-2">Composite Signal</div>
                      <CircularProgress percentage={76} />
                    </div>
                  </div>

                  {/* Coverage & Projects */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm text-center hover:bg-accent transition-all shadow-sm">
                      <div className="text-xs text-muted-foreground mb-1">COVERAGE</div>
                      <div className="text-2xl font-bold text-card-foreground">72%</div>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm text-center hover:bg-accent transition-all shadow-sm">
                      <div className="text-xs text-muted-foreground mb-1">PROJECTS</div>
                      <div className="text-2xl font-bold text-card-foreground">3</div>
                    </div>
                  </div>

                  {/* Assessments & Active Days */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm text-center hover:bg-accent transition-all shadow-sm">
                      <div className="text-xs text-muted-foreground mb-1">ASSESSMENTS</div>
                      <div className="text-2xl font-bold text-card-foreground">5</div>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm text-center hover:bg-accent transition-all shadow-sm">
                      <div className="text-xs text-muted-foreground mb-1">ACTIVE DAYS</div>
                      <div className="text-2xl font-bold text-card-foreground">18</div>
                    </div>
                  </div>

                  {/* Skill Radar */}
                  <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                    <div className="mb-3">
                      <h3 className="font-medium text-card-foreground">Skill Radar</h3>
                      <div className="text-xs text-muted-foreground">Top categories</div>
                    </div>
                    <SkillRadarChart />
                    <div className="text-xs text-muted-foreground text-center mt-2">Foundations</div>
                  </div>

                  {/* Learning Velocity */}
                  <div className="rounded-lg border border-border bg-card p-4 backdrop-blur-sm hover:bg-accent transition-all shadow-sm">
                    <div className="mb-3">
                      <h3 className="font-medium text-card-foreground">Learning Velocity</h3>
                      <div className="text-xs text-muted-foreground">Weekly hours (12w)</div>
                    </div>
                    <div className="h-24 flex items-end justify-center">
                      <svg viewBox="0 0 100 50" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="2"
                          points="10,40 20,35 30,30 40,25 50,20 60,15 70,20 80,15 90,10"
                        />
                      </svg>
                    </div>
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