import '@/styles/globals.css'
import '../styles/styles.css'
import "../styles/fonts.css"
import { initFlowbite } from 'flowbite'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { User } from "firebase/auth";
import firebase_app from '../firebase/config'
// import { AuthContextProvider } from '../context/AuthContext'
import { AuthContext } from '../context/AuthContext'
import React from 'react';
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';

const auth = getAuth(firebase_app);
export default function App({ Component, pageProps }: AppProps) {
  const [alertState, setAlertState] = React.useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  })
  const router = useRouter()
  React.useEffect(() => {
    initFlowbite();
  }, [])
  const [user, setUser] = useState<User | null>(null);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }
  const logOut = () => {
    try {
      console.log(auth, "auth>>><<<")
      signOut(auth);
    } catch (err) {
      console.log(err);
    }
  }
  const signIn = async (email: string, password: string) => {
    let result = null,
      error = null;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);

      console.log(result.user, 'RESULT SIGNIN');
    } catch (e) {
      error = e;
    }

    return { error }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser, 'currentUser');
      if (currentUser) {
        setAlertState({
          open: true,
          message: 'Welcome! Successfully Logged In!',
          severity: 'success',
        })
      }
    });
    return () => {
      unsubscribe();
    }
  }, [auth])
  return <AuthContext.Provider value={{ googleSignIn, logOut, signIn, user }}>
    <Component {...pageProps} />
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
  </AuthContext.Provider>
}
