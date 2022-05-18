import Link from 'next/link'
import Head from 'next/head'
import { Catch } from '../../components/Catch'
import { TextCenter } from '../../components/TextCenter'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { sleep } from '../../helpers'


interface Users{
    id: number
    name: string 
    email: string 
    unity: string
    profile:string 

}

export default function Users() {

      const [users, setUsers] = useState<Users[]>([])
    useEffect(() => {

        (async () => {
            setUsers(JSON.parse(localStorage.getItem('users') || ''))
            await sleep(1500)

            try {
                const { data } = await api.get('/usuarios')
                setUsers(data)

                localStorage.setItem('users', JSON.stringify(data))
            } catch (error) {
                Catch()
            }

        })()
    }, [])

    if (users.length === 0) {
        return (
            <>
                <Head>
                    <title>Eventos | Usuários</title>
                </Head>
                <TextCenter
                    text='Carregando...'
                    height='60vh'
                />
            </>
        )
    }

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