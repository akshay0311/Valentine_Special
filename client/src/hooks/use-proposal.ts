import { create } from 'zustand';

// Simple state management for the proposal flow
// Using zustand-like pattern or context isn't strictly necessary for this size,
// but good for keeping track if they "won" the game to access the proposal.

interface ProposalState {
  hasWonGame: boolean;
  setHasWonGame: (won: boolean) => void;
}

// Just a simple singleton object for this specific app since it's client-only logic
// In a real app we'd use Context or Zustand, but let's keep it simple with local state in components 
// or a simple export for the guard.

let hasWonGame = false;

export const useProposalGuard = () => {
  return {
    hasWonGame,
    setHasWonGame: (won: boolean) => {
      hasWonGame = won;
    }
  };
};
