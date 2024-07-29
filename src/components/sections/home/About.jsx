import AboutList from "../../list/AboutList";

export default function About() {
  return (
    <div id="about" className="flex flex-col text-center items-center justify-center p-4">
      <div className="h-[50px]"></div>
      <h2 className="text-3xl sm:text-5xl font-bold mb-2">About us</h2>
      <p className="text-lg sm:text-xl mb-2">We are a team of dedicated professionals committed to providing exceptional service and quality products.</p>
      <p className="text-md sm:text-lg font-semibold text-primary mb-4">Our mission is to innovate and lead in our industry, offering unparalleled solutions to our clients.</p>
      <AboutList />
    </div>
  );
}
