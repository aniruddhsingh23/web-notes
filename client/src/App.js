import "./App.css";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import Landingpage from "./screen/Landingpage/Landingpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mynotes from "./screen/Mynotes/Mynotes";
import RegisterPage from "./screen/registerscreen/RegisterPage";
import LoginPage from "./screen/loginscreen/LoginPage";
import CreateNote from "./screen/Createnote/CreateNote";
import SingleNote from "./screen/SingleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screen/Profilescreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/note/:id" element={<SingleNote />} />

            <Route path="/mynotes" element={<Mynotes search={search} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
