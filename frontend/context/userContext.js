import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

const serverUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const UserContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Initialize user from token on mount
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(`${serverUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
        } catch (error) {
          console.log("Failed to fetch user:", error);
          localStorage.removeItem("token");
          setUser({});
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  // REGISTER
  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${serverUrl}/auth/register`, userState);

      toast.success("User registered successfully");

      setUserState({
        name: "",
        email: "",
        password: "",
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  // LOGIN
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${serverUrl}/auth/login`, {
        email: userState.email,
        password: userState.password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      // Fetch user data and set it in context
      const userRes = await axios.get(`${serverUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userRes.data);

      toast.success("Login successful");

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
  };

  // LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("token");

    setUser({});

    toast.success("Logged out");

    router.push("/login");
  };

  const updateUser = async (e, updatedUser) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${serverUrl}/auth/me`,
        updatedUser,
        getAuthHeader()
      );

      setUser(response.data);
      setUserState((prevState) => ({
        ...prevState,
        name: "",
        email: "",
      }));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await axios.post(
        `${serverUrl}/auth/change-password`,
        { oldPassword, newPassword },
        getAuthHeader()
      );

      toast.success(response.data?.message || "Password updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        updateUser,
        changePassword,
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
