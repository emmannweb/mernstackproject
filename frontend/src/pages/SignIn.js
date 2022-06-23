import React, {useState} from 'react'
import axios from 'axios'
import { toast} from 'react-toastify';
import Header from '../component/Header'
import Footer from '../component/Footer'



const SignIn = ({history}) => {

    const [values, setValues] = useState({
        email: 'emmanuelnoc@gmail.com',
        password:'Mann@123'
 
    });

    const { email, password} = values;

    const handleChange = name => (e) =>{
        // console.log(e.target.value);
        setValues({...values, [name]: e.target.value});
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/signin', {
                email,
                password
            });

            console.log(data);

            if  (data.success === true){
                setValues({ email: '', password:''});
                toast.success("Log In successfully");
                localStorage.setItem("token", JSON.stringify(data))
                if (typeof window !== "undefined"){
                    setTimeout(()=>{
                        history.push('/user/dashboard');
                    }, 2000);
                }
              
            }
            

        } catch(err){
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
         
        }
    }
    
    return (
        <div>
            <Header/>
            <div className="container custom_className ">
                <h2 className="signup_title text-center">SIGN IN</h2>
                <form className=" col-sm-6 offset-3 pt-5 signup_form">
                    
                                  
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("email")}   type="email" id="form4Example2" className="form-control"  value={email} />
                        <label className="form-label" htmlFor="form4Example2">Email </label>
                    </div>

                
                    <div className="form-outline mb-4">
                        <input onChange={handleChange("password")}   type="password" id="form4Example3" className="form-control" value={password}  />
                        <label className="form-label" htmlFor="form4Example3">Password</label>
                    </div>
                
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Log In</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default SignIn
