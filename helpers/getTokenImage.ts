export const getImageURL = (imagePath: string): string => {
  if (!imagePath) return "";
  if (imagePath.includes("ipfs://ipfs/")) {
    return imagePath.replace("ipfs:/", "https://ipfs.io");
  } else if (imagePath.includes("ipfs://")) {
    return imagePath.replace("ipfs:/", "https://ipfs.io/ipfs");
  }
  return imagePath;
};
