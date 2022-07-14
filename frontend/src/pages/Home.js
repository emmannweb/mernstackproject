import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import axios from 'axios';
import Banner from '../component/Banner';


const Home = () => {


    return (
        <>
            <Header/>
            <Banner/>
         
         
            <div className="container">
                <h1>Home page.. </h1>
          
            </div>
            <Footer/>
        </>
    )
}

export default Home
