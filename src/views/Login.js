import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// import minseongSicImage from "../path/to/your/image"; // Import the image file

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // isLoggedIn 상태 변수를 추가합니다.

  const navigate = useNavigate();

  const minseongSicImageStyle = {
    marginBottom: "20px", // Add some spacing below the image
    width: "200px", // Adjust the width as needed
  };

  const loginContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "20px",
  };

  const formGroupStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "300px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const loginButtonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  useEffect(() => {
    console.log(isLoggedIn); // useEffect에서 상태를 확인합니다.
  }, [isLoggedIn]); // 상태가 업데이트될 때마다 useEffect가 실행됩니다.

  const handleLogin = async () => {
    try {
      const data = {
        username: username,
        password: password,
      };

      // Replace "http://172.10.5.95:80/login" with the correct API endpoint URL
      const res = await axios.post("http://172.10.5.95:80/login", data);

      console.log(res);
      console.log("사용자 이름", username);
      console.log("비밀번호", password);

      if(res.status == 200){
        console.log(res.status);
        // setIsLoggedIn(true);
        // console.log(isLoggedIn);

        // navigate("/admin/dashboard");
        onLogin(); // Call the onLogin function passed as a prop to update the isLoggedIn state in the Admin component
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={loginContainerStyle}>
        {/* Add the image above the heading */}
      {/* <img src={minseongSicImage} alt="MinseongSic" style={minseongSicImageStyle} /> */}
      <h1 style={headingStyle}>Welcome to MinseongSic</h1>
      <form>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>사용자 이름:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="button" onClick={handleLogin} style={loginButtonStyle}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
