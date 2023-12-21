import { Modal } from "react-bootstrap";
import { useState } from "react";

export default function NoDataModal() {
    const [showModal, setShowModal] = useState(false);
    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Enquiry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Content of the modal */}
                    <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container" className="swal2-popup swal2-modal swal2-icon-error swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true" style="display: grid;"><button type="button" className="swal2-close" aria-label="Close this dialog"style={{display: "none"}}>×</button><ul className="swal2-progress-steps"style={{display: "none"}}></ul><div className="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span className="swal2-x-mark">
                        <span className="swal2-x-mark-line-left"></span>
                        <span className="swal2-x-mark-line-right"></span>
                    </span>
                    </div>
                    <img className="swal2-image" style={{display: "none"}}/>
                    <h2 className="swal2-title" id="swal2-title" style={{display: "block"}}>Oops...</h2>
                    <div className="swal2-html-container" id="swal2-html-container" style={{display: "block"}}>No data found</div>
                    <input className="swal2-input" style={{display: "none"}}/>
                    <input type="file" className="swal2-file" style={{display: "none"}}/>
                    <div className="swal2-range" style={{display: "none"}}>
                        <input type="range"/><output></output></div><select className="swal2-select" style={{display: "none"}}></select><div className="swal2-radio"style={{display: "none"}}></div><label for="swal2-checkbox" className="swal2-checkbox"style={{display: "none"}}><input type="checkbox"/><span className="swal2-label"></span></label><textarea className="swal2-textarea"style={{display: "none"}}></textarea><div className="swal2-validation-message" id="swal2-validation-message"style={{display: "none"}}></div><div className="swal2-actions" style="display: flex;"><div className="swal2-loader"></div><button type="button" className="swal2-confirm swal2-styled" aria-label="" style="display: inline-block;">OK</button><button type="button" className="swal2-deny swal2-styled" aria-label=""style={{display: "none"}}>No</button><button type="button" className="swal2-cancel swal2-styled" aria-label=""style={{display: "none"}}>Cancel</button></div><div className="swal2-footer"style={{display: "none"}}></div><div className="swal2-timer-progress-bar-container"><div className="swal2-timer-progress-bar"style={{display: "none"}}></div></div></div>
                    </Modal.Body>

                        </Modal>
                    </>
                    )
}