import Link from "next/link"
import { ModeToggle } from "../mode-toggle"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-6 border-b border-border bg-background backdrop-blur-md sticky top-0 z-50 max-w-[70vw] mx-auto">
        <div className="text-2xl font-bold tracking-wide">
          <Link href="/">Vihaara<span className="text-primary">India</span></Link>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <SignedOut>
                <SignInButton mode="modal"/>
                <SignUpButton mode="modal">
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* Show the user button when the user is signed in */}
              <SignedIn>
                <Button>
                  <Link href="/explore">Explore</Link>
                </Button>
                <UserButton />
              </SignedIn>
          <ModeToggle />
        </div>
      </nav>
  )
}
export default Navbar