import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, forgotPassword } from "../../features/authSlice";
import PasswordInput from "../ui/PasswordInput";
import Input from "../ui/Input";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/home");
        toast.success("Login Successful!");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      toast.error("Please enter your email to reset your password.");
      return;
    }

    dispatch(forgotPassword(email))
      .unwrap()
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <Input
          name="email"
          value={email}
          maxLength={50}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <PasswordInput
          name="password"
          value={password}
          maxLength={200}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="link text-primary mt-2 self-end"
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </button>
      <div className="form-control mt-4">
        <Button
          type="submit"
          text="Login"
          variant="primary"
          loading={status === "loading"}
        />
      </div>
      {error && <p className="text-error mt-2">{error}</p>}
    </form>
  );
}
