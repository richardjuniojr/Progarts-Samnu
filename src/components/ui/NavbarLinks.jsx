import { useLocation } from "react-router-dom";
import { navbarRoutes } from "../../routes/navbarRoutes";
import { Link } from "react-router-dom";

export default function NavbarLinks() {
  const location = useLocation();

  return (
    <>
      {navbarRoutes.map((route, index) => (
        <li key={index}>
          <Link
            to={route.path}
            className={
              location.pathname === route.path
                ? "active"
                : ""
            }
          >
            {route.label}
          </Link>
        </li>
      ))}
    </>
  );
}
