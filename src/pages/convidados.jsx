import jwtDecode from "jwt-decode"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Catch } from "../components/Catch"
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

                console.log('Erro convidados', error.response.data)
                // window.location.reload
                // router.push('/')
                // Catch()
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


    const [email, setEmail] = useState('')
    const [numberGuests, setNumberGuests] = useState(0)
    const [kgFood, setKgFood] = useState(0)
    const [user, setUser] = useState({})

    useEffect(() => {

        if(!localStorage.getItem('events-token')){
            window.location.href = '/'
            return
        }

        const token = localStorage.getItem('events-token')

        setUser(jwtDecode(token))
        setEmail('')
        setNumberGuests(5)

        

    }, [responsible])
    async function handleInvitation(event ) {   
        event.preventDefault()

        const data = { email, numberGuests, 
            students: responsible.students.map( student => student.ra )
        }
        alert('Informações enviadas no servidor\n\n' + JSON.stringify(data, 1,7))
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
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel">
                            Gerenciar Convite
                        </h4>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" title="Cancelar"

                        >

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
                            <div className="col-lg-6">

                                <h5>Informações de Registro</h5>
                                <form id="form" onSubmit={handleInvitation}>

                                    <div className="form-group mb-3">
                                        <label htmlFor="email" className="small">
                                            E-mail
                                        </label>

                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control text-lowercase"
                                            name="email"
                                            value={email}
                                            onChange={() => setEmail(event.target.value)}
                                            placeholder="E-mail"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="numberGuests" className="small">
                                            N° Convites
                                        </label>

                                        <input
                                            type="number"
                                            name="numberGuests"
                                            id="numGuests"
                                            className="form-control text-lowercase"
                                            value={numberGuests}
                                            onChange={() => setNumberGuests(event.target.value)}
                                            placeholder="Quantidade Convites"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="numberGuests" className="small">
                                            Operador
                                        </label>

                                        <input
                                            type="text"
                                            name="numberGuests"
                                            id="numGuests"
                                            className="form-control text-lowercase"
                                            disabled
                                            value={user.name || ''}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6">
                                <div className="d-flex justify-content-between"
                                    style={{ marginBottom: '1.1em' }}
                                >
                                    <h5>E-mails</h5>
                                    <small
                                        className="text-right font-weight-bold"
                                        style={{ fontSize: 10 }}>
                                        * Clique em algum e-mail para copiar
                                    </small>

                                </div>
                                <div role="button" >

                                    <span
                                        className="text-lowercase"
                                        title="Clique para copiar"
                                        onClick={() => setEmail(responsible.motherEmail)}

                                    >
                                        {responsible.motherEmail}
                                        <br />
                                    </span>
                                    <span
                                        className="text-lowercase"
                                        title="Clique para copiar"
                                        onClick={() => setEmail(responsible.fatherEmail)}

                                    >
                                        {responsible.fatherEmail}
                                        <br />
                                    </span>
                                    {responsible.students?.map(student => (
                                        <span key={student.ra}
                                            className="text-lowercase"
                                            title="Clique para copiar"
                                            onClick={() => setEmail(student.email)}
                                        >
                                            {student.email} <br />
                                        </span>
                                    ))}
                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="modal-footer">
                        
                        <button
                            type="submit"
                            className="btn btn-primary"
                            form="form"
                            // onClick={handleInvitation}
                            >
                            Salvar
                        </button>
                        <button type="button"
                            className="btn btn-secondary"
                            data-mdb-dismiss="modal">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}