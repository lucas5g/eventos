import Link from 'next/link'
import { useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import { useRouter } from 'next/router'
export function Navbar() {

    // const [token, setToken] = useState('')
    const [user, setUser] = useState('')

    // const decoded = jwt(token)

    useEffect(() => {

        if (localStorage.getItem('eventos-token')) {
            const token = localStorage.getItem('eventos-token')
            const tokenDecode = jwt(token)
            setUser(tokenDecode)
        }
        // setUser(jwt(token))
        // console.log(decoded)
    }, [])



    return (
        <nav className="navbar navbar-expand-lg navbar-light font-weight-bold purple-gradient">
            <div className="container-fluid">
                <Link href='/'>
                    <a className="navbar-brand text-white" >Eventos</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto">

                    </div>
                    <div className="navbar-nav text-white ms-auto">
                        {/* <Link href="/">
                            <a className="nav-link text-white active" aria-current="page">Home</a>
                        </Link> */}
                        {/* {user &&
                            <Link href='/alunos'>
                                <a className="nav-link text-white" >Alunos</a>
                            </Link>
                        } */}
                        {user &&
                            <Link href='/responsaveis'>
                                <a className="nav-link text-white" >Responsáveis</a>
                            </Link>
                        }

                        {user.profileId === 1 &&
                            <Link href='/usuarios'>
                                <a className="nav-link text-white" >Usuários</a>
                            </Link>
                        }
                        {!user &&
                            <Link href='/login'>
                                <a className="nav-link text-white">Login</a>
                            </Link>
                        }
                        {user &&
                            <li className="nav-item dropdown mr-4">
                                <a
                                    className="nav-link dropdown-toggle text-white"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {user.name}
                                </a>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdownMenuLink">
                                    <Link href="/sair">
                                        <li>
                                            <a className="dropdown-item" role="button">Sair</a>
                                        </li>
                                    </Link>
                                </ul>
                            </li>
                        }



                    </div>
                </div>
            </div>
        </nav>
    )

}