import { toast } from "react-toastify";
export const fileExtraction = async (media) => {
  const allowedTypes = ["image/jpeg", "image/png", ,"image/jpg"];
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes

  const mediaArray = [];
  const blobUrlArray = [];
  let totalSize = 0;
  for (let i = 0; i < media.length; i++) {
    if (!allowedTypes.includes(media[i].type)) {
      toast.error("Invalid file type. Only images files are allowed.");
      return { imageUrl: [], imageInformation: [] };
    }
    totalSize += media[i].size;
    if (totalSize > maxSize) {
      toast.error("Total file size exceeds the allowed limit (5MB).");
      return { imageUrl: [], imageInformation: [] };
    }
    const url = URL.createObjectURL(media[i]);
    mediaArray.push(media[i]);
    blobUrlArray.push(url);
  }
  console.log(mediaArray,"23dds")
  return {
    imageUrl: blobUrlArray,
    imageInformation: mediaArray,
  };
};
