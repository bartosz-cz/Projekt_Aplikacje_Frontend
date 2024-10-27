import IconButton from "../components/IconButton";

function Header({ accountWindow, setAccountWindow, logged }) {
  const HandleAccount = () => {
    setAccountWindow(!accountWindow);
  };

  const AccountIcon = logged ? "Account" : "Login";

  return (
    <div className="flexRow header" style={{ padding: 10 }}>
      <IconButton
        name={AccountIcon}
        styleClass="loginButton"
        handler={HandleAccount}
      />
    </div>
  );
}

export default Header;
