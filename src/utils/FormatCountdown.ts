import { Game } from './../types'

export function formatCountdown(game: Game): string {
  const [year, month, day] = game.date.split('-').map(Number)
  const [hour, minute] = game.time.split(':').map(Number)
  const gameDate = new Date(year, month - 1, day, hour, minute)
  const now = new Date()

  const totalSeconds = Math.max(0, Math.floor((gameDate.getTime() - now.getTime()) / 1000))
  
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // If the date/time has already passed, you could return something else
  if (totalSeconds <= 0) {
    return 'Game time!'
  }

  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}
