import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome back!</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Hours</CardTitle>
            <CardDescription>Your tracked time this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24.5 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Projects you're tracking time for</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3 projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest time entries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

