import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import "yet-another-react-lightbox/styles.css";
import useFetchData from "../../hooks/useFetchData";

export default function Gallery() {
  const { data, loading, error} = useFetchData("gallery");
  const [deletingImage, setDeletingImage] = useState(null);

  const handleDelete = async (imageId) => {
    if (!window.confirm("Are you want to delete this image?")) return;

    try {
      setDeletingImage(imageId);
      const imageRef = doc(db, "gallery", imageId);
      await deleteDoc(imageRef);
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image. Please try again.");
    } finally {
      setDeletingImage(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-error text-center mb-4">{error}</p>;
  if (data.length === 0)
    return <p className="text-center mb-4">No images available</p>;

  return (
    <div id="gallery" className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {data.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.image}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg shadow-md hover:opacity-75 transition-opacity duration-300"
            />
            <div className="absolute top-1 right-1 flex">
              <Button
                text={deletingImage === image.id ? "Deleting..." : "Delete"}
                variant="danger"
                onClick={() => handleDelete(image.id)}
                disabled={deletingImage === image.id}
                className="group-hover:block hidden"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
