'use client'

import { createContext, use, useEffect, useMemo, useState } from "react";

type DynamicHeaderContextType = {
  atTop: boolean;
  setAtTop: React.Dispatch<React.SetStateAction<boolean>>;
  prevScrollTop: number;
  setPrevScrollTop: React.Dispatch<React.SetStateAction<number>>;
  isGoingUp: boolean;
  setIsGoingUp: React.Dispatch<React.SetStateAction<boolean>>
  isStatic: boolean;
  setIsStatic: React.Dispatch<React.SetStateAction<boolean>>
}

export const DynamicHeaderContext = createContext<DynamicHeaderContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode
}

export function DynamicHeaderProvider({ children }: Props) {
  const [atTop, setAtTop] = useState(true)
  const [prevScrollTop, setPrevScrollTop] = useState(0)
  const [isGoingUp, setIsGoingUp] = useState(true)
  const [isStatic, setIsStatic] = useState(false)

  useEffect(() => {
    if (isStatic) return

    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      setPrevScrollTop(currentScrollTop)
      if (currentScrollTop > 12) {
        setAtTop(false);
      } else if (currentScrollTop <= 12) {
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
  }, [isStatic, prevScrollTop])


  const values = useMemo(() => ({
    atTop,
    setAtTop,
    prevScrollTop,
    setPrevScrollTop,
    isGoingUp,
    setIsGoingUp,
    isStatic,
    setIsStatic
  }), [atTop, prevScrollTop, isGoingUp, isStatic])

  return (
    <DynamicHeaderContext value={values}>
      {children}
    </DynamicHeaderContext>
  )
}

export const useDynamicHeader = () => {
  const context = use(DynamicHeaderContext)
  if (!context) {
    throw new Error("useDynamicHeader must be used within an DynamicHeaderProvider")
  }
  return context
}