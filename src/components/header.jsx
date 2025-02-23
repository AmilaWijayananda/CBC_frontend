import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
  
    return (
      <>
        {isSliderOpen && <NavSlider closeSlider={() => setIsSliderOpen(false)} />}
        <header className="bg-SecondaryBackground w-full h-[100px] relative flex justify-center items-center shadow-lg">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo"
            className="cursor-pointer h-[80px] w-[80px] rounded-full absolute left-4 hover:scale-105 transition-transform duration-300"
          />
  
          {/* Hamburger Menu (Mobile) */}
          <RxHamburgerMenu
            onClick={() => setIsSliderOpen(true)}
            className="text-3xl absolute cursor-pointer text-Accent right-4 lg:hidden hover:text-PrimaryGold transition-colors duration-300"
          />
  
          {/* Navigation Links (Desktop) */}
          <div className="h-full flex items-center w-[500px] justify-evenly hidden lg:flex">
            <Link
              to="/"
              className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
            >
              Contact Us
            </Link>
            <Link
              to="/cart"
              className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
            >
              Cart
            </Link>
            <Link
              to="/review"
              className="text-Text text-2xl font-bold hover:text-PrimaryGold hover:border-b-2 border-PrimaryGold transition-all duration-300"
            >
              Reviews
            </Link>
          </div>
        </header>
      </>
    );
  }