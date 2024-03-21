import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";
import { userSchema } from "../utils/signupval";
import { UserRegister } from "../../Axios/UserServer/UserServer";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API } from "../../Axios/Api/EndPoint";
import { useDispatch } from "react-redux";
import { Social } from "../../Redux/Store/authSlice";


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Editor",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  if (otpError) {
    toast.error(otpError);
    setOtpError("");
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Submit form data to server for validation and sign up user if validated successfully

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const isFormValid = Object.values(formData).every(
        (value) => value.trim() !== ""
      );
      if (isFormValid) {
        try {
          setLoading(true);
          await userSchema.validate(formData);
          const { username, email, role, password } = formData;
          const registrationResponse = await UserRegister(
            username,
            email,
            role,
            password
          );
          console.log('respp',registrationResponse);
          if (
            registrationResponse === "Email already exists" ||
            registrationResponse === "Username already exists"
          ) {
            setOtpError(registrationResponse);
          } else {
            toast.success("otp has been sent to email");
            navigate("/otp");
          }
        } catch (error) {
          if (error instanceof ValidationError) {
            setOtpError(error.message);
          } else {
            setOtpError("Something went wrong, please try again");
          }
        } finally {
          setLoading(false);
        }
      } else {
        setOtpError("Fill all fields");
      }
    },
    [formData]
  );

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      axios
        .post(
          `${API}/google/`,{"access_token":user.access_token}
        )
        .then((res) => {
          dispatch(Social(res.data))
          console.log(res);
          navigate("/indexEditor")
        })
        .catch((err) => console.log(err));
    }
    
  }, [user]);

  
  

  return (
    <div>
      <div className="flex flex-col justify-center p-8 text-black md:p-14 max-w-lg mx-auto">
        <span className="mb-3 text-4xl font-bold">Welcome to CoLab</span>
        <span className="font-light text-gray-400 mb-8">
          Please enter your details
        </span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <span className="mb-2 text-md">Username</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="py-4 flex items-center">
            <div className="w-2/3 pr-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3">
              <span className="mb-2 text-md">Role</span>
              <select
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="editor">Editor</option>
                <option value="creator">Creator</option>
              </select>
            </div>
          </div>
          <div className="py-4 flex items-center">
            <div className="w-3/5 pr-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="w-2/5">
              <span className="mb-2 text-md">Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-4"></div>
            <span className="font-bold text-md">Forgot password?</span>
          </div>
          <Button
            type="submit" // Set type to submit
            variant="contained"
            color="inherit"
            disabled={loading} // Disable the button when loading
            fullWidth // Make the button full-width
            sx={{
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderColor: "gray.300",
              },
              "&:disabled": {
                backgroundColor: "black",
                color: "white",
              },
            }} // Custom hover and disabled styles
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            } // Show loading indicator when loading
          >
            {loading ? "Registering..." : "Sign in"}
          </Button>
        </form>
        {/* <GoogleLogin onSuccess={console.log('sucess')} /> */}
        <button
          onClick={login}
          className="w-full border mt-5 border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
        >
          <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
          Sign in with Google
        </button>
        <div className="text-center text-gray-400">
          Have an account?
          <span className="font-bold text-black">
            <Link to={"/"}>Sign in</Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
