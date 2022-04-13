
import HomeImage from "../components/HomeImage"
import HomeSection from "../components/HomeSection"


const Home = () => {

    return (
        <div className="pt-8 space-y-8   ">
            <HomeImage />
            <HomeSection heading="Our Products" headingBackground="bg-[#ee6c4d]" sort="updatedAt" />
            <HomeSection heading="New Arrivals" headingBackground="bg-[#31a34e]" sort="-createdAt" />
            <HomeSection heading="Best Sellers" headingBackground="bg-[#6d0a9b]" sort="-sold" />
        </div>
    )
}

export default Home
