import "./App.css";
import React, { useState } from "react";
import Header from "./layout/Header";
import Content from "./layout/Content";

function App() {
  const [accountWindow, setAccountWindow] = useState(false);
  const [logged, setLogged] = useState(false);
  return (
    <div className="app">
      <Header
        accountWindow={accountWindow}
        setAccountWindow={setAccountWindow}
        logged={logged}
      />
      <Content
        accountWindow={accountWindow}
        setAccountWindow={setAccountWindow}
        setLogged={setLogged}
      />
    </div>
  );
}

export default App;
