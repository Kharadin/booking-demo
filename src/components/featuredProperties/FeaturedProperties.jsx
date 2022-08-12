import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css"

const FeaturedProperties = () => {

     const { data, loading, error } = useFetch("/hotels?featured=true&limit=8");

  return (
     <div className="fp">

         { loading? ("Loading... please wait") :
         <>
          {data.map(item=> (

             <Link to={`/hotels/${item._id}`}  className="fpItem" key={item._id}   >
               {/* <div className="fpItem" key={item._id} > */}
                     <div className="fpImgContainer">
                        <img src={item.photos[0]} 
                        alt="" 
                        className="fpImage" 
                        />
                     </div>   
                    <span className="fpName">{item.name}</span>
                    <span className="fpCity">{item.city}</span>
                    <span className="fpPrice">Starting from ${item.cheapestPrice} </span>
                   {item.rating && <div className="fpRating">
                         <button>{item.rating}</button>
                         <span>{item.comment}</span>
                    </div>}
                {/* </div> */}
              </Link>    
           )) }
          </>}
         
     </div>
  ) 
}

export default FeaturedProperties
