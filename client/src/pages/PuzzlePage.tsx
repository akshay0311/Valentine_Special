import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useProposalGuard } from "@/hooks/use-proposal";
import { FloatingHeartsBackground } from "@/components/FloatingHeartsBackground";

export default function PuzzlePage() {
  const [, setLocation] = useLocation();
  const { setHasWonGame } = useProposalGuard();
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    // Move the heart every few seconds or faster
    const interval = setInterval(() => {
      const newX = Math.random() * 80 + 10; // Keep within 10-90%
      const newY = Math.random() * 80 + 10;
      setPosition({ x: newX, y: newY });
    }, 800); // Fast jumps!

    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = () => {
    setIsExploding(true);
    setHasWonGame(true);
    
    // Short delay for explosion animation before navigating
    setTimeout(() => {
      setLocation("/proposal");
    }, 800);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-red-50"
    >
      <FloatingHeartsBackground />

      <div className="absolute top-10 text-center px-4 pointer-events-none z-10">
        <h1 className="text-5xl md:text-7xl mb-4 text-primary drop-shadow-md">
          Unlock My Heart
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-semibold bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full inline-block shadow-sm">
          Catch the flying heart to enter! ❤️
        </p>
      </div>

      <AnimatePresence>
        {!isExploding ? (
          <motion.button
            className="absolute p-4 cursor-pointer outline-none focus:outline-none touch-none"
            animate={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              mass: 0.5,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-300" />
              <Heart 
                className="w-24 h-24 md:w-32 md:h-32 text-primary drop-shadow-2xl filter" 
                fill="currentColor" 
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-white font-bold text-sm">Click Me!</span>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: [0, 1.5, 30] }}
               transition={{ duration: 0.8 }}
               className="w-40 h-40 bg-primary rounded-full"
             />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
