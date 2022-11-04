import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "/images/profile.png";
import NavLink from "./nav-link";
import utilStyles from "../styles/utils.module.css"

const NAVBAR_LIST = [
  { text: "Home", href: "/" },
  { text: "First Post", href: "/blog/first-post" },
  { text: "Create account", href: "/create-account"},
  { text: "Switch MUI Demo", href: "/blog/switch-demo"},
  { text: "Account MUI demo", href: "/blog/sign-up-demo"},

];
type Props = {
  name:string
  home:boolean
}
const Navbar = ({name, home}: Props ) => {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        
{home ? (
          <>
            <Image
              priority
              src="/images/profile.png"
              className={utilStyles.borderCircle}
              height={60}
              width={60}
              alt=""
            />
            <h1 className={utilStyles.headingXl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.png"
                  className={utilStyles.borderCircle}
                  height={60}
                  width={60}
                  alt=""
                />
              </a>
            </Link>
            <Link href = "/">
              <a>
                <h1 className={utilStyles.headingXl}>{name}</h1>
              </a>
            </Link>
        
          </>
        )}
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >



        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {NAVBAR_LIST.map((menu, idx) => (
            <div>
              {/* for every element of NAVBAR_LIST  
               passes menu items name and href to NavLink and sets idx active*/}
              <div
                onClick={() => {
                  setActiveIdx(idx);
                  setNavActive(false);
                }}
                key={menu.text}
              >
                <NavLink active={activeIdx === idx} {...menu} />
              </div>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;