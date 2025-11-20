import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Button from './controls/Button';

const ImageUploader = ({ onImageUpload }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: false
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl"
            >
                <div
                    {...getRootProps()}
                    className={`
            relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center p-12 text-center gap-4
            ${isDragActive
                            ? 'border-primary bg-primaryContainer/30'
                            : 'border-outlineVariant hover:border-primary hover:bg-surfaceVariant/30 bg-surface'
                        }
          `}
                >
                    <input {...getInputProps()} />

                    <motion.div
                        animate={{ scale: isDragActive ? 1.1 : 1 }}
                        className="w-20 h-20 rounded-full bg-secondaryContainer flex items-center justify-center text-onSecondaryContainer mb-2"
                    >
                        <i className="fa-solid fa-image text-4xl"></i>
                    </motion.div>

                    <div>
                        <h3 className="text-lg font-medium text-onSurface">
                            {isDragActive ? 'Drop image here' : 'Upload an image'}
                        </h3>
                        <p className="text-sm text-onSurfaceVariant mt-1">
                            Drag and drop or click to browse
                        </p>
                    </div>

                    <Button variant="filled" className="mt-4" icon="fa-solid fa-upload">
                        Select Image
                    </Button>
                </div>

                <p className="text-center text-xs text-onSurfaceVariant mt-6">
                    Supports JPG, PNG, WebP up to 10MB. Processed entirely in your browser.
                </p>
            </motion.div>
        </div>
    );
};

export default ImageUploader;
