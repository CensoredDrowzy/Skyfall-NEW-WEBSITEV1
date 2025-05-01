"use client"

import { useState, useEffect } from "react"

export function ActiveUsersCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Generate a random number between 70 and 120 for the initial count
    const initialCount = Math.floor(Math.random() * (120 - 70 + 1)) + 70
    setCount(initialCount)

    // Simulate fluctuations in the user count
    const interval = setInterval(() => {
      setCount((prevCount) => {
        // Random fluctuation between -2 and +3
        const fluctuation = Math.floor(Math.random() * 6) - 2
        // Ensure count stays within reasonable bounds
        const newCount = prevCount + fluctuation
        return newCount < 70 ? 70 : newCount > 150 ? 150 : newCount
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return <span className="text-white text-xs font-medium">{count} ONLINE</span>
}
