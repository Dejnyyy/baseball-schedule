import { Game } from './../types'

export function getNextGame(schedule: Game[]): Game | null {
  const now = new Date()

  // Convert each game to a Date object and filter for future games
  const futureGames = schedule
    .map(game => {
      const [ month, day] = game.date.split('-').map(Number)
      const [hour, minute] = game.time.split(':').map(Number)
      const dateObj = new Date(month - 1, day, hour, minute)
      return { ...game, dateObj }
    })
    .filter(({ dateObj }) => dateObj.getTime() > now.getTime())

  // Sort by date, earliest first
  futureGames.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

  // Return the first future game or null if none
  return futureGames.length > 0 ? futureGames[0] : null
}
