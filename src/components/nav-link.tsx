import Link from 'next/link';
import Head from 'next/head';

type Props = {
    text: string
    href: string
    active: boolean
}
function NavLink({text, href, active}: Props) {
    return (
        <Link href={href}>
<<<<<<< HEAD
      <a className={`nav__item ${active ? "active" : "" }`}>
=======
      <a
        className={`nav__item ${
          active ? "active" : ""
        }`}
      >
>>>>>>> 047914dbbbf0bf12f38fd5e37e58f9e8114330f5
        {text}
      </a>
    </Link>
    )

}

export default NavLink;