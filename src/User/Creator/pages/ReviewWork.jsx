import React, { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstanceUser } from "../../../Axios/Utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../../Components/User/Utils/Loader";
import { useDispatch } from "react-redux";
import { Videokey } from "../../../Redux/Store/UploadSlice";

const ReviewWork = () => {
    const {id} = useParams();
    const [vidURL, setVidURL] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [work, setWork] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      getVidData(id);
    }, [id])

    const getVidData = async (id) => {
        try {
            await axiosInstanceUser.get(`get-work/${id}`).then((res)=>{
                console.log(res.data)
                setWork(res.data)
                dispatch(Videokey(res.data.vidkey))
                const vid_file = res.data.video_file
                const videoBlob = base64toBlob(vid_file);
                const videoObjectUrl = URL.createObjectURL(videoBlob);
                setVidURL(videoObjectUrl)
            })
        } catch (error) {
            toast.error(error)
        }finally{
            setIsLoading(false)
        }
    }
    // Function to convert base64 to Blob
    const base64toBlob = useMemo(() => {
        return (base64Data) => {
          const byteCharacters = atob(base64Data);
          const byteArrays = [];
          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          return new Blob(byteArrays, { type: 'video/mp4' });
        };
      }, []);

    const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    };

    const showRazorpay = async () => {
    try {
    const res = await loadScript();

    const bodyData = new FormData();
    bodyData.append("sender",work.editor)
    bodyData.append("receiver",work.creator)
    bodyData.append("amount",work.Quatation)
    const {data} = await axiosInstanceUser.post('/pay/payment/create/',bodyData).then((res)=>{
        return res
    })
    
    const options = {
        key_id: 'rzp_test_fZ9GHf3LBOHj6X', // in react your environment variable must start with REACT_APP_
        key_secret: 'iK5Yl9AY3GzvRaTrpLl3AbNZ',
        amount: data.payment.amount,
        currency: "INR",
        name: "COLAB",
        description: "Test Transaction",
        image: "", // Add image URL
        order_id: data.payment.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: "User's name",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#313131",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
    }
    }

    const handlePaymentSuccess = async (response) => {
        try {
            console.log(response)
          const bodyData = new FormData();
          bodyData.append("response", JSON.stringify(response));
    
          await axiosInstanceUser.put(`/pay/payment/success/`, bodyData).then((res)=>{
            toast.success(res.message)
            navigate(`/success/${response.razorpay_order_id}`)
          })
        } catch (error) {
          console.error("Payment error:", error);
        }
      };

      if(isLoading){
        return <Loader/>;
      }
    
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-post">
          <h2 className="h3-bold md:h2-bold text-left w-full">Review Work</h2>
          <div className="flex w-full flex-col  h-[500px] mt-10 rounded-xl ">
            <ReactPlayer
              url={vidURL}
              width="100%"
              height="100%"
              controls
              playing
            />
          </div>
          <div className="flex w-full flex-col justify-evenly gap-5 max-h-[400px]  mt-10 rounded-xl bg-dark-4 p-6 relative">
            <div className="flex flex-col gap-2">
              Description:
              <p className="text-sm  leading-none tracking-wider ">
                {work.desc}
              </p>
            </div>
            <div className="flex flex-row gap-3 items-center">
              Payment:
              <p >{work.Quatation} /-</p>
            </div>
            <div className="flex flex-row gap-3">
              <button className="bg-gray-800 p-3 h-14 w-36 ml-3 rounded-lg mt-6 hover:bg-red">
                Reject
              </button>
              <button onClick={showRazorpay} className="bg-gray-800 p-3 h-14 w-36 ml-3 rounded-lg mt-6 hover:bg-primary-500">
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewWork;
