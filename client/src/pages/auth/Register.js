import { useState, useEffect } from "react"
import { auth } from './firebase'
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

const Register = () => {

    const [email, setEmail] = useState("")
    const { user } = useSelector(state => state)
    const navigate = useNavigate()
    useEffect(() => {
        if (user && user.token)
            navigate('/')
    }, [user, navigate])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const config = {
                url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
                handleCodeInApp: true
            }
            await auth.sendSignInLinkToEmail(email, config)
            toast.success(`Email is sent to ${email}.Click the link to complete registration`)
            window.localStorage.setItem('registration_email', email)
        }
        catch (err) {
            toast.error(err.message)
        }
    }
    return (

        <form
            className="form"
            onSubmit={handleSubmit}
        >
            <img src="/img/logo2.png" className="w-[70px]" alt="" />

            <h1
                className="font-extrabold text-xl text-lightest"
            >
                Register
            </h1>


            <input
                type="email"
                autoFocus
                placeholder="name@example.com"
                className="text-center focus rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="bg-secondary px-4 py-2 text-lg rounded-full hover:opacity-90 text-white hover:text-white border-b-2 border-r-[1px] border-light  hover:border-r-2 hover:translate-x-[-1px] hover:translate-y-[-2px] focus:outline-none focus:ring-1 focus:ring-lightest">Submit</button>
        </form>

    )
}

export default Register
