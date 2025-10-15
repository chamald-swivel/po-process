"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface RawDataViewerProps {
  data: unknown
  title?: string
}

export function RawDataViewer({ data, title = "Raw API Response" }: RawDataViewerProps) {
  const [copied, setCopied] = useState(false)

  const formattedData = JSON.stringify(data, null, 2)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formattedData)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
            <code className="text-foreground font-mono">{formattedData}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
