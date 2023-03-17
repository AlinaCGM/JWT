import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/navbar/NavBar";

import UserInformation from "./components/UserInformation";
import UserLogIn from "./components/UserLogIn";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      App her
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<UserLogIn />}></Route>
        <Route path="/user" element={<UserInformation />}></Route>
      </Routes>
    </div>
  );
}

export default App;
