import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
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
                const { data } = await api.get(`/guests?search=${search}`)
                // console.log(data)
                setResponsibles(data)
                setLoading(false)
                // setLoadPage(false)
            } catch (error) {

                console.log(error.response.data)
                return
                localStorage.clear()
                window.location.href = '/'
            }

        })()
    }, [search, loadPage])

    useEffect(() => {

        let intervel

        intervel = setInterval(() => {
            setLoadPage(new Date())
        }, 30000)
        return () => clearInterval(intervel)


    }, [])


    async function handleSendInvite(students) {

        // alert('Agora tem q enviar convite para todos os filhos')
        console.log(students)
        return
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
            <h1>Convidados</h1>
            <hr />
            <input type="text"
                className="form-control form-control-lg my-2 p-2"
                placeholder="Aluno, pai ou mãe"
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
                                    className={`btn bg-${responsible.have_invitation ? 'danger' : 'success'}   p-2 text-white rounded fs-3 d-flex align-items-center `}
                                    title={responsible.have_invitation ? 'Gerenciar Retorno do Convite' : 'Gerenciar Envio de Convite'}
                                    role="button"
                                    data-mdb-toggle="modal"
                                    data-mdb-target="#exampleModal"

                                >
                                    {!responsible.have_invitation == true && <FaArrowRight />}
                                    {responsible.have_invitation == true && <FaArrowLeft />}


                                </button>
                            </div>
                        </div>



                    </li>
                ))}
            </ul>

            <Modal responsible={responsible} />
        </div>
    )
}

function Modal({ responsible }) {


    async function handleInvitation() {
        console.log("enviar convite")
    }

    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-mdb-keyboard="false"
            data-mdb-backdrop="static"


        >
            <div
                className="modal-dialog modal-lg"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel">
                            Gerenciar Convite
                        </h4>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" title="Cancelar">

                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <h5>Responsáveis</h5>
                                {responsible.mother} <br />
                                {responsible.father}

                            </div>
                            <div className="col-lg-6">

                                {responsible.students?.length > 1 ?
                                    <h5>Estudantes</h5>
                                    :
                                    <h5>Estudante</h5>
                                }

                                {responsible.students?.map(student => (
                                    <span key={student.ra} >
                                        {student.name} <br />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between ">

                                    <h5>E-mails</h5>

                                    <small
                                        className="text-right font-weight-bold"
                                        style={{ fontSize: 12 }}>
                                        * Clique em algum e-mail para copiar
                                    </small>

                                </div>
                                <div role="button" >

                                    <span
                                        className="text-lowercase"
                                        title="Clique para copiar" >
                                        {responsible.motherEmail}
                                        <br />
                                    </span>
                                    <span
                                        className="text-lowercase"
                                        title="Clique para copiar"
                                    >
                                        {responsible.fatherEmail}
                                        <br />
                                    </span>
                                    {responsible.students?.map(student => (
                                        <span key={student.ra}
                                            className="text-lowercase"
                                            title="Clique para copiar"
                                        >
                                            {student.email} <br />
                                        </span>
                                    ))}
                                </div>

                            </div>

                        </div>
                        <hr />
                        <div className="row">
                            <h5>Informações</h5>
                            <div className="col">
                                Qtd de convites dispoiníveis 5

                            </div>

                        </div>


                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                alert('Aqui vai confirmar o envio do convite')
                            }}>
                            Salvar
                        </button>
                        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}