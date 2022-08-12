import Featured from "../../components/featured/Featured"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Navbar from "../../components/navbar/Navbar"
import PropertyList from "../../components/propertyList/PropertyList"
import "./home.css"
import { useState } from "react"
import { useEffect } from "react"

const Home = () => {

   const [propertyType, setPropertyType] = useState(undefined)

  const handleTypeSelect = (type_id)=> {
    setPropertyType(type_id)
  }
useEffect (()=> {console.log(propertyType)}, [propertyType])

  return (
    <div>
      <Navbar/>
      <Header propertyType={propertyType}/>
        <div className="centeringContainer">

          <div className="homeContainer">
            <h1 className="homeTitle">We have categories to cater for all tastes:</h1>
            <PropertyList selectType= {handleTypeSelect} typeSelected={propertyType}/>
            <h1 className="homeTitle">Varied locations</h1>
            <Featured />
            <h1 className="homeTitle">Featured</h1>
            <FeaturedProperties/>
            <MailList />
            <Footer />
          </div>

        </div>
    </div>
  ) 
}

export default Home
