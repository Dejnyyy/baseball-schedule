export interface Game {
    date: string    
    time: string    
    opponent: string
    location: string
    result?: 'W' | 'L'
    score?: string
  }
  