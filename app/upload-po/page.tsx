"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  POExtractionService,
  type PODetails,
} from "@/lib/po-extraction-service";
import Link from "next/link";
import { FileUploadZone } from "@/components/molecules/file-upload-zone";
import {
  POProcessingCard,
  type ProcessingStatus,
} from "@/components/molecules/po-processing-card";

interface FileProcessing {
  file: File;
  status: ProcessingStatus;
  poDetails?: PODetails | null;
  error?: string | null;
}

export default function UploadPOPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [fileProcessingList, setFileProcessingList] = useState<
    FileProcessing[]
  >([]);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setProcessing(true);

    // Initialize processing list with all files as pending
    const initialList: FileProcessing[] = files.map((file) => ({
      file,
      status: "pending" as ProcessingStatus,
    }));
    setFileProcessingList(initialList);

    files.forEach((file, index) => {
      setTimeout(async () => {
        // Update status to processing
        setFileProcessingList((prev) =>
          prev.map((item, idx) =>
            idx === index
              ? { ...item, status: "processing" as ProcessingStatus }
              : item
          )
        );

        try {
          const details = await POExtractionService.extractPODetails(file);

          // Update with completed status and details
          setFileProcessingList((prev) =>
            prev.map((item, idx) =>
              idx === index
                ? {
                    ...item,
                    status: "completed" as ProcessingStatus,
                    poDetails: details,
                  }
                : item
            )
          );
        } catch (err) {
          // Update with error status
          setFileProcessingList((prev) =>
            prev.map((item, idx) =>
              idx === index
                ? {
                    ...item,
                    status: "error" as ProcessingStatus,
                    error:
                      err instanceof Error
                        ? err.message
                        : "Failed to extract PO details",
                  }
                : item
            )
          );
        }
      }, index * 1000); // Send each file 1 second apart
    });

    setProcessing(false);
    setFiles([]);
  };

  const handleReset = () => {
    setFiles([]);
    setFileProcessingList([]);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Upload Purchase Orders</h1>
              <p className="text-muted-foreground">
                Upload up to 5 PDFs to extract purchase order details
              </p>
            </div>
          </div>
          {fileProcessingList.length > 0 && (
            <Button onClick={handleReset} variant="outline">
              Upload New Batch
            </Button>
          )}
        </div>

        {fileProcessingList.length === 0 && (
          <FileUploadZone
            files={files}
            onFilesChange={handleFilesChange}
            onUpload={handleUpload}
            disabled={processing}
          />
        )}

        {fileProcessingList.length > 0 && (
          <div className="space-y-6">
            {fileProcessingList.map((item, index) => (
              <POProcessingCard
                key={`${item.file.name}-${index}`}
                fileName={item.file.name}
                status={item.status}
                poDetails={item.poDetails}
                error={item.error}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
