import React, { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import cipher from "../utils/cipher";
import decipher from "../utils/decipher";
import keywordGen from "../utils/keyword";
import tabulaRectaGen from "../utils/tabulaRecta";

function Menu({
  setInputText,
  inputText,
  usedKeys,
  setKeysUsed,
  encrypted,
  setEncrypted,
}) {
  const [ciphers, setCiphers] = useState({});
  const [selectedCiphers, setSelectedCiphers] = useState({});
  const [buttonTextHigh, setButtonTextHigh] = useState({});
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  let Ciphers = [];

  const handleNewCipher = () => {
    const randomKeyword = keywordGen(8);
    const name = keywordGen(5);
    const { tabulaRecta, shifts } = tabulaRectaGen();
    setCiphers({
      ...ciphers,
      [name]: { key: randomKeyword, tabula: tabulaRecta, shifts: shifts },
    });
  };
  const handleDeleteCipher = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleSelectCipher = (name) => {
    if (!isDeleteMode) {
      let newCiphers;
      if (!encrypted || usedKeys[0] === "?") {
        if (Object.keys(selectedCiphers).includes(name)) {
          newCiphers = selectedCiphers;
          delete newCiphers[name];
        } else {
          let id = 1 + Object.keys(selectedCiphers).length;
          newCiphers = {
            ...selectedCiphers,
            [name]: { ...ciphers[name], id: id },
          };
        }
        const initialTextHigh = {};
        Object.keys(newCiphers).forEach((key, index) => {
          initialTextHigh[key] = (index + 1).toString();
        });
        setButtonTextHigh(initialTextHigh);
        setSelectedCiphers({
          ...newCiphers,
        });
      }
    } else {
      deleteCipher(name, ciphers, setCiphers, setIsDeleteMode);
    }
  };
  const handleEncrypt = () => {
    let sCiphers = selectedCiphers;
    let actualKeys = Object.values(sCiphers).map((object) => object.id);
    if (!encrypted) {
      const ciphered = cipher(inputText, selectedCiphers);
      if (actualKeys.length === 0) actualKeys.push("?");
      setEncrypted(true);
      setInputText(ciphered);
    } else {
      usedKeys.sort((a, b) => a - b);
      actualKeys.sort((a, b) => a - b);
      console.log(usedKeys);
      console.log(actualKeys);

      for (let i = 0; i < usedKeys.length; i++) {
        if (usedKeys[i] !== actualKeys[i]) {
          break;
        }
      }
      actualKeys = [];
      const decrypted = decipher(inputText, selectedCiphers);
      setEncrypted(false);
      setInputText(decrypted);
    }
    setKeysUsed(actualKeys);
  };
  const [KeyIcon, KeyOffStyle] = isDeleteMode
    ? ["KeyOff", "encryptedAddButton"]
    : ["Key", "lockButton"];
  for (const name of Object.keys(ciphers)) {
    Ciphers.push(
      <IconButton
        name={KeyIcon}
        id={name}
        styleClass="keyAddButton"
        textDown={name}
        textHigh={buttonTextHigh[name] || ""}
        handler={() => handleSelectCipher(name, buttonTextHigh[name] || "1")}
        size={48}
      />
    );
  }
  const LockIcon = encrypted ? "Lock" : "LockOpen";
  return (
    <div className="flexRow menu">
      <IconButton
        name={LockIcon}
        styleClass="lockButton"
        size={48}
        handler={handleEncrypt}
        textDown={usedKeys.join(",")}
        visible={!isDeleteMode}
      />
      {Ciphers}
      <IconButton
        name={"EncryptedOff"}
        styleClass={KeyOffStyle}
        size={48}
        handler={handleDeleteCipher}
        visible={Object.keys(ciphers).length !== 0 && !encrypted}
      />
      <IconButton
        name={"EncryptedAdd"}
        styleClass="encryptedAddButton"
        size={48}
        handler={handleNewCipher}
        visible={!isDeleteMode && Object.keys(ciphers).length < 5}
      />
    </div>
  );
}

function deleteCipher(name, ciphers, setCiphers, setIsDeleteMode) {
  let newCiphers = ciphers;
  delete newCiphers[name];
  setCiphers({ ...newCiphers });
  if (Object.keys(newCiphers).length === 0) setIsDeleteMode(false);
}

export default Menu;
