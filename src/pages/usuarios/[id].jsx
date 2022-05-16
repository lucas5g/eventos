import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Input } from "../../components/Input"
import { Select } from "../../components/Select"
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

            const { data } = await api.get(`/usuarios/${id}`)
            // console.log(data)
            setUser(data)

        })()
    }, [id])



    async function handleSubmit(event) {
        event.preventDefault()

        if (id === 'criar') {

            try {
                setIsSendData(true)
                const { data } = await api.post(`/usuarios`, user)
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
                console.log(error.response.data)
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
                    <Input
                        name="name"
                        label="Nome"
                        value={user.name}
                        handleChange={handleChange}

                    />
                    <Select
                        label="Perfil"
                        name="profile"
                        value={user.profile}
                        handleChange={handleChange}
                        options={[
                            { value: '', name: 'Selecione o Perfil' },
                            { value: 'Admin', name: 'Admin' },
                            { value: 'Operador', name: 'Operador' }
                        ]}
                    />

                    <Select
                        label="Unidade"
                        name="unity"
                        value={user.unity}
                        handleChange={handleChange}
                        options={[
                            { value: '', name: 'Selecione a Unidade' },
                            { value: 'BH', name: 'BH' },
                            { value: 'Contagem', name: 'Contagem' },
                            { value: 'NovaLima', name: 'NovaLima' },
                            { value: 'Gutierrez', name: 'Gutierrez' },

                        ]}
                    />

                    <Input
                        type="email"
                        name="email"
                        label="E-mail"
                        value={user.email}
                        handleChange={handleChange}

                        />

                    <Input
                        type="password"
                        name="password"
                        label="Senha"
                        value={user.password}
                        handleChange={handleChange}
                    />
             
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