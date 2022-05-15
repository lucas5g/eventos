import moment from "moment"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Catch } from "../components/Catch"
import { ModalGuest } from "../components/ModalGuest"
import { api } from "../services/api"

// export default withPageAuthRequired(function Alunos() {
export default function Convidados() {

    const [search, setSearch] = useState('')
    const [responsible, setResponsible] = useState('')
    // const [students, setStudents] = useState([])
    const [responsibles, setResponsibles] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadPage, setLoadPage] = useState('')

    // const { user } = useUser()

    useEffect(() => {

        (async () => {

            try {
                setLoading(true)
                // await sleep(3000)
                const { data } = await api.get(`/convidados?search=${search}`)
                // console.log(data)
                setResponsibles(data)
                setLoading(false)
                // setLoadPage(false)
            } catch (error) {

                // console.log('Erro convidados', error.response.data)
                // window.location.reload
                // router.push('/')
                Catch()
            }

        })()
    }, [search, loadPage])

    useEffect(() => {

        let intervel

        intervel = setInterval(() => {
            setLoadPage(new Date())
        }, 60000)
        return () => clearInterval(intervel)


    }, [])
    return (
        <div>
            <h1>Convidados</h1>
            <hr />
            <input type="text"
                className="form-control form-control-lg my-2 p-2"
                placeholder="Aluno, pai ou mãe"
                id="search"
                value={search}
                onChange={event => setSearch(event?.target.value)}

            />

            {responsibles.length === 0 && loading &&
                <h2 className="mt-5">Carregando ...</h2>

            }
            {responsibles.length === 0 && search.length > 3 && !loading &&

                <h2 className="mt-5">Nada encontrado :(</h2>


            }
            <ul className="list-group">

                {responsibles.map((responsible, index) => (
                    <li className="list-group-item pt-4" key={index}>


                        <div className="row">

                            <div className="col-12 col-md-4 mb-3">
                                <h5>Responsáveis</h5>
                                <small>
                                    {responsible.mother}
                                    <br />
                                    {responsible.father}
                                </small>
                            </div>
                            <div className="col-md-5">
                                {responsible.students.length > 1 ?
                                    <h5>Estudantes</h5>
                                    :
                                    <h5>Estudante</h5>
                                }
                                <ul className="list-group">

                                    {responsible.students.map(student => (
                                        <li key={student.ra} className="list-group">
                                            <small>
                                                {student.name} - {student.course}

                                            </small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-3 d-flex align-items-center justify-content-end mt-2">

                                <button
                                    onClick={() => setResponsible(responsible)}
                                    className={`btn bg-${responsible.emailInvite ? 'danger' : 'success'}   p-2 text-white rounded fs-3 d-flex align-items-center `}
                                    title={responsible.have_invitation ? 'Gerenciar Retorno do Convite' : 'Gerenciar Envio de Convite'}
                                    role="button"
                                    data-mdb-toggle="modal"
                                    data-mdb-target="#exampleModal"

                                >
                                    {responsible.emailInvite == null && <FaArrowRight />}
                                    {responsible.emailInvite != null && <FaArrowLeft />}


                                </button>
                            </div>
                        </div>



                    </li>
                ))}
            </ul>

            <ModalGuest responsible={responsible} />
          
        </div >
    )
}

