import React, { useEffect, useMemo, useRef } from 'react'
import { Game } from '../types'
import Link from 'next/link'
const jvSchedule: Game[] = [
  { date: '2025-04-02', time: '17:00', opponent: 'Wellston', location: 'Home' ,result: 'L'},
  { date: '2025-04-04', time: '17:00', opponent: 'Vinton County', location: 'Away',result: 'L' },
  { date: '2025-04-07', time: '17:00', opponent: 'Meigs', location: 'Home',result: 'L' },
  { date: '2025-04-09', time: '17:00', opponent: 'Nelsonville York', location: 'Away',result: 'L' },
  { date: '2025-04-14', time: '17:00', opponent: 'Athens', location: 'Away' },
  { date: '2025-04-16', time: '17:00', opponent: 'Alexander', location: 'Home' ,result: 'L'},
  { date: '2025-04-17', time: '17:00', opponent: 'Meigs', location: 'Home' ,result: 'L'},
  { date: '2025-04-21', time: '17:00', opponent: 'Wellston', location: 'Away'},
  { date: '2025-04-23', time: '17:00', opponent: 'Vinton County', location: 'Home' },
  { date: '2025-04-24', time: '17:00', opponent: 'Athens', location: 'Away' },
  { date: '2025-04-25', time: '17:00', opponent: 'Meigs', location: 'Away' },
  { date: '2025-04-28', time: '17:00', opponent: 'Nelsonville York', location: 'Home' },
  { date: '2025-05-02', time: '17:00', opponent: 'Athens', location: 'Home' },
  { date: '2025-05-05', time: '17:00', opponent: 'Alexander', location: 'Away' }
]

// Utility: Converts "YYYY-MM-DD" to "M.D" (e.g., "3.17")
function formatShortDate(dateStr: string): string {
    const [, month, day] = dateStr.split('-').map(Number)
    return `${month}.${day}`
  }
  

// New utility: Returns full day name (e.g., "Monday")
function formatWeekDay(date: Date): string {
  // Change 'long' to 'short' if you prefer abbreviated days (e.g., Mon, Tue).
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}
export default function VarsityPage() {
  const scheduleContainerRef = useRef<HTMLDivElement>(null)
  const firstUpcomingRef = useRef<HTMLDivElement>(null)
  const now = new Date()

  // Enrich and sort games chronologically.
  const enrichedGames = useMemo(() => {
    return jvSchedule
      .map(game => {
        const [year, month, day] = game.date.split('-').map(Number)
        const [hour, minute] = game.time.split(':').map(Number)
        return { ...game, gameDate: new Date(year, month - 1, day, hour, minute) }
      })
      .sort((a, b) => a.gameDate.getTime() - b.gameDate.getTime())
  }, [])

  // Identify first upcoming game index.
  const firstUpcomingIndex = useMemo(() => {
    return enrichedGames.findIndex(game => game.gameDate.getTime() >= now.getTime())
  }, [enrichedGames, now])

  // Scroll to first upcoming game on mount.
  useEffect(() => {
    if (firstUpcomingRef.current) {
      firstUpcomingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [firstUpcomingIndex])

  // Handle sidebar click to scroll.
  const handleSidebarClick = (index: number) => {
    const element = document.getElementById(`game-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Fixed Top Right Button */}
      <Link
        href="/"
        className="fixed top-4 right-4 bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        Go Back
      </Link>

      <div className="md:flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-1/4 md:fixed top-0 left-0 h-auto md:h-screen bg-gray-800 p-4 border-b md:border-r border-gray-700 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">JV Games</h2>
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
                  {/* Display day name followed by the date */}
                  <span className="mr-1">{formatWeekDay(game.gameDate)}</span>
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
          className="mt-4 md:mt-0 md:ml-1/4 flex-1 flex flex-col gap-10 md:gap-[20vh] overflow-y-auto px-4 py-6"
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
                className="flex flex-col items-center text-right text-md"
              >
                <div className={`text-3xl font-light ${textColorClass}`}>
                  {/* Display day name followed by the date */}
                  <span className="mr-2">{formatWeekDay(game.gameDate)}</span>
                  {formatShortDate(game.date)} {game.opponent}{' '}
                  <span>- </span>
                  <span className="underline">{game.location}</span>
                  {game.result && (
  <span className={`ml-3 text-xl font-semibold ${game.result === 'W' ? 'text-green-400' : 'text-red-400'}`}>
    {game.result}
  </span>
)}
                  {isFirstUpcoming && (
                    <span className="ml-2 text-xl text-green-400">[Upcoming]</span>
                  )}
                </div>
                <div className="mt-4 w-full max-w-md border-t border-gray-700" />
              </div>
            )
          })}
        </main>
      </div>
    </div>
  )
}