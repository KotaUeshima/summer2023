import { addUserToStore } from '@/features/users/userSlice'
import { auth } from '@/services/firebase'
import { useAppDispatch } from '@/store'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const provider = new GoogleAuthProvider()
const dispatch = useAppDispatch

export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (credential != null) {
        const token = credential.accessToken
        console.log(token)
        // The signed-in user info.
        const user = result.user
        console.log(user)
        dispatch()
        // addUserToStore({
        //   firstName: 'hello',
        //   lastName: '',
        //   email: '',
        // })
      }
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}
