
export default function Avatar({ user }) {
  return (
    <div className="avatar m-2">
      <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
        <div className="bg-primary text-neutral-content text-center w-10 rounded-full">
          <span className="text-4xl">{user.email.charAt(0).toUpperCase() || "D"}</span>
        </div>
      </div>
    </div>
  );
}
