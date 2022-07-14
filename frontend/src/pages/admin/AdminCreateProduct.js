import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminCreateProduct = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState([]);

    //categories from the backend
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get('/api/category/all')
        .then(cat =>{
            console.log(cat.data.categories);
            setCategories(cat.data.categories)
        })
        .catch(error =>{
            console.log(error)
        })
    }, [])

    //handle and convert it in base 64
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImage(reader.result);
        }

    }
    
    //submit the form
    const submitForm = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/product/create', {name, description, price, category, image})
            if  (data.success === true){
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setImage('');
                toast.success('product created successfully')
            }
            console.log(data);
        } catch (error) {
            console.log(error)
        }

    }

  return (
   <>
   <Header/>
     <div className="container custom_class">
        <h2 className="signup_title ">CREATE PRODUCT</h2>
        <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data" onSubmit={submitForm}>
            
            <div className="form-outline mb-4">
                <input onChange={(e)=>setName(e.target.value)} type="text" id="form4Example1" className="form-control"  value={name}/>
                <label className="form-label" htmlFor="form4Example1">Name</label>
            </div>

            
            <div className="form-outline mb-4">
                <textarea  onChange={(e)=>setDescription(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={description}/>
                <label className="form-label" htmlFor="form4Example2">Description </label>
            </div>

            <div className="form-outline mb-4">
                <input  onChange={(e)=>setPrice(e.target.value)}  type="number" id="form4Example3" className="form-control"   value={price}/>
                <label className="form-label" htmlFor="form4Example2">Price </label>
            </div>


            <div className="form-outline mb-1">
                <select  onChange={(e)=>setCategory(e.target.value)}   id="category" name="cars" className="form-control select select-initialized"  value={category}>
                    <option value="" >Choose Category</option>
                    {
                        categories && categories.map(cat =>(
                            <option key={cat._id}  value={cat._id} >{cat.name}</option>
                        ))
                    }
                
                </select>
            </div>


            <div className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2">Image</label>
            </div>
            <img className="img-fluid" src={image} alt="" />
            <button  type="submit" className="btn btn-primary btn-block mb-4">Create</button>
            
         </form>
    </div> 
    <Footer/>  
   </>
  )
}

export default AdminCreateProduct