import imageCompression from 'browser-image-compression';

export const readFile = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
};

export const compressImageToSize = async (file, maxSizeMB) => {
    const options = {
        maxSizeMB: maxSizeMB,
        useWebWorker: true,
    }
    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.log(error);
        return file;
    }
}
