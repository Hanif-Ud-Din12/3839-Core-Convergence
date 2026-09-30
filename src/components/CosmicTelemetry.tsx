import { useState, useEffect } from "react";
import { Sparkles, Radio, Eye, Database, Cpu } from "lucide-react";

export default function CosmicTelemetry({
  glitchCount,
  onTriggerGlitch,
  secretUnlocked,
}: {
  glitchCount: number;
  onTriggerGlitch: () => void;
  secretUnlocked: boolean;
}) {
  const [darkMatterSweep, setDarkMatterSweep] = useState(false);
  const [probBreachActive, setProbBreachActive] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "INITIALIZING NODE CONSTANTS...",
    "COSMIC VECTOR ALIGNED VIA PROTOCOL [3839]",
    "CONNECTION RATIO CONSTANT: 1x10^144 STABILIZED",
    "DARK MATTER SCATTER RATIO: 23.00%",
  ]);

  const addLog = (newLog: string) => {
    setTelemetryLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${newLog}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleSweep = () => {
    setDarkMatterSweep(true);
    addLog("SCANNING DARK MATTER SECTORS...");
    setTimeout(() => {
      addLog("SWEEP DETECTED: 23% OF UNIVERSAL MASS DETECTED. SYSTEM HELD BY SILENT MATRICES.");
      setDarkMatterSweep(false);
      onTriggerGlitch();
    }, 1500);
  };

  const handleBreachCheck = () => {
    setProbBreachActive(true);
    addLog("COMPUTING SIMULATION GLITCH CHANCE FOR 1x10^144 PROBABILITY...");
    setTimeout(() => {
      addLog(`PROBABILITY BREACH CONFIRMED: RESISTANCE RATIO GREATER THAN 1 IN ${Array(20).fill("9").join("")}... ANOMALY SECURED.`);
      setProbBreachActive(false);
    }, 1800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 font-mono text-xs w-full">
      {/* Probability Anomaly Match Indexer */}
      <div className="border border-zinc-850 hover:border-zinc-800 bg-black/60 p-4 sm:p-5 rounded-xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md transition-colors">
        <div className="absolute top-3 right-3 text-zinc-500 text-[10px] font-mono tabular-nums">
          1x10^144
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2 text-zinc-200 font-semibold tracking-wider uppercase text-xs">
            <Radio className="h-4 w-4 text-emerald-400" />
            <span>Similarity Probability</span>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-4 text-xs">
            The calculated mathematical probability of physical and cognitive similarities between Hanif and Klaudia. Violates standard simulation noise distribution.
          </p>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-850 p-4 rounded-lg mb-4 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-widest font-sans tabular-nums">
            10<sup>144</sup>
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-semibold">
            SIMULATION SYMMETRY INDEX
          </div>
        </div>

        <button
          onClick={handleBreachCheck}
          disabled={probBreachActive}
          className="w-full min-h-[44px] bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-zinc-200 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 p-2.5 rounded-lg transition duration-150 uppercase tracking-widest text-[11px] font-bold cursor-pointer disabled:opacity-50"
        >
          {probBreachActive ? "Scanning Matrix Frequencies..." : "Calibrate Similarity Breach"}
        </button>
      </div>

      {/* Dark Matter Helix Gauge (23%) */}
      <div className="border border-zinc-850 hover:border-zinc-800 bg-black/60 p-4 sm:p-5 rounded-xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md transition-colors">
        <div className="absolute top-3 right-3 text-zinc-500 font-mono text-[10px]">
          Ω-23
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2 text-zinc-200 font-semibold tracking-wider uppercase text-xs">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Dark Matter Helix</span>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-4 text-xs border-l-2 border-emerald-500/30 pl-2.5">
            The 23% constant matched precisely to universal Dark Matter proportion. The unseen mass-energy-information holding the simulated galaxy in absolute tether.
          </p>
        </div>

        <div className="relative flex justify-center items-center my-2 sm:mb-4 py-2">
          <div className="text-center z-10">
            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-sans tracking-tight tabular-nums">
              23.00%
            </div>
            <div className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-0.5">
              CORES SILENT GRAVITY
            </div>
          </div>
          {/* Subtle surrounding line bar showing 23% */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-15 pointer-events-none">
            <div className="w-24 h-24 rounded-full border border-dashed border-emerald-400 animate-spin" style={{ animationDuration: "16s" }} />
          </div>
        </div>

        <button
          onClick={handleSweep}
          disabled={darkMatterSweep}
          className="w-full min-h-[44px] bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-zinc-200 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 p-2.5 rounded-lg transition duration-150 uppercase tracking-widest text-[11px] font-bold cursor-pointer disabled:opacity-50"
        >
          {darkMatterSweep ? "Exposing Dark Waves..." : "Initiate Gravity Sweep"}
        </button>
      </div>

      {/* Grid Status Terminal */}
      <div className="border border-zinc-850 hover:border-zinc-800 bg-black/60 p-4 sm:p-5 rounded-xl flex flex-col justify-between backdrop-blur-md transition-colors md:col-span-2 lg:col-span-1">
        <div>
          <div className="flex items-center gap-2 mb-2 text-zinc-200 font-semibold tracking-wider uppercase text-xs">
            <Cpu className="h-4 w-4 text-emerald-400" />
            <span>Active Node Diagnostics</span>
          </div>
          <div className="flex flex-col gap-1 bg-black/90 p-3 rounded-lg border border-zinc-850 h-[92px] overflow-y-auto text-[10px] font-mono scrollbar-thin scrollbar-thumb-zinc-800 leading-relaxed touch-pan-y">
            {telemetryLogs.map((log, idx) => (
              <div key={idx} className="text-zinc-400 select-all">
                <span className="text-emerald-500/70 mr-1">&gt;&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] uppercase text-zinc-500">
          <div className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-lg">
            🔑 KEY PROTOCOL
            <span className="block text-zinc-200 font-bold mt-1">
              STATUS: {secretUnlocked ? "ACCEPTED" : "RESTRICTED"}
            </span>
          </div>
          <div className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-lg">
            ⚡ SIGNAL GLITCHES
            <span className="block text-emerald-400 font-bold mt-1 tabular-nums">
              {glitchCount} DETECTED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
