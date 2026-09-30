/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ParsedStats {
  messageCount: number;
  wordCount: number;
  detectedLikes: string[];
  detectedDislikes: string[];
}

export function parseChatHistory(text: string): ParsedStats {
  if (!text) {
    return {
      messageCount: 0,
      wordCount: 0,
      detectedLikes: [],
      detectedDislikes: [],
    };
  }

  const lines = text.split("\n");
  let messageCount = 0;
  let wordCount = 0;

  const likesSet = new Set<string>();
  const dislikesSet = new Set<string>();

  // Clean and parse text
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Estimate message count: count substantial non-empty lines or lines containing colon
    // which signifies conversational speaker patterns (e.g., "[12:30] Hanif: I love pizza")
    if (trimmed.length > 5) {
      messageCount++;
      const words = trimmed.split(/\s+/);
      wordCount += words.length;

      const lower = trimmed.toLowerCase();

      // Simple extraction of likes
      if (
        lower.includes("like ") ||
        lower.includes("love ") ||
        lower.includes("enjoy ") ||
        lower.includes("favorite ") ||
        lower.includes("prefer ")
      ) {
        // Find segments containing these positive patterns
        const regexes = [
          /i (?:really )?love ([^.,!?:\n]+)/i,
          /i (?:really )?like ([^.,!?:\n]+)/i,
          /i prefer ([^.,!?:\n]+)/i,
          /i enjoy ([^.,!?:\n]+)/i,
          /my favorite ([^.,!?:\n]+)/i,
        ];

        for (const rx of regexes) {
          const match = trimmed.match(rx);
          if (match && match[1]) {
            let extracted = match[1].trim();
            // clean leading helper words
            extracted = extracted.replace(/^(to|doing|having|playing|the|a|an)\s+/i, "");
            if (extracted.length > 2 && extracted.length < 50) {
              likesSet.add(capitalize(extracted));
            }
          }
        }
      }

      // Simple extraction of dislikes
      if (
        lower.includes("hate ") ||
        lower.includes("dislike ") ||
        lower.includes("don't like ") ||
        lower.includes("dont like ") ||
        lower.includes("annoy ")
      ) {
        const regexes = [
          /i (?:really )?hate ([^.,!?:\n]+)/i,
          /i dislike ([^.,!?:\n]+)/i,
          /i (?:really )?don['t]? like ([^.,!?:\n]+)/i,
          /([^.,!?:\n]+) annoys me/i,
          /([^.,!?:\n]+) is annoying/i,
        ];

        for (const rx of regexes) {
          const match = trimmed.match(rx);
          if (match && match[1]) {
            let extracted = match[1].trim();
            extracted = extracted.replace(/^(to|doing|having|playing|the|a|an)\s+/i, "");
            if (extracted.length > 2 && extracted.length < 50) {
              dislikesSet.add(capitalize(extracted));
            }
          }
        }
      }
    }
  }

  // fallback/default values if parser couldn't find matches to keep it satisfying
  if (likesSet.size === 0) {
    // Look for generally hot keywords
    const hotKeywords = ["coding", "pizza", "coffee", "music", "art", "night walks", "scifi", "movies", "games"];
    const textLower = text.toLowerCase();
    hotKeywords.forEach(kw => {
      if (textLower.includes(kw)) likesSet.add(capitalize(kw));
    });
  }

  return {
    messageCount: messageCount || Math.floor(lines.length * 0.8) || 1,
    wordCount: wordCount || text.split(/\s+/).length,
    detectedLikes: Array.from(likesSet).slice(0, 5),
    detectedDislikes: Array.from(dislikesSet).slice(0, 5),
  };
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
