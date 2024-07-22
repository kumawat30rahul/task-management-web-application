import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { registerUser } from "@/Config/services";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { emailValidator } from "@/components/common/common-functions";
import { useToast } from "@/components/ui/use-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inputLabel, setInputLabel] = useState("");
  const [inValidEmail, setInvalidEmail] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [registeringUserLoader, setRegisteringUserLoader] = useState(false);

  const handleUserInfoChange = (value, name) => {
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
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerUserFunction = async () => {
    setRegisteringUserLoader(true);
    const payload = {
      ...userInfo,
      createdAt: new Date(),
    };
    try {
      const response = await registerUser(payload);
      if (response?.status === "ERROR") {
        toast({
          variant: "destructive",
          title: response?.message,
        });
        setRegisteringUserLoader(false);
        return;
      }
      setRegisteringUserLoader(false);
      toast({
        variant: "success",
        title: response?.message,
      });
      navigate("/login");
    } catch (error) {
      setRegisteringUserLoader(false);
      toast({
        variant: "destructive",
        title: error?.message,
      });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center py-5">
      <div className="w-auto h-auto flex flex-col items-center justify-start gap-4 min-w-96">
        <div className="flex items-center">
          <img
            src="https://preview.redd.it/hi-this-is-a-logo-for-the-task-manager-application-called-v0-si3hzlaglc7b1.png?width=640&crop=smart&auto=webp&s=04d231d246026a59f988ac183a82e0ea2ca8ef4e"
            alt="logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-normal">Taskify</span>
        </div>
        <span className="text-3xl font-semibold">
          Start organizing with Taskify
        </span>
        <div className="flex flex-col items-start w-full gap-2">
          <label
            className={`text-xs ${
              inputLabel === "firstName" && "text-blue-600"
            }`}
            htmlFor="firstName"
          >
            First Name
          </label>
          <Input
            placeholder="First Name"
            onFocus={() => setInputLabel("firstName")}
            onBlur={() => setInputLabel("")}
            name="firstName"
            onChange={(e) => handleUserInfoChange(e.target.value, "firstName")}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <label
            className={`text-xs ${
              inputLabel === "lastName" && "text-blue-600"
            }`}
            htmlFor="lastName"
          >
            Last Name
          </label>
          <Input
            placeholder="Last Name"
            onFocus={() => setInputLabel("lastName")}
            onBlur={() => setInputLabel("")}
            name="lastName"
            onChange={(e) => handleUserInfoChange(e.target.value, "lastName")}
          />
        </div>
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
            onBlur={() => setInputLabel("")}
            name="email"
            onChange={(e) => handleUserInfoChange(e.target.value, "email")}
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
            placeholder="Enter your email"
            onFocus={() => setInputLabel("password")}
            onBlur={() => setInputLabel("")}
            name="password"
            type="password"
            onChange={(e) => handleUserInfoChange(e.target.value, "password")}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <label
            className={`text-xs ${
              inputLabel === "confirm-password" && "text-blue-600"
            }`}
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <Input
            placeholder="Enter your email"
            onFocus={() => setInputLabel("confirm-password")}
            onBlur={() => setInputLabel("")}
            name="confirm-password"
            type="password"
            onChange={(e) =>
              handleUserInfoChange(e.target.value, "confirmedPassword")
            }
          />
        </div>
        <div className="w-full h-auto">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={registerUserFunction}
          >
            {registeringUserLoader ? (
              <CircularProgress size={18} sx={{ color: "white" }} />
            ) : (
              "Signup"
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
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
