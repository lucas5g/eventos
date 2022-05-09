import axios from "axios"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { useFetch } from "../hooks/useFetch"
import { api } from "../services/api"


export default function Test() {
    const [search, setSearch] = useState('')
    const [alunos, setAlunos] = useState([])
    const [loadPage, setLoadPage] = useState('')

    useEffect(() => {

        api.get(`/alunos?search=${search}`)
            .then(res => {
                const { data } = res
                console.log(data)

                setAlunos(data)
            }).catch(err => {
                console.log(err)
                alert('Erro na api')
            })

    }, [search, loadPage])


    useEffect(() => {
        let intervel

        intervel = setInterval(() => {
            setLoadPage(new Date())
        }, 5000)
        return () => clearInterval(intervel)


    }, [])

    return (
        <div>

            <h1>Pagina para testes</h1>
            <input type="text"
                onChange={(event) => setSearch(event.target.value)}

            />
            <h2>{search}</h2>
            <ul>
                {alunos.map((aluno) => (
                    <li key={aluno.id}>
                        {aluno.name} - {aluno.have_invitation}
                    </li>
                ))}
            </ul>
        </div>
    )
}