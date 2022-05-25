import { Heading } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Catch } from "../../components/Catch"
import { Input } from "../../components/Input"
import { Select } from "../../components/Select"
import { SpinnerCenter } from "../../components/SpinnerCenter"
import { TextCenter } from "../../components/TextCenter"
import { sleep } from "../../helpers"
import { api } from "../../services/api"

interface User {
    id: number
    name: string
    unity: string
    profile: string
    email: string
    password?: string

}

export default function UserForm() {

    const { id } = useRouter().query
    const router = useRouter()
    const [isSendData, setIsSendData] = useState(false)

    // const { data } = useFetch(`/usuarios/${id}`)
    const [user, setUser] = useState<User>({
        name: '',
        profile: '',
        unity: '',
        id: 0,
        email: '',
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

        if (localStorage.getItem('users')) {

            const users: User[] = JSON.parse(localStorage.getItem('users') || '')
            const user: User = users.find(user => user.id === Number(id)) || {
                name: '',
                email: '',
                id: 0,
                profile: '',
                unity: ''
            }
            setUser(user)
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

        //     , 1500)

    }, [id])




    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        window.scrollTo(0, 40)

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
                    setAlertResult({ msg: '', type: '' })
                }, 3000)


            } catch (error) {
                const result: any = error

                // console.log(error.response.data)

                setAlertResult({
                    msg: result.response.data.msg,
                    type: 'warning'
                })
                setIsSendData(false)
                await sleep(5000)
                setAlertResult({ msg: '', type: '' })

            }
            return
        }

        try {
            setIsSendData(true)
            const { data } = await api.put(`/usuarios/${id}`, user)
            setAlertResult({
                msg: 'Atualizado com sucesso.',
                type: 'success'
            })
            setIsSendData(false)

            console.log(data)
            await sleep(5000)
            setAlertResult({ msg: '', type: '' })


        } catch (error: any) {
            setAlertResult({ msg: error.response.data.msg, type: 'warning' })
            setIsSendData(false)
            console.log(error.response)
            await sleep(5000)
            setAlertResult({ msg: '', type: '' })

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
            <>
                <Head>
                    <title>Eventos | Usuário &gt; Editar </title>
                </Head>
                <SpinnerCenter />
            </>
        )
    }
    return (
        <>
            <Head>
                <title>Eventos | Usuário &gt; &nbsp;
                    {id === 'criar' ? 'Criar' : 'Editar'}


                </title>
            </Head>
            <div
                className="d-flex justify-content-between"
                style={{
                    flexWrap: 'wrap',
                    flexBasis: '100%',
                    // width:0
                }}
            >
                {id === 'criar' &&
                    <h1>Criar Usuário</h1>
                }

                {Number(id) > 0 && user.name.includes('@') &&
                    <h1>Editar {user.name.split('@')[0]}</h1>
                }
                {Number(id) > 0 && !user.name.includes('@') &&

                    <h1>Editar {user.name.split(" ")[0]}</h1>

                }


                <Link href='/usuarios'>
                    <a className="btn btn-outline-primary h-25">Voltar</a>
                </Link>
            </div>
            <hr />
            {/* <div className="bg-primaryy d-flex justify-content-center align-items-center"> */}
            <div className="d-flex justify-content-center">
                <div className="col-lg-7 col-12">

                    <form
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
                            className="btn btn-primary btn-lg btn-block mb-4"
                            disabled={isSendData}
                        >
                            {isSendData ? 'Carregando ...' : 'Salvar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )

}