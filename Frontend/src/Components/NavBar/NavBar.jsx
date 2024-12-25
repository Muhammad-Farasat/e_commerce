import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import Shop from "../../Pages/Shop";
import { ShopContext } from "../../Context/ShopContext";

const NavBar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalItems } = useContext(ShopContext);
  const [isNav, setIsNav] = useState(false);

  const [hamburger, setHamburger] = useState(false);
  useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const handleChange = () => {
      if (window.scrollY > 1) {
        setIsNav(true);
      } else {
        setIsNav(false);
      }
    };

    window.addEventListener("scroll", handleChange);

    return () => window.removeEventListener("scroll", handleChange);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setMenu("");
    }
  }, [location.pathname]);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <section className="h-24 flex justify-center sticky top-0 z-20 max-sm:h-auto ">
        <div
          className={`container w-4/5 absolute h-20 transfrom transition ease-linear font-Rajdhani rounded-bl-lg rounded-br-lg px-6 flex justify-between items-center max-sm:h-12 max-sm:px-2 ${
            isNav || !isHomePage
              ? "bg-[#f3f3f3] text-[#111] shadow-md"
              : "bg-transparent text-[#e7e7e7]"
          } `}
        >
          <div className="logo max-sm:text-xs text-2xl  font-extrabold tracking-wider cursor-pointer ">
            <Link to={"/"}>
              <p>UrbanFabric</p>
            </Link>
          </div>

          <div
            onClick={() => setHamburger(!hamburger)}
            className=" hidden text-3xl max-sm:text-xl max-md:block max-lg:block "
          >
            <div className="cursor-pointer">
              {hamburger ? (
                <RxCross2 className="z-[999] text-[#f4f4f4] absolute" />
              ) : (
                <HiBars3BottomRight className="z-50  " />
              )}
            </div>

            <div
              className={`w-[22rem] h-[100vh] max-sm:w-60 z-[99] bg-[#1a1a1a] fixed top-0 right-0 flex px-10 flex-col transition-all duration-300 ${
                hamburger ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="mt-32">
                <ul className="flex flex-col text-[#f4f4f4] gap-y-5 font-Rajdhani-Regular text-xl cursor-pointer">
                  <li>
                    <Link
                      to={"/mens"}
                      className="block w-full"
                      onClick={() => {
                        setMenu("mens");
                      }}
                    >
                      Mens
                    </Link>
                    {menu === "mens" ? (
                      <hr className="border-blue-500 border-[1px]" />
                    ) : null}
                  </li>
                  <li>
                    <Link
                      to={"/womens"}
                      className="block w-full"
                      onClick={() => {
                        setMenu("womens");
                      }}
                    >
                      Womens
                    </Link>
                    {menu === "womens" ? (
                      <hr className="border-blue-500 border-[1px]" />
                    ) : null}
                  </li>
                  <li>
                    <Link
                      to={"/kids"}
                      className="block w-full"
                      onClick={() => {
                        setMenu("kids");
                      }}
                    >
                      Kids
                    </Link>
                    {menu === "kids" ? (
                      <hr className="border-blue-500 border-[1px]" />
                    ) : null}
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col items-start gap-y-8 font-Rajdhani-Medium font-bold tracking-widest">
                <Link to={"/cart"}>
                  <div className="text-2xl relative">
                    <MdOutlineShoppingCart className="text-[#f4f4f4]" />
                    <div className="noOfItems absolute -top-1.5 -right-2 bg-red-600 rounded-full w-4 h-4 flex justify-center items-center">
                      <p className="absolute top-0 text-xs">
                        {getTotalItems()}
                      </p>
                    </div>
                  </div>
                </Link>
                {localStorage.getItem("auth-token") ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("auth-token");
                      window.location.replace("/");
                    }}
                    className="border-2 rounded-lg px-4 py-1 text-sm text-[#fff]"
                  >
                    logout
                  </button>
                ) : (
                  <Link to={"/LoginSignup"}>
                    <button className="mt-8 border-2 rounded-lg px-4 py-1 text-sm text-[#ffffff] border-[#00d4ff] hover:bg-[#00d4ff]">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="max-md:hidden max-lg:hidden ">
            <ul className=" flex gap-5 font-Rajdhani-Medium text-lg  cursor-pointer">
              <li>
                {" "}
                <Link
                  to={"/mens"}
                  onClick={() => {
                    setMenu("mens");
                  }}
                >
                  Mens
                </Link>{" "}
                {menu === "mens" ? (
                  <hr className=" border-blue-500 border-[1px] " />
                ) : null}{" "}
              </li>
              <li>
                {" "}
                <Link
                  to={"/womens"}
                  onClick={() => {
                    setMenu("womens");
                  }}
                >
                  Womens
                </Link>{" "}
                {menu === "womens" ? (
                  <hr className=" border-blue-500 border-[1px] " />
                ) : null}{" "}
              </li>
              <li>
                <Link
                  to={"/kids"}
                  onClick={() => {
                    setMenu("kids");
                  }}
                >
                  Kids
                </Link>{" "}
                {menu === "kids" ? (
                  <hr className=" border-blue-500 border-[1px] " />
                ) : null}{" "}
              </li>
            </ul>
          </div>

          {/* ^^^^^^^ Buttons here ^^^^^^^^ */}

          <div className="max-md:hidden max-lg:hidden flex items-center gap-6 font-Rajdhani-Medium font-bold tracking-widest ">
            <Link to={"/cart"}>
              <div className="text-2xl  relative">
                <MdOutlineShoppingCart />
                <div className="noOfItems absolute -top-1.5 -right-2 bg-red-600 rounded-full w-4 h-4 flex justify-center items-center ">
                  <p className="absolute top-0 text-xs text-[#f4f4f4] ">
                    {getTotalItems()}
                  </p>
                </div>
              </div>
            </Link>
            {localStorage.getItem("auth-token") ? (
              <button
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
                className="border-2 text-sm rounded-xl px-5 transition transform ease-linear py-1 hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#fff] "
              >
                logout
              </button>
            ) : (
              <Link to={"/LoginSignup"}>
                <button className=" max-md:mt-14 border-2 rounded-xl px-5 py-1 transition transform ease-in-out text-[#fff] text-sm hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#fff] ">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NavBar;
