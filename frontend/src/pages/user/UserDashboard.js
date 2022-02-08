import React, {useState, useEffect} from 'react';
import Header from '../../component/Header'
import Footer from '../../component/Footer'


const UserDashboard = () => {

    const [profile, setProfile] = useState("");
    const {name, email, role, createdAt} = profile;

    useEffect(()=>{
        fetch('/api/getme')
        .then(res =>{
            return res.json()
        })
        .then(result =>{
            //console.log(result)
            setProfile(result.user)
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
    
  return (
    <>

    <Header/>

    <div className="container-fluid dashboard_container">
        <div className="row">
            <div className="col-sm-4">
               <div className="card card_dashboard">
               <div className="card-header">
                    <b>User Dashboard</b>    
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> Name: {name}</li>
                    <li className="list-group-item"> E-mail: {email}</li>
                    <li className="list-group-item"> Join at: {new Date(createdAt).toLocaleDateString()}</li>
                    <li className="list-group-item"> {role===1 ? "Admin" : "Registred User"}</li>
                </ul>
               </div>
            </div>
            <div className="col-sm-8">
                <h4>other col</h4>
            </div>
        </div>
    </div>
     
    <Footer/>    
                
    </>
  )
};

export default UserDashboard;
