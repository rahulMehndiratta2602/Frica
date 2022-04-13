import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const AdminSidebar = () => {
    const location = useLocation()
    const [active, setActive] = useState("")
    useEffect(() => {
        if (location.pathname.startsWith('/admin'))
            setActive(location.pathname.replace('/admin/', ''))
    }, [location.pathname])
    const items = ['Dashboard', 'Categories', 'SubCategories', 'Password', 'Products', 'Product']
    return (
        <aside className=" flex flex-col bg-secondary h-[78vh] w-[10em] space-y-8 rounded-md pt-10 text-center">
            {items.map((item, i) => (
                <Link to={item.toLowerCase()} key={i} className={`text-sm sm:text-base text-lightest focus:text-primary ${active === item.toLowerCase() && "text-primary"}`} onClick={() => setActive(item)}>{item}</Link>
            ))}
        </aside>
    )
}

export default AdminSidebar
