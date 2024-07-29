import Button from "../ui/Button";

export default function ProjectCard({ project, onDelete }) {
  return (
    <div className="flex flex-row gap-5">
      <div
        className="w-full mockup-window bg-base-300 border transition-transform duration-500 ease-in-out
        transform scale-95 hover:scale-100"
      >
        <div className="bg-base-200 flex justify-center">
          <video controls className="w-full max-w-[1200px]">
            <source src={project.vidURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold my-3">{project.title}</h1>
        <p className="text-xl">{project.description}</p>
        <Button text="Delete" variant="danger" onClick={() => onDelete(project.id)} />
      </div>
    </div>
  );
}
