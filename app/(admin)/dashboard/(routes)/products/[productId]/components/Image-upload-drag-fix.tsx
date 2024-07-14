"use client";

import { ImagePlus, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
  isDraggable?: boolean; // Add this prop to control drag-and-drop feature
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  isDraggable = false, // Default to false
}) => {
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState(value);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setImages(value); // Synchronize with prop value
  }, [value]);

  const onUpload = (result: any) => {
    const updatedImages = [...images, result.info.secure_url];
    setImages(updatedImages);
    onChange(updatedImages);
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggingIndex === null || draggingIndex === index) return;
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggingIndex, 1);
    updatedImages.splice(index, 0, draggedImage);
    setDraggingIndex(index);
    setImages(updatedImages);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    onChange(images); // Update parent component's state
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items=center gap-4 ">
        {images.map((url, index) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            draggable={isDraggable}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDragEnd={handleDragEnd}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => {
                  const updatedImages = images.filter((_, i) => i !== index);
                  setImages(updatedImages);
                  onRemove(url);
                }}
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} fill className="object-cover" alt="Image" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="xnpugo12">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
