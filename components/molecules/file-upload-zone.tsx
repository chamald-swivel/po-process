"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FileUploadZoneProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  onUpload: () => void
  disabled?: boolean
}

export function FileUploadZone({ files, onFilesChange, onUpload, disabled }: FileUploadZoneProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const pdfFiles = selectedFiles.filter((file) => file.type === "application/pdf")

    const newFiles = [...files, ...pdfFiles].slice(0, 5)
    onFilesChange(newFiles)

    // Reset input
    e.target.value = ""
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFilesChange(newFiles)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload PDFs</CardTitle>
        <CardDescription>Select up to 5 PDF files containing purchase order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pdf-upload">PDF Files</Label>
          <div className="flex gap-2">
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              disabled={disabled || files.length >= 5}
            />
            <Button onClick={onUpload} disabled={files.length === 0 || disabled} className="min-w-[120px]">
              <Upload className="mr-2 h-4 w-4" />
              Upload {files.length > 0 && `(${files.length})`}
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Selected Files:</p>
                <Badge variant="secondary">{files.length} / 5</Badge>
              </div>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    {!disabled && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length >= 5 && (
            <Alert>
              <AlertDescription>Maximum of 5 files reached</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
