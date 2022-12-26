import Head from "next/head";
import LoginLayout from "../layout/loginLayout";
import Link from 'next/link';
import FromStyle from '../styles/From.module.css';
import { FaEnvelope, FaEye, FaEyeSlash} from "react-icons/fa";
import { useState } from 'react';
import { getSession } from "next-auth/react";
import { useFormik } from "formik";


const signUp = () => {
  const [show, setShow] = useState(false)
  interface Values { 
    username: string; 
    email: string;
    password: string; 
    cpassword:string;
  }

  const handleSubmit = async (values:Values)=>{ 
    console.log(values) 
  }
  const formik = useFormik({
      initialValues:{
          username: '', 
          email:'',
          password:'',
          cpassword:'',
      },
      onSubmit: handleSubmit,
  });


  return (
    <LoginLayout>
      <Head>
            <title>LogIn | Caretutors.com </title>
        </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-2xl font-bold py-4 '>Create an Account</h1>
                <p className='w-3/2 mx-auto text-gray-400 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit amet consectetur, adipisicing elit.</p>
            </div>

            {/* form section  */}
            <form className='flex flex-col gap-5 select-none' onSubmit={formik.handleSubmit}>
                <div className={FromStyle.input_group}>
                    <input className={FromStyle.input_text} type="text" {...formik.getFieldProps('username')} name="username" id="username" placeholder='Enter username '/>
                    <span className='icon flex items-center px-4'>
                        <FaEnvelope size={24}/> 
                    </span>
                </div>
                <div className={FromStyle.input_group}>
                    <input className={FromStyle.input_text} type="email" {...formik.getFieldProps('email')} name="email" id="email" placeholder='Email '/>
                    <span className='icon flex items-center px-4'>
                        <FaEnvelope size={24}/> 
                    </span>
                </div>
                <div className={FromStyle.input_group}>
                    <input type={show ? "text" : "password"} {...formik.getFieldProps("password")} className={FromStyle.input_text} name="password" id="password" placeholder='password '/>
                    <span className='icon flex items-center px-4 cursor-pointer hover:text-indigo-500'>
                        {show ? <FaEye size={24} onClick={()=>{setShow(false)}}/> : <FaEyeSlash size={24} onClick={()=>{setShow(true)}} />}  
                    </span>
                </div>
                <div className={FromStyle.input_group}>
                    <input type={show ? "text" : "password"} {...formik.getFieldProps('cpassword')} className={FromStyle.input_text} name="cpassword" id="cpassword" placeholder='Conform Password'/>
                    <span className='icon flex items-center px-4 cursor-pointer hover:text-indigo-500'>
                        {show ? <FaEye size={24} onClick={()=>{setShow(false)}}/> : <FaEyeSlash size={24} onClick={()=>{setShow(true)}} />}  
                    </span>
                </div>
                
                {/* signUp Buttons */}
                <div className='input-button'>
                    <button type="submit" className={FromStyle.button}>Sign Up</button>
                </div>
            </form>
            {/* bottom section */}
            <p className='text-center text-gray-400 py-4'>
                Already have an account? <Link href={'/signin'} className='text-blue-700' > logIn  </Link>  
            </p>
        </section>
      </LoginLayout>
  )
}

export default signUp

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