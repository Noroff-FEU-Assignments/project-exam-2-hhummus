import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedPage from "./components/pages/FeedPage";
import LoginRegister from "./components/pages/LoginRegister";
import ProfilePage from "./components/pages/ProfilePage";
import UsersPage from "./components/pages/UsersPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="feed" element={<FeedPage />} />
        <Route path="/" element={<LoginRegister />} />
        <Route path="/feed/your-profile/:name" element={<ProfilePage />} />
        <Route path="/feed/profiles/:name" element={<UsersPage />} />

        <Route path="*" element={<div>feil</div>} /> 
      </Routes>
    </Router>
  );
};

export default App;
