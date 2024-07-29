import AddGalleryForm from "../components/forms/AddGalleryForm";
import Gallery from "../components/list/Gallery";

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="sticky top-0 self-start">
          <h1 className="text-3xl font-semibold mb-3">Gallery</h1>
          <AddGalleryForm />
        </div>
        <div>
          <Gallery />
        </div>
      </div>
    </div>
  );
}
