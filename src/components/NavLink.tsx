import Link from 'next/link'

interface NavLink {
    href: string,
    children: string
}

export function NavLink({ href, children }: NavLink) {

    return (
        <li className='nav-item'>
            <Link href={href}>
                <a className="nav-link active">
                    {children}
                </a>
            </Link>
        </li>
    )
}