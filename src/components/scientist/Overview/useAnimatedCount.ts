import { useState, useEffect } from "react";

export const useAnimatedCount = (target: number, duration = 1200) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(20, Math.floor(duration / target));
    const timer = setInterval(() => {
      start += Math.max(1, Math.floor(target / (duration / stepTime)));
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return count;
};
