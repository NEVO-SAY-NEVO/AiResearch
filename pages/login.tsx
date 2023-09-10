import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import { useRouter } from "next/router";
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';
import Logo from '@/components/global/Logo';
import { AuthContext } from '@/context/AuthContext';
// import signIn from "@/firebase/auth/signin";
// import signIn from "@/firebase/auth/signin";

export default function login() {
    const {signIn, user} = useContext(AuthContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState<string>("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isNotValid, setIsNotValid] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState<string>("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    function handleEmailChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setEmail(e.target.value);
    }

    const handleLogin = async () => {
        if (!email) {
            setAlertState({
                open: true,
                message: 'Please input the email.',
                severity: 'error',
            })
            return;
        }
        if (!password) {
            setAlertState({
                open: true,
                message: 'Please input the password.',
                severity: 'error',
            })
            return;
        }
        // regular expression pattern for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            // email is valid, so redirect to new page
            const { error } = await signIn(email, password);
      
            if (error) {
              setAlertState({
                open: true,
                message: 'Please input the correct Email or Password!',
                severity: 'error',
              })
              return console.log(error)
            }
            console.log(user, 'user user user')
            // else successful
            router.push('/');
          } else {
            // email is invalid, so display an error message
            // alert("Please enter a valid email address.");
            setIsNotValid(true);
            setAlertState({
              open: true,
              message: 'Please input the valid email',
              severity: 'error',
            })
            return;
          }
    }
    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };
    return (
        <div className=' font-header text-[#cccccc] min-w-screen min-h-screen flex flex-col py-6 items-center justify-center relative'>
            <img className='absolute top-0 left-0 h-full w-full' src='/bg6.jpg' />
            <div className='absolute top-0 left-0 h-full w-full bg-[#000000a1] z-[5]'>
            </div>
            <Logo clasLog={true}/>
            <div className='z-10 bg-gradient-to-b from-[#316a99ad] to-[#350429a4] rounded-lg  shadow-auth-box py-12 px-6'>
                <div className='text-3xl font-semibold font-mono text-center pb-8'>Log In</div>
                <div className='mb-6'>
                    <input className=" input-box w-full bg-black rounded-lg px-4 py-2 border outline-[#aaaaaa33] mr-0 text-xs md:text-sm lg:text-base placeholder:text-gray-300 text-gray-800 placeholder:font-base border-gray-200  border-none outline-none" placeholder='Email' value={email} name='email' onChange={handleEmailChange} />
                    {isNotValid && <div className='text-[red] mb-0 mt-1'>Enter a valid email address</div>}
                </div>
                <div className='mb-4'>
                    <input type='password' className="input-box w-full bg-black rounded-lg px-4 py-2 border outline-[#aaaaaa33] mr-0 text-xs md:text-sm lg:text-base placeholder:text-gray-300 text-gray-800 placeholder:font-base border-gray-200  border-none outline-none" placeholder='Password' value={password} onChange={handlePasswordChange} />
                </div>
                <div className='flex justify-center items-center mt-8'>
                    <button className='bg-blue-button text-lg  hover:bg-blue-button-hover rounded-md w-full py-2 px-5 font-bold mr-4'
                        onClick={handleLogin}
                    >
                        <div className='flex items-center rounded-lg hover:text-white'>Join Now&nbsp; <FaChevronRight className='text-xs' /></div>
                    </button>
                    <Link href='' className='text-slight-text hover:text-white font-bold whitespace-nowrap text-sm pr-12'>Forgot Password?</Link>
                </div>
                <div className='w-full text-center mt-6'>Don&apos;t have an account? <Link href='/signup' className='font-bold hover:text-white'>Sign Up</Link></div>
            </div>
            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({ ...alertState, open: false })}
            >
                <Alert
                    onClose={() => setAlertState({ ...alertState, open: false })}
                    severity={alertState.severity}
                    className='text-[red]'
                >
                    {alertState.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
