import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
}

export function FloatingHeartsBackground() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate random hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position %
      scale: 0.5 + Math.random() * 1, // Random size
      duration: 10 + Math.random() * 20, // Random float duration
      delay: Math.random() * 10, // Random start delay
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-200/40"
          initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 1, 0],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart 
            fill="currentColor" 
            style={{ 
              width: `${heart.scale * 40}px`, 
              height: `${heart.scale * 40}px` 
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
}
