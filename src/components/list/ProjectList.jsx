import useFetchData from "../../hooks/useFetchData";
import ProjectCard from "../cards/ProjectCard";
import Loader from "../ui/Loader";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function ProjectList() {
  const { data, loading, error } = useFetchData("projects");

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await deleteDoc(doc(db, "projects", projectId));
      toast.success("Project deleted successfully!");
    } catch (err) {
      console.error("Error deleting project: ", err);
      toast.error("An error occurred while deleting the project. Please try again.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-error">{error}</p>;
  if (data.length === 0) return <p>No projects available</p>;

  return (
    <div>
      {data.map((project, index) => (
        <ProjectCard key={index} project={project} onDelete={handleDelete} />
      ))}
    </div>
  );
}
