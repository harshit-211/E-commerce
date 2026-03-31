import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const navigate = useNavigate();

    function handleSubmit() {
        if(!email || !password) {
            toast.error("Please enter the details", {
                position : "top-center"
            });
            return;
        }
        axios.post("https://e-commerce-3-zvas.onrender.com/user/signup", { username : email, password : password })
        .then((res) => {
            setIsSubmitted(true);
            toast.success(res.data.message,{
                position : "top-center",
                duration : 2000
            });

            localStorage.setItem("Token", res.data.Token);

            setTimeout(() => {
                navigate("/home");
            },1000)
        })
        .catch((err) => {
            if(err.response) {
                toast.error(err.response.data.message, {
                    position : "top-center",
                    duration : 2000
                });
            }
        });
    }
    
    function Navigate() {
        navigate("/signin");
    }

    return <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
        <motion.div
            initial = {{ opacity : 0, y : -5 }}
            animate = {{ opacity : 1, y : 0 }}
            transition = {{ duration : 0.5 }}
            className = "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
            <h1 className = "text-cyan-300 text-2xl md:text-3xl font-bold">Shopify</h1>
        </motion.div>
        <div className = "max-w-4xl mx-auto">
            <motion.div
                initial = {{ opacity : 0, x : 500 }}
                animate = {{ opacity : 1, x : 0 }}
                transition = {{ duration : 0.75 }}
            >
                <h1 className = "text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-8 sm:mt-12 md:mt-20 lg:mt-30">Sign Up</h1>
                <p className = "text-gray-500 text-base sm:text-lg md:text-lg lg:text-xl mt-3">Join our e-commerce website.Please sign up below</p>
            </motion.div>
            <motion.div className = "text-white mt-5 ml-20 text-xl"
                initial = {{ opacity : 0, y : 50 }}
                animate = {{ opacity : 1, y : 0 }}
                transition = {{ delay : 0.5, duration : 1 }} 
            >
                Already have an account?
                <Button onClick = { Navigate }
                    variant = "link" 
                    className = "text-white text-xl cursor-pointer"
                >
                    Sign in
                </Button>
            </motion.div>
            <motion.div className = "text-white mt-10"
                initial = {{ opacity : 0, y : -500 }}
                animate = {{ opacity : 1, y : 0}}
                transition = {{ delay : 1.2, duration : 0.75 }}
            >
                <Input className = "max-w-sm h-12 border-gray-700 bg-gray-800 text-white"
                    type = "email" 
                    id = "email" 
                    placeholder = "Email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    disabled = {isSubmitted}
                />
                <Input className = "max-w-sm mt-15 h-12 border-gray-700 bg-gray-800 text-white"
                    type = "password" 
                    id = "password" 
                    placeholder = "Password" 
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    disabled = {isSubmitted}
                />
            </motion.div>
            <motion.div
                initial = {{ opacity : 0, y : 50 }}
                animate = {{ opacity : 1, y : 0 }}
                transition = {{ delay : 1.6, duration : 0.5 }}
            >
                <Button
                    onClick = { handleSubmit }
                    variant = "secondary" 
                    className = "mt-15 ml-30 cursor-pointer text-cyan-900 w-30"
                    disabled = {isSubmitted}
                >
                    { isSubmitted ? "Submitted!" : "Submit" }
                </Button>
            </motion.div>
        </div>
    </div>
}

export default Signup;