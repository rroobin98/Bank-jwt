import { useState } from "react";

let myToken;

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState("");

  function handleLogin() {
    const user = {
      userName,
      password,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:7000/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: userString,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    fetch("http://localhost:7000/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.account);
        setMoney(data.money);
      });
  }

  return (
    <div className="">
      <div className=" flex flex-col border border-black rounded-md bg-orange-50 w-fit mr-10 p-5 shadow-xl ">
        <h2 className="flex place-content-center mb-3">Logga in här!</h2>
        <label>Användarnamn : </label>
        <input
          className="border blorder-black "
          value={userName}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Lösenord : </label>
        <input
          className="border blorder-black"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center p-3">
          <button
            className="border border-black w-fit rounded-lg px-2 mb-4 bg-orange-200 hover:bg-orange-300 "
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>
        <div>
          <button
            className=" bg-orange-200 hover:bg-orange-300 border border-black w-fit rounded-lg px-4 mb-3"
            onClick={handleGetAccount}
          >
            Visa saldo{" "}
          </button>
        </div>
        <div>
          <h2>Saldo : {money}</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
