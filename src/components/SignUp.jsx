import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { Button, Input, Logo} from './index'
import { useForm } from "react-hook-form"
import authService from "../appwrite/auth"

function SignUp() {

    const {register, handleSubmit} = useForm()
    const [error, setError] = React.useState("")
    const navigate = useNavigate();

    const create = async(data) => {
        // console.log(data);
        setError("")
        try {

            const userData = await authService.createAccount(data);
            alert("Account created successfully! Please log in.")
            navigate("/login");

            
        } catch (error) {

            setError(error.message)
            
        }
    }

  return (
     <>
     <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
        <Logo lname='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white'
              iname='mr-4 h-11'/>
        {/* <!-- Card --> */}
        {error && <p className="text-red-600 p-2 text-center">{error}</p>}
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create a Free Account
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(create)}>
                <Input
                    label='Your name'
                    type='text'
                    placeholder='John Doe' 
                    {...register("name" , {required: true})}
                />
                <Input
                    label='Your email'
                    type='email'
                    placeholder='john@example.com' 
                    {...register("email" , {required: true})}
                />
                <Input
                    label='Your password'
                    type='password'
                    placeholder='••••••••' 
                    {...register("password", {required: true , minLength: 8})}
                />
                <Button 
                    type='submit'
                    name='Create account'
                />
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Already have an account? <Link to={'/login'} className="text-blue-700 hover:underline dark:text-primary-500">Login here</Link>
                </div>
            </form>
        </div>
     </div>
     </>
  )
}

export default SignUp