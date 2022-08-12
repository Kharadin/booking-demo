import React from "react";
import "./pageSelector.css"

export default function PageSelector ({pagesArray, loading, returnFunction, page}) {
console.log (page)
     return (
          <div className="pageSelectorBar">
                 
           {loading? "Loading...please wait" : 
                              <>
                                  {pagesArray.map((pg, i)=> (
                                  <span className="pageNum" key={i} onClick={() =>returnFunction(i)}
                                  style={pg===page ? {fontWeight: "bold"}: {fontWeight: 'lighter'}}
                                  
                                  >{i+1}</span>
                                ))} 
                               
                              </>} 
               
          </div>

     )
}