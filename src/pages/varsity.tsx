// pages/varsity.tsx

import React, { useEffect, useMemo, useRef } from 'react'
import { Game } from '../types'

const varsitySchedule: Game[] = [
  { date: '2025-03-17', time: '17:00', opponent: 'North Adams (S)', location: 'Away' },
  { date: '2025-03-19', time: '17:00', opponent: 'Eastern Pike (S)', location: 'Home' },
  { date: '2025-03-24', time: '17:00', opponent: 'Miller (S)', location: 'Away' },
  { date: '2025-03-26', time: '17:00', opponent: 'Southeastern Ross', location: 'Home' },
  { date: '2025-03-31', time: '17:00', opponent: 'Wellston', location: 'Away' },
  { date: '2025-04-04', time: '17:00', opponent: 'Vinton County', location: 'Home' },
  { date: '2025-04-07', time: '17:00', opponent: 'Meigs', location: 'Away' },
  { date: '2025-04-09', time: '17:00', opponent: 'Nelsonville York', location: 'Home' },
  { date: '2025-04-10', time: '17:00', opponent: 'Miller', location: 'Home' },
  { date: '2025-04-14', time: '17:00', opponent: 'Athens', location: 'Home' },
  { date: '2025-04-16', time: '17:00', opponent: 'Alexander', location: 'Away' },
  { date: '2025-04-18', time: '17:00', opponent: 'Federal Hocking', location: 'Home' },
  { date: '2025-04-21', time: '17:00', opponent: 'Wellston', location: 'Home' },
  { date: '2025-04-23', time: '17:00', opponent: 'Vinton County', location: 'Away' },
  { date: '2025-04-25', time: '17:00', opponent: 'Meigs', location: 'Home' },
  { date: '2025-04-28', time: '17:00', opponent: 'Nelsonville York', location: 'Away' },
  { date: '2025-04-29', time: '17:00', opponent: 'Hunington Ross', location: 'Home' },
  { date: '2025-04-30', time: '17:00', opponent: 'Federal Hocking', location: 'Away' },
  { date: '2025-05-02', time: '17:00', opponent: 'Athens', location: 'Away' },
  { date: '2025-05-05', time: '17:00', opponent: 'Alexander', location: 'Home' },
  { date: '2025-05-07', time: '17:00', opponent: 'Hannah HS', location: 'Away' },
  { date: '2025-05-12', time: '17:00', opponent: 'Paint Valley', location: 'Away' },
  { date: '2025-05-17', time: '15:00', opponent: 'Rock Hill (DH)', location: 'Away' }
]

// Utility: Converts "YYYY-MM-DD" to "M.D" (e.g., "3.17")
function formatShortDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return `${month}.${day}`
}

export default function VarsityPage() {
  const scheduleContainerRef = useRef<HTMLDivElement>(null)
  const firstUpcomingRef = useRef<HTMLDivElement>(null)
  const now = new Date()

  // Enrich each game with its Date object and sort chronologically.
  const enrichedGames = useMemo(() => {
    return varsitySchedule
      .map(game => {
        const [year, month, day] = game.date.split('-').map(Number)
        const [hour, minute] = game.time.split(':').map(Number)
        return { ...game, gameDate: new Date(year, month - 1, day, hour, minute) }
      })
      .sort((a, b) => a.gameDate.getTime() - b.gameDate.getTime())
  }, [])

  // Identify the index of the first upcoming game.
  const firstUpcomingIndex = useMemo(() => {
    return enrichedGames.findIndex(game => game.gameDate.getTime() >= now.getTime())
  }, [enrichedGames, now])

  // On mount, scroll to the first upcoming game.
  useEffect(() => {
    if (firstUpcomingRef.current) {
      firstUpcomingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [firstUpcomingIndex])

  // Scroll to a specific game when clicked in the sidebar.
  const handleSidebarClick = (index: number) => {
    const element = document.getElementById(`game-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Fixed Top Right Button */}
      <a
        href="/"
        className="fixed top-4 right-4 bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        Go Back
      </a>

      {/* Fixed, Scrollable Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-1/4 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Varsity Games</h2>
        <ul>
          {enrichedGames.map((game, idx) => {
            const isUpcoming = idx === firstUpcomingIndex
            const textColorClass = isUpcoming ? 'text-white' : 'text-gray-500'
            return (
              <li
                key={idx}
                className={`cursor-pointer hover:text-green-400 mb-2 ${textColorClass}`}
                onClick={() => handleSidebarClick(idx)}
              >
                {formatShortDate(game.date)} {game.opponent}{' '}
                <span>- </span>
                <span className="underline">{game.location}</span>
                {isUpcoming && <span className="ml-2 text-green-400 text-sm">[Upcoming]</span>}
              </li>
            )
          })}
        </ul>
      </aside>

      {/* Main Schedule */}
      <main
        ref={scheduleContainerRef}
        className="ml-1/4 flex-1 flex flex-col gap-[50vh] overflow-y-auto px-4 py-6"
      >
        {enrichedGames.map((game, idx) => {
          const isFirstUpcoming = idx === firstUpcomingIndex
          const textColorClass = isFirstUpcoming
            ? 'text-white'
            : 'hover:text-white transition-all duration-300 cursor-pointer text-gray-500'
          return (
            <div
              id={`game-${idx}`}
              key={idx}
              ref={isFirstUpcoming ? firstUpcomingRef : null}
              className="flex flex-col items-center"
            >
              <div className={`text-3xl font-light ${textColorClass}`}>
                {formatShortDate(game.date)} {game.opponent}{' '}
                <span>- </span>
                <span className="underline">{game.location}</span>
                {isFirstUpcoming && (
                  <span className="ml-2 text-xl font-medium text-green-400">
                    [Upcoming]
                  </span>
                )}
              </div>
              <div className="mt-4 w-full max-w-md border-t border-gray-700" />
            </div>
          )
        })}
      </main>
    </div>
  )
}
