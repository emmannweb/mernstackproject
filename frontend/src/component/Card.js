import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({image, productName, prodLink, prodCategory, price}) => {
  return (
    <>
        <div className="col-md-4 " style={{marginTop: "20px"}}>
            <div className="card">
                <div className="card-body">
                    <div className="card-img-actions"> <img src={image} className="card-img img-fluid"  alt="" /> </div>
                </div>
                <div className="card-body bg-light text-center">
                    <div className="mb-2">
                        <h2 className="font-weight-semibold mb-2">{productName} </h2> <a href="#" className="text-muted" data-abc="true"></a>
                        <h6>{prodCategory}</h6>
                        <h3>${price}</h3>
                    </div>
                    <h3 className="mb-0 font-weight-semibold"></h3>
               
                    <Link to={prodLink}><h6>Details</h6></Link>
                   
                </div>
            </div>
        </div>
    </>
  )
}

export default Card