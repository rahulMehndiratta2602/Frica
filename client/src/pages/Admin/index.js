import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import AdminSidebar from "../../components/AdminSidebar"
import { currentAdmin } from "../../functions/auth"
import Dashboard from "./Dashboard"
import Loading from '../../components/Loading'

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [timer, setTimer] = useState(5)
    const [loading, setLoading] = useState(true)
    const { user } = useSelector(state => ({ ...state }))
    const navigate = useNavigate()
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            if (user && user.token) {
                currentAdmin(user.token).then((res) => {
                    // console.log("ADMIN RESOURCE ACCESSED", res)
                    setOk(true)
                })
                    .catch((err) => {
                        // console.log("ADMIN RESOURCE ERROR", err)
                        navigate('/')
                    })
            }
            else
                navigate('/')
            setLoading(false)

        }, 2000)
        return () => clearTimeout(loadingTimer)

    }, [user, navigate])
    return (
        <>
            {
                loading ?

                    <div className="flex justify-center items-center h-[78vh]"><Loading number={6} /></div>

                    : <div className="flex sm:space-x-2 mt-4">
                        <AdminSidebar />
                        <div className="w-full h-[78vh] rounded-xl flex justify-center items-center bg-red-100">
                            {
                                ok
                                    ? <Outlet />
                                    : <div className="text-red-600">Admin Resource. Access Denied. </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default AdminRoute
export { Dashboard }
