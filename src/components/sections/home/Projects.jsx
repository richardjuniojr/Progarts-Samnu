import ProjectList from "../../list/ProjectList";

export default function Projects() {
  return (
    <div id="projects" className="hero">
      <div className="hero-content flex-col">
        <h2 className="text-center text-2xl sm:text-4xl font-bold mb-4">
          Our Latest Projects
        </h2>
        <ProjectList />
      </div>
    </div>
  );
}
