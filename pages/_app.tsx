import Layout from '@/layouts/Layout'
import { auth } from '@/services/firebase'
import store from '@/store'
import '@/styles/globals.css'
import { routeNames } from '@/utils/globalConstants'
import { onAuthStateChanged } from 'firebase/auth'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        router.push(routeNames.HOME)
      } else {
        router.push(routeNames.LOGIN)
      }
    })
  }, [])

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
