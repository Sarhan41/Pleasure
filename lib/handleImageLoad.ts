const handleImageLoad = (event : any) => {
    const { naturalWidth, naturalHeight } = event.target;
    console.log(`Image loaded with dimensions: ${naturalWidth}x${naturalHeight}`);
  };

export { handleImageLoad };