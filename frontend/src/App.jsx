import { useState } from "react";

import Login from "./Login";

function App() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    const user = {
      userName,
      password,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:7000/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: userString,
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="flex justify-center mt-10 ">
      <div className=" flex flex-col border border-black bg-orange-50 w-fit mr-10 rounded-sm p-5 ">
        <h2 className="text-center mb-3">Registrera dig här</h2>
        <div className="flex flex-col ">
          <label>Användarnamn : </label>
          <input
            className="border blorder-black"
            value={userName}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Lösenord : </label>
          <input
            className="border blorder-black"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center p-3">
            <button
              className="border border-black rounded-lg w-fit px-3 bg-orange-200 hover:bg-orange-300  mt-5"
              onClick={handleRegister}
            >
              Registrera
            </button>
          </div>
        </div>
      </div>
      <Login />
    </div>
  );
}

export default App;
