const Navbar = () => {
  return (
    <nav className="border-b p-4 border-b-gray-300 justify-between flex">
      <div className="font-bold text-xl">SocialSight</div>
      <div className="flex gap-4">
        <a href="/sign-in" className="text-sm hover:underline">
          Login
        </a>
        <a href="/analytics" className="text-sm hover:underline">
          Analytics
        </a>
      </div>
    </nav>
  )
}

export default Navbar
