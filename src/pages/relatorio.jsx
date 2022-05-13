import Link from 'next/link'
import { useFetch } from '../hooks/useFetch'
import { Catch } from '../components/Catch'
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

        <div>
            <h1>Relatório</h1>
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
                        <th scope="row">1</th>
                        <td>ex: 8000 </td>
                        <td>ex: 8000</td>
                    </tr>
                </tbody>
            </table>

        </div>

    )
}