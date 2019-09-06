const defaultSettings = {
  maxSideSize: 2048,
  type: 'image/jpeg',
  quality: 0.25,
};

export default function compressImage(blob, options = {}) {
  options = {
    ...defaultSettings,
    ...options,
  };
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const image = new Image();

  return new Promise((resolve) => {
    URL.revokeObjectURL(image.src);
    image.onload = () => {
      const maxSize = Math.max(image.naturalWidth, image.naturalHeight);
      const scale = maxSize / options.maxSideSize;
      canvas.width = scale > 1 ? image.naturalWidth / scale : image.naturalWidth;
      canvas.height = scale > 1 ? image.naturalHeight / scale : image.naturalHeight;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (compressedBlob) => {
          resolve(compressedBlob);
        },
        options.type,
        options.quality,
      );
    };
    image.src = URL.createObjectURL(blob);
  });
}
