'use client'

import * as React from 'react'
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Timer } from './timer'
import { TimeEntries } from './time-entries'
import type { TimeEntry } from '@/types/time'

export function TimeTracker() {
  const [entries, setEntries] = React.useState<TimeEntry[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const user = auth.currentUser
    if (!user) {
      setIsLoading(false)
      return
    }

    const q = query(
      collection(db, 'timeEntries'),
      where('userId', '==', user.uid),
      orderBy('startTime', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startTime: doc.data().startTime.toDate(),
        endTime: doc.data().endTime?.toDate()
      })) as TimeEntry[]
      
      setEntries(entriesData)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleStop = async (duration: number, description: string, projectId?: string) => {
    const user = auth.currentUser
    if (!user) return

    const entry: Omit<TimeEntry, 'id'> = {
      startTime: new Date(Date.now() - duration * 1000),
      endTime: new Date(),
      duration,
      description,
      projectId,
      userId: user.uid
    }

    try {
      await addDoc(collection(db, 'timeEntries'), entry)
    } catch (error) {
      console.error('Error adding time entry:', error)
    }
  }

  return (
    <div className="space-y-8">
      <Timer onStop={handleStop} />
      <TimeEntries entries={entries} isLoading={isLoading} />
    </div>
  )
}