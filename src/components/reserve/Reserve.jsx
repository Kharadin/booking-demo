import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { isLastDayOfMonth } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import "./reserve.css"


const Reserve = ({setOpen, hotelId, roomId}) => {

    const [selectedRooms, setSelectedRooms] = useState([]);

    const [rmSldrOpen, setRmSldrOpen] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);


   // const {data, loading, error } = useFetch(`/hotels/room/${hotelId}`)

   const {data: roomData, loading: roomLoading, error: roomError} = useFetch(`/rooms/${roomId}`);

    
    // const { dates }= useContext(SearchContext)
    const dates = JSON.parse(localStorage.getItem("dates"))
    console.log (dates)

      const getDatesInRange = (startDate, endDate) => {
        const start = new Date (startDate)
        const end = new Date (endDate)
        // "we don't need them, but they can stay in any case"

          const date = new Date(start.getTime());
          console.log(date)

          let list = []

          while(date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
          }

          return list
      }

    const allDates = (getDatesInRange(dates[0].startDate, dates[0].endDate))
    console.log("allDates: ", allDates)

    const isAvailable = (roomNumber)=> {
      const isFound = roomNumber.unavailableDates.some(date=> allDates.includes(new Date(date).getTime())
      )
      return !isFound;
      
      
    } ; 


     const handleSelect = (e)=> {
          const checked = e.target.checked
          const value= e.target.value
          setSelectedRooms(
                    checked ? 
                      [...selectedRooms, value]:
                       selectedRooms.filter((item)=> item !==value)

                    );
      };
      
      console.log(selectedRooms)
   
      const navigate =useNavigate()
   
      const handleClick= async () => {
        try {
             
         await Promise.all(
            selectedRooms.map(roomId=>{
           //   const res = axios.put(`/rooms/availability/${roomId}`, 
              const res = axios.put(`https://booking1demo.herokuapp.com/api/rooms/availability/${roomId}`, 
               {dates: allDates});
              return res.data
            })
          );
          setOpen(false)
          navigate('/')
          
        } catch (err) {

        }
    };

   const handleRoomPhotoOpen= (i)=> {
    setSlideNumber(i)  
    setRmSldrOpen(true);
    console.log("setRmSldrOpen")
      
   }
   console.log(roomData)
    
  const handleMove = (direction) => {
    let newSlideNumber;

    if(direction ==="l") {
      newSlideNumber= slideNumber === 0 ? (roomData.photos.length -1):
                    slideNumber-1
    } else {
          newSlideNumber = slideNumber===(roomData.photos.length-1) ? 0:
          slideNumber+1;
    }
     setSlideNumber(newSlideNumber)
  }
  
  const [detailsPara, setDetailsPara]= useState(undefined)

  useEffect(()=> {
    if (roomData.details) {
      setDetailsPara(roomData.details.split("&&n"))
    }
    console.log(detailsPara)
 }, [roomData])

 useEffect(()=> { console.log(detailsPara)} , [ detailsPara] )

      
  return (

    <div className="reserveContainer">

        {rmSldrOpen && (

        <div className="rmSlider">
        
          <FontAwesomeIcon
          icon={faCircleXmark}
          className="rmSliderClose"
          onClick={()=>setRmSldrOpen(false)}
          />
          <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="arrow"
          onClick={()=>handleMove("l")}
          />
          <div className="rmSliderWrapper">
            <img
            src={roomData.photos[slideNumber]}
            alt=""
            className="rmSliderImg"
            />
          </div>
          <FontAwesomeIcon
          icon={faCircleArrowRight}
          className="arrow"
          onClick={()=>handleMove("r")}
          />
        </div>
        )}
    
    <div className="reserve">

        
     

      <div className="roomWrapper">

          <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)} / >
          {/* <span>Select your rooms:</span> */}
       
              
                <div className="roomHeader">

                   <h1 className="roomTitle">{roomData.title}</h1>
                   <span className="roomDesc">{roomData.desc}</span>
                   <span className="roomPrice">Цена за сутки: {roomData.price}</span>
                   <span className="maxPeople">Вмещает человек: {roomData.maxPeople}</span>
                </div>
                <div className="roomImages">
                          
                        {roomData.photos?.map((photo, i) => (
                        <div className="roomImgWrapper" key={i}>
                          <img
                            onClick={() => handleRoomPhotoOpen(i)}
                            src={photo}
                            alt=""
                            className="roomImg"
                          />
                        </div>
                      ))}
                </div>
              
                <div className="roomDetails">
                        {roomData.details?.split("&&n").map((para,i)=> 
                        <p key={i}>{para}</p>
                        )}
                </div>
                <div className="roomBooking">
                    <div className="rmBookingHeading">Проверьте доступность и забронируйте </div>
                    <div className="rmBookingDates">На даты: {dates[0].startDate.slice(0, 10)}  -  { dates[0].endDate.slice(0, 10)}  </div>
                         
                      <div className="rSelectRooms">

                          {roomData.roomNumbers?.map((roomNumber) => (
                            <div className="room">
                              <label>{roomNumber.number}</label>
                              <input
                              type="checkbox"
                              className="checkbox"
                              value={roomNumber._id}
                              onChange={handleSelect}
                              disabled={!isAvailable(roomNumber)}
                              />  
                              <label className="statusUnavail"
                              hidden={isAvailable(roomNumber)}
                              
                              >Unavailable</label>
                            </div>
                          )) 

                          }
                          {/* {roomData.roomNumbers.map(roomNumber=> (
                            <div className="room">
                            <label>{roomNumber.number}</label>
                            <input 
                            type="checkbox"
                            value={roomNumber._id} 
                            onChange={handleSelect}
                            disabled ={!isAvailable(roomNumber)} />
                            </div>
                            ))} */}
                        </div> 
               
                </div>
             
                
          
          <button onClick={handleClick} className="rButton">Забронировать сейчас</button>

      </div>
    </div>
    </div>
  )
}

export default Reserve;

