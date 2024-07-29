import AddProjectForm from "../components/forms/AddProjectForm";
import ProjectList from "../components/list/ProjectList";

export default function ProjectPage() {
  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="sticky top-0 self-start">
          <h1 className="text-3xl font-semibold mb-3">Projects</h1>
          <AddProjectForm />
        </div>
        <div>
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
