import Avatar from "../components/ui/Avatar";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import useFetchData from "../hooks/useFetchData";
import { Timestamp } from "firebase/firestore";
import SendEmailForm from "../components/forms/SendEmailForm";

export default function ViewContactPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetchData("contacts");

  if (loading) return <Loader />;
  if (error) return <p className="text-error">{error}</p>;

  const findOneContact = data.find((contact) => contact.id === id);

  if (!findOneContact) return <p>No contact found</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Avatar user={{ email: findOneContact.email || "Admin" }} />
        <div>
          <h2 className="text-xl font-semibold">{findOneContact.email}</h2>
          <p>
            {findOneContact.timestamp instanceof Timestamp
              ? findOneContact.timestamp.toDate().toLocaleString()
              : "Invalid Date"}
          </p>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-3">{findOneContact.subject}</h1>
      <p>{findOneContact.message}</p>
      <SendEmailForm email={findOneContact.email} />
    </div>
  );
}
