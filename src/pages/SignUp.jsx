import React from 'react'
import SignUpCard from '../components/SignUpCard'
import SignInCard from '../components/SignInCard'

const SignUp = () => {
  return (
    <div className='h-[100vh] flex flex-col justify-center items-center gap-6'>
        <h1 className='text-gray-500 text-3xl'>Welcome to Qbank</h1>
      <SignUpCard/>
    </div>
  )
}

export default SignUp
