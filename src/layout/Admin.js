import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../utils/serverRequest";
import IconButton from "../components/IconButton";

function Admin({ email, logged, admin }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers.filter((user) => user.Email !== email)); // Filter out the current admin from the list
    };

    if (logged && admin) fetchUsers();
  }, [email]);

  const handleSelect = (user) => {
    setSelected(user);
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setSelected(null); // Deselect user after deletion
    // Refresh user list after deletion
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers.filter((user) => user.Email !== email));
  };

  return (
    <div className="flexColumn usersWindow">
      {selected ? (
        <div className="flexColumn text">
          <div className="flexRow">
            <IconButton
              name="ArrowBack"
              styleClass="manageButton"
              handler={() => setSelected(null)}
            />
            {selected.Email}
          </div>
          <IconButton
            name="RemoveUser"
            styleClass="manageButton"
            handler={() => handleDelete(selected.User_ID)}
          />
        </div>
      ) : (
        users.map((user) => (
          <div key={user.User_ID} className="flexRow text">
            {user.Email}
            <IconButton
              name="Manage"
              styleClass="manageButton"
              handler={() => handleSelect(user)}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
