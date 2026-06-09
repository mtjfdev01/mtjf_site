import { useState, useEffect } from 'react'

// Update when campaign end date changes (Islamic year end / Zakat deadline)
export const ZAKAT_COUNTDOWN_TARGET = new Date('2026-06-17T00:00:00')

export const pad = (n) => String(n).padStart(2, '0')

export const getTimeLeft = (target) => {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export const useZakatCountdown = (target = ZAKAT_COUNTDOWN_TARGET) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(target))
    }, 1000)
    return () => clearInterval(timer)
  }, [target])

  return timeLeft
}
