const Navbar = () => {
  return (
    <nav className="border-b p-4 border-b-gray-300 justify-between flex">
      <div className="font-bold text-xl">SocialSight</div>
      <div>
        <a href="/sign-in" className="text-sm">
          Login
        </a>
      </div>
    </nav>
  )
}

export default Navbar
