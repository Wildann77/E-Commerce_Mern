import React, { useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

import { useRef } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';
import { buildApiUrl } from '@/config';

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = ''; // Reset the input value to allow re-uploading the same file
    }
  }

  // 异步上传图片到Cloudinary
  async function UploadCloudinary() {
    setImageLoadingState(true);

    const data = new FormData();

    data.append('my_file', imageFile);

    const response = await axios.post(
      buildApiUrl('api/admin/products/upload-image'),
      data
    );

    console.log(response, 'response');

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);

      setImageLoadingState(false);
    }
  }
  useEffect(() => {
    if (imageFile !== null) UploadCloudinary();
  }, [imageFile]);

  console.log({ imageFile, uploadedImageUrl, imageLoadingState }, 'gambar');

  return (
    <div className={`w-full  mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? 'opacity-60' : ''
          } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload" // ✅ perbaikan typo
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? 'cursor-not-allowed' : ''
              } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileIcon className="w-6 h-6 text-primary" />
              <p className="text-sm font-medium truncate max-w-[200px]">
                {imageFile?.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
