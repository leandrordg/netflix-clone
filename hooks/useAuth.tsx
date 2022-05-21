import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface AuthProviderProps {
  children: React.ReactNode
}

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // entrou...
          setUser(user)
          setLoading(false)
        } else {
          // nao entrou...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email, password) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        setLoading(false)
        router.push('/')
      })
      .catch((err) => {
        alert(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const signIn = async (email, password) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        setLoading(false)
        router.push('/')
      })
      .catch((err) => {
        alert(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const logout = async () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((err) => {
        alert(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
