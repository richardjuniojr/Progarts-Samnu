import Logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-100 p-10 shadow">
      <aside>
        <img src={Logo} alt="logo" width={60} />
        <p className="font-bold text-primary">ProgArts Team</p>
        <p>Copyright © ${new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}
