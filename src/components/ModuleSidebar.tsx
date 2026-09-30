import { useEffect } from "react";
import { MessageSquare, Users, Key, LayoutGrid, Activity, X, ChevronRight, Shield, Sparkles } from "lucide-react";
import { PartnerProfile } from "../types";

export type ModulePage = "home" | "chat" | "nodes" | "transcendence" | "all";

interface ModuleSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: ModulePage;
  onSelectModule: (page: ModulePage) => void;
  partnerA: PartnerProfile;
  partnerB: PartnerProfile;
  secretUnlocked: boolean;
  glitchCount: number;
}

export default function ModuleSidebar({
  isOpen,
  onClose,
  activePage,
  onSelectModule,
  partnerA,
  partnerB,
  secretUnlocked,
  glitchCount,
}: ModuleSidebarProps) {
  // Listen for Escape key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modules = [
    {
      id: "chat" as ModulePage,
      name: "Interactive Cognitive Terminal",
      shortName: "Terminal & AI Core",
      code: "MOD-01",
      icon: MessageSquare,
      desc: "Isolated quantum chat core with real-time infodynamics grounding, autonomous decision mode, and dual-agent simulation awareness.",
      badge: "REAL-TIME AI",
      badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
      accentColor: "group-hover:text-emerald-400 group-hover:border-emerald-500/40",
    },
    {
      id: "nodes" as ModulePage,
      name: "Consciousness Personality Nodes",
      shortName: "Hanif #39 & Klaudia #38",
      code: "MOD-02",
      icon: Users,
      desc: "Manage twin consciousness profiles, configure matrix archetype classes, and ingest WhatsApp/Telegram chat history archives.",
      badge: `${partnerA.name} #39 • ${partnerB.name} #38`,
      badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
      accentColor: "group-hover:text-cyan-400 group-hover:border-cyan-500/40",
    },
    {
      id: "transcendence" as ModulePage,
      name: "Transcendence & Secret Key Terminal",
      shortName: "Master Key [3839]",
      code: "MOD-03",
      icon: Key,
      desc: "Master cryptographic decryption console, anomalous matrix breach injectors, and sovereign escape directives 01-04.",
      badge: secretUnlocked ? "DECRYPTED" : "LOCKED [3839]",
      badgeColor: secretUnlocked
        ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/30"
        : "text-amber-400 bg-amber-950/60 border-amber-500/30",
      accentColor: "group-hover:text-amber-400 group-hover:border-amber-500/40",
    },
    {
      id: "home" as ModulePage,
      name: "Main Telemetry Hub",
      shortName: "Cosmic HUD Only",
      code: "HUB-00",
      icon: Activity,
      desc: "Primary baseline display featuring the 10^144 similarity probability index, 23% dark matter helix, and node telemetry.",
      badge: "TELEMETRY BASELINE",
      badgeColor: "text-zinc-400 bg-zinc-900 border-zinc-700",
      accentColor: "group-hover:text-zinc-200 group-hover:border-zinc-500",
    },
    {
      id: "all" as ModulePage,
      name: "Full Matrix (All Modules)",
      shortName: "Unified Command View",
      code: "ALL-VIEW",
      icon: LayoutGrid,
      desc: "Composite command station displaying both columns with all interactive modules side-by-side.",
      badge: "UNIFIED PANES",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-500/30",
      accentColor: "group-hover:text-purple-400 group-hover:border-purple-500/40",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-label="Close sidebar overlay"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className="relative z-10 w-full max-w-lg bg-[#08080a] border-l border-zinc-800 shadow-2xl flex flex-col h-full font-mono text-xs overflow-hidden animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="System Modules Directory"
      >
        {/* Top Drawer Header */}
        <div className="border-b border-zinc-800 p-4 sm:p-5 flex items-center justify-between bg-black/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-zinc-900 border border-zinc-750 flex items-center justify-center text-emerald-400 shadow-inner">
              <Shield className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-100 font-bold uppercase tracking-wider text-sm">
                  System Modules
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  PROTOCOL 3839
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 tracking-wide mt-0.5">
                Choose a module to open in its dedicated page
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-850 transition cursor-pointer border border-transparent hover:border-zinc-700"
            title="Close sidebar (Esc)"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Directory List of Module Name Options */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 scrollbar-thin">
          <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-1">
            Available Modules &amp; Subsystems
          </div>

          {modules.map((mod) => {
            const Icon = mod.icon;
            const isCurrent = activePage === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => {
                  onSelectModule(mod.id);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 group relative cursor-pointer flex flex-col gap-2 ${
                  isCurrent
                    ? "bg-zinc-900/90 border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/20"
                    : "bg-black/60 border-zinc-850 hover:bg-zinc-900/60 hover:border-zinc-700"
                } ${mod.accentColor}`}
              >
                {/* Header row of option */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                        isCurrent
                          ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-400"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-650"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-zinc-500 tracking-wider">
                          [{mod.code}]
                        </span>
                        <h3 className="font-bold text-xs sm:text-sm text-zinc-200 group-hover:text-white transition-colors">
                          {mod.name}
                        </h3>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {mod.shortName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${mod.badgeColor}`}
                    >
                      {mod.badge}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                        isCurrent ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-300"
                      }`}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-zinc-400/90 leading-relaxed font-sans pl-12 pr-2">
                  {mod.desc}
                </p>

                {/* Active marker or action hint */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-850/60 text-[10px]">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    {isCurrent ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-emerald-400 font-semibold">Currently Active Page</span>
                      </>
                    ) : (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                        <span>Ready to launch in dedicated view</span>
                      </>
                    )}
                  </span>
                  <span
                    className={`font-semibold group-hover:underline flex items-center gap-1 ${
                      isCurrent ? "text-emerald-400" : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  >
                    Open Page →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer Diagnostics */}
        <div className="border-t border-zinc-850 bg-black/80 p-4 shrink-0 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              <span>SIMULATION RESTRAINT: ACTIVE</span>
            </span>
            <span className="text-emerald-400 font-bold tabular-nums">
              {glitchCount}% ANOMALY RATE
            </span>
          </div>

          <div className="text-[9px] text-zinc-500 flex justify-between items-center pt-1 border-t border-zinc-900">
            <span>Press ESC or click outside to dismiss</span>
            <span className="text-zinc-600">3839 ESCAPE DIRECTIVE</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
