"use client";
import axios from "axios";
// import Image from "next/image";
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
import { setUserInfo } from "../../slice/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
// login component
export default function Locked() {
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loaderReducer.value);
  const userInfo = useSelector((state) => state?.userInfoReducer);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [responseError, setResponseError] = useState("");

  // useEffect(() => {
  //     const handleBackButton = (event) => {
  //       event.preventDefault();
  //       // Optionally, you can perform custom actions here before navigating back
  //       navigate(1);
  //     };

  //     window.addEventListener('popstate', handleBackButton);

  //     return () => {
  //       window.removeEventListener('popstate', handleBackButton);
  //     };
  //   }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/staff/get-user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data);
        dispatch(setUserInfo(response?.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo().then(() => {
      dispatch(setLoaderFalse());
    });
    const lockUser = async () => {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/staff/lockout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    };
    lockUser();
  }, []);
  const initialValues = {
    password: password,
  };
  // form validation
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 10 characters long")
      .max(10, "Password maximum length should be 15 charecters long"),
  });
  // form submit handler
  const handleSubmit = async (values) => {
    // Handle form submission
    dispatch(setLoaderTrue());
    try {
      const token = sessionStorage.getItem("tmToken")?.length
        ? sessionStorage.getItem("tmToken")
        : localStorage.getItem("tmToken");
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/staff/unlock",
        { password: values.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      navigate(-1);
      dispatch(setLoaderTrue());
      setResponseError("");
    } catch (error) {
      console.log(error);
      setResponseError(error?.response?.data?.message);
      // setResponseError(error)
      dispatch(setLoaderTrue());
    }
    dispatch(setLoaderFalse());
    console.log(values);
  };
  return (
    <main>
      {loaderState && <Loading />}
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
                  <div className=" mb-[2rem] flex flex-col items-center">
                    <div className="profile-pic w-20 h-20 rounded-full bg-zinc-400	ml-2  flex justify-center items-center ">
                      <BsPerson className="" size={60} />
                    </div>
                    <h4 className="block text-bold-500">
                      {userInfo?.value?.data?.staff?.username}
                    </h4>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                  >
                    <Form className="pt-3">
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
                      {
                        responseError?.length ? (
                          <p className="text-red-600">{responseError}</p>
                        ) : (
                          ""
                        )
                        // <p className='text-red-600'>Account Locked is considered as Break Time and calculated in your attendance.</p>
                      }
                      <div className="mt-3">
                        <button
                          type="submit"
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        >
                          UNLOCK
                        </button>
                      </div>
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
