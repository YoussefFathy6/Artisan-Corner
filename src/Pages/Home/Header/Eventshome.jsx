import React from 'react'
import "./VideoComponent.css"
import video from "../../../assets/imges/video.mp4"
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import "../Component/Slider/Hero.css"

export default function Eventshome() {
  return (
    <div className='animate-slide-up'>
      <h1 className='text-[#356d58] text-5xl mt-28 mb-11 ml-[160px] '  style={{fontFamily:"Abril Fatface, serif"}}>Events</h1>
         <div className="video-container w-full ">
      <video className="video-background" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay"></div>

 
      <div className="video-content">
        <h1>Discover Extraordinary Events Near You!</h1>
        <p>
Join us for unforgettable experiences, from live performances to exclusive workshops.
Stay tuned for upcoming events and never miss a moment of excitement!
</p>
<Link to="/event" className="m-auto flex justify-center">
      <Button className='bg-inherit border-white'>
        See All Events
      </Button>
    </Link>      </div>
    
    </div>
    </div>
  )
}
