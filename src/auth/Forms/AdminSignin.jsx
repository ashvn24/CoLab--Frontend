import { Input } from '@material-tailwind/react'
import { Typography } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginSchema } from '../utils/Signinval';
import { LoginAdmin } from '../../Redux/Store/AdminauthSlice';
import { toast } from 'react-toastify';
import pattern from '../../assets/sign.jpg'

const AdminSignin = () => {

    const selector = useSelector((state) => state.AdminToken)
    const  isAuthenticated = selector.is_authenticated;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const dispatch = useDispatch()
      const navigate = useNavigate()
    
      const [errorr, setErrorr] = useState('')
      if(errorr){
        toast.error(errorr)
        setErrorr('')
      }

      const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      }
    
      const handlesubmit =async(e) =>{
        e.preventDefault()
        const isFormValid = Object.values(formData).every(value => value.trim() !== '');
        if (isFormValid){
          try {
            await loginSchema.validate(formData)
            const {  email, password } = formData;
    
            const Response = await dispatch(LoginAdmin({ email, password }))
    
            if (Response.payload.error === 'Authentication Failed') {
              setErrorr('Invalid Credential');
          } else {
              setErrorr('');
              navigate('/adminDashboard')
              toast.success('Successfully Signed-in')
              
          }
          } catch (error) {
            setErrorr(error.message)
          }
        }else{
          setErrorr('fill all fields')
        }
      }
  return (
    <div>
        {isAuthenticated ? (<Navigate to='/adminDashboard' />):
        <>
        <div className=" bg-white h-full items-center">
  <section className="flex">
    <div className="ml-11 w-2/6 h-1/5  hidden lg:block">
      {/* Adjusted height here */}
      <img src={pattern} className="w-full object-cover rounded-3xl" alt="pattern" />
    </div>
    <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">
          <h1>CoLab</h1>
        </Typography>
        <Typography variant="paragraph" className="text-lg font-normal">
          Enter your email and password to Signin as Admin.
        </Typography>
      </div>
      <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={(e) => handlesubmit(e)}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="small" className="-mb-3 font-medium">
            Your email
          </Typography>
          <Input
            color='black'
            size="lg"
            placeholder="    name@gmail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <Typography variant="small" className="-mb-3 font-medium">
            Password
          </Typography>
          <Input
          color='black'
            type="password"
            size="lg"
            placeholder="     ********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="bg-black w-full h-10 mt-5 rounded-md items-center text-white font-bold">
            signin
          </button>
        </div>
      </form>
    </div>
  </section>
</div>

        </>
        }
    </div>
  )
}

export default AdminSignin
