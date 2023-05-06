import { addUserToStore } from '@/features/users/userSlice'
import { auth, database } from '@/services/firebase'
import { useAppDispatch } from '@/store'
import { UserInterface } from '@/utils/globalInterfaces'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (credential != null) {
        // The signed-in user info.
        const user = result.user
        const userId: string = user.uid
        const fullName: string = user.displayName || ''
        const email: string = user.email || ''
        let firstName: string = ''
        let lastName: string = ''
        if (fullName !== '') {
          firstName = fullName.split(' ')[0]
          lastName = fullName.split(' ')[1]
        }
        const userObj: UserInterface = {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
        }
        // new user, add user to firestore
        // is not the most accurate method all the time
        if (user.metadata.creationTime == user.metadata.lastSignInTime) {
          const docRef = setDoc(doc(database, 'users', userId), userObj)
        }
        // dispatch to redux store
        const dispatch = useAppDispatch()
        dispatch(addUserToStore(userObj))
      }
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      // The email of the user's account used.
      // const email = error.customData.email
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error)
    })
}
