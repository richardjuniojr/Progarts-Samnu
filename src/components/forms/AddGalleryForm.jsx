import { db, storage } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import InputFile from "../ui/InputFile";

export default function AddGalleryForm() {
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length) {
      setImageFiles(validFiles);
    } else {
      setImageFiles([]);
      toast.error("Please select valid image files.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!imageFiles.length) {
      toast.error("Please select image files to upload.");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = imageFiles.map((file) => {
        const imageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
            },
            (error) => {
              console.error(`Error uploading ${file.name}: `, error);
              reject(error);
            },
            async () => {
              const imgURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(imgURL);
            }
          );
        });
      });

      const imgURLs = await Promise.all(uploadPromises);

      const galleryRef = collection(db, "gallery");
      const addDocPromises = imgURLs.map((imgURL) =>
        addDoc(galleryRef, {
          image: imgURL,
          timestamp: Timestamp.now(),
        })
      );

      await Promise.all(addDocPromises);

      toast.success("Added successfully!");

      setImageFiles([]);
      setUploadProgress({});
      setUploading(false);
    } catch (err) {
      console.error("Error adding gallery: ", err);
      toast.error("An error occurred while adding your gallery. Please try again.");
      setError("An error occurred while adding your gallery. Please try again.");
      setUploading(false);
    }
  };

  const overallProgress = imageFiles.length
    ? Object.values(uploadProgress).reduce((a, b) => a + b, 0) / imageFiles.length
    : 0;

  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">Upload Images</label>
          <InputFile
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <div className="form-control mt-2">
          <Button
            text={uploading ? `Uploading ${overallProgress.toFixed(0)}%` : "Add"}
            variant="primary"
            disabled={uploading}
          />
          {error && <p className="text-error text-center mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
}
