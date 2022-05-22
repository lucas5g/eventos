import Link from 'next/link'

interface NavLink {
    href: string,
    children: string
}

export function NavLink({ href, children }: NavLink) {

    console.log({ href, children })
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