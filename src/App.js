import {BrowserRouter as HashRouter, Routes, Route } from "react-router-dom";
import FeedPage from "./components/pages/FeedPage";
import LoginRegister from "./components/pages/LoginRegister";
import ProfilePage from "./components/pages/ProfilePage";
import UsersPage from "./components/pages/UsersPage";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="feed" element={<FeedPage />} />
        <Route path="/project-exam-2-hhummus/" element={<LoginRegister />} />
        <Route path="/feed/your-profile/:name" element={<ProfilePage />} />
        <Route path="/feed/profiles/:name" element={<UsersPage />} />

        <Route path="*" element={<div>feil</div>} /> 
      </Routes>
    </HashRouter>
  );
};

export default App;
