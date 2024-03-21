import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/default_image.svg"
function ImageGenerator(){
      
    const [image_url,setImage_url] =useState("/");
    const [loading, setLoading] = useState(false);

     const inputRef = useRef(null);

     const ImageGenerator = async () => {
      if (inputRef.current.value === "") {
        return 0;
      }
  
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.openai.com/v1/images/generations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer api key",
              "User-Agent": "Chrome",
            },
            body: JSON.stringify({
              prompt: `${inputRef.current.value}`,
              n: 1,
              size: "512x512",
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
  
        const data = await response.json();
       // console.log(data);
       let data_array=data.data;
         setImage_url(data_array[0].url);

         setLoading(false);

      } catch (error) {
        console.error("Error fetching image:", error);
        // If fetch fails, set a random image URL as fallback
        setImage_url("https://demofree.sirv.com/nope-not-here.jpg?w=150");
        setLoading(false);
      }
    };

       

    return(
<section>

<div className="container">
        
            <div className="row">

            <div className="col-md-12 heading text-center">AI Image <span>generator</span> </div>
     
              </div>

                   <div className="row" >
                
                   <div className="col-md-12 img-loading">
                    <img className="img-tumbnail w-100" src={image_url==="/" ? default_image :image_url} alt="default images"></img>
                    
                    
                    <div className=" loading ">
                       <div className={loading ?"loading-bar-full":"loading-bar"}></div>
                       <div className={loading?"loading-text":"display-none"}>Loading . . . .</div>
                    </div>

                </div>
    
                

                   </div>
                
              <div className="row mt-5">
                <div className="col-md-3"></div>
              <div className="col-md-6  text-center ">

                     <div className="search-box">

                     <input type="text" className="search-input" ref={inputRef} placeholder="Describe What You Want To See..."/>
                      <div className="generate-btn" onClick={()=>{ImageGenerator()}} >Generate</div>
                   

                     </div>

                    
                     
                  </div>

              </div>
                 

   </div> 




</section>

   
        
    );
}
export default ImageGenerator;