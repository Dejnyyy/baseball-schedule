import React, { useEffect, useMemo, useRef } from 'react'
import { Game } from '../types'
import Link from 'next/link'
const varsitySchedule: Game[] = [
  { date: '03-17', time: '17:00', opponent: 'North Adams (S)', location: 'Away' },
  { date: '03-19', time: '17:00', opponent: 'Eastern Pike (S)', location: 'Home' },
  { date: '03-24', time: '17:00', opponent: 'Miller (S)', location: 'Away' },
  { date: '03-26', time: '17:00', opponent: 'Southeastern Ross', location: 'Home' },
  { date: '03-31', time: '17:00', opponent: 'Wellston', location: 'Away' },
  { date: '04-04', time: '17:00', opponent: 'Vinton County', location: 'Home' },
  { date: '04-07', time: '17:00', opponent: 'Meigs', location: 'Away' },
  { date: '04-09', time: '17:00', opponent: 'Nelsonville York', location: 'Home' },
  { date: '04-10', time: '17:00', opponent: 'Miller', location: 'Home' },
  { date: '04-14', time: '17:00', opponent: 'Athens', location: 'Home' },
  { date: '04-16', time: '17:00', opponent: 'Alexander', location: 'Away' },
  { date: '04-18', time: '17:00', opponent: 'Federal Hocking', location: 'Home' },
  { date: '04-21', time: '17:00', opponent: 'Wellston', location: 'Home' },
  { date: '04-23', time: '17:00', opponent: 'Vinton County', location: 'Away' },
  { date: '04-25', time: '17:00', opponent: 'Meigs', location: 'Home' },
  { date: '04-28', time: '17:00', opponent: 'Nelsonville York', location: 'Away' },
  { date: '04-29', time: '17:00', opponent: 'Hunington Ross', location: 'Home' },
  { date: '04-30', time: '17:00', opponent: 'Federal Hocking', location: 'Away' },
  { date: '05-02', time: '17:00', opponent: 'Athens', location: 'Away' },
  { date: '05-05', time: '17:00', opponent: 'Alexander', location: 'Home' },
  { date: '05-07', time: '17:00', opponent: 'Hannah HS', location: 'Away' },
  { date: '05-12', time: '17:00', opponent: 'Paint Valley', location: 'Away' },
  { date: '05-17', time: '15:00', opponent: 'Rock Hill (DH)', location: 'Away' }
]

// Utility: Converts "YYYY-MM-DD" to "M.D" (e.g., "3.17")
function formatShortDate(dateStr: string): string {
  const [month, day] = dateStr.split('-').map(Number)
  return `${month}.${day}`
}

export default function VarsityPage() {
  const scheduleContainerRef = useRef<HTMLDivElement>(null)
  const firstUpcomingRef = useRef<HTMLDivElement>(null)
  const now = new Date()

  // Enrich each game with a Date object and sort chronologically.
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
    <div className="min-h-screen bg-gray-900 text-white relative" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Fixed Top Right Button */}
      <Link
        href="/"
        className="fixed top-4 right-4 bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        Go Back
      </Link>

      <div className=" md:flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-1/4 md:fixed md:top-0 md:left-0 md:h-screen bg-gray-800 p-4 border-b md:border-r border-gray-700 overflow-y-auto">
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
                className="flex flex-col items-center text-right"
              >
                <div className={`text-3xl font-light ${textColorClass}`}>
                  {formatShortDate(game.date)} {game.opponent}{' '}
                  <span>- </span>
                  <span className="underline">{game.location}</span>
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
