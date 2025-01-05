"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrool, setScrool] = useState(false);
  const pathname = usePathname();
  const router= useRouter();

  const {data: session, status}= useSession();

  const toggleHamburger = () => {
    setIsActive(!isActive);

  };

  useEffect(() => {
    const handleScroll = () => {
      setScrool(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`flex justify-between bg-transparent items-center p-4  relative ${
          scrool ? styles.navbarFixed : ""
        }`}
      >
        <div>
          <h1 className="font-bold text-1xl cursor-pointer text-stone-500">
            Navbar
          </h1>
        </div>

        <div className="flex items-center">
          {/* Button Hamburger */}
          <button
            id="hamburger"
            type="button"
            onClick={toggleHamburger}
            className={`block absolute right-4 md:hidden ${
              isActive ? styles.hamburgerActive : ""
            }`}
          >
            <span className="w-[30px] h-[2px] my-2 block bg-stone-500 transition duration-300 ease-in-out origin-top-left"></span>
            <span className="w-[30px] h-[2px] my-2 block bg-stone-500 transition duration-300 ease-in-out"></span>
            <span className="w-[30px] h-[2px] my-2 block bg-stone-500 transition duration-300 ease-in-out origin-bottom-left"></span>
          </button>

          {/* Navbar Menu */}
          <div
            id="navMenu"
            className={`absolute md:flex py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full md:block md:static md:bg-transparent md:max-w-full md:shadow-none md:py-0 ${
              isActive ? "visible" : "hidden"
            }`}
          >
            <ul className="block px-5 md:flex ">
              <Link href={"/"}>
                <li className={`group relative cursor-pointer hover:text-stone-500 transition duration-300 mb-2 md:mr-4 ${pathname === "/" ? "text-stone-500" : ""}`}>
                  Home
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-stone-500 transition-all duration-300 group-hover:w-[20%] md:group-hover:w-full"></span>
                </li>
              </Link>
              <Link href={"/about"}>
                <li className={`group relative cursor-pointer hover:text-stone-500 transition duration-300 mb-2 md:mr-4 ${pathname === "/about" ? "text-stone-500" : ""}`}>
                  About
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-stone-500 transition-all duration-300 group-hover:w-[22%] md:group-hover:w-full"></span>
                </li>
              </Link>
              <Link href={"/product"}>
                <li className= {`group relative cursor-pointer hover:text-stone-500 transition duration-300 mb-2 md:mr-4 ${pathname === "/product" ? "text-stone-500" : ""}`}>
                  Product
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-stone-500 transition-all duration-300 group-hover:w-[28%] md:group-hover:w-full"></span>
                </li>
              </Link>
              <Link href={"/about/profile"}>
                <li className= {`group relative cursor-pointer hover:text-stone-500 transition duration-300 mb-2 md:mr-4 ${pathname === "/product" ? "text-stone-500" : ""}`}>
                  Profile
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-stone-500 transition-all duration-300 group-hover:w-[28%] md:group-hover:w-full"></span>
                </li>
              </Link>
            </ul>
            <div className="px-5">
            {status == "authenticated" ? (
              <button className="bg-stone-600 text-white px-4 py-1 rounded-md hover:text-stone-700 hover:bg-stone-300 transition duration-300" onClick={()=> signOut()}> sign Out</button>
            ) : (
              <button className="bg-stone-600 text-white px-4 py-1 rounded-md hover:text-stone-700 hover:bg-stone-300 transition duration-300" onClick={()=> signIn()}> login</button>
            )
          }
          </div>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
