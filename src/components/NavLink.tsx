import Link from 'next/link'
import { Nav } from 'react-bootstrap'

interface NavLink {
    href: string,
    children: string
}

export function NavLink({ href, children }: NavLink) {

    console.log({href, children})
    return (
        <Link href={href}>
            <Nav.Link href={href}>
                {children}
            </Nav.Link>
        </Link>
    )
}