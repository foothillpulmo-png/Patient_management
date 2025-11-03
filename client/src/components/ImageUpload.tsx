import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Image } from "@shared/schema";

interface ImageUploadProps {
  concernId?: string;
  callDocId?: string;
  onUploadComplete?: (image: Image) => void;
}

export function ImageUpload({ concernId, callDocId, onUploadComplete }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, GIF, or WebP)",
        variant: "destructive",
      });
      return;
    }

    await uploadFile(imageFiles[0]);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      if (concernId) formData.append("concernId", concernId);
      if (callDocId) formData.append("callDocId", callDocId);

      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const image: Image = await response.json();
      
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      });

      onUploadComplete?.(image);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-image-file"
      />
      
      <Card
        className={`p-6 border-2 border-dashed transition-colors cursor-pointer ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover-elevate"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        data-testid="card-image-upload"
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          {isUploading ? (
            <>
              <Upload className="w-8 h-8 text-primary animate-pulse" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Drop an image here or click to browse</p>
                <p className="text-xs text-muted-foreground">JPEG, PNG, GIF, or WebP (max 10MB)</p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

interface ImageGalleryProps {
  images: Image[];
  onDelete?: (imageId: string) => void;
}

export function ImageGallery({ images, onDelete }: ImageGalleryProps) {
  const { toast } = useToast();

  const handleDelete = async (imageId: string) => {
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      toast({
        title: "Image deleted",
        description: "The image has been removed",
      });

      onDelete?.(imageId);
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="gallery-images">
      {images.map((image) => (
        <Card key={image.id} className="relative group overflow-hidden" data-testid={`card-image-${image.id}`}>
          <img
            src={`/api/images/file/${image.path}`}
            alt={image.filename}
            className="w-full h-32 object-cover"
            data-testid={`img-thumbnail-${image.id}`}
          />
          {onDelete && (
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
              onClick={() => handleDelete(image.id)}
              data-testid={`button-delete-image-${image.id}`}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
            <p className="text-xs text-white truncate" data-testid={`text-filename-${image.id}`}>
              {image.filename}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
