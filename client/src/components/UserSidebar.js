import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const UserSidebar = () => {
    const location = useLocation()
    const [active, setActive] = useState("")
    useEffect(() => {
        if (location.pathname.startsWith('/user'))
            setActive(location.pathname.replace('/user/', ''))
    }, [location.pathname])
    const items = ['History', 'Password', 'Wishlist']
    return (
        <aside className="flex flex-col bg-secondary h-[78vh] w-[10em] space-y-8  rounded-xl pt-10 text-center">
            {items.map((item, i) => (
                <Link to={item.toLowerCase()} key={i} className={`text-lg text-lightest focus:text-primary ${active === item.toLowerCase() && "text-primary"}`} onClick={() => setActive(item)}>{item}</Link>
            ))}
        </aside>
    )
}

export default UserSidebar
