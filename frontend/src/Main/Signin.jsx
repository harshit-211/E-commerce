import "../App.css";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const navigate = useNavigate();

    function handleSubmit() {
        if(!email || !password) {
            toast("Please enter the details", {
                position : "top-center"
            });
            return ;
        }
        axios.post("http://localhost:3001/user/signin", { username : email, password : password })
        .then((res) => {
            setIsSubmitted(true);
            toast.success(res.data.message, {
                position : "top-center",
                duration : 2000
            });

            localStorage.setItem("Token", res.data.Token);

            setTimeout(() => {
                navigate("/home");
            },1000);
        })
        .catch((err) => {
            if(err.response) {
                toast.error(err.response.data.message, {
                    position : "top-center",
                    duration : 2000
                })
            }
        });
    }

    function Navigate() {
        navigate("/");
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
                animate = {{ opacity : 1, x : 0}}
                transition = {{ duration : 0.75 }}
            >
                <h1 className = "text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 sm:mt-12 md:mt-20 lg:mt-30 font-bold">Sign in</h1>
                <p className = "text-gray-500 text-base sm:text-xl md:text-xl mt-3">Welcome back customer.Please sign in below</p>
            </motion.div>
            <motion.div className = "text-white mt-5 ml-20 text-xl"
                initial = {{ opacity : 0, y : 50 }}
                animate = {{ opacity : 1, y : 0 }}
                transition = {{ delay : 0.5, duration : 1 }}
            >
                Didn't have an account?
                <Button 
                    onClick = {Navigate}
                    variant = "link"
                    className = "text-white text-xl cursor-pointer"
                >
                    Sign up
                </Button>
            </motion.div>
            <motion.div 
                className = "text-white"
                initial = {{ opacity : 0, y : -500 }}
                animate = {{ opacity : 1, y : 0}}
                transition = {{ delay : 1.2, duration : 0.75}}
            >
                <Input
                    type = "email"
                    id = "email" 
                    placeholder = "Email"
                    className = "max-w-sm mt-10 h-12 bg-gray-800 border-gray-700"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    disabled = {isSubmitted}
                />
                <Input
                    type = "password"
                    id = "password"
                    placeholder = "Password"
                    className = "max-w-sm mt-15 h-12 bg-gray-800 border-gray-700"
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
                    onClick = {handleSubmit}
                    variant = "secondary"
                    className = "mt-15 w-30 ml-30 cursor-pointer text-cyan-900"
                    disabled = {isSubmitted}
                >
                    { isSubmitted ? "Submitted" : "Submit" }
                </Button>
            </motion.div>
        </div>
    </div>
}

export default Signin;