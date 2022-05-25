import { FormEvent, useState } from "react"
import { api } from "../services/api"
import { Alert } from "../components/Alert"
import Head from "next/head"
import { sleep } from "../helpers"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({ status: false, msg: ''})
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            setLoading(true)
            const { data } = await api.post('/auth/login', {
                email, password
            })
            // console.log(data)
            localStorage.setItem('events-token', data.token)
            // setError({ status: false,  })
            window.location.href = '/'

        } catch (error: any) {
            setLoading(false)
            console.log(error.response)
            const { data, status } = error.response
            if (status === 500) {
                alert('Erro no servidor')
            }

            setError({
                status: true,
                msg: data.msg,
            })
            await sleep(5000)
            setError({status: false, msg: ''})
            // console.log(data, status)
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center container-fluid"
            style={{
                minHeight: "70vh",
            }}
        >
            <Head>
                <title>Eventos | Login </title>
            </Head>

            <div
                className="card col-lg-5 col-12 m-0"
            >
                <h5 className="card-header purple-gradient mb-5 text-white text-center py-3">LOGIN</h5>

                <form onSubmit={handleSubmit} className="px-4 pb-4 pt-0">

                    <div className="mb-4 input-group-lg">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="E-mail"
                            required
                            onChange={event => setEmail(event.target.value)}

                        />
                    </div>

                    <div className="mb-4 input-group-lg">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control "
                            placeholder="Senha"
                            required
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="input-group-lg mb-4">

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading ?
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status" aria-hidden="true">
                                </span>
                                :
                                'Entrar'
                            }

                        </button>
                    </div>

                    <Alert
                        message={error.msg}
                        loading={loading}
                    />

                </form>
            </div>
        </div>
    )
}