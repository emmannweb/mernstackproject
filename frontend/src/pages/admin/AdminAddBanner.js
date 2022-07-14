import React, { useState } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminAddBanner = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("images", images);

    //handlde images
    const handleImage = (e) =>{
        const files = Array.from(e.target.files);
        files.forEach(file =>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () =>{
                setImages(oldArray => [...oldArray, reader.result ])
            }
        })

    }

        //submit the form
    const submitForm = async (e) =>{
        setLoading(true);
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/banner/create', { images})
            if  (data.success === true){
                setLoading(false);
                setImages([]);
                toast.success('slide created successfully')
            }
            console.log(data);
        } catch (error) {
            console.log(error)
            toast.error(error);
        }

    }


  return (
    <>
    <Header/>
    <div className="container custom_class">
        <h2 className="signup_title ">ADD SLIDE</h2>
        <form onSubmit={submitForm} className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data" >

            <div className="form-outline mb-4">
                <input onChange={handleImage} type="file" id="formupload" name="image" className="form-control" multiple />
                <label className="form-label" htmlFor="form4Example2">Image</label>
            </div>
            <img className="img-fluid"  alt="" />
            <button  type="submit" className="btn btn-primary btn-block mb-4">{loading ? "Uploading..." : "Create Slider"}</button>
            
         </form>
    </div>
    <Footer/>
    </>
  )
}

export default AdminAddBanner