"use client";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
// import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import TimedModal from "../../../components/modals/passwordResetModal";
// login component
export default function NewPassword() {
  // const router = useRouter();
  const hash = useSelector((state) => state.passwordHashReducer.value);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseError, setResponseError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(hash);
  const initialValues = {
    password: password,
    confirmPassword: confirmPassword,
  };
  // form validation
  const validationSchema = Yup.object({
    confirmPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password maximum length should be 16 charecters long"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password maximum length should be 16 charecters long"),
  });
  // form submit handler
  const handleSubmit = async (values) => {
    // Handle form submission
    try {
      if (values.password != values.confirmPassword) {
        return setResponseError("password and confirm password did'nt match");
      } else {
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/staff/reset/password",
          {
            hash: hash,
            password: values.password,
            confirm_password: values.confirmPassword,
          }
        );
        // if(response.)
        console.log(response);
        setShowModal(true);
        // router.push("/login")
        setResponseError("");
      }
    } catch (error) {
      console.log(error);
      setResponseError(error?.response?.data?.message);
    }
    console.log(values);
  };

  return (
    <main>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper !p-0">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0 h-[100vh] bg-[#edeef2]">
              <div className="col-lg-4 mx-auto flex items-center w-[100%] flex justify-center !p-0">
                <div className="auth-form-light text-start py-5 px-4 px-sm-5 bg-[#fff]">
                  <div className="brand-logo mb-[2rem]">
                    <img src="/images/tm-logo-1.png" alt="logo" />
                  </div>
                  <h4 className="text-base	text-blue-950 font-extrabold	">
                    Hello! lets get started
                  </h4>
                  <h6 className="fw-light text-sm">
                    Enter new passsword to continue.
                  </h6>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    <Form className="pt-3">
                      <div className="form-group mb-[1.5rem]">
                        <Field
                          className="form-control form-control-lg text-base bg-transparent"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="new password"
                          onInput={() => setResponseError("")}
                        />
                        <ErrorMessage
                          className="text-red-600"
                          name="password"
                          component="div"
                        />
                      </div>
                      <div className="form-group mb-[1.5rem]">
                        <Field
                          className="form-control form-control-lg text-base bg-transparent"
                          type="password"
                          id="confirmpassword"
                          name="confirmPassword"
                          placeholder="re enter your new password"
                          onInput={() => setResponseError("")}
                        />
                        <ErrorMessage
                          className="text-red-600"
                          name="confirmPassword"
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
                          Submit new password
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
              <TimedModal show={showModal} handleClose={handleCloseModal} />
              <p className="flex justify-center text-2xl text-red-600 ">
                please do not refresh the page
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
