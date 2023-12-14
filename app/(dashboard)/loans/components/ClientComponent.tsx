import React from 'react'

interface Props {
  children: React.ReactNode;
}
const ClientComponent:React.FC<Props> = ({children}) => {
  return (
    <>{children}</>
  )
}

export default ClientComponent