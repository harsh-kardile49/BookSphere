import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const getInitialTheme = (): "light" | "dark" => {
  const saved = localStorage.getItem("booksphere_theme");
  if (saved === "light" || saved === "dark") return saved;
  return "light";
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("booksphere_theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return { theme: next };
    }),
  setTheme: (theme) => {
    localStorage.setItem("booksphere_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));

// Apply theme attribute on initial load
if (typeof window !== "undefined") {
  const initialTheme = getInitialTheme();
  document.documentElement.setAttribute("data-theme", initialTheme);
}
