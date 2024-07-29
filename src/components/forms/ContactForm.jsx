import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmail("");
    setSubject("");
    setMessage("");
    toast.success("No email sent for visual only!")
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <h1 className="card-title text-3xl">Contact us</h1>
        <p className="text-lg">
          Please write a message if you have any questions.
        </p>
        <div className="form-control">
          <label className="label">Email</label>
          <Input
            type="email"
            name="email"
            maxLength={40}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Subject</label>
          <Input
            type="text"
            name="subject"
            maxLength={50}
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Message</label>
          <TextArea
            name="message"
            placeholder="Write a message"
            maxLength={600}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="form-control mt-2">
          <Button text="Send" variant="primary" />
        </div>
      </form>
    </div>
  );
}
