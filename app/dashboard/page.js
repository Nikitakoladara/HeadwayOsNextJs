"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Dashboard metric components with enhanced dark mode design
function MetricCard({ title, value, subtitle, percentage, variant = "default" }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</h3>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white">{value}</div>
          {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
          {percentage && (
            <div className="text-sm text-gray-300">{percentage}</div>
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
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#60a5fa"
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
          ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
          : 'text-gray-400 hover:bg-white/10 hover:text-gray-300'
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
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
        <polygon
          points="50,35 65,45 60,65 40,65 35,45"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        
        {/* Data area */}
        <polygon
          points="50,25 75,42 65,75 35,75 25,42"
          fill="rgba(96,165,250,0.1)"
          stroke="rgba(96,165,250,0.4)"
          strokeWidth="1"
        />
        
        {/* Labels */}
        {points.map((point, i) => (
          <text
            key={i}
            x={point.x}
            y={point.y}
            className="text-xs fill-gray-300"
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

  const toggleRightSidebar = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem);
    // Toggle sidebar on nav click
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground">New</h1>
            <span className="text-sm text-muted-foreground">HeadwayOS</span>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-muted-foreground">🔍 Search</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">New</Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-muted-foreground hover:text-foreground transition-all ${rightSidebarVisible ? 'bg-accent' : ''} hover:bg-accent`}
              onClick={toggleRightSidebar}
            >
              Insights
            </Button>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-all cursor-pointer">
              <span className="text-xs text-foreground">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className={`${sidebarExpanded ? 'w-64' : 'w-16'} min-h-screen border-r border-white/10 bg-black/20 backdrop-blur-sm p-4 transition-all duration-300`}>
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
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm mb-6 hover:bg-white/10 transition-all">
                <div className="mb-4">
                  <span className="text-sm text-gray-400 uppercase tracking-wide">WELCOME BACK</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">Aarav, ready to move your Backend SWE plan forward?</h2>
                <p className="text-gray-400 text-sm mb-6">City: Bengaluru • Last session: 06:42 • Scenic Resume: Tailor — Orbit</p>
                
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
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Resume / ATS</h3>
                    <span className="text-xs text-gray-400">v3</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-white">68/100 62%</div>
                    <div className="text-xs text-gray-400">Readability Keyword</div>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">
                    • Table structure • Dense bullets
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs bg-gray-700 hover:bg-gray-600 text-white border-gray-600">Export</Button>
                    <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700">Fix Issues</Button>
                  </div>
                </div>

                {/* Career Intelligence Card */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Career Intelligence</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-white">74%</div>
                    <div className="text-xs text-gray-400">top percentile 84 • 3% / 30d</div>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">
                    Focus skills: Kafka • GraphQL • Go
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs bg-gray-700 hover:bg-gray-600 text-white border-gray-600">Open Intelligence</Button>
                    <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700">Add Skill</Button>
                  </div>
                </div>

                {/* Roadmap Card */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">Roadmap</h3>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">This week</div>
                  <div className="text-xs text-gray-400 mb-3">
                    Current block: Concurrency → Next due: Wed
                  </div>
                  <div className="text-xs text-gray-400 mb-3">
                    AT2 complete
                  </div>
                  <div className="flex gap-2 mb-2">
                    <Button size="sm" variant="secondary" className="text-xs bg-gray-700 hover:bg-gray-600 text-white border-gray-600">Adjust destination</Button>
                    <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700">Open</Button>
                  </div>
                </div>
              </div>

              {/* Second Bottom Row */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Modules Card */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="mb-3">
                    <h3 className="font-medium text-white">Modules</h3>
                    <div className="text-xs text-gray-400">Tracks</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <div className="text-2xl font-bold text-white">80</div>
                      <div className="text-xs text-gray-400">Foundations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">55</div>
                      <div className="text-xs text-gray-400">Systems</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">30</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs bg-gray-700 hover:bg-gray-600 text-white border-gray-600">View Modules</Button>
                    <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700">Generate quiz</Button>
                  </div>
                </div>

                {/* Interview/Jobs Card */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <div className="mb-3">
                    <h3 className="font-medium text-white">Interview / Jobs</h3>
                    <div className="text-xs text-gray-400">Pipeline & prep</div>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <CircularProgress percentage={76} size="small" />
                  </div>
                  <div className="text-xs text-gray-400 mb-3">
                    Upcoming 2  Referrals 1
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="text-xs bg-gray-700 hover:bg-gray-600 text-white border-gray-600">Open Pipeline</Button>
                    <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700">Prepare</Button>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <h3 className="font-medium text-white mb-3">Quick Tips</h3>
                  <div className="text-sm text-gray-400">High-leverage actions</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <h3 className="font-medium text-white mb-3">Pinned & Recent</h3>
                  <div className="text-sm text-gray-400">Jump back in</div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-400 mb-1">PINNED</div>
                    <div className="text-xs text-gray-400">RECENT</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            {rightSidebarVisible && (
              <aside className="col-span-4 transition-all duration-300">
                <div className="space-y-4">
                  {/* Readiness Card */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white">Readiness</h3>
                      <span className="text-xs text-gray-400">76%</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-gray-400 mb-2">Composite Signal</div>
                      <CircularProgress percentage={76} />
                    </div>
                  </div>

                  {/* Coverage & Projects */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
                      <div className="text-xs text-gray-400 mb-1">COVERAGE</div>
                      <div className="text-2xl font-bold text-white">72%</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
                      <div className="text-xs text-gray-400 mb-1">PROJECTS</div>
                      <div className="text-2xl font-bold text-white">3</div>
                    </div>
                  </div>

                  {/* Assessments & Active Days */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
                      <div className="text-xs text-gray-400 mb-1">ASSESSMENTS</div>
                      <div className="text-2xl font-bold text-white">5</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm text-center hover:bg-white/10 transition-all">
                      <div className="text-xs text-gray-400 mb-1">ACTIVE DAYS</div>
                      <div className="text-2xl font-bold text-white">18</div>
                    </div>
                  </div>

                  {/* Skill Radar */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <div className="mb-3">
                      <h3 className="font-medium text-white">Skill Radar</h3>
                      <div className="text-xs text-gray-400">Top categories</div>
                    </div>
                    <SkillRadarChart />
                    <div className="text-xs text-gray-400 text-center mt-2">Foundations</div>
                  </div>

                  {/* Learning Velocity */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <div className="mb-3">
                      <h3 className="font-medium text-white">Learning Velocity</h3>
                      <div className="text-xs text-gray-400">Weekly hours (12w)</div>
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