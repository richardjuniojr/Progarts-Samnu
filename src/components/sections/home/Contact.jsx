import ContactForm from "../../forms/ContactForm";

export default function Contact() {
  return (
    <div id="contact" className="hero bg-base-200 min-h-[85vh]">
      <div className="hero-overlay hero-background"></div>
      <div className="hero-content">
        <ContactForm />
      </div>
    </div>
  );
}
