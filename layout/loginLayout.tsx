import signInLayoutStyle from "../styles/signIn.module.css"

const loginLayout = ({children}:any) => {
  return (
    <div  className='flex h-screen bg-blue-400'>
        <div className='m-auto bg-slate-50 rounded-md w-11/12 md:w-10/12 lg:w-10/12 xl:w-3/5 h-[85%] grid lg:grid-cols-2'>
           
            <div className={signInLayoutStyle.imgStyle}>
                <div className={signInLayoutStyle.cloud_one}></div>
                <div className={signInLayoutStyle.cloud_two}></div>
                <div className={signInLayoutStyle.cartoonImg}>

                </div>
            </div>
           <div className='right flex flex-col justify-evenly'>
                <div className='text-center pt-10'>
                     {...children}
                </div>
           </div> 
        </div>
    
       

    </div>
  )
}

export default loginLayout