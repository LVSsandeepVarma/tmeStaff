import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCheck, BiLoaderAlt } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import { BsExclamationCircle } from "react-icons/bs";

// import axiosInstance from "../api/AxiosInsance";
function ActionModel({ close, setClose,id,destination,tit,status,setCall,call}) {
  const [loading,setLoading]=useState()
  const [values, setValues] = useState({});
  const [error,setError]=useState('')
  const [success,setsuccess]=useState('')
  const [showComfirmMsg, setShowConfirmMsg] = useState(false)
  const [date, setDate] = useState();

  useEffect(() => {
    const getCurrentDateTimeIST = () => {
      const now = new Date();
      const ISTOffset = 330; // IST is UTC+5:30
      const ISTTime = new Date(now.getTime() + ISTOffset * 60000);
      return ISTTime.toISOString().slice(0, 16);
    };

    setDate(getCurrentDateTimeIST());
  }, []);

useEffect(()=>{
setValues((prev)=>({
  ...prev,title:tit
}))
},[tit])

  const [auto, setAuto] = useState("title");
  const [tags, SetTags] = useState([]);
  const tagRef = useRef();
 const dateref=useRef()

 const datepick=()=>{
  dateref.current.showPicker()
 }
  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
  };
  const [errors1,setErrors]=useState({
    email:'',
    phone:'',
    pincode:'',
    fname:'',
    lname:'',
    gender:''
  })
  const Navigate=useNavigate()
  const location = useLocation();
  const getApiAndTitle = () => {
    
    
    let type = '';

    switch (location.pathname) {
      case '/dashboard/candidates/new':
        type = 'new';
        break;
      case '/dashboard/candidates/assigned':
        type = 'assigned';
        break;
      case '/dashboard/candidates/ringing':
        type = 'ringing';
        break;
      case '/dashboard/candidates/postponed':
        type = 'postponed';
        break;
      case '/dashboard/candidates/notinterested':
        type = 'notinterested';
        break; 
      case '/dashboard/candidates/review':
        type = 'review';
       
        break;
      default:
        
    }
  
    return { type };
  };

  const dispatch=useDispatch()
  const handleChange = (e) => {
setError('')
setsuccess('')
    setErrors({})
    const { name, value } = e.target;
    setValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const {type}=getApiAndTitle()

  const moveCandidate=async()=>{
      //  dispatch(setLoader(true))
      setLoading(true)
    try {
      const res=await axios.post(`https://admin.tradingmaterials.com/api/staff/submit-comment`,{
        order_id:id,
        date:date,
        title:values.title,
        comments:values.comment,
        status:status
      },{
        headers: {
          "Authorization" : "Bearer "+ localStorage.getItem("tmToken")
        }
      })
    if(res.data.status){
    //   dispatch(setLoader(false))
    //   dispatch(setAlert({message:'Candidate Moved Successfully',color:'bg-success',alert:''}))
    //   setTimeout(() => {
    //     dispatch(setAlert({message:'',color:'success',alert:''}))

    //     Navigate(`/dashboard/candidates/${destination}`)
    //     window.location.reload()
    //   }, 2000);
    setLoading(false)

    setsuccess(res?.data?.message)
    setCall(!call)
       setTimeout(() => {
        setClose(false)
       setsuccess('')
      }, 2000);
    }else{
    //   dispatch(setLoader(false))
    setLoading(false)
setCall(!call)
    //   if(res.data.errors){
    //     if(res.data.errors.title){
    //     setErrors((prev)=>({...prev,title:res.data.errors.title[0]}))
    //   }
    //   if(res.data.errors.tag){
    //     setErrors((prev)=>({...prev,tag:res.data.errors.tag[0]}))
    //   }
    //   if(res.data.errors.comment){
    //     setErrors((prev)=>({...prev,comment:res.data.errors.comment[0]}))
    //   }
    //   if(res.data.errors.date){
    //     setErrors((prev)=>({...prev,date:res.data.errors.date[0]}))
    //   }
    //   }
    }
  
    } catch (error) {
      setCall(!call)
    //   dispatch(setLoader(false))
    //   dispatch(setAlert({message:'Candidate Not Moved',color:'bg-danger',alert:''}))
    //   setTimeout(() => {
    //     dispatch(setAlert({message:'',color:'bg-success',alert:'dfb'}))

    //   }, 2000);
    //   setLoader(false)
    setsuccess('')

    console.log(error)
    if(error.response.data?.errors?.comments){
    setError(error.response.data?.errors?.comments[0])
    }else{
      setError(error?.response?.data?.message)
    }
    setLoading(false)
    
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const language = tagRef.current.value.trim(); // Remove leading and trailing spaces
    if (language === '') {
      return; // Return early if the value is an empty string with no characters
    }
    SetTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };
//   const Tags = ({ tag, handleDelete }) => {
//     return (
//       <Box
//         sx={{
     
//           height: "100%",
//           display: "flex",
          
//           margin: "0 0.5rem 0 0",
//           justifyContent: "center",
//           alignContent: "center",
//           color: "#000000",
//           zIndex: 22,
          
//         }}
//         className="rounded-full pl-3 py-1 bg-slate-200 border-[1.2px] border-slate-300 cursor-pointer"
//       >
//         <Stack direction="row" gap={1}>
//           <Typography>{tag}</Typography>
//           <Cancel
//             onClick={() => {
//               handleDelete(tag);
//             }}
//           />
//         </Stack>
//       </Box>
//     );
//   };
 
  useEffect(() => {
    const inputRef = document.getElementById("title-input");
    const inputRef2= document.getElementById("title-input2");
    const inputRef3 = document.getElementById("title-input3");
    const inputRef4 = document.getElementById("title-input4");
    if ((auto==='title'||auto==='title1') && inputRef) {
      inputRef.focus();
      }
    if ((auto==='comment'||auto==='comment1')&&inputRef2) {
        inputRef2.focus();
      }
    if ((auto==='tags'||auto==='tags1')&& inputRef3) {
        inputRef3.focus();
      }
    if ((auto==='date'||auto==='date1')&& inputRef4) {
        inputRef4.focus();
      }
  }, [auto,id,destination]);
  return (
    <Modal
    show={close}
    onHide={()=>{
      setShowConfirmMsg(false)
      setValues({})
      setClose(false)
      }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
     <div className="bg-white !w-[90%] md:w-[30%] m-auto mt-[10px] p-[10px]"  style={{background:'white' ,width:{xs:'80%',md:"30%"},m:'auto',borderRadius:'10px',marginTop:'10px',padding:'15px'}}>

      <p className="text-center pt-4 text-3xl text-slate-800 font-medium" style={{fontSize:'20px'}}>Update Status</p>
      <hr className="mt-1" />
        <div className="" style={{display:"flex", justifyContent:'center',flexDirection:'column'}}>
         
          {!showComfirmMsg && <div className="     rounded w-[100%] px-2 ">
            <div className="my-2">
              <label htmlFor="title " className="text-gray-800 font-semibold !mb-2" style={{fontSize:'14px'}}>
                Title
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  className="form-control   text-muted "
                  style={{width:'100%',fontSize:'14px',color:'gray'}}
                  placeholder="Title"
               
                  name="title"
                  value={values?.title}
                  id="title-input"
                />
              </div>
          {errors1.title &&<p className="text-red-500 text-sm ml-2">{errors1.title}</p>}

            </div>
            <div className="my-2" style={{width:'100%'}}>
              <label htmlFor="title" className="text-gray-800 font-semibold my-1 !mb-2" style={{fontSize:'14px'}}>
                Comments
              </label>
              <div className="flex gap-3 items-center flex-col">
                <textarea
                  type="text"
                  value={values.comment}
                  className="form-control  text-muted"
                  style={{width:'100%',fontSize:'13px'}}
             onChange={handleChange}
                  name="comment"
                  placeholder="Comments"
            
                />

              </div>
          {errors1.comment &&<p className="text-red-500 text-sm ml-2 ">{errors1.comment}</p>}
            </div>
            

            <div className="my-2">
              <label htmlFor="title" className="text-gray-800 font-semibold !mb-2 nav-item" style={{fontSize:'14px'}}>
                Current Time
              </label>
              <div className="flex gap-3 items-center">
                <div className="relative w-full">
                
                  <input
                 className="form-control  hide-calendar-icon text-muted"

                  type="datetime-local"
                  sx={{width:'100%',fontSize:'12px',color:'grey'}}
                  ref={dateref}
                  // className="hide-calendar-icon"
                    value={date}
              
              
            
                    
                  />
          {errors1.date &&<p className="text-red-500 text-sm ml-2">{errors1.date}</p>}

                </div>
              </div>
            </div>

            <div className="d-flex !mt-4" style={{paddingBottom:'15px'}}>
            <button style={{textTransform:'capitalize',fontSize:'13px'}} className="btn !bg-[#25378b] text-white !w-25  " onClick={()=>{
              if(values?.title !== "Onhold"){
              setShowConfirmMsg(true)
              }else{
                moveCandidate()
              }
                }}>
                
                {!loading?(<div className="flex items-center justify-center">  <BiCheck  className="w-4 h-4" disabled />
                Update</div>): <BiLoaderAlt className='animate-spin1'/>}
                </button>

              <button onClick={() => setClose(false)} sx={{textTransform:'capitalize',fontSize:'13px'}} className="btn btn-secondary w-25 text-white ms-4 ">Close</button>
            </div>
            


          </div>}
          {showComfirmMsg && <div className="text-center !mt-4 " style={{paddingBottom: "15px"}}>
                <span className="font-semibold text-lg !mb-2">You are about to {values?.title} </span>
                <div className="flex justify-center items-center gap-2 mt-2">
                {!loading ? (<button className="btn btn-outline-success  " onClick={()=>moveCandidate()}>Yes</button>) : <BiLoaderAlt className='animate-spin1'/>}
                <button className="btn btn-outline-danger " onClick={()=>setShowConfirmMsg(false)}>No</button>
                </div>
              </div>}
              { error&& <p className="flex items-center justify-center text-danger text-center font-bold text-sm ml-2 capitalize p-2 pt-1"><BsExclamationCircle className="w-7 h-7"/>{error}</p>}
          {success&&<p className="text-success text-center font-bold capitalize text-sm ml-2 p-2">{success}</p>}

        </div>
     </div>
      
    
        </Modal>
  );
}

export default ActionModel;