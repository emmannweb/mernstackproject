import React, {useState} from 'react'
import axios from 'axios'
import { toast} from 'react-toastify';
import Header from '../component/Header'
import Footer from '../component/Footer'








const SignUp = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password:''
    });

    const {name, email, password} = values;

    const handleChange = name => (e) =>{
        // console.log(e.target.value);
        setValues({...values, [name]: e.target.value});
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/signup', {
                name,
                email,
                password
            });

            console.log(data);

            if  (data.success === true){
                setValues({name: '', email: '', password:''});
                toast.success("Sign up successfully, please Login!");
              
            }
            

        } catch(err){
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
         
        }
    }
    
    return (
        <div>
            <Header/>
            <div className="container custom_className pt-5">
                <h2 className="signup_title text-center">SIGN UP</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form">
                    
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("name")}  type="text" id="form4Example1" className="form-control"  value={name} />
                        <label className="form-label" htmlFor="form4Example1">Name</label>
                    </div>

                    
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("email")}   type="email" id="form4Example2" className="form-control"  value={email} />
                        <label className="form-label" htmlFor="form4Example2">Email </label>
                    </div>

                
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("password")}   type="password" id="form4Example3" className="form-control" value={password}  />
                        <label className="form-label" htmlFor="form4Example3">Password</label>
                    </div>
                
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Register</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default SignUp
