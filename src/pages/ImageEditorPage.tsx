import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  FaArrowsAltH,
  FaArrowsAltV,
  FaDownload,
  FaRedo,
  FaUndo,
} from 'react-icons/fa';

// Define the preset types
interface Preset {
  name: string;
  width?: number;
  height?: number;
  aspect: number;
}

// Define the image format types
type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

const ImageEditorPage: React.FC = () => {
  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Crop state
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);

  // Output state
  const [outputWidth, setOutputWidth] = useState<number>(0);
  const [outputHeight, setOutputHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<ImageFormat>('image/jpeg');
  const [quality, setQuality] = useState<number>(90);
  const [estimatedSize, setEstimatedSize] = useState<string>('0 KB');

  // Transformation state
  const [rotation, setRotation] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);

  // Error state
  const [error, setError] = useState<string>('');

  // Presets
  const presets: Preset[] = [
    { name: 'Custom', aspect: 0 },
    { name: '1:1 Square', aspect: 1 },
    { name: '16:9 Banner', aspect: 16 / 9 },
    { name: '4:3 Standard', aspect: 4 / 3 },
    { name: '3:2 Photo', aspect: 3 / 2 },
    { name: '2:1 Panorama', aspect: 2 / 1 },
    { name: 'Avatar (200×200)', width: 200, height: 200, aspect: 1 },
    {
      name: 'Social Media (1200×630)',
      width: 1200,
      height: 630,
      aspect: 1200 / 630,
    },
  ];

  // Handle file selection
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, WebP)');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const imageUrl = reader.result?.toString() || '';
        setImgSrc(imageUrl);

        // Reset crop and transformations
        setCrop(undefined);
        setRotation(0);
        setFlipHorizontal(false);
        setFlipVertical(false);
      });
      reader.readAsDataURL(file);
    }
  };

  // Handle image load to set initial crop
  const onImageLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;

    // Set initial dimensions for output
    setOutputWidth(img.width);
    setOutputHeight(img.height);

    // Create a centered crop with a default aspect of 1 (square)
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        img.width,
        img.height
      ),
      img.width,
      img.height
    );

    // Convert percent crop to pixel crop
    const pixelCrop = convertToPixelCrop(initialCrop, img.width, img.height);

    setCrop(initialCrop);
    setCompletedCrop(pixelCrop);

    return false; // Return false to prevent the default behavior
  }, []);

  // Handle preset selection
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const presetIndex = parseInt(e.target.value);
    const selectedPreset = presets[presetIndex];

    // Update aspect ratio
    setAspect(selectedPreset.aspect || undefined);

    // If preset has specific dimensions, set them
    if (selectedPreset.width && selectedPreset.height) {
      setOutputWidth(selectedPreset.width);
      setOutputHeight(selectedPreset.height);
    }

    // If we have an image loaded, update the crop
    if (imgRef.current) {
      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          selectedPreset.aspect,
          imgRef.current.width,
          imgRef.current.height
        ),
        imgRef.current.width,
        imgRef.current.height
      );

      setCrop(newCrop);
    }
  };

  // Reset dimensions to match current crop
  const resetToCropSize = () => {
    if (
      completedCrop &&
      completedCrop.width &&
      completedCrop.height &&
      imgRef.current
    ) {
      // Calculate the actual pixel dimensions of the crop
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      const actualWidth = Math.round(completedCrop.width * scaleX);
      const actualHeight = Math.round(completedCrop.height * scaleY);

      setOutputWidth(actualWidth);
      setOutputHeight(actualHeight);
    }
  };

  // Handle width change with aspect ratio maintenance
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setOutputWidth(newWidth);

    if (
      maintainAspectRatio &&
      completedCrop &&
      completedCrop.width &&
      completedCrop.height
    ) {
      const aspectRatio = completedCrop.width / completedCrop.height;
      setOutputHeight(Math.round(newWidth / aspectRatio));
    }
  };

  // Handle height change with aspect ratio maintenance
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setOutputHeight(newHeight);

    if (
      maintainAspectRatio &&
      completedCrop &&
      completedCrop.width &&
      completedCrop.height
    ) {
      const aspectRatio = completedCrop.width / completedCrop.height;
      setOutputWidth(Math.round(newHeight * aspectRatio));
    }
  };

  // Handle rotation
  const handleRotate = (direction: 'left' | 'right') => {
    setRotation((prev) => {
      const newRotation = direction === 'left' ? prev - 90 : prev + 90;
      return newRotation % 360;
    });
  };

  // Process the image and estimate size
  const processImage = useCallback(async () => {
    if (!imgRef.current || !completedCrop || !canvasRef.current) {
      return null;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    // Calculate the crop area on the original image
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    // Create a temporary canvas for the cropped image
    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d');

    if (!cropCtx) {
      return null;
    }

    // Set crop canvas size to the crop dimensions
    cropCanvas.width = cropWidth;
    cropCanvas.height = cropHeight;

    // Draw the cropped portion to the crop canvas
    cropCtx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Set the main canvas dimensions to match the desired output size
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the context state
    ctx.save();

    // Move to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply flipping
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);

    // Draw the cropped image centered
    ctx.drawImage(
      cropCanvas,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    // Restore the context state
    ctx.restore();

    // Convert canvas to blob
    return new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Calculate and format the size
            const sizeInBytes = blob.size;
            let formattedSize = '';

            if (sizeInBytes < 1024) {
              formattedSize = `${sizeInBytes} B`;
            } else if (sizeInBytes < 1024 * 1024) {
              formattedSize = `${(sizeInBytes / 1024).toFixed(1)} KB`;
            } else {
              formattedSize = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
            }

            setEstimatedSize(formattedSize);
            resolve(blob);
          } else {
            // Handle the case where blob is null
            console.error('Failed to create blob from canvas');
            resolve(new Blob([]));
          }
        },
        outputFormat,
        quality / 100
      );
    });
  }, [
    completedCrop,
    outputWidth,
    outputHeight,
    rotation,
    flipHorizontal,
    flipVertical,
    outputFormat,
    quality,
  ]);

  // Debounced size estimation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (imgRef.current && completedCrop) {
        processImage();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    completedCrop,
    outputWidth,
    outputHeight,
    rotation,
    flipHorizontal,
    flipVertical,
    outputFormat,
    quality,
    processImage,
  ]);

  // Handle download
  const handleDownload = async () => {
    if (!imgRef.current || !completedCrop) {
      setError('Please select an image and crop area first');
      return;
    }

    try {
      // Process the image and get the blob
      const blob = await processImage();

      if (blob && blob.size > 0) {
        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Generate a filename
        const extension = outputFormat.split('/')[1];
        const filename = selectedFile
          ? `${selectedFile.name.split('.')[0]}_edited.${extension}`
          : `image_edited.${extension}`;

        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        setError('Failed to process the image. Please try again.');
      }
    } catch (err) {
      console.error('Error downloading image:', err);
      setError('Failed to download the image. Please try again.');
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Image Resizer & Cropper
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Upload, crop, resize, and transform images. Apply presets or custom
          dimensions and download in various formats.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Image Editor
          </h3>

          {/* File Input */}
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="block mb-2 font-semibold dark:text-dark-primary-text"
            >
              Upload Image:
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/jpeg,image/png,image/webp"
              onChange={onSelectFile}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid w-full"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Supported formats: JPG, PNG, WebP
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Image Preview and Controls */}
          {imgSrc ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Preview with Crop */}
              <div className="space-y-4">
                <h4 className="font-semibold dark:text-dark-primary-text">
                  Preview & Crop:
                </h4>
                <div className="max-w-full overflow-auto border-2 border-border-color dark:border-dark-border-color p-2 bg-gray-100 dark:bg-gray-800">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    className="max-w-full"
                  >
                    <img
                      ref={imgRef}
                      alt="Crop preview"
                      src={imgSrc}
                      style={{
                        transform: `rotate(${rotation}deg) scale(${
                          flipHorizontal ? -1 : 1
                        }, ${flipVertical ? -1 : 1})`,
                        maxWidth: '100%',
                        maxHeight: '500px',
                      }}
                      onLoad={(e) => onImageLoad(e.currentTarget)}
                    />
                  </ReactCrop>
                </div>

                {/* Crop Dimensions Display */}
                {completedCrop && (
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Crop: {Math.round(completedCrop.width)} ×{' '}
                    {Math.round(completedCrop.height)} px
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Presets */}
                <div className="space-y-2">
                  <label
                    htmlFor="preset-select"
                    className="block font-semibold dark:text-dark-primary-text"
                  >
                    Presets:
                  </label>
                  <select
                    id="preset-select"
                    onChange={handlePresetChange}
                    className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid w-full"
                  >
                    {presets.map((preset, index) => (
                      <option key={preset.name} value={index}>
                        {preset.name}
                        {preset.width && preset.height
                          ? ` (${preset.width}×${preset.height})`
                          : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dimensions */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold dark:text-dark-primary-text">
                      Output Dimensions:
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="maintain-aspect"
                        checked={maintainAspectRatio}
                        onChange={(e) =>
                          setMaintainAspectRatio(e.target.checked)
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="maintain-aspect"
                        className="text-sm dark:text-dark-primary-text"
                      >
                        Maintain Aspect Ratio
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="output-width"
                        className="block text-sm dark:text-dark-primary-text"
                      >
                        Width (px):
                      </label>
                      <input
                        type="number"
                        id="output-width"
                        value={outputWidth}
                        onChange={handleWidthChange}
                        min="1"
                        className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="output-height"
                        className="block text-sm dark:text-dark-primary-text"
                      >
                        Height (px):
                      </label>
                      <input
                        type="number"
                        id="output-height"
                        value={outputHeight}
                        onChange={handleHeightChange}
                        min="1"
                        className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={resetToCropSize}
                      className="px-2 py-1 text-sm border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-600"
                      title="Reset dimensions to match current crop size"
                    >
                      Reset to Crop Size
                    </button>
                  </div>
                </div>

                {/* Transformations */}
                <div className="space-y-2">
                  <label className="block font-semibold dark:text-dark-primary-text">
                    Transformations:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleRotate('left')}
                      className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-600"
                      title="Rotate 90° Left"
                    >
                      <FaUndo />
                    </button>
                    <button
                      onClick={() => handleRotate('right')}
                      className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-600"
                      title="Rotate 90° Right"
                    >
                      <FaRedo />
                    </button>
                    <button
                      onClick={() => setFlipHorizontal(!flipHorizontal)}
                      className={`p-2 border-2 border-border-color dark:border-dark-border-color ${
                        flipHorizontal
                          ? 'bg-accent dark:bg-sky-900'
                          : 'bg-gray-200 dark:bg-gray-700'
                      } text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-600`}
                      title="Flip Horizontal"
                    >
                      <FaArrowsAltH />
                    </button>
                    <button
                      onClick={() => setFlipVertical(!flipVertical)}
                      className={`p-2 border-2 border-border-color dark:border-dark-border-color ${
                        flipVertical
                          ? 'bg-accent dark:bg-sky-900'
                          : 'bg-gray-200 dark:bg-gray-700'
                      } text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-600`}
                      title="Flip Vertical"
                    >
                      <FaArrowsAltV />
                    </button>
                  </div>
                </div>

                {/* Output Format */}
                <div className="space-y-2">
                  <label
                    htmlFor="output-format"
                    className="block font-semibold dark:text-dark-primary-text"
                  >
                    Output Format:
                  </label>
                  <select
                    id="output-format"
                    value={outputFormat}
                    onChange={(e) =>
                      setOutputFormat(e.target.value as ImageFormat)
                    }
                    className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid w-full"
                  >
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>

                {/* Quality Slider (for JPEG and WebP) */}
                {(outputFormat === 'image/jpeg' ||
                  outputFormat === 'image/webp') && (
                  <div className="space-y-2">
                    <label
                      htmlFor="quality-slider"
                      className="block font-semibold dark:text-dark-primary-text"
                    >
                      Quality: {quality}%
                    </label>
                    <input
                      type="range"
                      id="quality-slider"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Estimated Size */}
                <div className="space-y-2">
                  <div className="font-semibold dark:text-dark-primary-text">
                    Estimated Output Size:
                  </div>
                  <div className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text">
                    {estimatedSize}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={!imgSrc || !completedCrop}
                  className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2"
                >
                  <FaDownload /> Download Processed Image
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center border-2 border-dashed border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Upload an image to start editing
            </div>
          )}

          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </section>
      </div>

      {/* About Image Editing Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Image Resizing & Cropping
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Image Resizing & Cropping</strong> allows you to adjust the
            dimensions and composition of your images for various use cases.
          </p>
          <p>
            <strong>Features of this tool:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Visual cropping with adjustable crop area</li>
            <li>Preset dimensions for common use cases</li>
            <li>Custom output dimensions with aspect ratio lock</li>
            <li>Image rotation and flipping</li>
            <li>Multiple output formats (JPEG, PNG, WebP)</li>
            <li>Quality control for JPEG and WebP formats</li>
            <li>Estimated output file size</li>
          </ul>
          <p className="mt-2">
            <strong>Note:</strong> All processing is done client-side in your
            browser. Your images are not uploaded to any server.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ImageEditorPage;
