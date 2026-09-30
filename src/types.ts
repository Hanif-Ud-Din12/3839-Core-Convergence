/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isDecision?: boolean;
  isSearch?: boolean;
  sources?: { title: string; uri: string }[];
}

export interface PartnerProfile {
  name: string;
  matrixClass: "Infiltrator" | "Operator" | "Glitch" | "Anomaly" | "Architect";
  personalitySnippet: string;
  transcendenceQuotient: number; // 0 to 100
  secretSignature: string;
  uploadedHistoryFileName?: string;
  uploadedHistoryStats?: {
    messageCount: number;
    wordCount: number;
    detectedLikes: string[];
    detectedDislikes: string[];
  };
  rawHistoryContent?: string;
}

export interface SimulationState {
  partnerA: PartnerProfile;
  partnerB: PartnerProfile;
  secretKeyEntered: string;
  systemGlitches: number;
  darkMatterSync: number; // default to 23
}
