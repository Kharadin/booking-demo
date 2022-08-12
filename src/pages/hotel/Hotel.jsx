import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { useEffect } from "react";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [roomId, setRoomId]=useState(undefined)

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const {data: roomsData, loading: roomsLoading, error: roomsError } = useFetch(`/hotels/room/${id}`)

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates: searchDates, options:searchOptions } = useContext(SearchContext);
  if ((typeof searchDates) !== 'undefined' ) {
    localStorage.setItem("dates", JSON.stringify(searchDates))
    localStorage.setItem("options", JSON.stringify(searchOptions))
  }

  const dates = JSON.parse(localStorage.getItem("dates"))
  const options = JSON.parse(localStorage.getItem("options"))



  console.log( dates);
  console.log(typeof dates);


  console.log( options);
  console.log(typeof options);

  console.log(dates[0].endDate)
  console.log(typeof dates[0].endDate)

  const endDate = new Date(dates[0].endDate)
  const startDate = new Date(dates[0].startDate)

  console.log(endDate)
  console.log(startDate)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(endDate, startDate);


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data.photos.length-1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === data.photos.length-1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  // const handleClick = () => {
  //   if (user) {
  //     setOpenModal(true);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  


   const handleRoomClick =(e, id)=> {
    // e.prevendDefault()

    // console.log(id)
    setRoomId(id)
    setOpenModal(true);
   }
  // const listOfParagraphs= data.desc.split("\r\n");
  
   const [descPara, setDescPara] = useState(undefined)

   useEffect(()=> {
      if (data.desc) {
        setDescPara(data.desc.split("&&n"))
      }
      console.log(descPara)
   }, [data])

   useEffect(()=> { console.log(descPara)} , [ descPara] )
   
  // const descParagraphs = data?.desc.split('\r\n')

  return (
    <div className= "hotelPageContainer">
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading Hotel ... "
      ) : (
        <div className="hotelContainer">
          {/* slider  */}
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          {/* end of slider */}


          <div className="hotelWrapper">
            {/* <button className="bookNow">Reserve or Book Now!</button> */}
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>


            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                
                
                <div className="hotelDesc">
                  {descPara?.map((para, i)=> 
                    <p key={i}>{para}</p>
                    
                    )} 
                    {/* {data.desc} */}
                  </div>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b> Starting From $
                    {days * data.cheapestPrice * options.room}</b>  
                    <br></br>
                    {" "}
                    ( {options.room} 
                    {(options.room===1? " room, " : " rooms, ")}  
                  {days}{" "} nights )
                </h2>
                <button >Check availability below</button>
              </div>
            </div>
          </div>
        </div>
      )}


      
      <div className="roomsContainer">
        <div className="roomsWrapper">
                <section className="roomsTable">

                  <div className="tableHeader">
                      <div className="col1">RoomType</div>
                      <div className="col2">Sleeps</div>
                      <div className="col3"></div>

                  </div>

                  {/* // */}
                  {roomsLoading ? (
                   "Loading rooms ... "
                   ) : (

                    roomsData.map(item=>(
                       
                      <div className="tableRow"  
                    
                      onClick={e=> handleRoomClick(e, item._id)}
                      >
                      <div className="col1">
                        <div className="roomTitleDesc">
                            <div className="hotelRoomTitle">{item.title}

                            </div>

                            <div className="hotelRoomDesc">{item.desc}

                            </div>
                              
                          </div>
                          <div className="roomTablePrice">$ {item.price}

                          </div>
                      
                      </div>
                      <div className="col2">Max people:{item.maxPeople}</div>
                      <div className="col3"> 
                          <button key={item._id}>
                              Check and book!
                          </button>
                      </div>

                  </div>
                    ))
                
                  )}
                </section>
          
          </div>
      
      </div>
      
      <MailList />
      <Footer />
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} roomId={roomId}/>}
    </div>
  );
};

export default Hotel;