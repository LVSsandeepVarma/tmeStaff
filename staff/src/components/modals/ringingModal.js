import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import { useRouter } from 'next/navigation';
import SuccessModal from "./successModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../slice/userInfoSlice";

const RingingModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = props.id;
  const source = props.source;
  const show = props.show;
  const setShow = props.setShow;
  const [textareaValue, setTextareaValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setTextareaValue("")
    setDateValue("")
    setDescriptionErr("")
    setDateErr("")
    setErrorMsg("")
    setShow(false)
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    if (e?.target?.value == "") {
      setDescriptionErr("Description is required");
    } else {
      setDescriptionErr("");
    }
  };
  const handleDateChange = (e) => {
    setDateValue(e.target.value);
    if (e?.target?.value == "") {
      setDateErr("Date is required");
    } else {
      setDateErr("");
    }
  };

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
      navigate("/enquiry/ringing-enquiry#");
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    if (dateValue != "" && textareaValue != "") {
      try {
        const token = sessionStorage.getItem("tmToken")?.length
          ? sessionStorage.getItem("tmToken")
          : localStorage.getItem("tmToken");
        console.log("ringing modal");
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/staff/move-enquiry",
          {
            client_id: id,
            source: source,
            destination: "RINGING",
            date: dateValue,
            description: textareaValue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, response?.data?.status);
        if (response?.data?.status) {
          setShowSuccessModal(true);
          fetchUserInfo();
          setDateValue("");
          setTextareaValue("");
          handleClose();
        } else {
          if (response?.data?.message) {
            setDateErr(response?.data?.message);
          } else {
            console.log(response?.data?.errors?.date[0], "erData");
            setDateErr(response?.data?.errors?.date[0]);
            setDescriptionErr(response?.data?.errors?.description[0]);
          }
        }
      } catch (error) {
        console.log("error", error?.response?.data?.message);
        if (error?.response?.data?.message) {
          setErrorMsg(error?.response?.data?.message);
        } else {
          console.log(error?.response?.errors?.date, "erDate");
          setDateErr(error?.response?.errors?.date[0]);
        }
      }
    } else {
      if (dateValue == "") {
        setDateErr("date is required");
      }
      if (textareaValue == "") {
        setDescriptionErr("description is required");
      }
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="textareaInput">
              <Form.Label>Textarea Input</Form.Label>
              <Form.Control
                as="textarea"
                value={textareaValue}
                onChange={handleTextareaChange}
              />
            </Form.Group>
            {descriptionErr && <p className="text-red-600">{descriptionErr}</p>}
            <Form.Group controlId="dateInput">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={dateValue}
                onChange={handleDateChange}
              />
              {dateErr && <p className="text-red-600">{dateErr}</p>}
            </Form.Group>
            {errorMsg != "" ? <p className="text-red-600">{errorMsg}</p> : ""}
            <Button
              className="mt-[20px] mb-[20px]"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <SuccessModal
        show={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
    </div>
  );
};

export default RingingModal;
