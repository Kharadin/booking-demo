import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {


     const { data, loading, error } = useFetch("/hotels/countByCity?cities=Paris,Madrid,Sundania")

     console.log(data)

 
  return (
    <div className="featured"> 
    {loading? ("Loading... please wait"  
    ) : (
    <> <div className="featuredItem">
          <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/344881660.jpg?k=c141cb0cf6b609db58337db0882fc28ab5c9e340e4392c0c6ca4c56515f1e636&o=&hp=1" className="featuredImg" />
          <div className="featuredTitles">
               <h1>Paris</h1>  
               <h2>{data[0]} Properties</h2>
          </div>
     </div> 

     <div className="featuredItem">
          <img src="https://images.unsplash.com/photo-1551354907-80361e454f5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="featuredImg" />
          <div className="featuredTitles">
               <h1>Madrid</h1>
               <h2>{data[1]} Properties</h2>
          </div>
     </div>

     <div className="featuredItem">
          <img src="https://images.unsplash.com/photo-1649496478130-788a704a648a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWluJTIwaHV0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className="featuredImg" />
          <div className="featuredTitles">
               <h1>Sundania</h1>
               <h2>{data[2]} Properties</h2>
          </div>
     </div> 
     </>)}

    </div>
  )
}

export default Featured
