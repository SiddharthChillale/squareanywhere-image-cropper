import React, { useState } from 'react';
import TopBar from './components/TopBar';
import ImageUploader from './components/ImageUploader';
import ImageEditor from './components/ImageEditor';
import { readFile } from './utils/imageProcessing';

function App() {
  const [imageSrc, setImageSrc] = useState(null);

  const onImageUpload = async (file) => {
    try {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    } catch (e) {
      console.error("Failed to read file", e);
    }
  };

  const onBack = () => {
    setImageSrc(null);
  };

  return (
    <div className="min-h-screen bg-background text-onBackground font-sans">
      <TopBar />
      <main>
        {!imageSrc ? (
          <ImageUploader onImageUpload={onImageUpload} />
        ) : (
          <ImageEditor imageSrc={imageSrc} onBack={onBack} />
        )}
      </main>
    </div>
  );
}

export default App;
