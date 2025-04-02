import React from 'react'
import SignInCard from '../components/SignInCard'

const SignIn = ({setToken}) => {
  return (
    <div className='h-[100vh] flex flex-col justify-center items-center gap-6'>
            <h1 className='text-gray-500 text-3xl'>Welcome to Qbank</h1>
          <SignInCard setToken={setToken}/>
        </div>
  )
}

export default SignIn
