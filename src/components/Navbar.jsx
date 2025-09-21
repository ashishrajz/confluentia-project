import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

import AuthSync from "@/components/AuthSync";
import Header from './Header';

const Navbar = () => {
  return (
    <nav className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 shadow-md'
>       <AuthSync />
        <div className="w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          
          

          <Header/>
        </div>
        </div>

    </nav>
  )
}

export default Navbar