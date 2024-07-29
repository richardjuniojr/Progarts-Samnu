export default function Banner() {
  return (
    <div id="banner" className="hero bg-base-200 min-h-screen">
      <div className="hero-overlay hero-background"></div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center">
          <p className="text-4xl font-semibold">Hello there👋, welcome to</p>
          <h1 className="title">ProgArt</h1>
          <p className="text-xl font-semibold">
            Explore the vibrant world of animation with us! ProgArt, we are a
            team of dedicated animation students showcasing our passion for
            creating immersive and captivating projects. From dynamic characters
            to stunning visual effects, our work embodies creativity and
            innovation in every frame.
          </p>
        </div>
      </div>
    </div>
  );
}
