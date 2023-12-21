import CopyRight from "../copyright/Copyright";
import TlNavbar from "./Navbar";


export default function TlDashboard() { 


    return (
      <>
        <TlNavbar />
        <div className="mt-5 fixed bottom-0 text-center w-full flex justify-center">
          <CopyRight />
        </div>
      </>
    );
}