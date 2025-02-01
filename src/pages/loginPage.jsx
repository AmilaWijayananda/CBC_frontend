import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
      <div className='flex justify-center items-center w-full h-screen bg-red-800'>
        <div className='w-[450px] h-[450px] bg-blue-500 flex flex-col justify-center items-center'>
          <img src='/logo.jpg' className='rounded-full w-[100px]'/>
          <span>Email</span>
          <input/>
          <span>Password</span>
          <input type='password'/>
          <button className='bg-slate-500'>Login</button>

        </div>
        
      </div>
    );
  }