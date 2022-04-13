import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import ShopSideNav from '../components/ShopSideNav'
import { getCategories } from "../functions/category"
import { getFilteredProducts } from "../functions/product"
import { getSubCategories } from "../functions/subCategory"
const Shop = () => {
    const { filter } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch()
    const { showFilter } = filter
    const [products, setProducts] = useState([])

    const fetchCategories = async () => {
        let categories = []
        try {
            const res = await getCategories()
            categories = res.data.data.categories
        }
        catch (err) {
            console.log(err)
        }

        return categories
    }

    useEffect(() => {
        const newFilter = { ...filter }
        fetchCategories()
            .then(res => {
                newFilter.categories = res
                dispatch({
                    type: 'UPDATE_FILTER',
                    payload: newFilter
                })
            })

    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => getFilteredProducts({ ...filter, categories: undefined, subCategories: undefined, showFilter: undefined, colors: undefined, brands: undefined }).then(
            res => setProducts(res.data.data.products)
        ).catch(err => console.log(err)), 1000)
        return () => clearTimeout(timeout)

    }, [filter])
    return (
        <div className='grid grid-cols-12 '>
            {showFilter && < div className="lg:col-span-3 rounded-bl-md col-span-12 lg:h-[88vh] overflow-hidden overflow-y-scroll scrollhost h-[30vh] bg-white pb-10"><ShopSideNav filter={filter} /></div>}
            <div className={`${showFilter ? "lg:col-span-9 rounded-br-md col-span-12" : "col-span-12"} text-base text-white overflow-hidden overflow-y-scroll scrollhost lg:h-[88vh] h-[100vh] bg-primary `}
            >
                <div className="w-full relative h-full bg-primary flex flex-col   pt-3 pb-3 rounded-md space-y-1 overflow-hidden text-center">

                    <h1 className="text-lg text-lightest font-bold">{products.length > 0 ? `All Products (${products.length})` : "No Matching Products Found"}</h1>
                    {/* {JSON.stringify(products)} */}
                    <div className="grid scrollhost h-full relative
                      bg-white overflow-hidden overflow-y-scroll
                        px-0 grid-cols-1
                        xxs:px-2
                        xs:grid-cols-2 xs:px-4 xs:gap-x-3
                        sm:grid-cols-2 sm:gap-x-4
                        md:grid-cols-3
                        lg:grid-cols-3
                        gap-y-4 py-8
                        rounded-md justify-items-center items-center">
                        {products && products.map((product) => <ProductCard key={product._id} product={product} isHome={true} />)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Shop
