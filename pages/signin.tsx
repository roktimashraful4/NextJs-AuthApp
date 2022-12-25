import Head from 'next/head'
import LoginLayout from '../layout/loginLayout'
import Link from 'next/link'
import FromStyle from '../styles/From.module.css'
import Image from 'next/image'
import { FaEnvelope, FaEye, FaEyeSlash} from "react-icons/fa";
import { useState } from 'react'
import { getSession,useSession, signIn, signOut } from "next-auth/react"

const signInPage = () => {
    const [show, setShow] = useState(false)
    // Google logIn function 
    const hendleGoogleSignIn = async()=> { 
        signIn('google',{callbackUrl:"http://localhost:3000"})
    }
    // Github login
    const hendelGithubSignIn = async ()=> { 
        signIn('github',{callbackUrl:"http://localhost:3000"})
    }
  return (
    <LoginLayout>
        <Head>
            <title>LogIn | Caretutors.com </title>
        </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-2xl font-bold py-4 '>Find Tuition Jobs</h1>
                <p className='w-3/2 mx-auto text-gray-400 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit amet consectetur, adipisicing elit.</p>
            </div>

            {/* form section  */}
            <form className='flex flex-col gap-5 select-none'>
                <div className={FromStyle.input_group}>
                    <input className={FromStyle.input_text} type="email" name="email" id="email" placeholder='Email '/>
                    <span className='icon flex items-center px-4'>
                        <FaEnvelope size={24}/> 
                    </span>
                </div>
                <div className={FromStyle.input_group}>
                    <input type={show ? "text" : "password"} className={FromStyle.input_text} name="password" id="password" placeholder='******'/>
                    <span className='icon flex items-center px-4 cursor-pointer hover:text-indigo-500'>
                        {show ? <FaEye size={24} onClick={()=>{setShow(false)}}/> : <FaEyeSlash size={24} onClick={()=>{setShow(true)}} />}  
                    </span>
                </div>
                
                {/* login Buttons */}
                <div className='input-button'>
                    <button type="submit" className={FromStyle.button}>Sign In</button>
                </div>
                <div className='input-button'>
                    <button type="button" onClick={hendleGoogleSignIn} className={FromStyle.button_custom}>
                        sign In with google 
                        <Image src={'/images/google.svg'} width={25} height={25} alt='google Icons'/>
                     </button>
                </div>
                <div className='input-button'>
                    <button type="button" onClick={hendelGithubSignIn} className={FromStyle.button_custom}>
                        Sign In with Github
                        <Image src={'/images/github.svg'} width={25} height={25} alt='github Icons'/>
                        </button>
                </div>
            </form>
            {/* bottom section */}
            <p className='text-center text-gray-400 py-4'>
                Don't have an account yet? <Link href={'/signup'} className='text-blue-700' > Sign Up  </Link>  
            </p>
        </section>
    </LoginLayout>
  )
}

export default signInPage

export async function getServerSideProps({ req}:any){
    const session = await getSession({ req })
    if(session){
      return {
        redirect : {
          destination: '/',
          permanent: false
        }
      }
    }
  
    return {
      props: { session }
    }
  
  }