'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { auth } from '@/lib/firebase'
import { db } from '@/lib/firebase'
import type { Project } from '@/types/time'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const user = auth.currentUser
    if (!user) {
      setIsLoading(false)
      return
    }

    const q = query(
      collection(db, 'projects'),
      where('userId', '==', user.uid)
    )

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[]
        
        setProjects(projectsData)
        setIsLoading(false)
      },
      (error) => {
        console.error('Error fetching projects:', error)
        setError(error as Error)
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { projects, isLoading, error }
}

