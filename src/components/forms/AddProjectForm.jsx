import { db, storage } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import { toast } from "react-toastify";
import InputFile from "../ui/InputFile";

export default function AddProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
    } else {
      setVideoFile(null);
      toast.error("Please select an MP4 video file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!videoFile) {
      toast.error("Please select a video file to upload.");
      return;
    }

    try {
      const videoRef = ref(storage, `videos/${videoFile.name}`);
      const uploadTask = uploadBytesResumable(videoRef, videoFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading video: ", error);
          setError("Error uploading video. Please try again.");
          toast.error("Error uploading video. Please try again.");
        },
        async () => {
          const vidURL = await getDownloadURL(uploadTask.snapshot.ref);
          const projectRef = collection(db, "projects");
          await addDoc(projectRef, {
            vidURL,
            title,
            description,
            timestamp: Timestamp.now(),
          });

          toast.success("Added a project successfully!");

          setTitle("");
          setDescription("");
          setVideoFile(null);
          setUploadProgress(null);
        }
      );
    } catch (err) {
      console.error("Error adding project: ", err);
      toast.error(
        "An error occurred while adding your project. Please try again."
      );
      setError(
        "An error occurred while adding your project. Please try again."
      );
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <h1 className="card-title text-3xl">Add Project</h1>
        <p className="text-lg">Please add a video, title, and description for your project.</p>
        <div className="form-control">
          <label className="label">Add Project Video</label>
          <InputFile 
            name="vidURL"
            accept="video/mp4"
            onChange={handleVideoChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Title</label>
          <Input
            type="text"
            name="title"
            maxLength={50}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <TextArea
            name="description"
            placeholder="Write a description"
            maxLength={600}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control mt-2">
          <Button 
            text={uploadProgress !== null ? `Uploading ${uploadProgress.toFixed(0)}%` : "Add Project"} 
            variant="primary" 
            disabled={uploadProgress !== null} 
          />
          {error && <p className="text-error text-center mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
}
