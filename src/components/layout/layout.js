import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';

const layout = ({children}) => {
  return (
    <div>
<Header/>
<ToastContainer/>
<main style={{minHeight:'80vh'}}>
{children}
</main>
<Footer/>

      
    </div>
  )
}

export default layout
