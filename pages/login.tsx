import { addUserToStore } from '@/features/users/userSlice'
import { auth, database } from '@/services/firebase'
import { signInWithGoogle } from '@/services/googleSignIn'
import { useAppDispatch } from '@/store'
import { routeNames } from '@/utils/globalConstants'
import { UserInterface } from '@/utils/globalInterfaces'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function login() {
  interface LoginUser {
    email: string
    password: string
  }

  const defaultLoginUser: LoginUser = {
    email: '',
    password: '',
  }

  const [loginUser, setLoginUser] = useState<LoginUser>(defaultLoginUser)
  const [error, setError] = useState<string>('')

  const router = useRouter()
  const dispatch = useAppDispatch()

  const UpdateUserObject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyLoginUser = {
      ...loginUser,
      [e.target.name]: e.target.value,
    }
    setLoginUser(copyLoginUser)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
      const user = userCredential.user
      const userId = user.uid
      const docRef = doc(database, 'users', userId)
      const docSnap = await getDoc(docRef)
      let firstName: string
      let lastName: string
      let email: string
      if (docSnap.exists()) {
        firstName = docSnap.data()['firstName']
        lastName = docSnap.data()['lastName']
        email = docSnap.data()['email']
      } else {
        throw new Error('Could not get doc from firestore')
      }
      const userObj: UserInterface = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }
      dispatch(addUserToStore(userObj))
      setError('')
      setLoginUser(defaultLoginUser)
      router.push(routeNames.HOME)
    } catch (e: any) {
      // remove "Firebase : " from error message
      const errorMessage = e.message.substring(10)
      setError(errorMessage)
    }
  }

  return (
    <div className='min-h-screen w-screen flex flex-row justify-center items-center bg-gray-50'>
      {/* Hovering White */}
      <div className='w-[40%] bg-white rounded-md flex pt-14 pb-10 drop-shadow-2xl justify-center items-center'>
        {/* Form + Header + SignInButton */}
        <div className='flex flex-col space-y-8 w-2/3'>
          <h2 className='loginHeader'>Welcome Back!</h2>
          <form className='flex flex-col' onSubmit={handleSignUp}>
            <label htmlFor='email' className='text-sm text-black/80'>
              Email
            </label>
            <input type='text' name='email' className='loginFormInput' value={loginUser.email} onChange={UpdateUserObject} />
            <label htmlFor='password' className='text-sm text-black/80'>
              Password
            </label>
            <input type='password' name='password' className='loginFormInput' value={loginUser.password} onChange={UpdateUserObject} />
            <div className='mt-2 h-10 lg:h-4 flex flex-col lg:flow-root'>
              <p className='h-5 float-left text-sm text-errorRed'>{error}</p>
              <a className='float-right text-sm text-primary/80 font-bold cursor-pointer'>Forgot Password?</a>
            </div>
            <button className='mt-4 rounded-md p-3 text-white bg-primary/20 hover:bg-primary ease-in-out duration-500'>Login</button>
          </form>
          {/* --- or --- */}
          <div className='flex flex-row items-center justify-center space-x-4'>
            <hr className='w-full' />
            <p className='text-center text-gray-500'>or</p>
            <hr className='w-full' />
          </div>
          {/* Google Sign In Button from Online*/}
          <button
            type='button'
            className='text-white bg-red-400 font-medium rounded-md text-sm p-3 text-center inline-flex items-center justify-between'
            onClick={async () => {
              try {
                const userObj: UserInterface | undefined = await signInWithGoogle()
                if (userObj === undefined) {
                  throw Error('user object is undefined')
                }
                dispatch(addUserToStore(userObj))
              } catch (e: any) {
                setError(e)
              }
            }}
          >
            <svg
              className='mr-2 ml-4 w-4 h-6'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='google'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'
            >
              <path
                fill='currentColor'
                d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
              ></path>
            </svg>
            Sign up with Google<div></div>
          </button>
          {/* Sign Up Navigation */}
          <div className='flex flex-row items-center justify-center space-x-2'>
            <p className='text-sm text-gray-500'>Don't have an account yet? </p>
            <Link href={routeNames.SIGNUP} className='text-sm text-primary/80 font-bold cursor-pointer'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
