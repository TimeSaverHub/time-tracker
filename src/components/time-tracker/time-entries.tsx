'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Clock } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDuration, formatTime } from '@/lib/time-utils'
import type { TimeEntry } from '@/types/time'

interface TimeEntriesProps {
  entries: TimeEntry[]
  isLoading: boolean
}

export function TimeEntries({ entries, isLoading }: TimeEntriesProps) {
  const entriesByDate = React.useMemo(() => {
    const grouped = entries.reduce((acc, entry) => {
      const date = format(entry.startTime, 'yyyy-MM-dd')
      if (!acc[date]) {
        acc[date] = {
          entries: [],
          totalDuration: 0,
          date: entry.startTime
        }
      }
      acc[date].entries.push(entry)
      acc[date].totalDuration += entry.duration
      return acc
    }, {} as Record<string, { entries: TimeEntry[], totalDuration: number, date: Date }>)

    return Object.values(grouped)
  }, [entries])

  if (isLoading) {
    return <div className="text-center">Loading entries...</div>
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold">No time entries</h3>
        <p className="text-sm text-muted-foreground">
          Start the timer to track your time
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {entriesByDate.map(({ entries: dayEntries, totalDuration, date }) => (
        <div key={format(date, 'yyyy-MM-dd')} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {format(date, 'EEEE, MMMM d')}
            </h3>
            <span className="text-sm text-muted-foreground">
              Total: {formatDuration(totalDuration)}
            </span>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dayEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {formatTime(entry.startTime)}
                  </TableCell>
                  <TableCell>
                    {formatDuration(entry.duration)}
                  </TableCell>
                  <TableCell>
                    {entry.projectId || '-'}
                  </TableCell>
                  <TableCell>
                    {entry.description || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}