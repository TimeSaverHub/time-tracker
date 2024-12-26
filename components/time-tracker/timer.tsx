'use client'

import * as React from 'react'
import { Play, Pause, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { formatDuration } from '@/lib/time-utils'
import { useProjects } from '@/hooks/use-projects'

interface TimerProps {
  onStop: (duration: number, description: string, projectId?: string) => void
}

export function Timer({ onStop }: TimerProps) {
  const [isRunning, setIsRunning] = React.useState(false)
  const [startTime, setStartTime] = React.useState<Date | null>(null)
  const [duration, setDuration] = React.useState(0)
  const [description, setDescription] = React.useState('')
  const [selectedProject, setSelectedProject] = React.useState<string>('')
  const timerRef = React.useRef<NodeJS.Timeout>()
  const { projects, isLoading } = useProjects()

  const handleStartStop = () => {
    if (!isRunning) {
      setStartTime(new Date())
      setIsRunning(true)
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    onStop(duration, description, selectedProject)
    setDuration(0)
    setDescription('')
    setSelectedProject('')
    setIsRunning(false)
    setStartTime(null)
  }

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-primary">
              {formatDuration(duration)}
            </div>
          </div>
          
          <div className="space-y-2">
            <Select
              value={selectedProject}
              onValueChange={setSelectedProject}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="What are you working on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center gap-2">
            <Button
              variant={isRunning ? "secondary" : "default"}
              size="lg"
              onClick={handleStartStop}
            >
              {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            {(isRunning || duration > 0) && (
              <Button
                variant="destructive"
                size="lg"
                onClick={handleReset}
              >
                <StopCircle className="h-4 w-4 mr-2" />
                Stop
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}