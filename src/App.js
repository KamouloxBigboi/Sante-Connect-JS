import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/login.component";
import Profile from "./pages/profile.component";
import Register from "./pages/register.component";
import { useEffect } from "react";

function App() {

  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Connexion Santé Connect";
        metaDescription = "Page de connexion à l'application Santé Connect";
        break;
      case "/today":
        title = "Aujourd'hui sur Santé Connect";
        metaDescription = "Page des articles du jour de l'application Santé Connect";
        break;
      case "/register":
        title = " Inscription Santé Connect";
        metaDescription = "Page d'inscription de l'application Santé Connect";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App;
