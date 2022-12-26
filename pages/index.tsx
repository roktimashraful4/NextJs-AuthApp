import Head from 'next/head'
import Link from 'next/link'
import { getSession, signOut, useSession} from "next-auth/react"
import Image from 'next/image'


export default function Home() {
  const {data:session} = useSession()
  function handleSignOut(){
    signOut()
  }
  return (

    <>
      <Head>
        <title>Caretutors.com</title>
      </Head>
      {session ? AuthUser({session, handleSignOut}): Gust()}
    </>
  )
}

// Gust user component 
const Gust = ()=> { 
  return ( 
    <div className='w-1/2 mx-auto text-center'>
     <h1 className='text-3xl font-bold text-gray-700 my-5 p-4'> Home page as a Gust  </h1>
     <p className='m-6'>You are not a user let </p>
     <Link href={'/signin'} className='p-4 bg-indigo-500 mr-4 text-slate-50 font-bold'> Sign In </Link>
     <Link href={'/signup'} className='p-4 bg-green-500 mr-4 text-slate-50 font-bold'> Sign Up </Link>
    </div>

  )
}

// Authorized user component

const AuthUser = ({session, handleSignOut}:any)=> { 
  return(
    <div className='w-1/2 mx-auto text-center'>
     <h1 className='text-3xl font-bold text-gray-700 my-5 p-4'> Home page as a login </h1>
     <div className='flex justify-center'>
       {session.user.image &&  <Image className='rounded-full' src={session.user.image} width={50} height={50} alt='profile'/ > } 
     </div>
      <h2>{session.user.name}</h2> 
      <h2>{session.user.email}</h2> 
     <p className='m-6'> thanks you for login  </p>
     <button onClick={handleSignOut} className='p-4 bg-indigo-500 mr-4 text-slate-50 font-bold'> logout </button>
    
      
    </div>
  )
}


export async function getServerSideProps({ req}:any){
    const session = await getSession({ req })
    return {
      props: { session }
    }
  
  }