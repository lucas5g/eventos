import Head from 'next/head'
import { useFetch } from '../hooks/useFetch'
import { Catch } from '../components/Catch'
import { SpinnerCenter } from '../components/SpinnerCenter'
export default function Users() {

    const { data: reports, error } = useFetch('/relatorio')

    if (error) {
        console.log(error.response.data)
        Catch()
    }

    if (!reports) {
        return (
            <>
                <Head>
                    <title>Eventos | Relatório</title>
                </Head>
                <SpinnerCenter height="60vh" />
            </>
        )
    }

    return (

        <div>
            <Head>
                <title>Eventos | Relatório</title>
            </Head>
            <h1>
                Relatório
            </h1>
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
                            <td>{report.sumNumberGuests || '-'} </td>
                            <td>{report.sumKgFood || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}