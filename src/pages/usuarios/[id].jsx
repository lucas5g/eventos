import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

export default function UserForm() {

    const { id } = useRouter().query
    const router = useRouter()
    const [isSendData, setIsSendData] = useState(false)

    // const { data } = useFetch(`/usuarios/${id}`)
    const [user, setUser] = useState({
        name: '',
        profile: '',
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

            const { data } = await api.get(`/users/${id}`)
            // console.log(data)
            setUser(data)

        })()
    }, [id])



    async function handleSubmit(event) {
        event.preventDefault()

        if (id === 'criar') {

            try {
                setIsSendData(true)
                const { data } = await api.post(`/users`, user)
                setAlertResult({
                    msg: 'Criado com sucesso.',
                    type: 'success'
                })
                setIsSendData(false)
                
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
                setIsSendData(false)

                setTimeout(() => {
                    setAlertResult(false)
                }, 5000)
            }
            return
        }

        try {
            const { data } = await api.put(`/users/${id}`, user)
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
                            name="profile"
                            id="profile"
                            className="select form-control"
                            onChange={handleChange}
                            value={user.profile}
                            required
                        >

                            <option value="">Perfil</option>
                            <option value="Operador">Operador</option>
                            <option value="Admin">Admin</option>

                        </select>
                    </div>

                    <div className="form-group mb-4">

                        <select
                            name="unity"
                            id="unity"
                            className="select form-control"
                            onChange={handleChange}
                            value={user.unity}
                            required
                        >

                            <option value="">Unidade</option>
                            <option value="BH">BH</option>
                            <option value="Contagem">Contagem</option>
                            <option value="NovaLima">NovaLima</option>
                            <option value="Gutierrez">Gutierrez</option>
                            

                        </select>


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
                        className="btn btn-primary btn-block mb-4"
                        disabled={isSendData}
                        >
                        {isSendData ? 'Carregando ...' : 'Salvar'}
                    </button>
                </form>
            </div>
        </>
    )

}