import { useEffect, useState } from "react"
import { FaBeer } from 'react-icons/fa'
import { BsFillArrowUpRightSquareFill, BsArrowDownLeft, BsArrowUpRight } from 'react-icons/bs'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { api } from "../services/api"

// export default withPageAuthRequired(function Alunos() {
export default function Alunos() {

    const [search, setSearch] = useState('')
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadPage, setLoadPage] = useState('')

    // const { user } = useUser()

    useEffect(() => {

        (async () => {

            try {
                setLoading(true)
                // await sleep(3000)
                const { data } = await api.get(`/alunos?search=${search}`)
                setStudents(data)
                setLoading(false)
                // setLoadPage(false)
            } catch (error) {

                console.log(error.response.data)
                localStorage.clear()
                window.location.href = '/'
            }

        })()
    }, [search, loadPage])

    useEffect(() => {

        let intervel

        intervel = setInterval(() => {
            setLoadPage(new Date())
        }, 10000)
        return () => clearInterval(intervel)


    }, [])


    async function handleSendInvite(ra, haveInvitation) {
        api.put(`/alunos/${ra}`, {
            have_invitation: !haveInvitation
        })
            .catch(err => {
                alert('Erro na api')
            })

        const updateStudents = students.map(student => {
            if (student.ra === ra) {
                student.have_invitation = !haveInvitation
            }
            return student
        })
        setStudents(updateStudents)

    }

    return (
        <div>
            <h1>Alunos</h1>
            <hr />
            <input type="text"
                className="form-control form-control-lg my-2 "
                placeholder="Pesquisar: aluno, pai ou mãe"
                value={search}
                onChange={event => setSearch(event?.target.value)}

            />

            {console.log({ students_length: students.length, loading })}

            {students.length === 0 && loading &&
                <h2 className="mt-5">Carregando ...</h2>

            }
            {students.length === 0 && search.length > 3 && !loading &&

                <h2 className="mt-5">Nada encontrado :(</h2>


            }
            <ul className="list-group">

                {students.map(student => (
                    <li className="list-group-item pt-4" key={student.id}>
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-3">
                                {student.name} - {student.course}
                            </h6>

                            <span
                                onClick={() => handleSendInvite(student.ra, student.have_invitation)}
                                className={`bg-${student.have_invitation ? 'danger' : 'success'}  h-25 p-2 text-white rounded fs-4 d-flex align-items-center `}
                                title={student.have_invitation ? 'Gerenciar Retorno do Convite' : 'Gerenciar Envio de Convite'}
                                role="button">
                                {!student.have_invitation == true && <FaArrowRight  />}
                                {student.have_invitation == true && <FaArrowLeft />}


                            </span>


                        </div>

                        <small>
                            RESPONSÁVEIS
                            <br />
                            <span className="text-muted">
                                {student.father}
                                <br />
                                {student.mother}
                            </span>
                        </small>

                    </li>
                ))}
            </ul>
        </div>
    )
}


{/* <button
                                className={`btn btn-${student.have_invitation ? 'danger' : 'success'} fw-bold `}
                                onClick={() => handleSendInvite(student.ra, student.have_invitation)}
                                title={student.have_invitation ? 'Gerenciar Retorno do Convite' : 'Gerenciar Envio de Convite'}
                            > */}
{/* <BsFillArrowUpRightSquareFill /> */ }
{/* <BsArrowDownLeft /> */ }
{/* {!student.have_invitation == true && <FaArrowRight className="fw-bold" />} */ }
{/* {student.have_invitation == true && <BsArrowDownLeft className="fw-bold" />} */ }

{/* {student.have_invitation == true && 'Já tem o convite'}
                                {student.have_invitation == false && 'Enviar Convite'} */}
{/* </button> */ }