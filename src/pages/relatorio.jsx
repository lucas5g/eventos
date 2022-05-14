import Link from 'next/link'
import { useFetch } from '../hooks/useFetch'
import { Catch } from '../components/Catch'
import { useRouter } from 'next/router'
export default function Users() {

    const { data: report, error } = useFetch('/relatorio')

    if (error) {
        console.log(error.response.data)
        Catch()
    }

    if (!report) {
        return (
            <h2>Carregando..</h2>
        )
    }

    return (

        <div>
            <h1>Relatório</h1>
            <p>
                {/* o operador so vai ver da unidade dele. */}
            </p>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Alimentos (kg)</th>
                        <th scope="col">Convites</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">BH</th>
                        <td>ex: 8000 </td>
                        <td>ex: 8000</td>
                    </tr>
                    <tr>
                        <th scope="row">Contagem</th>
                        <td>ex: 8000 </td>
                        <td>ex: 8000</td>
                    </tr>
                    <tr>
                        <th scope="row">Gutierrez</th>
                        <td>ex: 8000 </td>
                        <td>ex: 8000</td>
                    </tr>
                    <tr>
                        <th scope="row">NovaLima</th>
                        <td>ex: 8000 </td>
                        <td>ex: 8000</td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td>ex: 8000 </td>
                        <td>ex: 8000</td>
                    </tr>

                </tbody>

            </table >

        </div >

    )
}