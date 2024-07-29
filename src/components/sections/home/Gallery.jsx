import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useFetchData from "../../../hooks/useFetchData";
import Loader from "../../ui/Loader";

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const { data, loading, error } = useFetchData("gallery");

  if (loading) return <Loader />;
  if (error) return <p className="text-error text-center mb-4">{error}</p>;
  if (data.length === 0) return <p className="text-center mb-4">No images available</p>;

  const photos = data.map((image) => ({
    src: image.image,
    width: 500,
    height: 300,
    key: image.id,
  }));

  const openLightbox = (index) => {
    setIndex(index);
  };

  const closeLightbox = () => {
    setIndex(-1);
  };

  return (
    <div id="gallery" className="p-4">
      <div className="h-[50px]"></div>
      <PhotoAlbum
        layout="columns"
        photos={photos}
        onClick={({ index }) => openLightbox(index)}
      />
      {index >= 0 && (
        <Lightbox
          open={index >= 0}
          index={index}
          close={closeLightbox}
          slides={photos.map((photo) => ({ src: photo.src }))}
        />
      )}
    </div>
  );
}
