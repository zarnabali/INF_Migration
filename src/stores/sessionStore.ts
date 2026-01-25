import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionData {
  refCode: string | null;
  quoteId: string | null;
}

interface SessionState extends SessionData {
  setSessionData: (data: Partial<SessionData>) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      refCode: null,
      quoteId: null,
      
      setSessionData: (data: Partial<SessionData>) => {
        set((state) => ({
          ...state,
          ...data,
        }));
      },
      
      clearSession: () => {
        set({
          refCode: null,
          quoteId: null,
        });
      },
    }),
    {
      name: 'session-storage',
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

