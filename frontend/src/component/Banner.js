import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Banner = () => {

    const [images, setImages] = useState([]);
    useEffect(()=>{
        axios.get('/api/fetch/banner')
        .then((res)=>{
            console.log("images fetch", res.data.banners[0].images);
            setImages(res.data.banners[0].images);
        })
        .catch((error =>{
            console.log(error);
        }))
    }, []);
  return (
    <>
         <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
                {/* <!-- Indicators --> */}
                <div className="carousel-indicators">

                    {
                        images && images.map((img, index)=>(
                            <button
                            type="button"
                            data-mdb-target="#carouselBasicExample"
                            data-mdb-slide-to= {index}
                            className={index === 0 ? "active" : ""}
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        ))
                    }
                 
			
                </div>

                {/* <!-- Inner --> */}
                <div className="carousel-inner">
                    {
                        images && images.map((img, index) =>(
                            <div className= {index === 0 ? "carousel-item active" : "carousel-item"}>
                                <img src={img.url} className="d-block w-100" alt="Sunset Over the City"/>
                            </div>
                        ))
                    }
                 
				
                </div>
              

                {/* <!-- Controls --> */}
                <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

    </>
  )
}

export default Banner