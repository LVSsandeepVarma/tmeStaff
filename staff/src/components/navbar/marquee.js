
import Marquee from "react-fast-marquee";
import {FaShoppingCart} from "react-icons/fa"
import {FiPhoneCall} from "react-icons/fi"
import {SlEnvolope} from "react-icons/sl";
import {RxCross2} from "react-icons/rx";
import {BiDollar, BiPhoneCall} from "react-icons/bi";
import {BsTelephoneForward} from "react-icons/bs";
import { useSelector } from "react-redux";
export default function NavbarMarquee(){
    const userData = useSelector((state) => state?.userInfoReducer)


    return(
        <main className=" relative top-[63px] sm:top-[0px] md:top-[0px] lg:top-[0px]  container topmarquee !flex !items-center " style={{position:"relative", zIndex:"10"}}>
            <Marquee className="fixed container" autoFill={true} pauseOnHover={true} >
                <p className=" mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(255,162,43,.1)]  rounded-full w-[2rem] h-[2rem]">
                        <FiPhoneCall className="h-auto text-[#ffc107] opacity-100"/>
                    </span>
                    Today's ringing 
                    <span className="text-[#2fd8c6] font-bold ml-2">{userData?.value?.data?.enq_counts?.t_ring}</span>
                </p>
                <p className="mr-5 flex items-center">
                    <span className=" flex justify-center mr-1 bg-[rgba(255,56,43,0.1)]  rounded-full w-[2rem] h-[2rem] ">
                    <BsTelephoneForward className=" h-auto text-[#f66] opacity-100" />
                    </span>
                    Today's postponed
                     <span className="text-[#2fd8c6] font-bold ml-2">{userData?.value?.data?.enq_counts?.t_post}</span></p>
                <p className="mr-5  flex items-center"> 
                <span className="flex justify-center mr-1 bg-[rgba(255,56,43,0.1)]  rounded-full w-[2rem] h-[2rem]">
                <BiPhoneCall className="h-auto text-[#28afd0] opacity-100"/>
                </span>
                Total Ringing
                  <span className="text-[#2fd8c6] font-bold ml-2">{userData?.value?.data?.enq_counts?.ringing}</span>
                  </p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(0,214,230,.1)]  rounded-full w-[2rem] h-[2rem]">
                     <BsTelephoneForward className="h-auto text-[#f66] opacity-100"/></span>Total Postponed
                     <span className="text-[#2fd8c6] font-bold ml-2">{userData?.value?.data?.enq_counts?.postponed}</span>
                     </p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(0,230,130,.1)]  rounded-full w-[2rem] h-[2rem]">
                         <BiDollar className="h-auto text-[#15c763] opacity-100"/>
                         </span> Total sale's
                         <span className="text-[#2fd8c6] font-bold ml-2">0</span>
                         </p>
                <p className="mr-5  flex items-center">
                     <span className="flex justify-center mr-1 bg-[rgba(70,127,207,.1)]  rounded-full w-[2rem] h-[2rem]">
                        <SlEnvolope className="h-auto text-[#467fcf] opacity-100"/></span> Today Invoices
                        <span className="text-[#2fd8c6] font-bold ml-2">0</span> </p> 
                 <p className="mr-5  flex items-center"> 
                 <span className="flex justify-center mr-1 bg-[rgba(70,127,207,.1)]  rounded-full w-[2rem] h-[2rem]">
                    <SlEnvolope className="h-auto text-[#5eba00] opacity-100"/></span>Paid Invoices
                    <span className="text-[#2fd8c6] font-bold ml-2">0</span></p>
                <p className="mr-5  flex items-center"> 
                <span className="flex justify-center mr-1 bg-[rgba(0,214,230,.1)]  rounded-full w-[2rem] h-[2rem]">
                    <RxCross2 className="h-auto text-[#28afd0] opacity-100"/></span>Unpaid Invoices
                    <span className="text-[#2fd8c6] font-bold ml-2">0</span></p>
                <p className="mr-5  flex items-center"> 
                <span className="flex justify-center mr-1 bg-[rgba(0,230,130,.1)]  rounded-full w-[2rem] h-[2rem]">
                    <BiDollar className="h-auto text-[#15c763] opacity-100"/></span> Due Invoices
                    <span className="text-[#2fd8c6] font-bold ml-2">0</span></p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(255,56,43,.1)]  rounded-full w-[2rem] h-[2rem]">
                        <FaShoppingCart className="h-auto text-[#f66] opacity-100"/></span> New Enquiries
                        <span className="text-[#2fd8c6] font-bold ml-2">{userData?.value?.data?.enq_counts?.new}</span></p>
         
            </Marquee>
        </main>
    )
}