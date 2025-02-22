import { Link } from "react-router-dom"
export default function BannerCard(props){

    console.log(props)
    
    return (
      <div className='w-full bg-yellow-600 h-full flex items-center justify-center overflow-hidden'>
       
          <img src={props.banner.images[0]} className="h-full w-full object-cover"/>
      
      </div>
    )
  }