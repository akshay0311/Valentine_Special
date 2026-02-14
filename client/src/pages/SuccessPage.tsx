import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Music } from "lucide-react";
import { Link } from "wouter";
import { FloatingHeartsBackground } from "@/components/FloatingHeartsBackground";

export default function SuccessPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Play romantic background music with user interaction fallback
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(err => {
          console.log("Audio autoplay prevented, waiting for user interaction:", err);
        });
      }
    };

    // Try to play immediately
    playAudio();

    // Also try on any user interaction
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    // Massive celebration on mount
    const end = Date.now() + 15 * 1000;

    const colors = ['#bb0000', '#ffffff', '#ff69b4', '#ffff00'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Cleanup: pause music when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-red-50 to-white overflow-hidden relative">
      <FloatingHeartsBackground />
      
      {/* Background Music */}
      <audio 
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/romantic-music.mp3" type="audio/mpeg" />
      </audio>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="z-10 max-w-4xl w-full text-center space-y-10"
      >
        <div className="space-y-4">
          <motion.h1 
            animate={{ 
              scale: [1, 1.02, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl md:text-8xl text-primary drop-shadow-md leading-tight"
          >
            YAYYY! <br/>
            Best Choice Ever! 💖
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl text-gray-700 font-medium font-body"
          >
            I love you so much! Happy Valentine's Day! 🌹
          </motion.p>
        </div>

        {/* Gallery of cute gifs/images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4">
           <motion.div
             initial={{ rotate: -5, x: -50, opacity: 0 }}
             animate={{ rotate: -3, x: 0, opacity: 1 }}
             transition={{ delay: 0.8 }}
             whileHover={{ scale: 1.05, rotate: 0 }}
             className="bg-white p-4 pb-12 rounded-lg shadow-xl transform rotate-3"
           >
             <div className="aspect-square bg-pink-100 rounded overflow-hidden relative">
                {/* excited happy dog */}
               <img 
                 src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop" 
                 alt="Happy Celebration" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-sm">
                 <Sparkles className="text-yellow-400 w-6 h-6" />
               </div>
             </div>
             <p className="font-display text-2xl mt-4 text-gray-600 rotate-1">Let's Celebrate! 🎉</p>
           </motion.div>

           <motion.div
             initial={{ rotate: 5, x: 50, opacity: 0 }}
             animate={{ rotate: 3, x: 0, opacity: 1 }}
             transition={{ delay: 1.2 }}
             whileHover={{ scale: 1.05, rotate: 0 }}
             className="bg-white p-4 pb-12 rounded-lg shadow-xl transform -rotate-2"
           >
             <div className="aspect-square bg-pink-100 rounded overflow-hidden relative">
               {/* heart shape hands */}
               <img 
                 src="https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=800&auto=format&fit=crop" 
                 alt="Love Hands" 
                 className="w-full h-full object-cover"
               />
                <div className="absolute top-2 left-2 bg-white/80 p-2 rounded-full shadow-sm">
                 <Heart className="text-red-500 w-6 h-6 fill-current" />
               </div>
             </div>
             <p className="font-display text-2xl mt-4 text-gray-600 -rotate-1">Forever & Always ❤️</p>
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="pt-10 pb-20"
        >
          <Link href="/proposal" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-lg hover:underline">
            <Music className="w-5 h-5" />
            Replay the moment?
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
