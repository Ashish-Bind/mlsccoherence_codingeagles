import axios from 'axios'

const Card = ({ name, href, desc }) => {
  const loginWithInstagram = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/instagram')
      window.location.href = response.data.redirect
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="p-4 border grid gap-4">
      <div className="text-xl font-bold">{name}</div>
      <div className="text-sm">{desc}</div>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
        onClick={loginWithInstagram}
      >
        Connect with {name}
      </button>
    </div>
  )
}

export default Card
