import HomeLayout from "../components/layouts/HomeLayout";
import ContactPage from "../pages/ContactPage";
import GalleryPage from "../pages/GalleryPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectPage from "../pages/ProjectPage";
import ViewContactPage from "../pages/ViewContactPage";
import ProtectedRoutes from "../components/ProtectedRoute";

export const mainRoutes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LoginPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoutes>
        <HomeLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoutes>
            <ProjectPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "gallery",
        element: (
          <ProtectedRoutes>
            <GalleryPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "contacts",
        element: (
          <ProtectedRoutes>
            <ContactPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "contacts/:id",
        element: (
          <ProtectedRoutes>
            <ViewContactPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
];
