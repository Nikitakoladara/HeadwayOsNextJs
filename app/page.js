'use client'

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";


const bgGrid = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)",
  backgroundSize: "36px 36px",
  backgroundPosition: "center",
};

const cardVariants = {
  initial: { opacity: 0, y: 12, scale: 0.985 },
  in: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  out: { opacity: 0, y: 12, scale: 0.985, transition: { duration: 0.2 } },
};

function GoogleGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" {...props}>
      <path fill="#EA4335" d="M12 10.2v3.92h5.45c-.24 1.26-1.47 3.7-5.45 3.7-3.28 0-5.95-2.71-5.95-6.06S8.72 5.7 12 5.7c1.87 0 3.13.79 3.85 1.47l2.62-2.53C16.8 3.36 14.62 2.5 12 2.5 6.98 2.5 2.9 6.58 2.9 11.7c0 5.12 4.08 9.2 9.1 9.2 5.26 0 8.72-3.69 8.72-8.89 0-.6-.06-1.06-.14-1.51H12z"/>
      <path fill="#34A853" d="M3.69 7.66l3.22 2.36C7.69 8.28 9.65 6.9 12 6.9c1.87 0 3.13.79 3.85 1.47l2.62-2.53C16.8 3.36 14.62 2.5 12 2.5 8.31 2.5 5.11 4.64 3.69 7.66z"/>
      <path fill="#FBBC05" d="M3.56 16.34a8.93 8.93 0 0 0 8.39 5.06c4.96 0 8.42-3.44 8.42-8.58 0-.59-.06-1.05-.14-1.5H12v3.92h5.45c-.24 1.26-1.47 3.7-5.45 3.7-2.8 0-5.15-1.87-5.9-4.4l-2.54 1.8z"/>
      <path fill="#4285F4" d="M20.5 6.65l-2.62 2.52c.33.57.52 1.32.52 2.53 0 1.2-.19 1.96-.52 2.53l2.62 2.52c1.16-1.66 1.82-3.7 1.82-6.05s-.66-4.39-1.82-6.05z"/>
    </svg>
  );
}

function LinkedInGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#0A66C2" />
      <rect x="6.2" y="9.2" width="2.2" height="8.6" fill="#fff" />
      <circle cx="7.3" cy="6.8" r="1.2" fill="#fff" />
      <path fill="#fff" d="M12.2 9.2h2.1v1.2c.5-.8 1.3-1.4 2.6-1.4 2 0 3.1 1.2 3.1 3.5v5.3h-2.2v-4.7c0-1.1-.4-1.8-1.3-1.8-1 0-1.6.7-1.6 2v4.5h-2.2V9.2z" />
    </svg>
  );
}

function GlyphImage(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor"/>
      <path d="M21 16l-5.5-5.5L9 17l-3-3-3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...props}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...props}>
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconUpload(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...props}>
      <path d="M12 16V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7 9l5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="4" y="16" width="16" height="4" rx="1.5" fill="currentColor" opacity=".15"/>
    </svg>
  );
}

function IconSparkle(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...props}>
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" fill="currentColor" opacity=".9"/>
      <circle cx="19.5" cy="6.5" r="1.2" fill="currentColor" opacity=".7"/>
    </svg>
  );
}

function Loader({ className = "" }) {
  return (
    <span className={"inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent " + className} />
  );
}

function NeonCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frame = useRef(0);
  const latest = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const onMove = (e) => {
      latest.current = { x: e.clientX, y: e.clientY };
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          frame.current = 0;
          setPos(latest.current);
        });
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(220px 220px at ${pos.x}px ${pos.y}px, rgba(96,165,250,.10), transparent 60%)`,
      }}
    />
  );
}

function FogCard({ children, className = "" }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="in"
      exit="out"
      className={
        "relative w-full max-w-[720px] border border-white/10 bg-black/20 backdrop-blur-xl text-gray-100 rounded-2xl p-8 shadow-2xl " +
        className
      }
      style={{ boxShadow: "0 20px 50px rgba(0,0,0,.6)" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-md border border-white/20 bg-white/10 px-4 font-medium text-gray-100 shadow-inner transition active:scale-[.99] disabled:opacity-50 hover:bg-white/20"
    >
      <span className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-b from-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

function GhostButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 text-gray-200 transition hover:bg-white/10 active:scale-[.99] disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Chip({ active, label, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`min-w-[88px] rounded-md border px-3 py-2 text-sm transition ${
        active ? "border-white/20 bg-white/10 text-gray-100" : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function ProgressShimmer() {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-md border border-white/10 bg-white/5">
      <div className="absolute inset-y-0 left-0 w-1/3 animate-[progress_1.8s_ease_infinite] bg-gradient-to-r from-white/20 via-white/50 to-white/20" />
      <style>{`@keyframes progress { 0%{transform:translateX(-120%)} 100%{transform:translateX(420%)} }`}</style>
    </div>
  );
}

// New components for onboarding form
function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
        isUser 
          ? 'bg-white/20 text-gray-100 rounded-br-md' 
          : 'bg-white/5 text-gray-300 rounded-bl-md'
      }`}>
        {message.text}
      </div>
    </div>
  );
}

function QuickReplyPill({ text, onClick, selected = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
        selected 
          ? 'border-white/30 bg-white/20 text-gray-100' 
          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
      }`}
    >
      {text}
    </button>
  );
}

function SkillChip({ skill, onRemove }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-accent px-3 py-1 text-sm text-accent-foreground">
      <span>{skill.name}</span>
      <span className="text-xs opacity-60">({skill.level})</span>
      <button onClick={onRemove} className="ml-1 text-muted-foreground hover:text-foreground">×</button>
    </div>
  );
}

function GenerationStep({ step, completed, active }) {
  return (
    <div className={`flex items-center gap-3 py-2 ${active ? 'opacity-100' : completed ? 'opacity-60' : 'opacity-30'}`}>
      <div className={`h-4 w-4 rounded-full border-2 ${
        completed ? 'bg-white/20 border-white/40' : active ? 'border-white/40 bg-transparent' : 'border-white/10'
      }`}>
        {completed && <div className="h-full w-full rounded-full bg-gradient-to-r from-white/60 to-white/40" />}
      </div>
      <span className="text-sm text-gray-300">{step.text}</span>
    </div>
  );
}

function PlanPreviewCard({ title, count, items }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-medium text-gray-200">{title}</h4>
        <span className="text-xs text-gray-400">{count} items</span>
      </div>
      <div className="space-y-2">
        {items.slice(0, 3).map((item, i) => (
          <div key={i} className="text-sm text-gray-400">• {item}</div>
        ))}
        {items.length > 3 && (
          <div className="text-xs text-gray-500">+{items.length - 3} more</div>
        )}
      </div>
    </div>
  );
}

export default function HeadwayOAuthAndOnboarding() {
  const [stage, setStage] = useState("oauth");
  const [processing, setProcessing] = useState(false);
  const [roles, setRoles] = useState([]);
  const [wsName, setWsName] = useState("My Workspace");
  const [logo, setLogo] = useState("");
  const inputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const prevUrl = useRef("");
  const router = useRouter();
  
  // New onboarding form data
  const [onboardingData, setOnboardingData] = useState({
    role: { roles: [], seniority: "", intent: "", outcome: "" },
    skills: { yoe: "", region: "", workType: "", skills: [], authorization: "" },
    pace: { mode: "hours", value: 5, days: [], timeOfDay: "" },
    market: { role: "", region: "", seen: false },
    resume: { uploaded: false, fileName: "", skipped: false },
    preferences: { contentFormats: [], difficulty: "", aiMentor: true, notifications: true }
  });
  
  const [chatMessages, setChatMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [planGeneration, setPlanGeneration] = useState({
    steps: [
      { text: "Analyzing your goals and skills", completed: false },
      { text: "Mapping learning prerequisites", completed: false },
      { text: "Curating relevant resources", completed: false },
      { text: "Building weekly schedule", completed: false },
      { text: "Generating personalized roadmap", completed: false }
    ],
    currentStep: 0
  });

  useEffect(() => {
    document.title = "HeadwayOS – Get started";
  }, []);

  useEffect(() => {
    const old = prevUrl.current;
    if (old && old !== logo) URL.revokeObjectURL(old);
    prevUrl.current = logo;
    return () => {
      if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    };
  }, [logo]);

  function toggleRole(tag) {
    setRoles((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function mockAuth() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStage("intro");
    }, 900);
  }

  function handleContinue(next) {
    setStage(next);
  }

  function handleLogo(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogo(url);
  }

  function createWorkspace() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStage("ready");
    }, 1200);
  }

  // New onboarding form functions
  function updateOnboardingData(section, data) {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  }

  function addChatMessage(message, isUser = true) {
    setChatMessages(prev => [...prev, { text: message, isUser, id: Date.now() }]);
  }

  function handleQuickReply(reply, section, field) {
    addChatMessage(reply, true);
    updateOnboardingData(section, { [field]: reply });
    setCurrentInput("");
  }

  function handleSkip(nextStage) {
    setStage(nextStage);
  }

  function handleBack(prevStage) {
    setStage(prevStage);
  }

  function handleResumeUpload(e) {
    const file = e.target.files?.[0];
    if (file) {
      updateOnboardingData('resume', { uploaded: true, fileName: file.name, skipped: false });
      addChatMessage(`Uploaded: ${file.name}`, true);
    }
  }

  function startPlanGeneration() {
    setStage("plan-generation");
    let currentStep = 0;
    const interval = setInterval(() => {
      setPlanGeneration(prev => {
        const newSteps = [...prev.steps];
        if (currentStep < newSteps.length) {
          newSteps[currentStep].completed = true;
          currentStep++;
          return { ...prev, steps: newSteps, currentStep };
        } else {
          clearInterval(interval);
          setTimeout(() => setStage("plan-preview"), 1000);
          return prev;
        }
      });
    }, 800);
  }

  return (
    <div className="dark relative min-h-screen w-full overflow-hidden bg-background text-foreground" style={bgGrid}>
      <NeonCursor />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(96,165,250,0.05),transparent)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16">
        <AnimatePresence mode="wait">
          {stage === "oauth" && (
            <FogCard key="oauth" className="max-w-[520px]">
              <div className="mb-6 flex items-center gap-3 text-sm text-gray-300">
                <div className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/10"><IconSparkle /></div>
                <div className="font-semibold tracking-wide text-gray-100">HeadwayOS</div>
              </div>
              <h1 className="mb-2 text-2xl font-semibold">Your journey, in stunning clarity.</h1>
              <p className="mb-6 text-sm text-gray-300">Extraordinary career workflow. No design skills required. Sign up to continue.</p>
              <div className="grid gap-3">
                <PrimaryButton onClick={() => mockAuth()} disabled={processing}>
                  {processing ? <Loader /> : <GoogleGlyph />}<span>Continue with Google</span>
                </PrimaryButton>
                <GhostButton onClick={() => mockAuth()} disabled={processing}>
                  {processing ? <Loader /> : <LinkedInGlyph />}<span>Continue with LinkedIn</span>
                </GhostButton>
              </div>
              <div className="mt-6 text-center text-xs text-gray-400">Already a user? <button className="underline underline-offset-2">Log in</button></div>
              <div className="mt-6 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-gray-400">By continuing, you agree to the Terms and acknowledge the Privacy Policy.</div>
            </FogCard>
          )}

          {stage === "intro" && (
            <FogCard key="intro" className="max-w-[980px]">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-3xl font-semibold">A top-tier workflow without the overhead.</h2>
                  <p className="mb-6 text-gray-300">HeadwayOS transforms your inputs into clear progress—applications, learning, resume tailoring, and a flexible canvas. You focus on outcomes; we shape the path.</p>
                  <PrimaryButton onClick={() => handleContinue("roles")}>
                    Continue<IconArrowRight className="ml-1"/>
                  </PrimaryButton>
                  <div className="mt-4 text-xs text-gray-400">Takes less than a minute. No emails yet.</div>
                </div>
                <div className="relative hidden min-h-[260px] rounded-xl border border-white/10 bg-white/5 p-4 md:block">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent" />
                  <div className="relative grid h-full grid-cols-2 gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-gray-300">Resume Tailor<div className="mt-3 h-2 rounded bg-white/10"/><div className="mt-2 h-2 w-2/3 rounded bg-white/10"/></div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-gray-300">Jobs<div className="mt-3 h-2 rounded bg-white/10"/><div className="mt-2 h-2 w-4/5 rounded bg-white/10"/></div>
                    <div className="col-span-2 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-gray-300">Canvas<div className="mt-3 grid grid-cols-6 gap-2">
                      {Array.from({length:8}).map((_,i)=>(<div key={i} className="h-10 rounded bg-white/10"/>))}
                    </div></div>
                  </div>
                </div>
              </div>
            </FogCard>
          )}

          {stage === "roles" && (
            <FogCard key="roles" className="max-w-[840px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Which of these best describes your work?</h3>
                  <p className="mt-1 text-sm text-gray-300">Select all that apply.</p>
                </div>
                <GhostButton onClick={() => handleContinue("intro")}><IconChevronLeft />Back</GhostButton>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Product","Design","Sales","Growth","Engineering","Founder/C‑suite","Marketing","Customer/Support","Strategy/Ops","Finance","Research","Agency","Education","Other"
                ].map((tag)=> (
                  <Chip key={tag} label={tag} active={roles.includes(tag)} onToggle={()=>toggleRole(tag)} />
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="text-xs text-gray-400">You can change this later in Preferences.</div>
                <PrimaryButton onClick={() => handleContinue("workspace")}>
                  Continue<IconArrowRight className="ml-1"/>
                </PrimaryButton>
              </div>
            </FogCard>
          )}

          {stage === "workspace" && (
            <FogCard key="workspace" className="max-w-[720px]">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Create a space for your work</h3>
                <GhostButton onClick={() => handleContinue("roles")}><IconChevronLeft />Back</GhostButton>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-md border border-white/10 bg-white/5">
                    {logo ? <img src={logo} alt="logo preview" className="h-full w-full object-cover"/> : <GlyphImage className="h-5 w-5 text-gray-400"/>}
                  </div>
                  <div className="grid gap-2">
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleLogo}/>
                    <GhostButton onClick={()=>inputRef.current?.click()}><IconUpload />Upload logo</GhostButton>
                    <div className="text-[11px] text-gray-400">PNG/SVG recommended, 256×256</div>
                  </div>
                </div>
                <label className="grid gap-2">
                  <span className="text-sm text-muted-foreground">Workspace name</span>
                  <input value={wsName} onChange={(e)=>setWsName(e.target.value)} className="h-11 rounded-md border border-border bg-input px-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring" placeholder="e.g., Darshil's Workspace"/>
                </label>
                <div className="mt-2 flex justify-end"><PrimaryButton onClick={createWorkspace} disabled={processing}>{processing ? (<><Loader className="mr-2"/>Creating…</>) : (<>Create<IconArrowRight className="ml-1"/></>)}</PrimaryButton></div>
              </div>
            </FogCard>
          )}

          {stage === "ready" && (
            <FogCard key="ready" className="max-w-[600px]">
              <div className="mb-4 text-center text-xl font-semibold">Preparing your workspace</div>
              <ProgressShimmer />
              <div className="mt-6 text-center text-sm text-gray-300">Setting up modules: Resume, Jobs, Learning, Canvas…</div>
              <div className="mt-8 flex justify-center">
                <PrimaryButton onClick={() => setStage("welcome")}>Continue Setup<IconArrowRight className="ml-1"/></PrimaryButton>
              </div>
            </FogCard>
          )}

          {/* NEW ONBOARDING FORM STAGES */}
          {stage === "welcome" && (
            <FogCard key="welcome" className="max-w-[640px]">
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/10"><IconSparkle /></div>
                <div className="mb-2 text-2xl font-semibold">Let's personalize your journey</div>
                <p className="mb-6 text-sm text-gray-300">This takes ~3–5 minutes. We'll create a tailored roadmap, match your skills to opportunities, and build your weekly plan. Your data stays private—you choose what to save.</p>
                <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-gray-300">You'll unlock:</div>
                  <div className="mt-2 space-y-1 text-xs text-gray-400">
                    <div>• Personalized skill match score</div>
                    <div>• ATS-ready resume tailoring</div>
                    <div>• Weekly learning plan with ETA</div>
                  </div>
                </div>
                <PrimaryButton onClick={() => setStage("role-goal")}>Get Started<IconArrowRight className="ml-1"/></PrimaryButton>
              </div>
            </FogCard>
          )}

          {stage === "role-goal" && (
            <FogCard key="role-goal" className="max-w-[800px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Tell us about your goals</h3>
                  <p className="mt-1 text-sm text-gray-300">Quick questions to understand your career direction</p>
                </div>
                <GhostButton onClick={() => handleBack("welcome")}><IconChevronLeft />Back</GhostButton>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-3">What roles are you targeting?</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Frontend Engineer", "Backend Engineer", "Full Stack", "DevOps Engineer", "Data Scientist", "Product Manager", "UI/UX Designer"].map((role) => (
                      <QuickReplyPill 
                        key={role} 
                        text={role} 
                        selected={onboardingData.role.roles.includes(role)}
                        onClick={() => {
                          const newRoles = onboardingData.role.roles.includes(role) 
                            ? onboardingData.role.roles.filter(r => r !== role)
                            : [...onboardingData.role.roles, role];
                          updateOnboardingData('role', { roles: newRoles });
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Your seniority level?</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Entry Level", "Mid Level", "Senior", "Lead/Principal", "Director+"].map((level) => (
                      <QuickReplyPill 
                        key={level} 
                        text={level} 
                        selected={onboardingData.role.seniority === level}
                        onClick={() => updateOnboardingData('role', { seniority: level })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Job search mode?</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Active", "Open to offers", "Not looking", "Exploring"].map((mode) => (
                      <QuickReplyPill 
                        key={mode} 
                        text={mode} 
                        selected={onboardingData.role.intent === mode}
                        onClick={() => updateOnboardingData('role', { intent: mode })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <GhostButton onClick={() => handleSkip("skills")}>Skip</GhostButton>
                <PrimaryButton 
                  onClick={() => setStage("skills")}
                  disabled={onboardingData.role.roles.length === 0}
                >
                  Continue<IconArrowRight className="ml-1"/>
                </PrimaryButton>
              </div>
            </FogCard>
          )}

          {stage === "skills" && (
            <FogCard key="skills" className="max-w-[800px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Your experience & skills</h3>
                  <p className="mt-1 text-sm text-gray-300">Help us understand your background</p>
                </div>
                <GhostButton onClick={() => handleBack("role-goal")}><IconChevronLeft />Back</GhostButton>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-3">Years of experience</label>
                    <div className="flex flex-wrap gap-2">
                      {["0-1", "2-3", "4-6", "7-10", "10+"].map((yoe) => (
                        <QuickReplyPill 
                          key={yoe} 
                          text={yoe} 
                          selected={onboardingData.skills.yoe === yoe}
                          onClick={() => updateOnboardingData('skills', { yoe })}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-3">Work authorization</label>
                    <div className="flex flex-wrap gap-2">
                      {["US Citizen", "Green Card", "H1B", "International"].map((auth) => (
                        <QuickReplyPill 
                          key={auth} 
                          text={auth} 
                          selected={onboardingData.skills.authorization === auth}
                          onClick={() => updateOnboardingData('skills', { authorization: auth })}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Region/Time zone</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["PST", "EST", "CST", "MST", "IST", "GMT", "CET"].map((region) => (
                      <QuickReplyPill 
                        key={region} 
                        text={region} 
                        selected={onboardingData.skills.region === region}
                        onClick={() => updateOnboardingData('skills', { region })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Current skills</label>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {onboardingData.skills.skills.map((skill, i) => (
                        <SkillChip 
                          key={i} 
                          skill={skill} 
                          onRemove={() => {
                            const newSkills = onboardingData.skills.skills.filter((_, idx) => idx !== i);
                            updateOnboardingData('skills', { skills: newSkills });
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400">Quick add:</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker", "Git"].map((tech) => (
                        <button 
                          key={tech}
                          onClick={() => {
                            if (!onboardingData.skills.skills.find(s => s.name === tech)) {
                              const newSkill = { name: tech, level: "proficient" };
                              updateOnboardingData('skills', { 
                                skills: [...onboardingData.skills.skills, newSkill] 
                              });
                            }
                          }}
                          className="text-xs border border-white/10 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition"
                        >
                          + {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <GhostButton onClick={() => handleSkip("pace")}>Skip</GhostButton>
                <PrimaryButton onClick={() => setStage("pace")}>
                  Continue<IconArrowRight className="ml-1"/>
                </PrimaryButton>
              </div>
            </FogCard>
          )}

          {stage === "pace" && (
            <FogCard key="pace" className="max-w-[720px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Time commitment & pace</h3>
                  <p className="mt-1 text-sm text-gray-300">How much time can you dedicate to learning?</p>
                </div>
                <GhostButton onClick={() => handleBack("skills")}><IconChevronLeft />Back</GhostButton>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-3">Commitment mode</label>
                  <div className="flex gap-4 mb-4">
                    <QuickReplyPill 
                      text="Hours per week" 
                      selected={onboardingData.pace.mode === "hours"}
                      onClick={() => updateOnboardingData('pace', { mode: "hours" })}
                    />
                    <QuickReplyPill 
                      text="Sessions per week" 
                      selected={onboardingData.pace.mode === "sessions"}
                      onClick={() => updateOnboardingData('pace', { mode: "sessions" })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">
                    {onboardingData.pace.mode === "hours" ? "Hours per week" : "Sessions per week"}
                  </label>
                  <div className="flex gap-2 mb-4">
                    {[2, 5, 10, 15, 20].map((value) => (
                      <QuickReplyPill 
                        key={value} 
                        text={value.toString()} 
                        selected={onboardingData.pace.value === value}
                        onClick={() => updateOnboardingData('pace', { value })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Preferred days</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <QuickReplyPill 
                        key={day} 
                        text={day} 
                        selected={onboardingData.pace.days.includes(day)}
                        onClick={() => {
                          const newDays = onboardingData.pace.days.includes(day)
                            ? onboardingData.pace.days.filter(d => d !== day)
                            : [...onboardingData.pace.days, day];
                          updateOnboardingData('pace', { days: newDays });
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Time of day</label>
                  <div className="flex gap-2 mb-4">
                    {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
                      <QuickReplyPill 
                        key={time} 
                        text={time} 
                        selected={onboardingData.pace.timeOfDay === time}
                        onClick={() => updateOnboardingData('pace', { timeOfDay: time })}
                      />
                    ))}
                  </div>
                </div>

                {onboardingData.pace.mode && onboardingData.pace.value && (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-gray-300">Estimated completion:</div>
                    <div className="text-lg font-medium text-gray-100 mt-1">
                      {onboardingData.pace.value >= 10 ? "2-3 months" : onboardingData.pace.value >= 5 ? "4-6 months" : "6+ months"}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <GhostButton onClick={() => handleSkip("market")}>Skip</GhostButton>
                <PrimaryButton onClick={() => setStage("market")}>
                  Continue<IconArrowRight className="ml-1"/>
                </PrimaryButton>
              </div>
            </FogCard>
          )}

          {stage === "market" && (
            <FogCard key="market" className="max-w-[840px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Market snapshot</h3>
                  <p className="mt-1 text-sm text-gray-300">Current opportunities for your target role</p>
                </div>
                <GhostButton onClick={() => handleBack("pace")}><IconChevronLeft />Back</GhostButton>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-gray-300 mb-2">Open roles near you</div>
                    <div className="text-2xl font-semibold text-gray-100">2,847</div>
                    <div className="text-xs text-gray-400">+127 added in last 14 days</div>
                  </div>
                  
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-gray-300 mb-2">Median compensation</div>
                    <div className="text-2xl font-semibold text-gray-100">$125K</div>
                    <div className="text-xs text-gray-400">Based on {onboardingData.skills.region || "your region"}</div>
                  </div>
                </div>
                
                <div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-gray-300 mb-3">Top 5 skills in demand</div>
                    <div className="space-y-2">
                      {["JavaScript/TypeScript", "React/Next.js", "Node.js/Express", "Cloud (AWS/Azure)", "Docker/Kubernetes"].map((skill, i) => (
                        <div key={skill} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{skill}</span>
                          <span className="text-xs text-gray-400">{95 - i * 5}% of jobs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <GhostButton onClick={() => handleSkip("resume")}>Skip</GhostButton>
                <div className="flex gap-3">
                  <GhostButton onClick={() => setStage("role-goal")}>Adjust role</GhostButton>
                  <PrimaryButton onClick={() => {
                    updateOnboardingData('market', { seen: true });
                    setStage("resume");
                  }}>
                    Looks good<IconArrowRight className="ml-1"/>
                  </PrimaryButton>
                </div>
              </div>
            </FogCard>
          )}

          {stage === "resume" && (
            <FogCard key="resume" className="max-w-[720px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Resume & portfolio</h3>
                  <p className="mt-1 text-sm text-gray-300">Upload for personalized analysis (optional)</p>
                </div>
                <GhostButton onClick={() => handleBack("market")}><IconChevronLeft />Back</GhostButton>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <div className="text-center">
                    {!onboardingData.resume.uploaded ? (
                      <>
                        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-lg border border-white/10 bg-white/5">
                          <IconUpload className="h-6 w-6 text-gray-400" />
                        </div>
                        <input 
                          ref={resumeInputRef} 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          className="hidden" 
                          onChange={handleResumeUpload}
                        />
                        <PrimaryButton onClick={() => resumeInputRef.current?.click()}>
                          <IconUpload />Upload Resume
                        </PrimaryButton>
                        <div className="mt-2 text-xs text-gray-400">PDF, DOC, or DOCX • Max 10MB</div>
                      </>
                    ) : (
                      <div>
                        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-lg border border-green-500/20 bg-green-500/10">
                          <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-300">✓ {onboardingData.resume.fileName}</div>
                        <div className="text-xs text-gray-400 mt-1">Resume uploaded successfully</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="text-sm text-gray-300 mb-2">🔒 Privacy first</div>
                  <div className="text-xs text-gray-400 leading-relaxed">
                    Your resume is parsed locally in your browser. We only save the skills and experience you explicitly choose to include in your profile.
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <GhostButton onClick={() => {
                  updateOnboardingData('resume', { skipped: true });
                  setStage("preferences");
                }}>
                  Skip for now
                </GhostButton>
                <PrimaryButton onClick={() => setStage("preferences")}>
                  Continue<IconArrowRight className="ml-1"/>
                </PrimaryButton>
              </div>
            </FogCard>
          )}

          {stage === "preferences" && (
            <FogCard key="preferences" className="max-w-[800px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Learning preferences</h3>
                  <p className="mt-1 text-sm text-gray-300">Customize your learning experience</p>
                </div>
                <GhostButton onClick={() => handleBack("resume")}><IconChevronLeft />Back</GhostButton>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-3">Preferred content formats</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Videos", "Articles", "Interactive", "Courses", "Tutorials", "Documentation"].map((format) => (
                      <QuickReplyPill 
                        key={format} 
                        text={format} 
                        selected={onboardingData.preferences.contentFormats.includes(format)}
                        onClick={() => {
                          const newFormats = onboardingData.preferences.contentFormats.includes(format)
                            ? onboardingData.preferences.contentFormats.filter(f => f !== format)
                            : [...onboardingData.preferences.contentFormats, format];
                          updateOnboardingData('preferences', { contentFormats: newFormats });
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">Baseline difficulty</label>
                  <div className="flex gap-2 mb-4">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <QuickReplyPill 
                        key={level} 
                        text={level} 
                        selected={onboardingData.preferences.difficulty === level}
                        onClick={() => updateOnboardingData('preferences', { difficulty: level })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-3">AI mentor features</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={onboardingData.preferences.aiMentor}
                        onChange={(e) => updateOnboardingData('preferences', { aiMentor: e.target.checked })}
                        className="rounded border-white/20 bg-white/5 text-white/20"
                      />
                      <span className="text-sm text-gray-300">Enable AI explanations & quizzes</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={onboardingData.preferences.notifications}
                        onChange={(e) => updateOnboardingData('preferences', { notifications: e.target.checked })}
                        className="rounded border-white/20 bg-white/5 text-white/20"
                      />
                      <span className="text-sm text-gray-300">Weekly progress notifications</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <GhostButton onClick={() => handleSkip("plan-generation")}>Skip</GhostButton>
                <PrimaryButton onClick={() => {
                  updateOnboardingData('preferences', { saved: true });
                  startPlanGeneration();
                }}>
                  Continue<IconArrowRight className="ml-1"/>
                </PrimaryButton>
              </div>
            </FogCard>
          )}

          {stage === "plan-generation" && (
            <FogCard key="plan-generation" className="max-w-[640px]">
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/10">
                  <IconSparkle className="animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Generating your plan</h3>
                <p className="text-sm text-gray-300">Creating your personalized learning roadmap</p>
              </div>
              
              <div className="space-y-3">
                {planGeneration.steps.map((step, i) => (
                  <GenerationStep 
                    key={i}
                    step={step}
                    completed={step.completed}
                    active={i === planGeneration.currentStep}
                  />
                ))}
              </div>
              
              <div className="mt-8 text-center text-xs text-gray-400">
                This may take a few moments...
              </div>
            </FogCard>
          )}

          {stage === "plan-preview" && (
            <FogCard key="plan-preview" className="max-w-[1000px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Your personalized roadmap</h3>
                  <p className="mt-1 text-sm text-gray-300">7 Topics • 20 Subtopics • 116 Resources</p>
                </div>
                <GhostButton onClick={() => handleBack("preferences")}><IconChevronLeft />Back</GhostButton>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <PlanPreviewCard 
                  title="Frontend Skills" 
                  count={8}
                  items={["React Fundamentals", "State Management", "Component Patterns", "Performance Optimization"]}
                />
                <PlanPreviewCard 
                  title="Backend Skills" 
                  count={6}
                  items={["Node.js Basics", "Database Design", "API Development", "Authentication"]}
                />
                <PlanPreviewCard 
                  title="DevOps & Tools" 
                  count={6}
                  items={["Docker Containers", "CI/CD Pipelines", "Cloud Deployment", "Monitoring"]}
                />
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
                <h4 className="font-medium text-gray-200 mb-3">Up Next (Week 1)</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">JavaScript ES6+ Features</span>
                    <span className="text-xs text-gray-400">3 hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">React Component Basics</span>
                    <span className="text-xs text-gray-400">2 hours</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  Estimated completion: {onboardingData.pace.value >= 10 ? "2-3 months" : "4-6 months"}
                </div>
                <div className="flex gap-3">
                  <GhostButton onClick={() => setStage("role-goal")}>Make changes</GhostButton>
                  <PrimaryButton onClick={() => setStage("final-done")}>
                    This roadmap is perfect<IconArrowRight className="ml-1"/>
                  </PrimaryButton>
                </div>
              </div>
            </FogCard>
          )}

          {stage === "final-done" && (
            <FogCard key="final-done" className="max-w-[640px]">
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/10"><IconSparkle /></div>
                <div className="mb-2 text-2xl font-semibold">You're all set!</div>
                <p className="mb-6 text-sm text-gray-300">Your workspace "{wsName}" is ready with your personalized roadmap. We've pinned your next learning modules to get you started.</p>
                <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-medium text-gray-200 mb-2">Your learning plan includes:</div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>• {onboardingData.role.roles.join(", ")} skill development</div>
                    <div>• {onboardingData.pace.value} {onboardingData.pace.mode}/week schedule</div>
                    <div>• {onboardingData.preferences.contentFormats.length > 0 ? onboardingData.preferences.contentFormats.join(", ") : "Mixed"} content format</div>
                    <div>• Estimated completion in {onboardingData.pace.value >= 10 ? "2-3 months" : "4-6 months"}</div>
                  </div>
                </div>
                <PrimaryButton onClick={() => router.push("/dashboard")}>Start Learning<IconArrowRight className="ml-1"/></PrimaryButton>
              </div>
            </FogCard>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}