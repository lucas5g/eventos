import { useState } from "react"
import { api } from "../services/api"
import { Alert } from "../components/Alert"


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({ status: false, msg: '', alert: [] })
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            setLoading(true)
            const { data } = await api.post('/auth/login', {
                email, password
            })
            console.log(data)
            localStorage.setItem('events-token', data.token)
            setError({ status: false })
            window.location.href = '/'

        } catch (error) {
            setLoading(false)
            console.log(error.response)
            const { data, status } = error.response
            if(status === 500){
                alert('Erro no servidor')
            }

            setError({
                status: true,
                msg: data.msg,
                alert: data.alert
            })
            console.log(data, status)
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "70vh",
            }}
        // className="card w-50
        //    / d-flex align-items-center justify-content-center purple-gradient"
        >

            <div
                className="card col-md-5"
            >
                <h5 className="card-header purple-gradient mb-5 text-white text-center ">LOGIN</h5>

                <form

                    onSubmit={handleSubmit} >

                    <div className="mb-4 input-group-lg px-4">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            required
                            onChange={event => setEmail(event.target.value)}

                        />
                    </div>

                    <div className="mb-4 input-group-lg px-4">
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
                    <div className="col px-4 mb-4">

                        <button
                            type="submit"
                            className="btn btn-primary btn-block btn-lg"
                            disabled={loading}
                        >
                            {loading ? 'Carregando ...' : 'ENTRAR'}

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