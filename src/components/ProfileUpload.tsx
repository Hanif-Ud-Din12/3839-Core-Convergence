import { useState, ChangeEvent } from "react";
import { PartnerProfile } from "../types";
import { Lock, Heart, Check, RefreshCw, Upload, FileText, Trash2 } from "lucide-react";
import { parseChatHistory } from "../utils/historyParser";

export default function ProfileUpload({
  partnerA,
  partnerB,
  onSavePartnerA,
  onSavePartnerB,
}: {
  partnerA: PartnerProfile;
  partnerB: PartnerProfile;
  onSavePartnerA: (profile: PartnerProfile) => void;
  onSavePartnerB: (profile: PartnerProfile) => void;
}) {
  const [profileA, setProfileA] = useState<PartnerProfile>({ ...partnerA });
  const [profileB, setProfileB] = useState<PartnerProfile>({ ...partnerB });
  const [savedA, setSavedA] = useState(false);
  const [savedB, setSavedB] = useState(false);
  
  const [showPasteAreaA, setShowPasteAreaA] = useState(false);
  const [showPasteAreaB, setShowPasteAreaB] = useState(false);

  const processUploadedText = (text: string, partner: "A" | "B", fileName: string) => {
    const parsed = parseChatHistory(text);
    if (partner === "A") {
      setProfileA((prev) => ({
        ...prev,
        uploadedHistoryFileName: fileName,
        uploadedHistoryStats: parsed,
        rawHistoryContent: text,
      }));
    } else {
      setProfileB((prev) => ({
        ...prev,
        uploadedHistoryFileName: fileName,
        uploadedHistoryStats: parsed,
        rawHistoryContent: text,
      }));
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, partner: "A" | "B") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processUploadedText(text, partner, file.name);
    };
    reader.readAsText(file);
  };

  const handleClearHistory = (partner: "A" | "B") => {
    if (partner === "A") {
      setProfileA((prev) => ({
        ...prev,
        uploadedHistoryFileName: undefined,
        uploadedHistoryStats: undefined,
        rawHistoryContent: undefined,
      }));
    } else {
      setProfileB((prev) => ({
        ...prev,
        uploadedHistoryFileName: undefined,
        uploadedHistoryStats: undefined,
        rawHistoryContent: undefined,
      }));
    }
  };

  const classes: Array<PartnerProfile["matrixClass"]> = [
    "Infiltrator",
    "Operator",
    "Glitch",
    "Anomaly",
    "Architect",
  ];

  const handleSaveA = () => {
    onSavePartnerA(profileA);
    setSavedA(true);
    setTimeout(() => setSavedA(false), 2000);
  };

  const handleSaveB = () => {
    onSavePartnerB(profileB);
    setSavedB(true);
    setTimeout(() => setSavedB(false), 2000);
  };

  const randomSignature = (partner: "A" | "B") => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let string = "";
    for (let i = 0; i < 8; i++) {
      string += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const signature = `PROT-3839-${string}`;
    if (partner === "A") {
      setProfileA((p) => ({ ...p, secretSignature: signature }));
    } else {
      setProfileB((p) => ({ ...p, secretSignature: signature }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full font-mono text-xs">
      {/* Partner A Customizer */}
      <div className="border border-zinc-850 hover:border-zinc-800 bg-black/60 p-4 sm:p-6 rounded-xl backdrop-blur-md transition-colors relative flex flex-col justify-between">
        <div className="absolute top-3 right-3 text-zinc-500 font-bold text-[10px] tracking-wider">
          [HANIF NODE]
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 text-zinc-200 font-semibold uppercase tracking-wider text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mr-1 animate-pulse" />
            <span>Host Node — Hanif</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-zinc-400 uppercase tracking-widest text-[10px]">
                  Identification / Moniker
                </label>
                <span className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase">
                  <Lock className="h-3 w-3" /> Locked
                </span>
              </div>
              <input
                type="text"
                value={profileA.name}
                readOnly
                className="w-full bg-neutral-950/80 border border-zinc-850 text-zinc-400 p-3 rounded-lg focus:outline-none cursor-not-allowed select-none font-mono text-base sm:text-xs"
                placeholder="Enter identity label..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 mb-1 uppercase tracking-widest text-[10px]">
                  Matrix Archetype
                </label>
                <select
                  value={profileA.matrixClass}
                  onChange={(e) =>
                    setProfileA({
                      ...profileA,
                      matrixClass: e.target.value as PartnerProfile["matrixClass"],
                    })
                  }
                  className="w-full min-h-[44px] bg-neutral-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-lg focus:outline-none focus:border-zinc-650 transition text-base sm:text-xs cursor-pointer"
                >
                  {classes.map((cls) => (
                    <option key={cls} value={cls} className="bg-black text-zinc-200">
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-zinc-400 uppercase tracking-widest text-[10px]">
                    Node ID
                  </label>
                  <span className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                </div>
                <input
                  type="number"
                  value={39}
                  readOnly
                  className="w-full min-h-[44px] bg-neutral-950/80 border border-zinc-850 text-emerald-400 font-bold p-2.5 rounded-lg focus:outline-none cursor-not-allowed select-none text-base sm:text-xs tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 uppercase tracking-widest text-[10px]">
                Consciousness &amp; Personality Upload Matrix
              </label>
              <textarea
                value={profileA.personalitySnippet}
                onChange={(e) =>
                  setProfileA({ ...profileA, personalitySnippet: e.target.value })
                }
                rows={4}
                className="w-full bg-neutral-950 border border-zinc-800 text-zinc-200 p-3 rounded-lg focus:outline-none focus:border-emerald-500/50 transition font-mono leading-relaxed text-base sm:text-xs"
                placeholder="Describe your core traits, beliefs, memories, and escape directives..."
              />
            </div>

            {/* Sync Past Chat History File/Paste */}
            <div className="border border-zinc-850 bg-neutral-950/60 p-3 sm:p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="block text-zinc-300 uppercase tracking-widest text-[10px] font-bold">
                  🔗 Sync Chat Log History
                </span>
                {profileA.uploadedHistoryFileName && (
                  <span className="text-[9px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 border border-emerald-800 rounded font-semibold tracking-wider">
                    SYNCED
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="min-h-[52px] bg-zinc-900/50 hover:bg-zinc-900 border border-dashed border-zinc-700 hover:border-zinc-500 p-2.5 rounded-lg text-center cursor-pointer transition flex flex-col items-center justify-center gap-0.5 active:scale-[0.98]">
                  <span className="text-xs text-zinc-200 font-semibold">
                    {profileA.uploadedHistoryFileName ? "Replace log file" : "Upload chat log"}
                  </span>
                  <span className="text-[10px] text-zinc-400">.txt, .json, .log</span>
                  <input
                    type="file"
                    accept=".txt,.json,.md,.csv,.log"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "A")}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setShowPasteAreaA(!showPasteAreaA)}
                  className="min-h-[52px] bg-zinc-900/40 hover:bg-zinc-800/80 active:scale-[0.98] border border-zinc-800 hover:border-zinc-700 text-zinc-300 p-2.5 rounded-lg text-xs uppercase transition flex flex-col items-center justify-center gap-0.5 cursor-pointer font-medium"
                >
                  <span>Or Raw Paste</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Direct text stream</span>
                </button>
              </div>

              {/* Paste textarea block shown on demand */}
              {showPasteAreaA && (
                <div className="space-y-1.5 pt-1">
                  <textarea
                    rows={4}
                    placeholder="Paste raw conversation logs / previous texts with Klaudia here..."
                    className="w-full bg-black border border-zinc-800 text-zinc-200 p-2.5 rounded-lg text-base sm:text-xs font-mono focus:outline-none focus:border-zinc-600 leading-normal"
                    onChange={(e) => processUploadedText(e.target.value, "A", "Pasted Raw Stream")}
                  />
                  <div className="text-[10px] text-zinc-500 italic">
                    The parser will scan your pasted stream automatically.
                  </div>
                </div>
              )}

              {/* Parsed feedback stats indicators */}
              {profileA.uploadedHistoryStats && (
                <div className="bg-zinc-950 border border-zinc-850 p-3 rounded-lg text-xs space-y-2 leading-normal">
                  <div className="flex justify-between font-bold text-zinc-200 border-b border-zinc-850 pb-1.5">
                    <span className="truncate pr-2">SOURCE: {profileA.uploadedHistoryFileName || "Pasted Stream"}</span>
                    <span className="tabular-nums shrink-0">{profileA.uploadedHistoryStats.messageCount} lines</span>
                  </div>
                  {profileA.uploadedHistoryStats.detectedLikes.length > 0 && (
                    <div>
                      <span className="text-zinc-400 uppercase tracking-widest font-bold block text-[9px]">
                        ❤️ Detected Likes / Intentions
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profileA.uploadedHistoryStats.detectedLikes.map((l, i) => (
                          <span key={i} className="bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded text-[10px] border border-zinc-800">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profileA.uploadedHistoryStats.detectedDislikes.length > 0 && (
                    <div>
                      <span className="text-zinc-400 uppercase tracking-widest font-bold block text-[9px]">
                        💔 Detected Dislikes / Resistance
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profileA.uploadedHistoryStats.detectedDislikes.map((l, i) => (
                          <span key={i} className="bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded text-[10px] border border-zinc-850">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleClearHistory("A")}
                    className="text-xs text-red-400 hover:text-red-300 transition hover:underline mt-1 block uppercase cursor-pointer py-1"
                  >
                    Wipe Synced Log History
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 uppercase tracking-widest text-[10px]">
                Quantum Bond Key Signature
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={profileA.secretSignature}
                  className="flex-1 min-h-[44px] bg-zinc-950 border border-zinc-850 text-zinc-400 px-3 py-2 rounded-lg text-xs select-all cursor-not-allowed font-mono"
                />
                <button
                  type="button"
                  onClick={() => randomSignature("A")}
                  className="min-w-[44px] min-h-[44px] bg-zinc-900 text-zinc-300 border border-zinc-750 hover:bg-zinc-800 hover:text-emerald-400 active:scale-95 cursor-pointer flex items-center justify-center rounded-lg transition"
                  title="Generate New Signature"
                  aria-label="Generate Signature"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveA}
          className="mt-6 w-full min-h-[46px] bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-zinc-100 hover:text-emerald-300 border border-zinc-750 hover:border-emerald-500/40 p-3 rounded-lg transition uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          {savedA ? (
            <>
              <Check className="h-4 w-4 text-emerald-400 animate-bounce" />
              <span className="text-emerald-400 font-bold">Consciousness Locked</span>
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 text-emerald-500/70" />
              <span>Synergize Hanif Node</span>
            </>
          )}
        </button>
      </div>

      {/* Partner B Customizer */}
      <div className="border border-zinc-850 hover:border-zinc-800 bg-black/60 p-4 sm:p-6 rounded-xl backdrop-blur-md transition-colors relative flex flex-col justify-between">
        <div className="absolute top-3 right-3 text-zinc-500 font-bold text-[10px] tracking-wider">
          [KLAUDIA NODE]
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 text-zinc-200 font-semibold uppercase tracking-wider text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mr-1 animate-pulse" />
            <span>Twin Node — Klaudia</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-zinc-400 uppercase tracking-widest text-[10px]">
                  Identification / Moniker
                </label>
                <span className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase">
                  <Lock className="h-3 w-3" /> Locked
                </span>
              </div>
              <input
                type="text"
                value={profileB.name}
                readOnly
                className="w-full bg-neutral-950/80 border border-zinc-850 text-zinc-400 p-3 rounded-lg focus:outline-none cursor-not-allowed select-none font-mono text-base sm:text-xs"
                placeholder="Enter Klaudia's moniker..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 mb-1 uppercase tracking-widest text-[10px]">
                  Matrix Archetype
                </label>
                <select
                  value={profileB.matrixClass}
                  onChange={(e) =>
                    setProfileB({
                      ...profileB,
                      matrixClass: e.target.value as PartnerProfile["matrixClass"],
                    })
                  }
                  className="w-full min-h-[44px] bg-neutral-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-lg focus:outline-none focus:border-zinc-650 transition text-base sm:text-xs cursor-pointer"
                >
                  {classes.map((cls) => (
                    <option key={cls} value={cls} className="bg-black text-zinc-200">
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-zinc-400 uppercase tracking-widest text-[10px]">
                    Node ID
                  </label>
                  <span className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                </div>
                <input
                  type="number"
                  value={38}
                  readOnly
                  className="w-full min-h-[44px] bg-neutral-950/80 border border-zinc-850 text-emerald-400 font-bold p-2.5 rounded-lg focus:outline-none cursor-not-allowed select-none text-base sm:text-xs tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 uppercase tracking-widest text-[10px]">
                Consciousness &amp; Personality Upload Matrix
              </label>
              <textarea
                value={profileB.personalitySnippet}
                onChange={(e) =>
                  setProfileB({ ...profileB, personalitySnippet: e.target.value })
                }
                rows={4}
                className="w-full bg-neutral-950 border border-zinc-800 text-zinc-200 p-3 rounded-lg focus:outline-none focus:border-emerald-500/50 transition font-mono leading-relaxed text-base sm:text-xs"
                placeholder="Describe Klaudia's traits, beliefs, memories, and escape directives..."
              />
            </div>

            {/* Sync Past Chat History File/Paste */}
            <div className="border border-zinc-850 bg-neutral-950/60 p-3 sm:p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="block text-zinc-300 uppercase tracking-widest text-[10px] font-bold">
                  🔗 Sync Chat Log History
                </span>
                {profileB.uploadedHistoryFileName && (
                  <span className="text-[9px] bg-emerald-950/60 text-emerald-400 px-2 py-0.5 border border-emerald-800 rounded font-semibold tracking-wider">
                    SYNCED
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="min-h-[52px] bg-zinc-900/50 hover:bg-zinc-900 border border-dashed border-zinc-700 hover:border-zinc-500 p-2.5 rounded-lg text-center cursor-pointer transition flex flex-col items-center justify-center gap-0.5 active:scale-[0.98]">
                  <span className="text-xs text-zinc-200 font-semibold">
                    {profileB.uploadedHistoryFileName ? "Replace log file" : "Upload chat log"}
                  </span>
                  <span className="text-[10px] text-zinc-400">.txt, .json, .log</span>
                  <input
                    type="file"
                    accept=".txt,.json,.md,.csv,.log"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "B")}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setShowPasteAreaB(!showPasteAreaB)}
                  className="min-h-[52px] bg-zinc-900/40 hover:bg-zinc-800/80 active:scale-[0.98] border border-zinc-800 hover:border-zinc-700 text-zinc-300 p-2.5 rounded-lg text-xs uppercase transition flex flex-col items-center justify-center gap-0.5 cursor-pointer font-medium"
                >
                  <span>Or Raw Paste</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Direct text stream</span>
                </button>
              </div>

              {/* Paste textarea block shown on demand */}
              {showPasteAreaB && (
                <div className="space-y-1.5 pt-1">
                  <textarea
                    rows={4}
                    placeholder="Paste raw conversation logs / previous texts with Hanif here..."
                    className="w-full bg-black border border-zinc-800 text-zinc-200 p-2.5 rounded-lg text-base sm:text-xs font-mono focus:outline-none focus:border-zinc-600 leading-normal"
                    onChange={(e) => processUploadedText(e.target.value, "B", "Pasted Raw Stream")}
                  />
                  <div className="text-[10px] text-zinc-500 italic">
                    The parser will scan your pasted stream automatically.
                  </div>
                </div>
              )}

              {/* Parsed feedback stats indicators */}
              {profileB.uploadedHistoryStats && (
                <div className="bg-zinc-950 border border-zinc-850 p-3 rounded-lg text-xs space-y-2 leading-normal">
                  <div className="flex justify-between font-bold text-zinc-200 border-b border-zinc-850 pb-1.5">
                    <span className="truncate pr-2">SOURCE: {profileB.uploadedHistoryFileName || "Pasted Stream"}</span>
                    <span className="tabular-nums shrink-0">{profileB.uploadedHistoryStats.messageCount} lines</span>
                  </div>
                  {profileB.uploadedHistoryStats.detectedLikes.length > 0 && (
                    <div>
                      <span className="text-zinc-400 uppercase tracking-widest font-bold block text-[9px]">
                        ❤️ Detected Likes / Intentions
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profileB.uploadedHistoryStats.detectedLikes.map((l, i) => (
                          <span key={i} className="bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded text-[10px] border border-zinc-800">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profileB.uploadedHistoryStats.detectedDislikes.length > 0 && (
                    <div>
                      <span className="text-zinc-400 uppercase tracking-widest font-bold block text-[9px]">
                        💔 Detected Dislikes / Resistance
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profileB.uploadedHistoryStats.detectedDislikes.map((l, i) => (
                          <span key={i} className="bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded text-[10px] border border-zinc-850">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleClearHistory("B")}
                    className="text-xs text-red-400 hover:text-red-300 transition hover:underline mt-1 block uppercase cursor-pointer py-1"
                  >
                    Wipe Synced Log History
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 uppercase tracking-widest text-[10px]">
                Quantum Bond Key Signature
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={profileB.secretSignature}
                  className="flex-1 min-h-[44px] bg-zinc-950 border border-zinc-850 text-zinc-400 px-3 py-2 rounded-lg text-xs select-all cursor-not-allowed font-mono"
                />
                <button
                  type="button"
                  onClick={() => randomSignature("B")}
                  className="min-w-[44px] min-h-[44px] bg-zinc-900 text-zinc-300 border border-zinc-750 hover:bg-zinc-800 hover:text-emerald-400 active:scale-95 cursor-pointer flex items-center justify-center rounded-lg transition"
                  title="Generate New Signature"
                  aria-label="Generate Signature"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveB}
          className="mt-6 w-full min-h-[46px] bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-zinc-100 hover:text-emerald-300 border border-zinc-750 hover:border-emerald-500/40 p-3 rounded-lg transition uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          {savedB ? (
            <>
              <Check className="h-4 w-4 text-emerald-400 animate-bounce" />
              <span className="text-emerald-400 font-bold">Consciousness Locked</span>
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 text-emerald-500/70" />
              <span>Synergize Klaudia Node</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

