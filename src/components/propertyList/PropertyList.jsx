import { useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = ({selectType, typeSelected}) => {
  const { data, loading, error } = useFetch("/hotels/countByType");

 const navigate = useNavigate()

  const images = [
   "https://media.istockphoto.com/photos/receptionist-giving-keys-to-hotel-guest-picture-id1192128830?k=20&m=1192128830&s=612x612&w=0&h=vnUngjXTKrZ9AJqOqUij7YxiVkzvpHhM_LJidJ5vhDo=",

      "https://media.istockphoto.com/photos/triangular-modern-lake-house-picture-id1296723838?b=1&k=20&m=1296723838&s=170667a&w=0&h=ypMLh0bMVdTYbeaYwUe6HhLVsxEmtHkz42zlAJWWBsU=",

      "https://media.istockphoto.com/photos/exclusive-luxury-villa-picture-id1274974475?b=1&k=20&m=1274974475&s=170667a&w=0&h=R8s0_ZnyZGUOEgtYEtzMvSx48osiFtMeSXR0nCFxyAY=",

      "https://images.unsplash.com/photo-1617859047452-8510bcf207fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzb3J0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

      "https://media.istockphoto.com/photos/alpine-scenery-with-mountain-chalet-in-summer-picture-id1253023117?b=1&k=20&m=1253023117&s=170667a&w=0&h=cHoUHzyOPjOaL5BkA8_YRZ0hy6bWg_B-tQeO1wj7CT8=",

      "https://media.istockphoto.com/photos/guesthousecafe-on-way-to-everest-base-campnepal-picture-id507286906?k=20&m=507286906&s=612x612&w=0&h=BMdOTYFbYhnjngmz0IEKJx3E6mNgIpTbxN1QPqtKMdw=",

      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",

      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WE10cWtTdpaTRJZrrwQ7OEWr9K9oq4eeIhAArWBJBj3wd-OUdnaEkWhW4xpRTMOnGyA&usqp=CAU",

      "https://media.istockphoto.com/photos/brown-new-construction-craftsman-house-with-siding-with-large-yard-picture-id1158712419?k=20&m=1158712419&s=612x612&w=0&h=JQK8nY-pvDD8g4zRItNgXVTu4t_Q5BTIOzRFY1tzLYM=",

      "https://media.istockphoto.com/photos/family-camping-in-backyard-picture-id1220536128?k=20&m=1220536128&s=612x612&w=0&h=wD6BY9g-KmtamFd8miX70On9J83Z_6y1viE1cI-sjsc="
  ];


  // TBD
  const handleClick = (type_id) => { 
         console.log(type_id)
         selectType(type_id)

  //   navigate ("/hotels", {state: {type: type}})         
  }

  return (
    <div className="pList">
      {loading ? (
        "loading...please wait"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className={"pListItem" + (data[i]?._id === typeSelected ? 'Selected' : 'Deselected')} key={i}
                onClick={()=>handleClick(data[i]?._id)}
              
              
               >
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2> {data[i]?.count} {data[i]?.type}{ data[i]?.count!==1 && "s" }  
                  </h2>
                </div>
              </div>
            ))
          }
        </>
      )}
    </div>
  );
};

export default PropertyList;