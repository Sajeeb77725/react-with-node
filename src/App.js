import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleAdduser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    // console.log(name, email);
    const user = { name, email };

    // post data

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data];
        setUser(newUser);
        console.log(data);
      });
  };

  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>
      <form onSubmit={handleAdduser}>
        <input type="text" name="name" id="" placeholder="Name" required />
        <input type="email" name="email" id="" placeholder="Email" required />
        <input type="submit" value="Add user" />
      </form>
      {users.map((user) => (
        <li key={user.id}>
          ID: {user.id} Name: {user.name} Email: {user.email}
        </li>
      ))}
    </div>
  );
}

export default App;
