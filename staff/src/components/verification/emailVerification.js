import axios from "axios";
// import EmailVerificationModal from "../modals/emailVerifiedModal";
// import { useEffect, useState } from "react";
   
 export default function emailVerification(id){
    let responseMessage 
    const verifyEmail = async()=>{
                    try{
                        const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
                            const response =await axios.get("https://admin.tradingmaterials.com/api/staff/verify-email?",{
                                params:{
                                    client_id: id
                                },headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                            )
                            console.log(response,"response")
                            responseMessage = response?.data
                    }catch (err){
                        console.log(err?.response?.data)
                        responseMessage = err?.response?.data
            }
            return responseMessage
                }
            
           return  verifyEmail()
            
 }


// const  EmailVerification = async(props) =>{
//     const [data,setData] = useState()
//     const id = props.id
//     console.log("id", id)
//     const [showEmailVerifyModal,setShowEmailVerifyModal] = useState(false)
//     useEffect(()=>{
//         const verifyEmail = async()=>{
//             try{
//                 const token = sessionStorage.getItem("tmToken")
//                     const response =await axios.get("https://admin.tradingmaterials.com/api/staff/verify-email?",{
//                         params:{
//                             client_id: id
//                         },headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                     )
//                     console.log(response,"response")
//                     setData(response?.message)
//             }catch (err){
//                 setData(err.message)
//     }
//     setShowEmailVerifyModal(true)
//         }
    
//     verifyEmail()
//     },[])
//     // return response
//     return (

//         <>
//         <EmailVerificationModal response={data} show={showEmailVerifyModal} setShowEmailVerifyModal={setShowEmailVerifyModal} />
//         </>
//     )

// }



// export default EmailVerification