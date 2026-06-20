"use client";

import { useEffect, useState } from "react";

type TypingEffectProps = {
  text?: string;
  speed?: number;
  showCursor?: boolean;
  hideCursorOnComplete?: boolean;
  cursorClassName?: string;
  onComplete?: (() => void) | null;
};

export default function TypingEffect({
  text = "PUSHING EVERY LIMIT.",
  speed = 80,
  showCursor = true,
  hideCursorOnComplete = true,
  cursorClassName = "",
  onComplete = null,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText === text) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timeout = window.setTimeout(() => {
      setDisplayedText(text.substring(0, displayedText.length + 1));
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [displayedText, text, speed, onComplete]);

  return (
    <span className="flex items-center justify-center text-center max-lg:text-3xl">
      {displayedText}
      {showCursor && (!hideCursorOnComplete || !isComplete) ? (
        <span
          className={`inline-block w-0.5 h-15 ml-3 mb-2 bg-current animate-pulse max-lg:w-0.2 max-lg:h-8 ${cursorClassName}`}
        />
      ) : null}
    </span>
  );
}
