import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import Loading from "../../components/Loading"
import UserSidebar from "../../components/UserSidebar"
import History from "./History"
import Password from "./Password"
import Wishlist from "./Wishlist"

const UserRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            if (user && user.token) {
                setIsLoggedIn(true)
            }
            else {
                navigate('/login')
            }
            setLoading(false)
        }, 3000)
        return () => clearTimeout(loadingTimer)
    }, [user, navigate])
    return (<>
        {
            loading
                ? <div className="flex justify-center items-center h-[78vh]"><Loading /></div>
                : <div className="flex space-x-2 mt-4">
                    <UserSidebar />
                    <div className="w-full h-[78vh] rounded-xl flex justify-center items-center bg-red-100">
                        {
                            isLoggedIn
                                ? <Outlet />
                                : <div className="text-red-600">You need to be logged in to access this route.</div>
                        }
                    </div>
                </div>

        }</>
    )
}

export default UserRoute
export { History, Wishlist, Password }
