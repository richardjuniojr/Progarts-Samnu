import Logo from "../assets/logo.png";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="hero-background absolute inset-0 bg-cover bg-center z-[-1]"></div>
      <div className="card bg-base-100 w-full max-w-md shadow-xl relative">
        <div className="card-body">
          <div className="flex flex-wrap gap-2 mb-2">
            <img src={Logo} alt="logo" width={60} />
            <h1 className="text-5xl text-primary font-bold">ProgArt</h1>
          </div>
          <p>Login to continue.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
