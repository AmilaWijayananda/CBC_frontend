import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    return (
        <>
        {isSliderOpen&&<NavSlider closeSlider={()=>{setIsSliderOpen(false)}}/>}
        <header className="bg-secondary w-full h-[100px] relative flex justify-center items-center">
            <img src="/logo.png" className="cursor-pointer h-full rounded-full absolute left-[10px]"/>

            <RxHamburgerMenu 
        onClick={()=>{setIsSliderOpen(true)}}
        className="text-3xl absolute cursor-pointer text-accent right-[10px] lg:hidden" />

            <div className="h-full flex items-center w-[500px] justify-evenly hidden lg:flex">
            <Link to = "/" className="text-accent text-2xl font-bold hover:border-b border-b-primary">Home</Link>
            <Link to = "/products" className="text-accent text-2xl font-bold hover:border-b border-b-primary">Products</Link>
            <Link to = "/about" className="text-accent text-2xl font-bold hover:border-b border-b-primary">About</Link>
            <Link to = "/contact" className="text-accent text-2xl font-bold hover:border-b border-b-primary">Contact Us</Link>
            <Link to = "/cart" className="text-accent text-2xl font-bold hover:border-b border-b-primary">Cart</Link>
            </div>

        </header>
        </>
    )
}