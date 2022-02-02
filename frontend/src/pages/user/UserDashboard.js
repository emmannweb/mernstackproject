import React, {useState, useEffect} from 'react';


const UserDashboard = () => {

    const [profile, setProfile] = useState("");
    const {name, email} = profile;

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


        <h1>User dashboard</h1>
        <h1>{name}</h1>
        <h1>{email}</h1>
                    
     
            
                
    </>
  )
};

export default UserDashboard;
