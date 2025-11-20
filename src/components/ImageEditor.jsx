import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";
import { motion } from 'framer-motion';
import Button from './controls/Button';
import Slider from './controls/Slider';
import { compressImageToSize } from '../utils/imageProcessing';

const ASPECT_RATIOS = [
    { label: 'Free', value: NaN },
    { label: '1:1', value: 1 },
    { label: '4:5', value: 4 / 5 },
    { label: '16:9', value: 16 / 9 },
];

const RESOLUTION_PRESETS = [
    { label: '1080p', w: 1920, h: 1080 },
    { label: 'Square HD', w: 1080, h: 1080 },
    { label: 'Portrait', w: 1080, h: 1350 },
];

const ImageEditor = ({ imageSrc, onBack }) => {
    const cropperRef = useRef(null);

    // UI State
    const [zoom, setZoom] = useState(1); // Visual only, cropper handles internal zoom
    const [rotation, setRotation] = useState(0);
    const [aspect, setAspect] = useState(NaN);

    const [resizeWidth, setResizeWidth] = useState(1920);
    const [resizeHeight, setResizeHeight] = useState(1080);
    const [quality, setQuality] = useState(80);

    const [isProcessing, setIsProcessing] = useState(false);

    // Helper to access cropper instance
    const getCropper = () => cropperRef.current?.cropper;

    const handleRotate = (value) => {
        const cropper = getCropper();
        if (cropper) {
            cropper.rotateTo(value);
            setRotation(value);
        }
    };

    const handleZoom = (value) => {
        const cropper = getCropper();
        if (cropper) {
            cropper.zoomTo(value);
            setZoom(value);
        }
    };

    const handleAspectChange = (value) => {
        const cropper = getCropper();
        if (cropper) {
            cropper.setAspectRatio(value);
            setAspect(value);
        }
    };

    const handleDownload = async () => {
        const cropper = getCropper();
        if (!cropper) return;

        setIsProcessing(true);
        try {
            // 1. Get Canvas (Handles Crop, Rotate, and Resize)
            // We can pass width/height here to force resize, OR scale later.
            // Passing width/height to getCroppedCanvas forces the output size.
            const canvas = cropper.getCroppedCanvas({
                width: resizeWidth,
                height: resizeHeight,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            });

            if (!canvas) throw new Error("Could not create canvas");

            // 2. Convert to Blob & Compress
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    setIsProcessing(false);
                    return;
                }

                // Compress if needed (using our existing utility or simple quality arg)
                // Note: toBlob takes quality as 2nd arg, but browser-image-compression is better for size targets.
                // For now, let's stick to simple quality control.

                // Create download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'processed-image.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                setIsProcessing(false);

            }, 'image/jpeg', quality / 100);

        } catch (e) {
            console.error(e);
            alert('Error processing image');
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] lg:flex-row overflow-hidden bg-surface">
            {/* Canvas Area */}
            <div className="flex-1 relative bg-surfaceVariant/30 h-[40vh] lg:h-auto flex items-center justify-center p-4">
                <Cropper
                    src={imageSrc}
                    style={{ height: '100%', width: '100%' }}
                    initialAspectRatio={NaN}
                    guides={true}
                    ref={cropperRef}
                    viewMode={1} // Restrict crop box to canvas
                    dragMode="move"
                    background={false}
                    responsive={true}
                    autoCropArea={0.8}
                    checkOrientation={false} // We handle rotation manually if needed
                />
            </div>

            {/* Controls Sidebar */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-full lg:w-96 bg-surface border-l border-outlineVariant/20 flex flex-col shadow-xl z-10"
            >
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* CROP & ROTATE */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Crop & Rotate</h3>

                        {/* Aspect Ratio Presets */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {ASPECT_RATIOS.map((ratio) => (
                                <button
                                    key={ratio.label}
                                    onClick={() => handleAspectChange(ratio.value)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${(isNaN(aspect) && isNaN(ratio.value)) || aspect === ratio.value
                                        ? 'bg-secondaryContainer text-onSecondaryContainer border-secondaryContainer'
                                        : 'text-onSurfaceVariant border-outlineVariant hover:bg-surfaceVariant'
                                        }`}
                                >
                                    {ratio.label}
                                </button>
                            ))}
                        </div>

                        <Slider
                            label="Zoom"
                            value={zoom}
                            min={0.1}
                            max={3}
                            onChange={handleZoom}
                            unit="x"
                        />
                        <Slider
                            label="Rotation"
                            value={rotation}
                            min={0}
                            max={360}
                            onChange={handleRotate}
                            unit="°"
                        />
                    </div>

                    <div className="h-px bg-outlineVariant/20" />

                    {/* RESIZE */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Resize</h3>

                        {/* Resolution Presets */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {RESOLUTION_PRESETS.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => {
                                        setResizeWidth(preset.w);
                                        setResizeHeight(preset.h);
                                    }}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border text-onSurfaceVariant border-outlineVariant hover:bg-surfaceVariant"
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-surfaceVariant/30 p-3 rounded-xl border border-outlineVariant/50">
                                <label className="text-xs text-onSurfaceVariant block mb-1">Width (px)</label>
                                <input
                                    type="number"
                                    value={resizeWidth}
                                    onChange={(e) => setResizeWidth(Number(e.target.value))}
                                    className="w-full bg-transparent font-mono text-lg outline-none text-onSurface"
                                />
                            </div>
                            <div className="bg-surfaceVariant/30 p-3 rounded-xl border border-outlineVariant/50">
                                <label className="text-xs text-onSurfaceVariant block mb-1">Height (px)</label>
                                <input
                                    type="number"
                                    value={resizeHeight}
                                    onChange={(e) => setResizeHeight(Number(e.target.value))}
                                    className="w-full bg-transparent font-mono text-lg outline-none text-onSurface"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-outlineVariant/20" />

                    {/* COMPRESSION */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Compression</h3>
                        <Slider
                            label="Quality"
                            value={quality}
                            min={10}
                            max={100}
                            onChange={setQuality}
                            unit="%"
                        />
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 border-t border-outlineVariant/20 bg-surface flex gap-3">
                    <Button variant="outlined" onClick={onBack} className="flex-1" icon="fa-solid fa-arrow-left">
                        Back
                    </Button>
                    <Button
                        variant="filled"
                        onClick={handleDownload}
                        className="flex-[2]"
                        icon="fa-solid fa-download"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Download'}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default ImageEditor;
