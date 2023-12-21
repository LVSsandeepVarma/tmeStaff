"use client";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
// import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import loaderSlice, {
  setLoaderFalse,
  setLoaderTrue,
} from "../../slice/loaderSlice";
import Loading from "../loader/loading";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUserEdit } from "react-icons/fa";
import {
  faUserAstronaut,
  faUserCheck,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { FormCheck, FormLabel, Popover } from "react-bootstrap";
import {
  expireTokenFalse,
  expireTokenTrue,
} from "../../slice/tokenExpireSlice";
// login component
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loaderReducer.value);
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [tokenExpaired, setTokenExpaired] = useState(false);
  const [password, setPassword] = useState("");
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [timeOutId, setTimeOutId] = useState();

  useEffect(() => {
    const credentials = localStorage?.getItem("saveCredentials");
  }, []);

  useEffect(() => {
      setResponseError("")    
  },[email, password])
  const initialValues = {
    email: email,
    password: password,
  };
  // form validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 10 characters long")
      .max(10, "Password maximum length should be 15 characters long"),
  });
  // useEffect(() => {
  //     return () => {
  //         console.log("in clear timeout")
  //       // Clear the token and the timeout when the component unmounts
  //       clearTimeout(timeOutId);
  //     };
  //   }, [timeOutId]);
  // form submit handler
  const handleSubmit = async (values) => {
    // Handle form submission
    dispatch(setLoaderTrue());
    try {
      dispatch(expireTokenFalse());
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/staff/auth/login",
        { email: values.email, password: values.password }
      );
      console.log(response.data?.token);
      localStorage.setItem("tmToken", response.data?.token);
      if (response?.data?.role == "staff") {
        navigate("/dashboard");
      } else {
        navigate("/team-lead/dashboard");
      }
      dispatch(setLoaderTrue());
      setResponseError("");

      const SavedUserTokenExiry = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();

        // Calculate the remaining time until 12 am
        const remainingTime =
          ((24 - currentHour - 1) * 3600 +
            (59 - currentMinute) * 60 +
            (60 - currentSecond)) *
          1000;
        console.log(remainingTime);
        const timeOutInterval = setTimeout(() => {
          // Execute your code here
          localStorage.removeItem("tmToken");
          console.log("token expaired");
          dispatch(expireTokenTrue());
          console.log("Executing code at 12 am");
        }, remainingTime);

        return () => {
          clearTimeout(timeOutInterval);
          dispatch(expireTokenFalse);
        };
      };

      if (saveCredentials) {
        console.log("saved");
        localStorage.setItem("tmToken", response.data?.token);
        SavedUserTokenExiry();
        // need to add tw token from api respomse
      } else {
        let expireToken;
        setTimeOutId(expireToken);
        expireToken = setTimeout(() => {
          localStorage.removeItem("tmToken");
          console.log("token expaired");
          dispatch(expireTokenTrue());
        }, 720000);

        return () => {
          clearTimeout(expireToken);
          dispatch(expireTokenFalse);
        };
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setResponseError(error?.response?.data?.message);
      dispatch(setLoaderTrue());
    }

    dispatch(setLoaderFalse());
  };
  return (
    <main>
      {/* {loaderState && <Loading/>} */}
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper !p-0">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0 h-[100vh] bg-[#edeef2]">
              <div className="col-lg-4 mx-auto flex items-center w-[100%] flex justify-center !pl-5 sm:!pl-0 !pr-5 sm:!pr-0">
                <div
                  className="auth-form-light text-start py-5 px-4 px-sm-5 bg-[#fff] "
                  style={{ width: "100%" }}
                >
                  <div className="brand-logo mb-[2rem]">
                    <img src="/images/tm-logo-1.png" alt="logo" />
                  </div>
                  <h4 className="text-base	text-blue-950 font-extrabold	">
                    Hello! lets get started
                  </h4>
                  <h6 className="fw-light text-sm">Sign in to continue.</h6>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    <Form className="pt-3">
                      <div className="form-group mb-[1.5rem]">
                        <Field
                          className="form-control form-control-lg text-base bg-transparent"
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email"
                          onInput={(e) => {
                            setEmail(e?.target?.value);
                            setResponseError("");
                          }}
                        />
                        <ErrorMessage
                          className="text-red-600"
                          name="email"
                          component="div"
                        />
                      </div>
                      <div className="form-group mb-[1.5rem]">
                        <Field
                          className="form-control form-control-lg text-base bg-transparent"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          onInput={() => setResponseError("")}
                        />
                        <ErrorMessage
                          className="text-red-600"
                          name="password"
                          component="div"
                        />
                      </div>
                      {responseError.length ? (
                        <p className="text-red-600">{responseError}</p>
                      ) : (
                        ""
                      )}
                      <div className="mt-3">
                        <button
                          type="submit"
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          href="../../index.html"
                        >
                          SIGN IN
                        </button>
                      </div>
                      <div className="my-2 flex justify-start align-items-center">
                        {/* <div className="form-check">
                                                    <label className="form-check-label text-muted !ml-0">
                                                        <input type="checkbox" className="form-check-input !opacity-100" onClick={()=>setSaveCredentials(!saveCredentials)} />
                                                        Keep me signed in
                                                    </label>
                                                </div> */}
                        <FormCheck
                          type="checkbox"
                          id="keepSignedIn"
                          className="me-2"
                          onClick={() => setSaveCredentials(!saveCredentials)}
                        />
                        <FormLabel htmlFor="keepSignedIn" className="mb-0">
                          Keep me signed in
                        </FormLabel>
                      </div>
                      <p>
                        <FontAwesomeIcon
                          icon={faUserLock}
                          className="mr-2 cursor-pointer"
                        />
                        <a
                          href="/reset-password"
                          className="auth-link text-black"
                        >
                          Forgot password?
                        </a>
                      </p>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
