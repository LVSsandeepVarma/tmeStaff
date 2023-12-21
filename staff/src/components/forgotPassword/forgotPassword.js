"use client";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
// import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import loaderSlice, {
  setLoaderFalse,
  setLoaderTrue,
} from "../../slice/loaderSlice";
import Loading from "../loader/loading";
import EmailModal from "../modals/emailModal";

// login component
export default function Forgot_Password() {
  const dispatch = useDispatch();
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [responseError, setResponseError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const loaderState = useSelector((state) => state.loaderReducer.value);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const initialValues = {
    email: email,
  };
  // form validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
  });
  // form submit handler
  const handleSubmit = async (values) => {
    dispatch(setLoaderTrue());
    // Handle form submission
    try {
      const response = await axios.post(
        " https://admin.tradingmaterials.com/api/staff/reset-password-link",
        {
          email: values?.email,
        }
      );
      setResponseError("");
      console.log(response?.data);
      if (response?.data.status) {
        setDisabled(true);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setResponseError(error?.response?.data?.message);
      dispatch(setLoaderFalse());
    }
    dispatch(setLoaderFalse());
  };

  return (
    <main>
      {loaderState && <Loading />}
      <EmailModal
        show={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
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
                    Reset Password
                  </h4>
                  <h6 className="fw-light text-sm">
                    Please enter your registered email
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
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email"
                          onInput={()=>setResponseError("")}
                        />
                        <ErrorMessage
                          className="text-red-600"
                          name="email"
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
                          disabled={disabled}
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        >
                          Send Password Reset Link
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
