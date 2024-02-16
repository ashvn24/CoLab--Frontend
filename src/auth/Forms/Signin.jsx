import React, { useCallback, useState } from 'react'
import google from '../../assets/google.svg'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../utils/Signinval'
import { ValidationError } from 'yup';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Redux/Store/authSlice'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Signin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  if (error){
    toast.error(error);
      setError('')
  }

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit =async (e)=>{
    e.preventDefault()
    setLoading(true)
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    if(isFormValid){
      
      try {
        await loginSchema.validate(formData)
        const {  email, password } = formData;
        const response = await dispatch(loginUser({ email, password }))


        if (response.payload.error === 'Authentication Failed') {
          setError('Invalid Credential');
      } else {
          setError('Login succesfull');
          navigateBasedOnRole(response)
      }
  
      } catch (error) {
        if (error instanceof ValidationError){
          setError(error.message)
          console.log('catch',error);
        }
      }finally{
        setLoading(false)
      }
    }else{
      setLoading(false)
      setError('fill all fields')
      console.log('error');
    }
  }

  const navigateBasedOnRole = useCallback((response) => {
    const role = response.payload.user;
    const destination = role === 'Editor' ? '/indexEditor' : '/indexCreator';
    navigate(destination); // Assuming `navigate()` is a function for navigation
    toast.success('Successfully Signed-in')
}, [navigate]);

  return (
    <div>
      <div className="flex flex-col justify-center text-black p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          {/* <button type='submit' className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
            Sign in
          </button> */}
          <Button
          type="submit" // Set type to submit
          variant="contained"
          color='inherit'
          disabled={loading} // Disable the button when loading
          fullWidth // Make the button full-width
          sx={{
            '&:hover': {
              backgroundColor: 'black',
              color: 'white',
              borderColor: 'gray.300',
            },
            '&:disabled': {
              backgroundColor: 'black',
              color: 'white',
            },
          }} // Custom hover and disabled styles
          startIcon={loading && <CircularProgress size={20} color="inherit" />} // Show loading indicator when loading
        >
          {loading ? '' : 'Sign in'}
        </Button>
          <button className="w-full border border-gray-300 mt-5 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
            <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?
            <span className="font-bold text-black"><Link to={'/signup'}>Sign up for free</Link> </span>
          </div>
        </div>
    </div>
  )
}

export default Signin
