import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

export default function UserForm() {

    const { id } = useRouter().query
    const router = useRouter()

    // const { data } = useFetch(`/usuarios/${id}`)
    const [user, setUser] = useState({
        name: '',
        profileId: '',
        email: '',
        password: '',
    })
    const [alertResult, setAlertResult] = useState({
        msg: '',
        type: ''
    })

    useEffect(() => {
        if (id === undefined || id === "criar") {
            return
        }
        (async () => {

            const { data } = await api.get(`/usuarios/${id}`)
            // console.log(data)
            setUser(data)

        })()
    }, [id])



    async function handleSubmit(event) {
        event.preventDefault()

        if (id === 'criar') {

            try {
                const { data } = await api.post(`/usuarios`, user)
                setAlertResult({
                    msg: 'Criado com sucesso.',
                    type: 'success'
                })
                console.log(data)

                setTimeout(() => {
                    console.log('vai')
                    router.push(`/usuarios/${data.id}`)
                    setAlertResult(false)
                }, 3000)


            } catch (error) {
                console.log(error.response)
                setAlertResult({
                    msg: error.response.data.msg,
                    type: 'warning'
                })

                setTimeout(() => {
                    setAlertResult(false)
                }, 5000)
            }
            return
        }

        try {
            const { data } = await api.put(`/usuarios/${id}`, user)
            setAlertResult({
                msg: 'Atualizado com sucesso.',
                type: 'success'
            })
            console.log(data)
            setTimeout(() => {
                setAlertResult(false)
            }, 5000)


        } catch (error) {
            console.log(error.response)
        }

    }
    function handleChange(event) {
        const { name, value } = event.target
        console.log({ name, value })
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <>
            <div className="d-flex justify-content-between">

                {id === 'criar' &&
                    <h1>Criar Usuário</h1>
                }

                {id > 0 &&
                    <h1>Editar {user.name.split(" ")[0]}</h1>

                }


                <Link href='/usuarios'>
                    <a className="btn btn-outline-primary h-25">Voltar</a>
                </Link>
            </div>
            <hr />
            <div className="bg-primaryy d-flex justify-content-center align-items-center">
                <form className="w-50" onSubmit={handleSubmit}>

                    {alertResult.msg &&
                        <div
                            className={`alert alert-${alertResult.type}`}
                            role="alert"
                            data-dimiss="alert">
                            {alertResult.msg}
                        </div>
                    }
                    <div className="form-group mb-4">
                        {/* <label  htmlFor="form4Example1">Name</label> */}
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={user.name}
                            name="name"
                            onChange={handleChange}
                            placeholder="Nome"
                        />
                    </div>
                    <div className="form-group mb-4">
                        {/* <label  htmlFor="form4Example1">Name</label> */}
                        <select
                            name="profileId"
                            id="profileId"
                            className="select form-control"
                            onChange={handleChange}
                            value={user.profileId}
                        >

                            <option value="">Selecione</option>
                            <option value="2">Operador</option>
                            <option value="1">Admin</option>

                        </select>
                        {/* <input
                            type="text"
                            id="profileId"
                            className="form-control"
                            value={user.profileId}
                            name="profileId"
                            onChange={handleChange}
                            placeholder="Perfil"
                        /> */}
                    </div>
                    <div className="form-group mb-4">
                        {/* <label  htmlFor="form4Example1">Name</label> */}
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={user.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="E-mail"
                            required

                        />
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={user?.password || ''}
                            name="password"
                            onChange={handleChange}
                            placeholder="Senha"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4">
                        {id === 'criar' ? 'Criar' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </>
    )

}