import React, { useState } from "react";
import InputForm from "../components/InputForm";
import IconButton from "../components/IconButton";

function Account({ setLogged, setAccountWindow }) {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });
  const [errors, setErrors] = useState({
    Username: "",
    Password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...errors, [name]: "" }; // Clear errors when user types

    if (value.length < 41) {
      const filteredValue = value.replace(/[^a-zA-Z0-9@.]/g, ""); // Allow @ and . for emails
      let newFormData = { ...formData, [name]: filteredValue };
      setFormData(newFormData);
    } else {
      newErrors[name] = "Maximum 20 characters allowed";
    }
    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;
    const newErrors = { ...errors };

    if (!formData.Username.includes("@")) {
      newErrors.Username = "Invalid email format";
      valid = false;
    }
    if (formData.Password.length < 6) {
      newErrors.Password = "Password must be at least 6 characters";
      valid = false;
    }
    setErrors(newErrors);

    if (valid) {
      setLogged(true);
      setAccountWindow(false);
    }
  };

  return (
    <div className="flexColumn loginWindow">
      <form onSubmit={handleSubmit} className="flexColumn center">
        <InputForm
          name="Username"
          placeholder="Email"
          onChange={handleInputChange}
          value={formData.Username}
          type="text"
        />
        {errors.Username && (
          <div style={{ color: "red" }}>{errors.Username}</div>
        )}
        <div style={{ height: 10 }} />
        <InputForm
          name="Password"
          placeholder="Password"
          onChange={handleInputChange}
          value={formData.Password}
          type="password"
        />
        {errors.Password && (
          <div style={{ color: "red" }}>{errors.Password}</div>
        )}
        <div style={{ height: 10 }} />
        <div className="flexRow">
          <IconButton
            type="submit"
            name="Login"
            styleClass="encryptedAddButton"
            size={48}
          />
        </div>
      </form>
    </div>
  );
}

export default Account;
