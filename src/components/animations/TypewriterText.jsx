"use client";

import { useState, useEffect, useRef } from "react";

const TypewriterText = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete = () => {},
  cursor = false,
  maxLength = Infinity,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  // Reset when text or key changes
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);

    const startTyping = () => {
      if (currentIndex < (text?.length || 0)) {
        typeNextCharacter();
      }
    };

    const timeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [text, delay, speed, maxLength]); // Add text as dependency

  const typeNextCharacter = () => {
    const safeText = (text || "").slice(0, maxLength);

    if (currentIndex < safeText.length) {
      setDisplayText((prev) => prev + safeText.charAt(currentIndex));
      setCurrentIndex((prev) => prev + 1);
      timeoutRef.current = setTimeout(typeNextCharacter, speed);
    } else {
      setIsComplete(true);
      onComplete();
    }
  };

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-[2px] animate-blink">
          |
        </span>
      )}
    </span>
  );
};

export default TypewriterText;
