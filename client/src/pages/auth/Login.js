import { GoogleOutlined, MailOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { auth, googleAuthProvider } from "./firebase"
import { createOrUpdateUser } from "../../functions/auth"


const Login = () => {
    const [email, setEmail] = useState("mandyratta@gmail.com")
    const [password, setPassword] = useState("Bl@cky26")
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const roleBasedRedirect = (role) => {
        if (location?.state?.from)
            navigate(location.state.from)
        else
            role === 'admin' ? navigate('/admin/dashboard') : navigate('/user/history')
    }

    //dont show login page if user is already present
    useEffect(() => {
        if (location?.state?.from)
            return
        else if (user && user.token)
            navigate('/')
        return null
    }, [user, navigate])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const { user } = result
            // console.log(user)
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    toast.success('Logged in successfully!')
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            email: res.data.user.email,
                            token: idTokenResult.token,
                            name: res.data.user.name,
                            _id: res.data.user._id,
                            picture: res.data.user.picture,
                            role: res.data.user.role
                        }
                    })
                    setLoading(false)
                    roleBasedRedirect(res.data.user.role)
                })
                .catch(err => console.log(err))
        } catch (err) {
            console.log(err)
            setLoading(false)
            toast.error(err.message)
        }

    }
    const googleLogin = async (e) => {
        e.preventDefault()
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()
            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    toast.success('Logged in successfully!')
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            email: res.data.user.email,
                            token: idTokenResult.token,
                            name: res.data.user.name,
                            _id: res.data.user._id,
                            picture: res.data.user.picture,
                            role: res.data.user.role
                        }
                    })
                    setLoading(false)
                    roleBasedRedirect(res.data.user.role)
                })
                .catch(err => console.log(err))
        }).catch(err => {
            setLoading(false)
            toast.error(err.message)
        })
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
                Login
            </h1>
            <input
                type="email"
                placeholder="Enter your email"
                className="text-center focus rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                autoFocus
                placeholder="Enter your password"
                className="text-center focus rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button
                type="submit"
                className="bg-secondary px-4 py-2 text-lg rounded-full hover:opacity-90 text-white hover:text-white border-b-2 border-r-[1px] border-light  hover:border-r-2 hover:translate-x-[-1px] hover:translate-y-[-2px] focus:outline-none focus:ring-1 focus:ring-lightest disabled:opacity-60"
                disabled={!email || password.length < 8}
            >
                <MailOutlined /> {loading ? "Loading..." : "Login"}</button>
            <button
                type="button"
                className="bg-tertiary px-4 py-2 text-lg rounded-full hover:opacity-80 text-white hover:text-white border-b-2 border-r-[1px] border-light  hover:border-r-2 hover:translate-x-[-1px] hover:translate-y-[-2px] focus:outline-none focus:ring-1 focus:ring-lightest disabled:opacity-60 "
                onClick={googleLogin}
            >
                <GoogleOutlined /> Login with Google</button>
            <Link to="/forgot/password" className="text-white">Forgot Password?</Link>
        </form>

    )
}

export default Login
