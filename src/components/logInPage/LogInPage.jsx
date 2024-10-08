import "/src/styles/logInPage.css"
import NavBar from "../NavBar"
import Footer from "../Footer"
import ScrollToTop from "../ScrollToTop"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react" 
import { Link, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import axios from "axios"
axios.defaults.withCredentials  = true

const cookies = new Cookies()
function LogInPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [isSubmitted, changeIsSubmitted] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isSubmitted) {
            navigate("/chats")
        }
    }, [isSubmitted, navigate])

    async function sendForm(data) {
        const response = await fetch("https://quickchat-backend-production.up.railway.app/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: data.userName, password: data.password}),
            credentials: 'include'
        })
        if (response.status == 400) {
            console.log("log in failed")
        }
        else {
            changeIsSubmitted(true)
        }
        
    }
    const onSubmit = async(data) => {
        sendForm(data)
    }
    
    if (!isSubmitted) {
        return <div className="signUpForm">
            <ScrollToTop/>
            <NavBar/>
            <div className="signUpFormContent">
                <h2 className="signUpHeader">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card">
                        <div>
                            <label className="input">
                                <input className="input__field" type="text" name="userName" placeholder=" " {...register("userName", { required: true })}/>
                                <span className="input__label">Username</span>
                            </label>
                            <div className="divider"></div>
                            <label className="input">
                                <input className="input__field" type="password" name="password" placeholder=" " {...register("password", { required: true })}/>
                                <span className="input__label">Password</span>
                            </label>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="button">Login</button>
                        <Link className="redirect" to="/signup">Don't have an account? <span className="aqua">Sign Up</span></Link>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    }
    if (isSubmitted) {
        return <div className="signUpForm">
            <ScrollToTop/>
            <NavBar/>
            <div className="signUpFormContent">
                <h2 className="signUpFormSubmittedHeader">Logged In</h2>
            </div>
            <Footer/>
        </div>
    }
}

export default LogInPage