import React, { useEffect, useState } from 'react'
import { Game } from '../types'
import { getNextGame } from '../utils/GetNextGame'
import { formatCountdown } from '../utils/FormatCountdown'

const jvSchedule: Game[] = [
  {
    date: '2025-03-18',
    time: '17:00',
    opponent: 'JV Opponent #1',
    location: 'Home'
  },
  {
    date: '2025-03-20',
    time: '17:00',
    opponent: 'JV Opponent #2',
    location: 'Away'
  },
  {
    date: '2025-03-25',
    time: '17:00',
    opponent: 'JV Opponent #3',
    location: 'Home'
  }
  // Add as many JV games as you want...
]

export default function JVPage() {
  const [countdown, setCountdown] = useState('')
  
  // Find the next game to display in the countdown
  const nextGame = getNextGame(jvSchedule)

  useEffect(() => {
    if (!nextGame) return

    // Update the countdown every second
    const interval = setInterval(() => {
      setCountdown(formatCountdown(nextGame))
    }, 1000)

    return () => clearInterval(interval)
  }, [nextGame])

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">JV Baseball Schedule</h1>
      {nextGame ? (
        <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Next Game Countdown</h2>
          <p className="text-lg font-mono">{countdown}</p>
          <p className="text-sm mt-2">
            vs {nextGame.opponent} on {nextGame.date} at {nextGame.time} ({nextGame.location})
          </p>
        </div>
      ) : (
        <div className="text-center mb-8">
          <p>No upcoming games scheduled.</p>
        </div>
      )}

      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Full JV Schedule</h2>
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Date</th>
                <th className="border-b p-2">Time</th>
                <th className="border-b p-2">Opponent</th>
                <th className="border-b p-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {jvSchedule.map((game, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{game.date}</td>
                  <td className="p-2 border-b">{game.time}</td>
                  <td className="p-2 border-b">{game.opponent}</td>
                  <td className="p-2 border-b">{game.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
