import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import { useRouter } from 'next/navigation';
import SuccessModal from "./successModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../slice/userInfoSlice";

const PostponedModal = (props) => {
  const dispatch = useDispatch();
  const id = props.id;
  const source = props.source;
  const show = props.show;
  const setShow = props.setShow;
  const [selectedStage, setSelectedStage] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleStageChange = (e) => setSelectedStage(e.target.value);
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
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      navigate("/enquiry/postponed-enquiry#");
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission
    console.log("postponed");
    if (dateValue != "" && textareaValue != "") {
      try {
        const token = localStorage?.getItem("tmToken");
        console.log("poastpone modal");
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/staff/move-enquiry",
          {
            client_id: id,
            source: source,
            destination: "POSTPONED",
            date: dateValue,
            description: textareaValue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        if (response?.data?.status) {
          setDateValue("");
          setTextareaValue("");
          setShowSuccessModal(true);
          fetchUserInfo();

          // router.reload()
          // window.location.reload()

          handleClose();
        } else {
          console.log(response?.data?.errors?.date[0], "erData");
          if (response?.data?.message) {
            setDateErr(response?.data?.message);
          } else {
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
          <Form>
            <Form.Group controlId="stageDropdown">
              <Form.Label>Stage</Form.Label>
              <Form.Select
                value={selectedStage}
                onChange={(e) => handleStageChange(e)}
              >
                <option value="">Select Stage</option>
                <option value="1">Stage 1</option>
                <option value="2">Stage 2</option>
                <option value="3">Stage 3</option>
              </Form.Select>
            </Form.Group>
            {selectedStage === "1" && (
              <Form.Group controlId="textareaInput">
                <Form.Label>Textarea Input</Form.Label>
                <Form.Control
                  as="textarea"
                  value={textareaValue}
                  onChange={(e) => handleTextareaChange(e)}
                />
              </Form.Group>
            )}
            {selectedStage === "2" && (
              <Form.Group controlId="anotherTextareaInput">
                <Form.Label>Another Textarea Input</Form.Label>
                <Form.Control
                  as="textarea"
                  value={textareaValue}
                  onChange={(e) => handleTextareaChange(e)}
                />
              </Form.Group>
            )}
            {selectedStage === "3" && (
              <Form.Group controlId="differentTextareaInput">
                <Form.Label>Different Textarea Input</Form.Label>
                <Form.Control
                  as="textarea"
                  value={textareaValue}
                  onChange={(e) => handleTextareaChange(e)}
                />
              </Form.Group>
            )}
            {descriptionErr && <p className="text-red-600">{descriptionErr}</p>}
            <Form.Group controlId="dateInput">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={dateValue}
                onChange={(e) => handleDateChange(e)}
              />
              {dateErr && <p className="text-red-600">{dateErr}</p>}
            </Form.Group>
            <Button
              className="mt-[20px] mb-[20px]"
              variant="primary"
              type="button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
            {errorMsg != "" ? <p className="text-red-600">{errorMsg}</p> : ""}
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

export default PostponedModal;
