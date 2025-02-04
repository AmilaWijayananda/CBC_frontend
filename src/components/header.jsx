import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-secondary w-full h-[100px] relative flex justify-center items-center">
            <img src="/logo.png" className="cursor-pointer h-full rounded-full absolute left-[10px]"/>

            <div className="h-full flex items-center w-[500px] justify-evenly">
            <Link to = "/" className="text-accent text-2xl font-bold hover:border-b border-b-primary">Home</Link>
            <Link to = "/products" className="text-accent text-2xl font-bold hover:border-b border-b-primary">Products</Link>
            <Link to = "/about" className="text-accent text-2xl font-bold hover:border-b border-b-primary">About US</Link>
            <Link to = "/contact" className="text-accent text-2xl font-bold hover:border-b border-b-primary">Contact US</Link>
            </div>

        </header>
    )
}