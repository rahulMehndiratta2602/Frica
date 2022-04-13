import { DeleteFilled, EditFilled, EyeOutlined } from "@ant-design/icons"
import { BsCartPlus } from 'react-icons/bs'
import { useLocation, useNavigate } from "react-router"
import StarRatings from 'react-star-ratings'


const ProductCard = ({ product, deleteProductClick, isHome = false }) => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className={`aspect-auto 
        w-[100%] 
        xxs:w-[90%]
        xs:w-[100%] 
        sm:w-[100%]
        md:w-[100%]
        lg:w-[100%] rounded-lg bg-[#020327d2] space-y-2`
        }>
            <img src={product.images && product.images.length !== 0 ? product.images[0].url : "/img/default.webp"} className="w-full aspect-[16/12] object-cover object-center rounded-t-lg" alt="" />
            <div className="sm:h-[50px] sm:leading-6 md:leading-7 flex items-baseline h-[60px] mt-2 bg-slate-600 relative justify-center"><h1 className="text-white absolute px-1 top-[50%] -translate-y-[50%] text-sm md:text-lg font-mono font-extrabold md:leading-4  ">{product.brand}-{product.title.toUpperCase()}</h1></div>
            <h1 className="text-white text-[11px]  md:text-sm !leading-3 font-mono ">Rs {product.price}/-</h1>
            <div className="w-full pt-4 bg-white  flex flex-col justify-center items-center  ">
                <div className="flex sm:flex-row flex-col justify-center items-center">

                    <StarRatings
                        rating={product.ratingsQuantity === 0 ? 0 : product.ratingsAverage}
                        starRatedColor="#ee6c4d"
                        // changeRating={(val) => setRating(val)}
                        numberOfStars={5}
                        name='rating'
                        isSelectable='false'
                        starSpacing="1px"
                        starDimension='24px'
                    /><span className="text-base ml-1 text-slate-600 leading-6">({product.ratingsQuantity})</span>
                </div>
                <span className='font-montserrat mt-1 sm:text-sm text-xs'>
                    {product.ratingsQuantity === 0 ? "Not Rated Yet" : `Average Rating(${product.ratingsAverage})`}
                </span>
            </div>
            <div className="px-2 text-left h-[100px]  overflow-ellipsis overflow-y-scroll scrollhost text-white leading-3  text-xs">{product.description.substring(0, 120)}</div>
            <div className=" ">
                {
                    isHome ? <div className="w-full text-lg  flex">
                        <div
                            className="cursor-pointer bg-white
                    hover:bg-tertiary hover:text-white text-tertiary
                    rounded-bl-md py-2 border-[#020327d2] text-xl
                    w-[50%] border-r-[1px]"
                            onClick={() => navigate(`/product/${product.slug}`)}
                        >
                            <EyeOutlined />
                        </div>
                        <div
                            className="cursor-pointer bg-white
                     hover:bg-red-500 hover:text-white ml-auto text-red-500
                    rounded-br-md border-[#020327d2]
                     border-l-0 w-[50%] py-2 !text-2xl  flex items-center justify-center"
                        ><BsCartPlus />
                        </div>
                    </div>
                        : <div className="w-full  text-lg  flex">
                            <div
                                className="cursor-pointer bg-slate-600
                    hover:bg-light text-tertiary 
                    rounded-bl-lg py-1 sm:py-2 border-[#020327d2]
                    w-[50%] border-r-[1px]"
                                onClick={() => {
                                    navigate(`/admin/product/update/${product.slug}`)
                                }}
                            >
                                <EditFilled />
                            </div>
                            <div
                                className="cursor-pointer bg-slate-600
                     hover:bg-light ml-auto text-red-500 
                    rounded-br-lg border-[#020327d2]
                     border-l-0 w-[50%] py-1 sm:py-2 "
                                onClick={() => deleteProductClick(product.slug)}
                            ><DeleteFilled /></div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductCard
