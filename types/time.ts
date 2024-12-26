export interface TimeEntry {
  id: string
  startTime: Date
  endTime?: Date
  duration: number
  description?: string
  projectId?: string
  userId: string
}

export interface Project {
  id: string
  name: string
  userId: string
  createdAt: Date
}

export interface Cycle {
  entries: TimeEntry[]
  totalDuration: number
  date: Date
}