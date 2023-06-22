"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

interface AppContextProps {
  isDesktop: boolean;
  setIsDesktop: (isDesktop: boolean) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  isHeaderOpen: boolean;
  setIsHeaderOpen: (isHeaderOpen: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  isDesktop: false,
  setIsDesktop: () => {},
  isMobile: false,
  setIsMobile: () => {},
  isHeaderOpen: true,
  setIsHeaderOpen: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.scrollTo(0, 0);
    }

    const handleResize = () => {
      const desktopMediaQuery = window.matchMedia("(min-width: 1280px)");
      setIsDesktop(desktopMediaQuery.matches);

      const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
      setIsMobile(mobileMediaQuery.matches);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsHeaderOpen(false);
    }
  }, [isMobile]);

  return (
    <AppContext.Provider
      value={{
        isDesktop,
        setIsDesktop,
        isMobile,
        setIsMobile,
        isHeaderOpen,
        setIsHeaderOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
