import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import axios from 'axios';
import Banner from '../component/Banner';
import Card from '../component/Card';



const Home = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    const fetchProduct = () =>{
        axios.get(`/api/products/all?cat=${category}`)
        .then((prods)=>{
            //console.log("products", prods.data.products)
            setProducts(prods.data.products);
        })
        .catch(error =>{
            console.log(error)
        })
    }

    //fetch products category
    const fetchProductCategory = () =>{
        axios.get('/api/category/all')
        .then((cat)=>{
            //console.log("categories", cat.data.categories)
            setCategories(cat.data.categories);
        })
        .catch(error =>{
            console.log(error)
        })
    }

    useEffect(()=>{
        fetchProduct();
    }, [category])

    useEffect(()=>{
         fetchProductCategory();
    }, [])

    console.log("filter", category);

    //filter product
    const filterProduct = (e) =>{
        e.preventDefault();
        fetchProduct();
    }

    return (
        <>
            <Header/>
            <Banner/>
         
         
            <div className="container pt-5 pb-5">
                
                <div className="row">
                   <div className="col-sm-3">
                        <h2>Filter by category</h2>
                        <form >
                            <div className="form-group">
                                <select onChange={(e) => setCategory(e.target.value)} name="" id="" className='form-control'>
                                    <option value="Select" disabled >Select</option>
                                    {
                                        categories && categories.map(cat=>(
                                            <option value={cat._id}>{cat.name}</option>
                                        ))
                                    }
                                    <option value="">All</option>
                                </select>
                            </div>
                            {/* <button onClick={filterProduct} type='submit' className='btn btn-primary mt-3'>Filter</button> */}
                        </form>
                   </div>
                   <div className="col-sm-9">
                     <div className="row">
                            {
                                products && products.map((p)=>(
                                    <Card image={p.image.url} productName={p.name} prodLink={`/product/${p._id}`} prodCategory={p.category ? p.category.name : ''} price={p.price}/>
                                )) 
                            }
                     </div>
                   </div>
                </div>
               
            

          
            </div>
            <Footer/>
        </>
    )
}

export default Home
