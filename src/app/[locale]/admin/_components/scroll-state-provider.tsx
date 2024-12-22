'use client'

import { createContext, use, useEffect, useMemo, useState } from "react";

type ScrollStateContextType = {
  atTop: boolean;
  setAtTop: React.Dispatch<React.SetStateAction<boolean>>;
  prevScrollTop: number;
  setPrevScrollTop: React.Dispatch<React.SetStateAction<number>>;
  isGoingUp: boolean;
  setIsGoingUp: React.Dispatch<React.SetStateAction<boolean>>
  headerFixed: boolean;
  setHeaderFixed: React.Dispatch<React.SetStateAction<boolean>>
}

export const ScrollStateContext = createContext<ScrollStateContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode
}

export function ScrollStateProvider({ children }: Props) {
  const [atTop, setAtTop] = useState(true)
  const [prevScrollTop, setPrevScrollTop] = useState(0)
  const [isGoingUp, setIsGoingUp] = useState(true)
  const [headerFixed, setHeaderFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      setPrevScrollTop(currentScrollTop)
      if (currentScrollTop > 16) {
        setAtTop(false);
      } else if (currentScrollTop <= 16) {
        setAtTop(true);
      }

      if (currentScrollTop > prevScrollTop + 2) {
        setIsGoingUp(false)
      } else if (currentScrollTop < prevScrollTop - 2) {
        setIsGoingUp(true)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [headerFixed, prevScrollTop])


  const values = useMemo(() => ({
    atTop,
    setAtTop,
    prevScrollTop,
    setPrevScrollTop,
    isGoingUp,
    setIsGoingUp,
    headerFixed,
    setHeaderFixed
  }), [atTop, prevScrollTop, isGoingUp, headerFixed])

  return (
    <ScrollStateContext value={values}>
      {children}
    </ScrollStateContext>
  )
}

export const useScrollState = () => {
  const context = use(ScrollStateContext)
  if (!context) {
    throw new Error("useScrollState must be used within an ScrollStateProvider")
  }
  return context
}