import { useFetch } from '../hooks/useFetch'
import { Catch } from '../components/Catch'
export default function Users() {

    const { data: reports, error } = useFetch('/relatorio')

    if (error) {
        console.log(error.response.data)
        Catch()
    }

    if (!reports) {
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
                        <th scope="col">Unidade</th>
                        <th scope="col">Convites</th>
                        <th scope="col">Alimentos (kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.unity}>
                            <th scope="row">{report.unity}</th>
                            <td>{report.sumNumberGuests || '-' } </td>
                            <td>{report.sumKgFood || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}