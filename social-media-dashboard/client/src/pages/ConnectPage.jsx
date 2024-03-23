import React from 'react'
import Card from '../components/Card'

const ConnectPage = () => {
  const data = [
    {
      name: 'Instagram',
      href: '/connect-instagram',
      desc: 'Get analytics',
    },
    {
      name: 'Facebook',
      href: '/connect-facebook',
      desc: 'Get analytics',
    },
    {
      name: 'LinkedIn',
      href: '/connect-linkedin',
      desc: 'Get analytics',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 m-4 rounded-md">
      {data.map(({ name, href, desc }) => {
        return <Card key={name} name={name} desc={desc} href={href} />
      })}
    </div>
  )
}

export default ConnectPage
