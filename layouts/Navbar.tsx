function Navbar() {
  return (
    <div className='h-[10vh] max-w-6xl mx-auto bg-transparent flex justify-between items-center'>
      <div>Logo</div>
      <div className='flex flex-row space-x-10'>
        <div>Home</div>
        <div>Tutors</div>
        <div>Pages</div>
        <div>Blogs</div>
      </div>
      <div>
        <button>Login</button>
        <button>Signup</button>
      </div>
    </div>
  )
}

export default Navbar
