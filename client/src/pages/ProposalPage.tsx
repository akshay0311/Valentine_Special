import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Cat } from "lucide-react";
import confetti from "canvas-confetti";
import { FloatingHeartsBackground } from "@/components/FloatingHeartsBackground";
import { useAppContext } from "@/contexts/AppContext";

export default function ProposalPage() {
  const [, setLocation] = useLocation();
  const { name } = useAppContext(); // Get name from context
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  // Runaway button logic
  const moveNoButton = () => {
    // Calculate random position within viewport bounds
    const buttonWidth = 200; // Approximate button width
    const buttonHeight = 80; // Approximate button height
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate safe boundaries (keep button fully visible)
    const maxX = (viewportWidth / 2) - buttonWidth;
    const maxY = (viewportHeight / 2) - buttonHeight;
    
    // Generate random position that stays within safe boundaries
    const x = (Math.random() - 0.5) * maxX * 1.5;
    const y = (Math.random() - 0.5) * maxY * 1.5;
    
    setNoBtnPosition({ x, y });
    setIsHoveringNo(true);
  };

  const handleYesClick = () => {
    // Trigger confetti from bottom
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#ff0000', '#ff69b4', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setLocation("/success");
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden relative bg-gradient-to-b from-white to-pink-100">
      <FloatingHeartsBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-2xl text-center space-y-12"
      >
        {/* Cute Image */}
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
          {/* Using a cute placeholder image from Unsplash */}
          {/* cute bear with heart */}
          <img
            src="https://pixabay.com/get/g8099314aaa89051d0093e8c46c8e2a9750080ca8d8b73d7015bf3d69b3b60da80068b9a8118431e619e2d5f36b9a7a2bdbe23d809a804d732c61dc843e28bda5_1280.jpg"
            alt="Cute Bear"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <p className="text-white font-medium text-lg">Please? 🥺</p>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl text-primary drop-shadow-sm leading-tight">
            {name}, Will you be my <br />
            <span className="text-6xl md:text-8xl mt-2 inline-block animate-pulse">Valentine?</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            I promise chocolates, bad jokes, and lots of love! 🌹
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8 pb-20 relative min-h-[200px] overflow-visible">
          {/* YES BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                "0 20px 25px -5px rgb(255 105 180 / 0.4)",
                "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={handleYesClick}
            className="px-12 py-6 bg-primary text-white text-3xl md:text-4xl font-display rounded-full shadow-lg hover:bg-primary/90 transition-colors z-20 flex items-center gap-3"
          >
            <span>YES!</span>
            <Heart fill="white" className="w-8 h-8" />
          </motion.button>

          {/* NO BUTTON (RUNAWAY) */}
          <motion.div
            animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:static"
            style={{
              zIndex: 30,
              position: 'fixed',
              left: '50%',
              top: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isHoveringNo ? {
                rotate: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5, repeat: Infinity }
              } : {}}
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
              className="px-8 py-4 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap border-2 border-gray-400"
            >
              {isHoveringNo ? "🏃‍♂️ Catch me!" : "🤔 No"}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
