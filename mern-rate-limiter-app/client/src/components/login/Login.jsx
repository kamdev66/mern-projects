// src/Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Tabs,
  Tab,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
   
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("http://localhost:8000/api/login", {
        mobile_number:data?.mobile_number,
        password:data?.password
      });
      console.log("res", response);
      if (response?.data) {
        toast.success(`${response?.data?.message}`);
        localStorage.setItem('authToken', response?.data?.user?.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error22:", error);
      toast.error(`Registration failed: ${error?.response?.data?.message}`);
    }
  };

  const handleTabChange = (event, newValue) => {
    console.log(event, "::::", newValue);

    if (newValue === 1) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-box">
        <Typography variant="h4" component="h2">
          Login Form
        </Typography>
        <Tabs
          value={0}
          onChange={handleTabChange}
          variant="fullWidth"
          className="tabs"
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="input-container">
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              {...register("mobile_number", { required: "Mobile Number is required" })}
              error={!!errors.mobile_number}
              helperText={errors.mobile_number?.message}
            />
          </Box>
          <Box className="input-container">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
