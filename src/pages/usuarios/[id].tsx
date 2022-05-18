import Link from "next/link"
import { useRouter } from "next/router"
import { eventNames } from "process"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Catch } from "../../components/Catch"
import { Input } from "../../components/Input"
import { Select } from "../../components/Select"
import { TextCenter } from "../../components/TextCenter"
import { api } from "../../services/api"

// interface User {
//     id: number
//     name: string
//     unity: string
//     profile: string
//     emailNewUser: string
//     passwordNewUser: string

// }

export default function UserForm() {

    const { id } = useRouter().query
    const router = useRouter()
    const [isSendData, setIsSendData] = useState(false)

    // const { data } = useFetch(`/usuarios/${id}`)
    const [user, setUser] = useState({
        name: '',
        profile: '',
        unity: '',
        id: 0,
        email:'',
        password: ''
    })
    const [alertResult, setAlertResult] = useState({
        msg: '',
        type: ''
    })

    useEffect(() => {
        if (id === undefined || id === "criar") {
            return
        }

        api.get(`/usuarios/${id}`)
            .then(({ data }) => {
                setUser(data)
            })
            .catch(error => Catch())
        
        // setTimeout(() =>
        //     api.get(`/usuarios/${id}`)
        //         .then(({ data }) => {
        //             setUser(data)
        //         })
        //         .catch(error => Catch())

        //     , 3000)

    }, [id])




    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
                    setAlertResult({msg: '', type: ''})
                }, 3000)


            } catch (error) {
                const result:any = error

                // console.log(error.response.data)
                setAlertResult({
                    msg: result.response.data.msg,
                    type: 'warning'
                })
                setIsSendData(false)

                setTimeout(() => {
                    setAlertResult({msg:'', type: ''})
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
                setAlertResult({msg:'', type: ''})
            }, 5000)


        } catch (error:any) {
            console.log(error.response)
        }

    }
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
    
        setUser({
            ...user,
            [name]: value
        })
    }

 
    if (!user.name && id !== 'criar') {
        return (
            <TextCenter
                text="Carregando..."

            />
        )
    }
    return (
        <>
            <div className="d-flex justify-content-between">

                {id === 'criar' &&
                    <h1>Criar Usuário</h1>
                }

                {Number(id) > 0 &&
                    <h1>Editar {user.name.split(" ")[0]}</h1>

                }


                <Link href='/usuarios'>
                    <a className="btn btn-outline-primary h-25">Voltar</a>
                </Link>
            </div>
            <hr />
            <div className="bg-primaryy d-flex justify-content-center align-items-center">
                <form className="w-50" 
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    >

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
                        value={user.name || ''}
                        handleChange={handleChange}
                        required

                    />
                    <Select
                        label="Perfil"
                        name="profile"
                        value={user.profile || ''}
                        handleChange={handleChange}
                        options={[
                            { value: '', name: 'Selecione o Perfil' },
                            { value: 'Admin', name: 'Admin' },
                            { value: 'Gerente', name: 'Gerente' },
                            { value: 'Operador', name: 'Operador' }
                        ]}
                    />

                    <Select
                        label="Unidade"
                        name="unity"
                        value={user.unity || ''}
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
                        required

                    />

                    <Input
                        type="password"
                        name="password"
                        label="Senha"
                        value={user.password || ''}
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