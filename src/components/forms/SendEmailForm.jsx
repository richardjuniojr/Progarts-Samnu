import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import { toast } from "react-toastify";
import { sendEmail } from "../../utils/sendEmail";

export default function SendEmailForm({ email }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await sendEmail({
        to_email: email,
        subject: subject,
        message: message,
      });
      setSubject("");
      setMessage("");
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send email. Please try again.");
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
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
          {error && <p className="text-error mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
}
