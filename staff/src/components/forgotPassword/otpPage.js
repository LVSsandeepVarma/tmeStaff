"use client";

import React, { useEffect, useState } from "react";
// import { useParams } from 'next/navigation';
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice";
import { setHash } from "../../slice/passwordHashSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../loader/loading";

export default function PasswordHash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loaderReducer.value);
  const [responseError, setResponseError] = useState("");
  console.log(loaderState); // const [verifiedHash, setVerifiedHash] = useState(false)
  const params = useParams();
  const [otp, setOtp] = useState("");

  console.log(params);

  useEffect(() => {
    const verifyHash = async () => {
      try {
        dispatch(setLoaderTrue());
        const urlParameter = window.location.pathname;
        const hash = urlParameter.substring(urlParameter.lastIndexOf("/") + 1);
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/staff/verify/hash",
          {
            hash: hash,
          }
        );
        console.log("response", response);
        // setVerifiedHash(true)
      } catch (err) {
        console.log("err", err);
        dispatch(setLoaderFalse());
        // setVerifiedHash(false)
      }
      dispatch(setLoaderFalse());
    };
    verifyHash();
  }, []);
  const handleOtpVerify = async () => {
    try {
      dispatch(setLoaderTrue());
      const urlParameter = window.location.pathname;
      const hash = urlParameter.substring(urlParameter.lastIndexOf("/") + 1);
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/staff/verify/otp",
        {
          hash: params?.hash,
          otp: otp,
        }
      );
      console.log(response.data?.status);
      dispatch(setHash(hash));
      navigate("/new/password");
      // if(response.data?.status){

      // }
      setResponseError("");
    } catch (err) {
      console.log(err);
      setResponseError(err?.response?.data?.message);
      dispatch(setLoaderFalse());
      setTimeout(() => {
        setResponseError("")
      },1500)
    }
    dispatch(setLoaderFalse());
  };

  return (
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
                <h6 className="fw-light text-sm">Enter OTP to continue.</h6>
                <div>
                  {loaderState == true && <Loading />}
                  <OtpInput
                    shouldAutoFocus
                    value={otp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    inputType="text"
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 1rem",
                      fontSize: "2rem",
                      borderRadius: "4px",
                      border: "1px solid",
                    }}
                    onChange={setOtp}
                  />
                  {responseError.length ? (
                    <p className="text-red-600">{responseError}</p>
                  ) : (
                    ""
                  )}

                  <button
                    className="flex justify-center w-[100%] mt-5 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={() => {
                      handleOtpVerify();
                    }}
                  >
                    {" "}
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
