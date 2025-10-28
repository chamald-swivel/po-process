"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle2, XCircle, FileText } from "lucide-react"
import { POHeaderDetails } from "./po-header-details"
import { POFinancialSummary } from "./po-financial-summary"
import { POItemsTable } from "./po-items-table"
import { RawDataViewer } from "./raw-data-viewer"
import type { PODetails } from "@/lib/po-extraction-service"

export type ProcessingStatus = "pending" | "processing" | "completed" | "error"

interface POProcessingCardProps {
  fileName: string
  status: ProcessingStatus
  poDetails?: PODetails | null
  error?: string | null
}

export function POProcessingCard({ fileName, status, poDetails, error }: POProcessingCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <FileText className="h-5 w-5 text-muted-foreground" />
      case "processing":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Processing...</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <CardTitle className="text-lg">{fileName}</CardTitle>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        {(status === "processing" || status === "pending") && (
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {status === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Extracting purchase order details...
                </>
              ) : (
                <>Waiting to process...</>
              )}
            </div>
          </CardContent>
        )}
        {status === "error" && error && (
          <CardContent>
            <div className="text-sm text-red-500">{error}</div>
          </CardContent>
        )}
      </Card>

      {status === "completed" && poDetails && (
        <div className="space-y-4 pl-8 border-l-2 border-muted">
          <POHeaderDetails poDetails={poDetails} />
          <POFinancialSummary poDetails={poDetails} />
          <POItemsTable poDetails={poDetails} />
          <RawDataViewer data={poDetails} />
        </div>
      )}
    </div>
  )
}
