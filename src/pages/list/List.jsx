import "./list.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from "react-router-dom"
import { useState, useSyncExternalStore } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import PageSelector from "../../components/pageSelector/PageSelector"

const List = () => {

  const location = useLocation()
//   console.log(location)
  // it has info from navigate ("/page", {state:{var1, var2, var3...}}) that was used to navigate to this page 

  const [destination, setDestination] = useState(location.state.destination);

  const [openDate, setOpenDate] = useState(false);

  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  //const [type, setType] = useState('Any')
 
  
  
  const {data: typeData, loading: typeLoading, error: typeError, reFetch: typeRefetch} = useFetch(`/types`)
  const [typeId, setTypeId]= useState(location.state.propertyType)

   

  // useEffect (()=> {setTypeSelect (typeData.find(o=>o?._id === location.state.propertyType)?.type)}, [typeData[1]?.type])

  
  useEffect(()=>{console.log(location.state.propertyType)}, [location.state.propertyType])
  useEffect(()=>{console.log(typeId)}, [typeId])

  const setType =(e) => {
    if  (e.target.value === "Any") {
     setTypeId (undefined)
    } else {
     setTypeId(typeData.find(o=>o.type === e.target.value)._id)
  
    }
 //   console.log(e.target.value)
    
  }
  useEffect(()=> console.log(typeId), [typeId])

  const [page, setPage]= useState(0)



  useEffect(()=> {
    console.log(page)
    reFetch();
  }, [page])

  function handlePageSelect (i) {
    // setPage(i) 
     // eslint-disable-next-line no-undef
    setPage(i)
    
     // Learn: Important. reFetch was here. so the actual request parameter was lagging behind what's updated. useState proceeded to update the component and then to set the parameter.
     // useEffect detected only when parameter changed , but the url received the old parameter.
     // moving the reFetch to useEffect [page] made the reFetch to actually wait for the page' to update. Now it works. 
     
  }

  let limit =20 
  const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0 }&max=${max || 99999}&type=${typeId}&count&limit=${limit}&page=${page}
  `)
 // console.log(data)
 console.log(page)

  
 const [pages, setPages] = useState([])
  useEffect(()=> {
     var count = ( data?.count) || 0
     var pageCount = Math.ceil(count / limit)
     var tempPages = []
     for (let i=0; i< pageCount; i++) {
       tempPages.push(i)
     }
     console.log("pages:", pages)
     setPages(tempPages)
    
  }, [data])

 
  //const [hotelList, setHotelList] = useState([])
 // useEffect(()=> setHotelList(data.hotelList), [data])
  
 //
// const [pages, setPages] = useState([]);
// const [page, setPage] = useState(0);

//  useEffect(()=> {
              
//                var pagesCount = []
//                for (let i =0; i< Math.ceil(count / limit ); i++ ) {
//                  pagesCount.push(i)
//                }
//                setPages(pagesCount)
//                console.log(pagesCount, "math.ceil=", Math.ceil(count / limit ), pages )
// },[data?.count])





 console.log(typeData)
    // console.log(type) 


  const handleClick = () => {
    reFetch()
    // reFetch doesn't take url really.
  }


  const handleDestChange = (e) => {
    e.preventDefault();
    // if (e.target.value === '' ) {
    //   setDestination(undefined)
    // } else {
    // it doesn't work to prevent re-render here... 
    // for future: consider writing components separately and using them as per material from SOF, 
    setDestination(e.target.value)
    // }
    console.log(e.target.value)
  }
  
  // eslint-disable-next-line no-undef

  // what's the difference - when using const etc of ...function ? []

  


  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
             <h1 className="lsTitle">Search: {data?.count}</h1>
             <div className="lsItem">
                <label >Destination</label>
                <input placeholder={destination} type="text"
                onChange={e=>handleDestChange(e)}  />
             </div>

              <div className="lsItem">
                <label >Check-in Date </label>
                <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")}`} to {`${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
               { openDate && 
               <DateRange
                  editableDateInputs={true} 
                  onChange={(item)=>setDates([item.selection])} 
                  minDate={new Date()}
                  ranges= {dates}
                />}
              </div>

                <div className="slItem">
                  <label>Options</label>

                  <div className="lsOptions">
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Min price <small>per night</small>
                        </span>
                        <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
                    </div> 

                    <div className="lsOptionItem">
                        <span className="lsOptionText">Max price <small>per night</small>
                        </span>
                        <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
                    </div>


                    <div className="lsOptionItem">
                        <span className="lsOptionText">Adult
                        </span>
                        <input type="number" min={1}
                        className="lsOptionInput" placeholder={options.adult} />
                    </div>

                    <div className="lsOptionItem">
                        <span className="lsOptionText">Children
                        </span>
                        <input type="number"  min={0}
                        className="lsOptionInput"
                        placeholder={options.children} />
                    </div>

                    <div className="lsOptionItem">
                        <span className="lsOptionText">Room
                        </span>
                        <input type="number"  min={1} 
                        className="lsOptionInput"
                        placeholder={options.room} />
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Kind
                        </span>
                        <select value={typeData.find(object=>object._id === typeId)?.type} name="selectType" className="lsOptionSelect" id="selectType" onChange={e=>setType(e)} >
                          <option value="Any">Any</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Waterfront House">Waterfront House</option>
                          <option value="Villa">Villa</option>
                          <option value="Resort">Resort</option>
                          <option value="Cabin">Cabin</option>
                          <option value="Guesthouse">Guesthouse</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Countryside House">Countryside House</option>
                          <option value="House">House</option>
                          <option value="Camping">Camping</option>

                        </select>
                                              
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Page
                        </span>
                        <PageSelector pagesArray ={pages} loading={loading} returnFunction={handlePageSelect} page={page}/>
                    </div>

                        
                    
                    
                  </div>  



                </div>


                <button onClick={handleClick}>Search</button>
          
          </div>
            <div className="listResult"> 
             {loading? "Loading...please wait" : <>
             {data.hotelList?.map(item=>(
               <SearchItem item={item} key={item._id}/>

             ))}
             
              </>}
              
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default List
