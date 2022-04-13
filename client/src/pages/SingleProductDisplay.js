import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { getProduct } from "../functions/product"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { BsCartPlus } from "react-icons/bs"
import { HeartOutlined, StarOutlined } from "@ant-design/icons"
import StarRatings from 'react-star-ratings'
import { Tabs } from "antd"
import RatingModal from "../components/RatingModal"
import axios from "axios"
import { toast } from "react-toastify"

const { TabPane } = Tabs

const SingleProductDisplay = () => {
    const params = useParams()
    const { user } = useSelector(state => ({ ...state }))
    const [product, setProduct] = useState(null)
    const [review, setReview] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState('')
    const [reviewSubmitted, setReviewSubmitted] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getProduct(params.slug, true)
            .then(res => {
                const product = res.data.product
                setProduct(product)
                // console.log(product)
            }).catch(err => {
                console.log(err)
            })
    }, [reviewSubmitted])
    useEffect(() => {
        if (product && user) {
            getReview(product._id)
        }
    }, [product, user])
    useEffect(() => {
        console.log("Hey There")
    }, [])
    const getReview = async (productId) => {

        const res = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/reviews/product/${productId}`,
            headers: {
                'authToken': user.token
            }
        })
        setReview(res.data.review)
    }


    const handleRatingSubmit = async (rating, review, method) => {
        try {
            const res = await axios({
                method,
                url: `${process.env.REACT_APP_API}/reviews/product/${product._id}`,
                data: { rating, review },
                headers: {
                    'authToken': user.token
                }
            })
            toast.success('Thanks for feedback!')
            setReviewSubmitted(true)
            window.location.reload()
        }
        catch (err) {
            console.log(err.response)
        }
    }
    const handleRatingButtonClick = () => {
        if (user && user.token) {
            setShowModal(true)
            document.querySelector('body').classList.add('modal-open')

        }
        else {
            navigate(
                '/login',
                {
                    state: { from: `/product/${params.slug}` }
                }
            )
        }
    }
    return (<>
        {showModal && <RatingModal setShowModal={setShowModal} handleOk={handleRatingSubmit} review={review} />}
        <div className="w-full bg-slate-700 bg-opacity-80 pt-10">
            {/* {JSON.stringify(product)} */}

            <div className=" grid grid-cols-1 lg:grid-cols-7 gap-y-8">
                <div className="relative w-full lg:col-span-4 bg-slate-700 px-4 bg-opacity-80">
                    <Carousel
                        autoPlay={true}
                        useKeyboardArrows={true}
                        autoFocus={true} interval={6000}
                        autoPlay={true}
                        infiniteLoop={true}
                        emulateTouch={true}
                        statusFormatter={(item, total) => ""}
                    >
                        {product?.images.length > 0 ? product?.images.map((image) => {
                            return <img
                                className='w-full md:aspect-[1.5] lg:aspect-[1.4]  xl:aspect-[1.65] items-center object-contain'
                                src={image.url} key={image.public_id} />
                        }) :
                            <img
                                className='w-full md:aspect-[1.5] lg:aspect-[1.45] xl:aspect-[1.6] object-contain'
                                src='/img/default.webp' />}
                    </Carousel>
                </div>
                <div className="relative w-full   lg:col-span-3  flex flex-col justify-start">

                    <label className="w-full relative text-center py-2 font-montserrat tracking-[2px] bg-slate-800 bg-opacity-100 text-white sm:text-3xl text-lg font-[800] ">{product?.title}</label>
                    <div className="w-full pt-4 bg-white  flex flex-col justify-center items-center  ">
                        <div className="flex sm:flex-row flex-col justify-center items-center">

                            <StarRatings
                                rating={product?.ratingsQuantity === 0 ? 0 : product?.ratingsAverage}
                                starRatedColor="#ee6c4d"
                                // changeRating={(val) => setRating(val)}
                                numberOfStars={5}
                                name='rating'
                                isSelectable='false'
                                starSpacing="1px"
                                starDimension='24px'
                            /><span className="text-base ml-1 text-slate-600 leading-6">({product?.ratingsQuantity})</span>
                        </div>
                        <span className='font-montserrat mt-1 sm:text-sm text-xs'>
                            {product?.ratingsQuantity === 0 ? "Not Rated Yet" : `Average Rating(${product?.ratingsAverage})`}
                        </span>
                    </div>
                    <div className="flex flex-col bg-white px-4 font-montserrat text-sm space-y-3 lg:space-y-4 py-6 text-gray-700">
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Price</h4>
                            <h4 className="ml-auto font-mono text-gray-600">{product?.price}</h4>
                        </div>
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Category</h4>
                            <a className="ml-auto font-mono ">{product?.category.name}</a>
                        </div>
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Sold</h4>
                            <h4 className="ml-auto font-mono text-gray-600">{product?.sold}</h4>
                        </div>
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Sub Categories</h4>
                            <div className="ml-auto w-[45%] text-right  break-normal ">
                                {
                                    product?.subCategories.map(subcat => (
                                        <a className="font-mono" key={subcat.slug}>{`${subcat.name} `}</a>
                                    ))
                                }

                            </div>
                        </div>
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Shipping</h4>
                            <h4 className="ml-auto font-mono text-gray-600">{product?.shipping}</h4>
                        </div>
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Stock</h4>
                            <h4 className="ml-auto font-mono text-gray-600">{product?.quantity}</h4>
                        </div>
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Color</h4>
                            <h4 className="ml-auto font-mono text-gray-600">{product?.color}</h4>
                        </div>
                        <div className="flex flex-row w-full ">
                            <h4 className="text-gray-600">Brand</h4>
                            <h4 className="ml-auto font-mono text-gray-600">{product?.brand}</h4>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-full flex flex-col text-center bg-white text-xl space-y-1 cursor-pointer py-4 hover:bg-tertiary hover:text-white text-tertiary
                          justify-center items-center "><BsCartPlus /><p className="text-gray-700 text-sm lg:text-xs">Add to Cart</p></div>
                        <div
                            className="w-full flex flex-col text-center bg-white text-xl space-y-1 cursor-pointer py-4 hover:bg-primary hover:text-white text-primary justify-center"

                        ><HeartOutlined /><p className="text-gray-700 text-sm lg:text-xs">Add to Wishlist</p></div>
                        <div
                            className="w-full flex flex-col text-center bg-white text-xl space-y-1 cursor-pointer py-4 hover:bg-secondary hover:text-white  text-secondary justify-center "
                            onClick={() => handleRatingButtonClick()}
                        ><StarOutlined /><p className="text-gray-700 text-sm lg:text-xs">{user && user.token
                            ? (review !== null ? 'Update Review' : 'Rate this Product')
                            : 'Login to Leave Rating'}</p></div>

                    </div>
                </div>
                <div className="relative w-full min-h-[300px] mb-20 font-montserrat  bg-[#c4c4c4] lg:col-span-7">
                    <Tabs defaultActiveKey="1" type="card" style={{ backgroundColor: "#c4c4c4" }} >
                        <TabPane tab="Description" key="1" style={{ paddingLeft: "20px", textAlign: "justify", paddingRight: "20px" }}>
                            {product?.description}
                        </TabPane>
                        <TabPane tab="Reviews" key="2" style={{ paddingLeft: "20px", textAlign: "justify", paddingRight: "20px" }}>
                            {
                                <div className="flex flex-col space-y-2 ">
                                    {product?.reviews?.map((review) => (
                                        <div className="bg-slate-200 flex flex-row space-x-2 py-2  px-2 font-montserrat text-xs items-start" key={review._id}>
                                            {/* review.user.picture || */}
                                            <img src={"/img/defaultAvatar.png"} alt="User Image" className="w-12 h-12 rounded-full" crossOrigin="use-credentials" />
                                            <div className="">
                                                <StarRatings
                                                    rating={review.rating}
                                                    starRatedColor="#ee6c4d"
                                                    // changeRating={(val) => setRating(val)}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    isSelectable='false'
                                                    starSpacing="1px"
                                                    starDimension='24px'
                                                />
                                                <div className=''>{review.review}</div>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            }
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        </div >
    </>

    )
}

export default SingleProductDisplay
