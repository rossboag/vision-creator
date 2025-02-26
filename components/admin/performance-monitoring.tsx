"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

const generateRandomData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    requests: Math.floor(Math.random() * 1000),
  }))
}

export function PerformanceMonitoring() {
  const [performanceData, setPerformanceData] = useState(generateRandomData())

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(generateRandomData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Monitoring</CardTitle>
        <CardDescription>Real-time system performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU Usage (%)" />
            <Line yAxisId="left" type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory Usage (%)" />
            <Line yAxisId="right" type="monotone" dataKey="requests" stroke="#ffc658" name="Requests/min" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 space-x-2">
          <Button variant="outline">Generate Report</Button>
          <Button variant="outline">Configure Alerts</Button>
        </div>
      </CardContent>
    </Card>
  )
}

