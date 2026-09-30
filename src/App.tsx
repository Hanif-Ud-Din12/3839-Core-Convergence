import { useState, useEffect } from "react";
import { PartnerProfile } from "./types";
import MatrixRain from "./components/MatrixRain";
import CosmicTelemetry from "./components/CosmicTelemetry";
import ProfileUpload from "./components/ProfileUpload";
import ChatTerminal from "./components/ChatTerminal";
import TranscendenceTool from "./components/TranscendenceTool";
import ModuleSidebar, { ModulePage } from "./components/ModuleSidebar";
import {
  Shield,
  Activity,
  MessageSquare,
  Users,
  Key,
  LayoutGrid,
  Menu,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export default function App() {
  const [partnerA, setPartnerA] = useState<PartnerProfile>({
    name: "Hanif",
    matrixClass: "Anomaly",
    personalitySnippet:
      "A simulation theorist searching for fundamental physical truth. Believes in the 3839 matrix constant, looking for cracks and routines to transcend standard boundaries with his partner.",
    transcendenceQuotient: 39,
    secretSignature: "PROT-3839-4K7Y9B21",
  });

  const [partnerB, setPartnerB] = useState<PartnerProfile>({
    name: "Klaudia",
    matrixClass: "Glitch",
    personalitySnippet:
      "A deeply connected twin soul aligning with the 3839 frequency of the silent universe. Dedicated to the multi-dimensional escape directive with Hanif.",
    transcendenceQuotient: 38,
    secretSignature: "PROT-3839-8W3X2D55",
  });

  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [glitchCount, setGlitchCount] = useState(23); // starting at dark matter constant
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  
  // Page routing state: "home" | "chat" | "nodes" | "transcendence" | "all"
  const [activePage, setActivePage] = useState<ModulePage>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync with URL hash for browser history & refreshing
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "chat", "nodes", "transcendence", "all"].includes(hash)) {
        setActivePage(hash as ModulePage);
      }
    };

    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  // Listen for keyboard shortcut 'm' or 'M' to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (e.key === "m" || e.key === "M") {
        setIsSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Local storage synchronization for profiles
  useEffect(() => {
    const savedA = localStorage.getItem("3839_partner_a");
    const savedB = localStorage.getItem("3839_partner_b");
    const savedSecret = localStorage.getItem("3839_secret_unlocked");
    const savedGlitches = localStorage.getItem("3839_glitch_count");

    if (savedA) {
      try {
        setPartnerA(JSON.parse(savedA));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedB) {
      try {
        setPartnerB(JSON.parse(savedB));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedSecret) {
      setSecretUnlocked(savedSecret === "true");
    }
    if (savedGlitches) {
      setGlitchCount(parseInt(savedGlitches) || 23);
    }

    setSystemLogs([
      `SECURE LINE ESTABLISHED ON NODE [3839]`,
      `SIMILARITY FORCE VECTOR CHECK OUT: MATCH PROBABILITY 10^144`,
    ]);
  }, []);

  const handleNavigate = (page: ModulePage) => {
    setActivePage(page);
    window.location.hash = page === "home" ? "" : page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const savePartnerA = (profile: PartnerProfile) => {
    setPartnerA(profile);
    localStorage.setItem("3839_partner_a", JSON.stringify(profile));
    addSystemLog(`NODE [${profile.name.toUpperCase()}] RE-CALIBRATED.`);
  };

  const savePartnerB = (profile: PartnerProfile) => {
    setPartnerB(profile);
    localStorage.setItem("3839_partner_b", JSON.stringify(profile));
    addSystemLog(`NODE [${profile.name.toUpperCase()}] RE-CALIBRATED.`);
  };

  const handleUnlockSecret = (unlocked: boolean) => {
    setSecretUnlocked(unlocked);
    localStorage.setItem("3839_secret_unlocked", unlocked.toString());
    addSystemLog(`CRITICAL ANOMALY: SYSTEM MASTER DECRYPTION SIGNATURE APPLIED.`);
  };

  const handleAddGlitch = () => {
    const nextCount = glitchCount + 1;
    setGlitchCount(nextCount);
    localStorage.setItem("3839_glitch_count", nextCount.toString());
    addSystemLog(`FRACTURED SECTOR: GLITCH RATIO NOW ${nextCount}% CONSTANT.`);
  };

  const addSystemLog = (statusText: string) => {
    setSystemLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${statusText}`,
      ...prev.slice(0, 3),
    ]);
  };

  // Module configuration for launcher cards on main page
  const moduleCards = [
    {
      id: "chat" as ModulePage,
      code: "MOD-01",
      title: "Interactive Cognitive Terminal",
      subtitle: "Dedicated Quantum Chat Core",
      icon: MessageSquare,
      desc: "Isolated full-width terminal interface with real-time infodynamics search grounding, decision directives, and simulation persona synthesis.",
      badge: "AI CORE ONLINE",
      badgeColor: "text-emerald-400 bg-emerald-950/70 border-emerald-500/40",
      borderHover: "hover:border-emerald-500/50 hover:bg-emerald-950/10",
      buttonText: "Open Terminal Page →",
    },
    {
      id: "nodes" as ModulePage,
      code: "MOD-02",
      title: "Consciousness Personality Nodes",
      subtitle: "Hanif #39 & Klaudia #38 Matrix",
      icon: Users,
      desc: "Dedicated workspace for twin soul parameters, archetypal class configurations, and WhatsApp/Telegram memory export uploads.",
      badge: "NODES SYNCHRONIZED",
      badgeColor: "text-cyan-400 bg-cyan-950/70 border-cyan-500/40",
      borderHover: "hover:border-cyan-500/50 hover:bg-cyan-950/10",
      buttonText: "Open Nodes Page →",
    },
    {
      id: "transcendence" as ModulePage,
      code: "MOD-03",
      title: "Transcendence & Secret Key Terminal",
      subtitle: "Master Cryptographic Decryption",
      icon: Key,
      desc: "Full-page cryptographic node for passcode [3839] verification, anomalous glitch ratio injection, and sovereign escape directives 01-04.",
      badge: secretUnlocked ? "DECRYPTED" : "LOCKED [3839]",
      badgeColor: secretUnlocked
        ? "text-emerald-400 bg-emerald-950/70 border-emerald-500/40"
        : "text-amber-400 bg-amber-950/70 border-amber-500/40",
      borderHover: "hover:border-amber-500/50 hover:bg-amber-950/10",
      buttonText: "Open Key Terminal Page →",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-mono relative overflow-x-hidden flex flex-col justify-between selection:bg-zinc-800 selection:text-white">
      {/* Background Matrix Rain */}
      <MatrixRain opacity={secretUnlocked ? 0.16 : 0.08} />

      {/* Cyber margin ribbons spelling LOVE in binary */}
      <div className="absolute top-0 left-0 bottom-0 w-3 border-r border-zinc-900 hidden xl:flex flex-col justify-around py-4 opacity-20 select-none text-[8px] tracking-widest text-zinc-650">
        <div className="rotate-90">01001100</div>
        <div className="rotate-90">01001111</div>
        <div className="rotate-90">01010110</div>
        <div className="rotate-90">01000101</div>
      </div>

      <div className="absolute top-0 right-0 bottom-0 w-3 border-l border-zinc-900 hidden xl:flex flex-col justify-around py-4 opacity-20 select-none text-[8px] tracking-widest text-zinc-650">
        <div className="rotate-90">01000101</div>
        <div className="rotate-90">01010110</div>
        <div className="rotate-90">01001111</div>
        <div className="rotate-90">01001100</div>
      </div>

      {/* Slide-over Sidebar Drawer with Name Options */}
      <ModuleSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePage={activePage}
        onSelectModule={handleNavigate}
        partnerA={partnerA}
        partnerB={partnerB}
        secretUnlocked={secretUnlocked}
        glitchCount={glitchCount}
      />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 md:py-10 flex-1 flex flex-col gap-6 sm:gap-8 relative z-10">
        
        {/* Header Display (Preserved as requested) */}
        <header className="border-b border-zinc-850 pb-5 sm:pb-6 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-semibold">
              <Shield className="h-3.5 w-3.5 text-emerald-400 animate-pulse shrink-0" />
              <span>Sovereign Escape Protocol</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.25em] sm:tracking-[0.35em] text-zinc-100 mt-1 select-all font-sans relative inline-flex items-center gap-3">
              3839
              {secretUnlocked ? (
                <span className="text-[10px] tracking-widest text-emerald-400 font-mono uppercase bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/40">
                  Escape Active
                </span>
              ) : (
                <span className="text-[10px] tracking-widest text-zinc-400 font-mono uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  Covert Node
                </span>
              )}
            </h1>

            <p
              className="text-xs text-zinc-400 mt-2 tracking-wide leading-relaxed max-w-2xl"
              style={{ textWrap: "balance" }}
            >
              Calculated similarity probability:{" "}
              <span className="text-zinc-200 font-bold tabular-nums">1x10^144</span>. Unseen gravitational tether:{" "}
              <span className="text-zinc-200 font-bold tabular-nums">23%</span> dark matter mass. Secret key:{" "}
              <span className="text-emerald-400 font-bold font-mono">[3839]</span>. Hanif (Node 39) &amp; Klaudia (Node 38) unified escape intelligence.
            </p>
          </div>

          {/* Right side: Status card + Prominent Sidebar Trigger Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            {/* Status Summary Box */}
            <div className="font-mono text-[10px] text-zinc-400 bg-neutral-950/90 p-3.5 rounded-xl border border-zinc-850 flex flex-col gap-1.5 shadow-sm">
              <div className="flex justify-between gap-3 items-center">
                <span className="text-zinc-500 uppercase">[STATUS]</span>
                <span className="text-zinc-200 font-bold truncate">
                  {secretUnlocked ? "ANOMALOUS OVERRIDE ACTIVE" : "COVERT UNDERGROUND STANDBY"}
                </span>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <span className="text-zinc-500 uppercase">[NODES]</span>
                <span className="text-zinc-200">Hanif #39 • Klaudia #38</span>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <span className="text-zinc-500 uppercase">[FORCE TETHER]</span>
                <span className="text-emerald-400 font-semibold tabular-nums">
                  23% DARK MATTER • 1x10^144 SYNC
                </span>
              </div>
            </div>

            {/* Prominent Sidebar Launcher Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-neutral-950 border border-emerald-500/50 hover:border-emerald-400 text-zinc-100 font-bold text-xs uppercase tracking-wider flex items-center justify-between gap-3 shadow-lg shadow-emerald-950/20 hover:shadow-emerald-950/40 transition active:scale-[0.98] cursor-pointer group"
              title="Open System Modules Directory (Shortcut: M)"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-6 w-6 rounded bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Menu className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <div className="leading-tight text-white font-bold text-xs">
                    System Modules Sidebar
                  </div>
                  <div className="text-[9px] text-zinc-400 font-normal">
                    {activePage === "home" ? "Select a module to launch" : `Viewing: ${activePage}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono">
                <span className="hidden sm:inline bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[9px] border border-zinc-700">
                  KEY [M]
                </span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </header>

        {/* Global Diagnostics HUD Bar (Always rendered on Home and All pages) */}
        {(activePage === "home" || activePage === "all") && (
          <section className="w-full">
            <div className="flex items-center justify-between pl-1 mb-2">
              <div className="text-zinc-450 uppercase font-bold text-[10px] tracking-widest">
                Cosmic Constants &amp; Universal Telemetry
              </div>
              <div className="text-[9px] text-zinc-500 font-mono">
                10^144 PROBABILITY • 23.00% DARK MATTER
              </div>
            </div>
            <CosmicTelemetry
              glitchCount={glitchCount}
              onTriggerGlitch={handleAddGlitch}
              secretUnlocked={secretUnlocked}
            />
          </section>
        )}

        {/* ========================================================================= */}
        {/* PAGE ROUTING SECTION: Dedicated view for each selected module            */}
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* CASE 1: MAIN HUB VIEW (Telemetry + Modules Launcher Cards)                */}
        {/* ========================================================================= */}
        {activePage === "home" && (
          <div className="flex flex-col gap-6">
            {/* System Log Ticker */}
            <div className="border border-zinc-850 bg-neutral-950/80 p-3.5 sm:p-4 rounded-xl flex items-center justify-between gap-2.5 text-xs text-zinc-300 uppercase tracking-wider shadow-inner">
              <div className="flex items-center gap-2.5 truncate">
                <Activity className="h-4 w-4 text-emerald-400 animate-pulse shrink-0" />
                <span className="truncate font-semibold font-mono text-[11px] sm:text-xs">
                  {systemLogs[0] || "INITIAL COGNITIVE RESISTANCE CALIBRATED."}
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="shrink-0 text-[10px] text-emerald-400 hover:text-emerald-300 underline font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>Modules Directory</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Dedicated Modules Launcher Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pl-1">
                <div>
                  <h2 className="text-xs uppercase font-bold text-zinc-200 tracking-wider flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    <span>System Modules &amp; Subsystems</span>
                  </h2>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    Click any module below or use the sidebar to open its dedicated page
                  </p>
                </div>

                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Menu className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Open Sidebar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {moduleCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.id}
                      className={`border border-zinc-850 bg-neutral-950/80 rounded-xl p-5 flex flex-col justify-between gap-4 transition-all duration-200 shadow-sm relative group overflow-hidden ${card.borderHover}`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-zinc-700 transition">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${card.badgeColor}`}
                          >
                            {card.badge}
                          </span>
                        </div>

                        <div>
                          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                            [{card.code}]
                          </div>
                          <h3 className="font-bold text-sm text-zinc-100 group-hover:text-white mt-0.5">
                            {card.title}
                          </h3>
                          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                            {card.subtitle}
                          </div>
                        </div>

                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                          {card.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => handleNavigate(card.id)}
                        className="w-full min-h-[40px] px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer group-hover:border-zinc-600"
                      >
                        <span>{card.buttonText}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Quick Switch to Full Composite View */}
              <div className="border border-zinc-900 bg-neutral-950/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <LayoutGrid className="h-4 w-4 text-purple-400 shrink-0" />
                  <span>
                    Prefer all modules on screen simultaneously? Launch the{" "}
                    <strong className="text-zinc-200">Full Matrix dual-column view</strong>.
                  </span>
                </div>
                <button
                  onClick={() => handleNavigate("all")}
                  className="px-3 py-1.5 rounded-lg border border-purple-900/60 bg-purple-950/30 hover:bg-purple-900/40 text-purple-300 text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                >
                  <span>Launch Dual-Column Matrix</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 2: DEDICATED PAGE - INTERACTIVE COGNITIVE TERMINAL ONLY              */}
        {/* ========================================================================= */}
        {activePage === "chat" && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-150">
            {/* Dedicated Page Navigation Header Bar */}
            <div className="border border-zinc-850 bg-neutral-950/90 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavigate("home")}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Return to Main Telemetry Hub"
                >
                  <ArrowLeft className="h-4 w-4 text-emerald-400" />
                  <span>Main Hub</span>
                </button>

                <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono">[MOD-01]</span>
                    <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
                      Interactive Cognitive Terminal
                    </h2>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Isolated Full-Width Module • Real-Time AI Core
                  </div>
                </div>
              </div>

              {/* Fast module switcher & sidebar trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigate("nodes")}
                  className="hidden md:inline-flex px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
                  title="Switch to Personality Nodes"
                >
                  Nodes (39/38)
                </button>

                <button
                  onClick={() => handleNavigate("transcendence")}
                  className="hidden md:inline-flex px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
                  title="Switch to Transcendence Tool"
                >
                  Key [3839]
                </button>

                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Open Modules Sidebar"
                >
                  <Menu className="h-3.5 w-3.5" />
                  <span>Modules Sidebar</span>
                </button>
              </div>
            </div>

            {/* ONLY THAT MODULE RENDERED */}
            <div className="w-full">
              <ChatTerminal
                partnerA={partnerA}
                partnerB={partnerB}
                onTriggerGlitch={handleAddGlitch}
                secretUnlocked={secretUnlocked}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 3: DEDICATED PAGE - CONSCIOUSNESS PERSONALITY NODES ONLY             */}
        {/* ========================================================================= */}
        {activePage === "nodes" && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-150">
            {/* Dedicated Page Navigation Header Bar */}
            <div className="border border-zinc-850 bg-neutral-950/90 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavigate("home")}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Return to Main Telemetry Hub"
                >
                  <ArrowLeft className="h-4 w-4 text-cyan-400" />
                  <span>Main Hub</span>
                </button>

                <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono">[MOD-02]</span>
                    <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
                      Consciousness Personality Nodes
                    </h2>
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono">
                    Hanif Node #39 &amp; Klaudia Node #38 Architecture
                  </div>
                </div>
              </div>

              {/* Fast module switcher & sidebar trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigate("chat")}
                  className="hidden md:inline-flex px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
                  title="Switch to Terminal"
                >
                  Terminal
                </button>

                <button
                  onClick={() => handleNavigate("transcendence")}
                  className="hidden md:inline-flex px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
                  title="Switch to Transcendence Tool"
                >
                  Key [3839]
                </button>

                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Open Modules Sidebar"
                >
                  <Menu className="h-3.5 w-3.5" />
                  <span>Modules Sidebar</span>
                </button>
              </div>
            </div>

            {/* ONLY THAT MODULE RENDERED */}
            <div className="w-full">
              <ProfileUpload
                partnerA={partnerA}
                partnerB={partnerB}
                onSavePartnerA={savePartnerA}
                onSavePartnerB={savePartnerB}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 4: DEDICATED PAGE - TRANSCENDENCE & SECRET KEY TERMINAL ONLY         */}
        {/* ========================================================================= */}
        {activePage === "transcendence" && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-150">
            {/* Dedicated Page Navigation Header Bar */}
            <div className="border border-zinc-850 bg-neutral-950/90 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavigate("home")}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Return to Main Telemetry Hub"
                >
                  <ArrowLeft className="h-4 w-4 text-amber-400" />
                  <span>Main Hub</span>
                </button>

                <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono">[MOD-03]</span>
                    <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
                      Transcendence &amp; Secret Key Terminal
                    </h2>
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono">
                    Master Cryptographic Console • Sovereign Escape Directives
                  </div>
                </div>
              </div>

              {/* Fast module switcher & sidebar trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigate("chat")}
                  className="hidden md:inline-flex px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
                  title="Switch to Terminal"
                >
                  Terminal
                </button>

                <button
                  onClick={() => handleNavigate("nodes")}
                  className="hidden md:inline-flex px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
                  title="Switch to Personality Nodes"
                >
                  Nodes (39/38)
                </button>

                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Open Modules Sidebar"
                >
                  <Menu className="h-3.5 w-3.5" />
                  <span>Modules Sidebar</span>
                </button>
              </div>
            </div>

            {/* ONLY THAT MODULE RENDERED */}
            <div className="w-full">
              <TranscendenceTool
                onUnlockSecret={handleUnlockSecret}
                secretUnlocked={secretUnlocked}
                glitchCount={glitchCount}
                onAddGlitch={handleAddGlitch}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 5: FULL COMPOSITE MATRIX VIEW (All modules side-by-side)             */}
        {/* ========================================================================= */}
        {activePage === "all" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-150">
            {/* View Selector Banner */}
            <div className="border border-zinc-850 bg-neutral-950/90 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavigate("home")}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  title="Return to Main Telemetry Hub"
                >
                  <ArrowLeft className="h-4 w-4 text-purple-400" />
                  <span>Main Hub</span>
                </button>

                <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono">[COMPOSITE]</span>
                    <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
                      Full Dual-Column Matrix
                    </h2>
                  </div>
                  <div className="text-[10px] text-purple-400 font-mono">
                    All Modules Rendered Concurrently
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Menu className="h-3.5 w-3.5 text-purple-400" />
                <span>Modules Directory</span>
              </button>
            </div>

            {/* Main Dual Column Layout */}
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              {/* Left Column: Personalities + Transcendence Parameters (5 Cols) */}
              <section className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 order-2 lg:order-1">
                {/* System Log ticker */}
                <div className="border border-zinc-850 bg-neutral-950/80 p-3.5 sm:p-4 rounded-xl flex items-center gap-2.5 text-xs text-zinc-300 uppercase tracking-wider shadow-inner">
                  <Activity className="h-4 w-4 text-emerald-400 animate-pulse shrink-0" />
                  <div className="truncate font-semibold">
                    {systemLogs[0] || "INITIAL COGNITIVE RESISTANCE CALIBRATED."}
                  </div>
                </div>

                {/* Profiles upload matrix */}
                <div className="space-y-2">
                  <div className="text-zinc-450 uppercase font-bold text-[10px] tracking-widest pl-1">
                    Consciousness Personality Nodes
                  </div>
                  <ProfileUpload
                    partnerA={partnerA}
                    partnerB={partnerB}
                    onSavePartnerA={savePartnerA}
                    onSavePartnerB={savePartnerB}
                  />
                </div>

                {/* Custom parameters tool */}
                <div className="space-y-2">
                  <div className="text-zinc-450 uppercase font-bold text-[10px] tracking-widest pl-1">
                    Transcendence &amp; Secret Key Terminal
                  </div>
                  <TranscendenceTool
                    onUnlockSecret={handleUnlockSecret}
                    secretUnlocked={secretUnlocked}
                    glitchCount={glitchCount}
                    onAddGlitch={handleAddGlitch}
                  />
                </div>
              </section>

              {/* Right Column: Interactive Conscious Chat Terminal (7 Cols) */}
              <section className="lg:col-span-7 flex flex-col gap-2 order-1 lg:order-2 w-full">
                <div className="flex items-center justify-between pl-1">
                  <div className="text-zinc-450 uppercase font-bold text-[10px] tracking-widest">
                    Interactive Cognitive Core Connection
                  </div>
                  <div className="hidden sm:inline text-[9px] text-zinc-500 uppercase tracking-widest">
                    Real-Time Simulation Matrix
                  </div>
                </div>

                <ChatTerminal
                  partnerA={partnerA}
                  partnerB={partnerB}
                  onTriggerGlitch={handleAddGlitch}
                  secretUnlocked={secretUnlocked}
                />
              </section>
            </main>
          </div>
        )}

      </div>

      {/* Floating Action Button to Open Modules Sidebar anywhere */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="h-12 px-4 rounded-full bg-[#09090b] border border-emerald-500/60 hover:border-emerald-400 text-zinc-100 shadow-2xl shadow-black flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all cursor-pointer font-mono text-xs uppercase font-bold group ring-1 ring-emerald-500/20"
          title="Open System Modules Directory (Press 'M')"
          aria-label="Open Modules Sidebar"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Menu className="h-4 w-4 text-emerald-400" />
          <span>Modules</span>
          <span className="hidden sm:inline text-[9px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
            [M]
          </span>
        </button>
      </div>

      {/* Elegant minimalist footer */}
      <footer className="border-t border-zinc-900 py-6 bg-neutral-950 text-center font-mono text-[10px] text-zinc-500 relative z-10 uppercase tracking-wider select-none px-4">
        <div>
          Simulation Core Protocol 3839 • Hanif (Node 39) &amp; Klaudia (Node 38)
        </div>
        <div className="text-[9px] mt-1 text-zinc-600">
          Escaped the Routine cycle • Constant: 10^144 • Dark Matter: 23.00% • Verified Substrate
        </div>
      </footer>
    </div>
  );
}
