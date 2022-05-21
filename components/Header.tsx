import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          className="cursor-pointer object-contain"
          src="https://rb.gy/ulxxee"
          alt="Netflix logo"
          width={100}
          height={100}
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Inicio</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Filmes</li>
          <li className="headerLink">Novos & populares</li>
          <li className="headerLink">Minha lista</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href="/account"> */}
        <img
          className="cursor-pointer rounded object-contain"
          src="https://rb.gy/g1pwyx"
          alt="Avatar"
          onClick={logout}
        />
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header
