import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const prefix = "https://booking1demo.herokuapp.com/api" ;

  // const prefix = "http://localhost:8800/api";
  const prefix = "https://bookingbackendwebservice.onrender.com/api";

  

  useEffect(() => {
     console.log("Use effect in useFetch")
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(prefix + url);
          console.log(prefix+url);
          setData(res.data);
        } catch (err) {
          setError(err);
        }
         setLoading(false);
      };
    fetchData();
  }, []);
  // it's [url] if you want it to act every time url is changed.

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(prefix + url);
      console.log(prefix+url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;