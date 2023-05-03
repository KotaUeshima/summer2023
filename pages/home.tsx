import { auth } from '@/services/firebase'
import { routeNames } from '@/utils/globalConstants'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

function home() {
  const router = useRouter()

  const logout = async () => {
    try {
      await signOut(auth)
      router.push(routeNames.LOGIN)
    } catch (e: any) {
      console.log(e.message)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <h2>Welcome User</h2>
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}

export default home
