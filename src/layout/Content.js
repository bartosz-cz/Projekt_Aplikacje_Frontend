import React, { useState, useEffect } from "react";
import IconButton from "../components/IconButton";
import Menu from "./Menu";
import Account from "./Account";

var classnames = require("classnames");

function Content({ accountWindow, setLogged, setAccountWindow }) {
  const [inputText, setInputText] = useState("");
  const [usedKeys, setKeysUsed] = useState([]);
  const [encrypted, setEncrypted] = useState(false);
  const [copyIcon, setCopyIcon] = useState("Copy");
  const textAreaDisabled = usedKeys[0] !== "?" && encrypted;

  const handleChange = (input) => {
    const filtered = input.replace(/[^a-z A-Z]/g, "").toUpperCase();
    if (copyIcon === "Check") setCopyIcon("Copy");
    setInputText(filtered);
  };

  useEffect(() => {
    if (copyIcon === "Check") setCopyIcon("Copy");
  }, [encrypted]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopyIcon("Check");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleChange(text);
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  return (
    <div className="flexColumn center content">
      <div
        className={classnames("flexColumn", "center", { hide: accountWindow })}
      >
        <div className="textAreaContainer flexRow">
          <textarea
            value={inputText}
            className="textArea"
            onChange={(e) => handleChange(e.target.value)}
            disabled={textAreaDisabled}
          />
          <IconButton
            name={copyIcon}
            size={28}
            styleClass="cpButton"
            handler={handleCopy}
            visible={inputText !== ""}
          />
          <IconButton
            name="Paste"
            size={28}
            styleClass="cpButton"
            handler={handlePaste}
            visible={inputText === ""}
          />
        </div>
        <Menu
          setInputText={setInputText}
          inputText={inputText}
          usedKeys={usedKeys}
          setKeysUsed={setKeysUsed}
          encrypted={encrypted}
          setEncrypted={setEncrypted}
        />
      </div>
      <div
        className={classnames("flexColumn", "center", { hide: !accountWindow })}
      >
        <Account setLogged={setLogged} setAccountWindow={setAccountWindow} />
      </div>
    </div>
  );
}

export default Content;
