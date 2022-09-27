import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  
  const authCtx = useContext(AuthContext)

  
    const submitHandler = (event) => {
    event.preventDefault();
        
    console.log("submitHandler called");

    const body = {
      username,
      password,
    }

    const url = "https://socialmtn.devmountain.com";
    //   if they are registering send POST req to the /register endpoint w the body to be able to register, if they're logging in send POST req to the /login screen "are you registering? if not redirect to login body"
    axios
    .post(register ? `${url}/register` : `${url}/login`, body)
    .then((res) => {
      console.log("AFTER AUTH", res.data);
        authCtx.login(res.data.token, res.data.exp, res.data.userId)
    })
    .catch((error) => {
      setPassword("");
      setUsername("");
      // setRegister("")
    });
};
  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="form-input"
        />
        {console.log(username)}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form-input"
        />
        {console.log(password)}
        <button
          className="form-btn"
          onChange={(event) => setRegister(event.target.value)}
        >
          {register ? "Sign Up" : "Login"}
        </button>
        {console.log(register)}
      </form>
      <button className="form-btn">
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
