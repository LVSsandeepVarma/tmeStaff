import { useEffect, useState } from "react";
import TlNavbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CopyRight from "../copyright/Copyright";

export default function TlStaffList() {
    const navigate = useNavigate()
    const [tlStaffList, setStaffList] = useState([])

    useEffect(() => {
        const fetchStaffList = async () => {
            try {
                const response = await axios.get(
                  "https://admin.tradingmaterials.com/api/teamleader/get-staffs",
                  {
                    headers: {
                     Authorization: "Bearer "+localStorage.getItem("tmToken"),
                      Accept: "application/json",
                    },
                  }
                );
                console.log(response?.data)
                setStaffList(response?.data?.data?.staffs)
            } catch (err) {
              console.log(err)
              if (err?.response?.data?.message?.includes("Unauthenticated")) {
                navigate("/login");
              }
            }
            
        }
        fetchStaffList()
    },[])
    return (
      <>
        <TlNavbar />
        <>
          <div className="main-panel bg-white">
            <div className="content-wrapper">
              <div className="row">
                {tlStaffList?.map((staff, ind) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 mb-4 md:mb-2 cursor-pointer"
                    onClick={() =>
                      navigate(`/team-lead/view-staff/${staff?.id}`)
                    }
                  >
                    <div className="card shadow border-0">
                      <div className="card-body">
                        <div className="row portfolio-grid">
                          <div
                            key={ind}
                            className="col-12 mx-auto text-center "
                          >
                            <img
                              className="mx-auto "
                              src="/images/blueProfile.png"
                              width={75}
                              alt="image"
                            />
                            <figcaption>
                              <h4>{staff?.name}</h4>
                              <p>{staff?.email}</p>
                              <small>
                                Created on :{" "}
                                <span className="text-[#575757] font-semibold">{new Date(staff?.created_at).toLocaleDateString()}</span>
                              </small>
                            </figcaption>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {tlStaffList?.length == 0 && (
                  <p className="text-center w-full">No staff found</p>
                )}
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <CopyRight />
            </div>
          </div>
        </>
      </>
    );
}