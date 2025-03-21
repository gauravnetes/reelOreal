"use client";
import React, { useRef, useState } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import {Loader2, TreeDeciduous, Video} from 'lucide-react'
import IKUploadProps, { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";


interface FileUploadProps {
    onSuccess: (res: IKUploadProps) => void
    onProgress?: (progress: number) => void; 
    fileType?: "image" | "video"
}
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;



export default function FileUpload({
    onSuccess, 
    onProgress, 
    fileType = "image", 
}: FileUploadProps) {

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onError = (err: {message: string}) => {
    console.log("Error", err);
    setError(err.message); 
    setUploading(false); 
  };
  
  const handleSuccess = (res: IKUploadProps) => {
    console.log("Success", res);
    setUploading(false); 
    setError(null); 
    onSuccess(res)
  };
  
  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onprogress) {
        const percentComplete = (evt.loaded / evt.total) * 100; 
        onProgress?.(Math.round(percentComplete))
    }
  };
  
  const handleStartUpload = () => {
    setUploading(true); 
    setError(null)
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
        if (!file.type.startsWith("video/")) {
            setError("Please upload a video file")
            return false
        }
        if (file.size > 100 * 1024 * 1024) { // 100 mb
            setError("Video size must be lesser than 100 MB !!")    
            return false;    
        }
    } else {
        const validTypes = ["image/jpeg", "image/png", "image/webp"]
        if (!validTypes) {
            setError("Please upload a valid file (JPEG, PNG, WEBP)")
            return false; 
        } 
        if (file.size > 5 * 1024 * 1024) {
            setError("Image Size must be lesser than 5 MB !!")
        }
    }
    return false
  }


  return (
    <div className="space-y-2">
      
        <IKUpload
          fileName={fileType === "video" ? "video" : "image"}
          validateFile={validateFile} // giving reference of our validateFile method
          
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          accept={fileType === "video" ? "video/*" : "image/*"}
          className="file-input file-input-bordered w-full"
          useUniqueFileName={true}
          folder={fileType === "video" ? "/video" : "/images"}
        />
        {
            uploading && (
                <div className="flex items-center gap-2 text-sm text-primary">
                    <Loader2 className="animate-spin w-4 h-4"/>
                    <span>Uploading...</span>
                </div>
            )
        }
        {error && (
            <div className="text-error text-sm">{error}</div>
        )}
    </div>
  );
}