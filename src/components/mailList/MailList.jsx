import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
   <h1 className="mailTitle">Save Time and make money</h1>
          <span className="mailDesc">Sign up and we'll send the best deals for you </span>
          <div className="mailInputContainer">
               <input type="text" placeholder= "Your Email" />
               <button>Subscribe</button>
          </div>
    </div>
  )
}

export default MailList
