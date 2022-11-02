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
      <a
        className={`nav__item ${
          active ? "active" : ""
        }`}
      >
        {text}
      </a>
    </Link>
    )

}

export default NavLink;