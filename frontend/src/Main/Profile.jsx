import Appbar from "./Appbar";
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/user/info", {
            method : "GET",
            headers : {
                "Content-type" : "application/json",
                Authorization : `Bearer ${localStorage.getItem("Token")}`
            }
        }) 
          .then((res) => res.json())
          .then((data) => setInfo(data))
    }, []);

    return (
        <div className = "min-h-screen bg-gray-900 p-4 md:p-8">
            <Appbar />
            <div className = "text-center mt-20 text-cyan-400 font-bold text-4xl">
                My Profile
            </div>
            
        </div>
    )
}

export default Profile;