import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { Timestamp, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function ContactsTable() {
  const { data, loading, error } = useFetchData("contacts");

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this contact?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "contacts", id));
      } catch (err) {
        console.error("Error deleting contact:", err);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-error">{error}</p>;
  if (data.length === 0) return <p>No contacts available</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Subject</th>
            <th>Date and Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>
                {contact.timestamp instanceof Timestamp
                  ? contact.timestamp.toDate().toLocaleString()
                  : "Invalid Date"}
              </td>
              <td className="flex flex-wrap gap-1">
                <Link to={`/home/contacts/${contact.id}`} className="btn btn-primary">View</Link>
                <Button text="Delete" variant="danger" onClick={() => handleDelete(contact.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
