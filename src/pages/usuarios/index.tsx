import Link from 'next/link'
import Head from 'next/head'
import { Catch } from '../../components/Catch'
import { TextCenter } from '../../components/TextCenter'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { sleep } from '../../helpers'


interface User {
    id: number
    name: string
    email: string
    unity: string
    profile: string

}

export default function Users() {

    const [users, setUsers] = useState<User[]>([])
    const [search, setSearch] = useState('')
    useEffect(() => {

        if (localStorage.getItem('users')) {
            setUsers(JSON.parse(localStorage.getItem('users') || ''))
        }

        api.get(`/usuarios?search=${search}`)
            .then(({ data }) => {

                setUsers(data)
                localStorage.setItem('users', JSON.stringify(data))
            })
            .catch(error => Catch())

    }, [search])

    // if (users.length === 0) {
    //     return (
    //         <>
    //             <Head>
    //                 <title>Eventos | Usuários</title>
    //             </Head>
    //             <TextCenter
    //                 text='Carregando...'
    //                 height='60vh'
    //             />
    //         </>
    //     )
    // }

    return (
        <>
            <Head>
                <title>Eventos | Usuários</title>
            </Head>
            <div className="d-flex justify-content-between">
                <h1>Usuários</h1>
                <Link href='/usuarios/criar'>
                    <a className="btn btn-outline-primary h-25">Criar</a>
                </Link>
            </div>
            <hr />
            <div className="list-group" role="button" >
                <input type="text"
                    className="form-control form-control-lg my-2 p-2"
                    placeholder="Nome, email ou unidade"
                    id="search"
                    value={search}
                    onChange={event => setSearch(event?.target.value)}

                />
                {users.length === 0 && search.length === 0 &&

                    <TextCenter
                        text='Carregando...'
                        height='45vh'
                    />

                }
                {users.length === 0 && search.length > 0 &&

                    <TextCenter
                        text='Nada Encontrado :('
                        height='45vh'
                    />

                }

                {users.map(user => (
                    <Link
                        key={user.id}
                        href={`/usuarios/${user.id}`}>
                        <a
                            className="list-group-item list-group-item-action"
                            title={`Editar ${user.name}`}
                        >
                            <div className="row">

                                <div className="col-lg-4 col-9">
                                    {user.name}
                                </div>
                                <div className="col-lg-4 col">
                                    {user.email}
                                </div>
                                <div className="col-lg-2 col">
                                    {user.unity}
                                </div>
                                <div className="col-lg-2 col" style={{ textAlign: 'right' }}>
                                    {user.profile}
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}


            </div>


        </>
    )
}