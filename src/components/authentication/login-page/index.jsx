import { emailValidator } from "@/components/common/common-functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/Config/services";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputLabel, setInputLabel] = useState("");
  const [inValidEmail, setInvalidEmail] = useState(null);
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const [loginLoader, setLoginLoader] = useState(false);

  const loginUserFunction = async () => {
    setLoginLoader(true);
    const response = await loginUser(loginUserData);
    const userDetails = response?.data?.user;
    const access_token = response?.data?.at;
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("access_token", access_token);
    navigate("/");
    alert(response?.message);
    setLoginLoader(false);
  };

  const handleLoginUserDataChange = (value, name) => {
    if (name === "email") {
      if (value === "") {
        setInvalidEmail(false);
        return;
      }
      const validEmail = emailValidator(value);
      if (!validEmail) {
        setInvalidEmail(true);
        return;
      } else {
        setInvalidEmail(false);
      }
    }
    setLoginUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center py-5 ">
      <div className="w-auto h-auto flex flex-col items-center justify-start gap-4 min-w-96">
        <span className="text-4xl font-semibold">Login</span>
        <div className="flex flex-col items-start w-full gap-2">
          <div className="flex items-center justify-between w-full">
            <label
              className={`text-xs ${inputLabel === "email" && "text-blue-600"}`}
              htmlFor="email"
            >
              Work Email
            </label>
            {inValidEmail && (
              <span className="text-xs text-red-500">Invalid Email</span>
            )}
          </div>
          <Input
            placeholder="Enter your email"
            onFocus={() => setInputLabel("email")}
            onBlur={() => {
              setInputLabel("");
            }}
            name="email"
            onChange={(e) => handleLoginUserDataChange(e.target.value, "email")}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <label
            className={`text-xs ${
              inputLabel === "password" && "text-blue-600"
            }`}
            htmlFor="password"
          >
            Your Password
          </label>
          <Input
            placeholder="Password"
            onFocus={() => setInputLabel("password")}
            onBlur={() => setInputLabel("")}
            name="password"
            type="password"
            onChange={(e) =>
              handleLoginUserDataChange(e.target.value, "password")
            }
          />
        </div>
        <div className="w-full h-auto">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={loginUserFunction}
          >
            {loginLoader ? (
              <CircularProgress size={18} sx={{ color: "white !important" }} />
            ) : (
              "Login"
            )}
          </Button>
        </div>

        <div className="flex flex-col items-center justify-start gap-3">
          <span className="text-sm">- or Continue With -</span>
          <div className="-5">
            <Button className="w-full flex items-center justify-center rounded-full bg-white text-black border border-gray-500 hover:bg-gray-500/20 text-md">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="google"
                className="h-5 w-5"
              />
              Google
            </Button>
          </div>
        </div>
        <div>
          <span className="text-sm">
            Dont have an account?{" "}
            <a href="/signup" className="text-blue-600">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
