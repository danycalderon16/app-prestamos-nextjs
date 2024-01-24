import { redirect } from 'next/navigation'
import Image from 'next/image'


export default function Home() {

  redirect("loans")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hola mundo</p>
    </main>
  )
}
