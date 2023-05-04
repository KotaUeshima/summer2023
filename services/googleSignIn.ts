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
        // The signed-in user info.
        const user = result.user
        const userId: string = user.uid
        const fullName: string | null = user.displayName
        let firstName: string
        let lastName: string
        if (fullName) {
          firstName = fullName?.split('')[0]
          lastName = fullName?.split('')[1]
        } else {
          firstName = 'Bob'
          lastName = 'Dylan'
        }
        const email: string | null = user.email
        // new user
        if (user.metadata.creationTime == user.metadata.lastSignInTime) {
          // const userObj: UserForFirebase{
          //   userId: userId,
          //   fullName: ,
          //   email: email || "no email",
          // }
        }
        // returning user
        else {
        }
        // dispatch(addUserToStore({
        //   firstName: 'hello',
        //   lastName: '',
        //   email: '',
        // }))
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
