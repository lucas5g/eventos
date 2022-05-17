import Link from 'next/link'
import { useFetch } from '../../hooks/useFetch'
import {Catch} from '../../components/Catch'
import { useRouter } from 'next/router'
export default function Users() {

    const { data: users, error } = useFetch('/usuarios')

    if (error) {
        console.log(error.response.data)
        Catch()
    }

    if (!users) {
        return (
            <h2>Carregando..</h2>
        )
    }

    return (
        <>
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

                                <div className="col-lg-3 col-9">
                                    {user.name}
                                </div>
                                <div className="col-lg-4 col">
                                    {user.email}
                                </div>
                                <div className="col-lg-3 col">
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