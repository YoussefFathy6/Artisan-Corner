import React from 'react'
import "./Actions.css"
import left from "../../../assets/imges/Actions.jpeg"
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import "../Component/Slider/Hero.css"

export default function Actions() {
  return (
    <div className='mai mt-[-1%] animate-slide-up'>
    <div className="conAction">
      <img
        className="side-image"
        src={left}
        alt="Handmade auction example"
      />
      <div className="center-card">
        <h2>Discover Aactions</h2>
        <p>
          Welcome to Aactions, where creativity meets opportunity! Our platform
          is dedicated to showcasing unique handmade items through exciting
          auctions. Support talented artisans by placing bids on one-of-a-kind
          creations, from stunning jewelry to custom crafts. Join our community
          and experience the thrill of bidding while discovering exceptional
          craftsmanship!
        </p>

        <Link to="/auction" className="m-auto flex justify-center">
      <Button className='bg-inherit border-black text-black'>
        See All Actions
      </Button>
    </Link>
      </div>
      <img
        className="side-image"
        src={left}
        alt="Handmade auction example"
      />
    </div>

    </div>
  )
}
