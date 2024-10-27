import { ReactComponent as Account } from "../icons/Account.svg";
import { ReactComponent as Encrypted } from "../icons/Encrypted.svg";
import { ReactComponent as EncryptedAdd } from "../icons/EncryptedAdd.svg";
import { ReactComponent as EncryptedOff } from "../icons/EncryptedOff.svg";
import { ReactComponent as Key } from "../icons/Key.svg";
import { ReactComponent as Lock } from "../icons/Lock.svg";
import { ReactComponent as LockOpen } from "../icons/LockOpen.svg";
import { ReactComponent as Login } from "../icons/Login.svg";
import { ReactComponent as Copy } from "../icons/Copy.svg";
import { ReactComponent as Paste } from "../icons/Paste.svg";
import { ReactComponent as KeyOff } from "../icons/KeyOff.svg";
import { ReactComponent as Check } from "../icons/Check.svg";
import { ReactComponent as Register } from "../icons/Register.svg";
import { ReactComponent as Password } from "../icons/Password.svg";
import { ReactComponent as Username } from "../icons/Username.svg";

const Icon = ({ name, size = 48 }) => {
  const IconComponent = {
    Account: Account,
    Encrypted: Encrypted,
    EncryptedAdd: EncryptedAdd,
    EncryptedOff: EncryptedOff,
    Key: Key,
    Lock: Lock,
    LockOpen: LockOpen,
    Login: Login,
    Copy: Copy,
    Paste: Paste,
    KeyOff: KeyOff,
    Check: Check,
    Register: Register,
    Username: Username,
    Password: Password,
  }[name];

  if (!IconComponent) return null;

  return (
    <IconComponent
      width={size}
      height={size}
      aria-labelledby={name}
      role="img"
    />
  );
};

export default Icon;
