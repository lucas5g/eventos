import { Heading } from "@chakra-ui/react"
import moment from "moment"
import Head from "next/head"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Catch } from "../components/Catch"
import { ModalGuest } from "../components/ModalGuest"
import { SpinnerCenter } from "../components/SpinnerCenter"
import { TextCenter } from "../components/TextCenter"
import { api } from "../services/api"


interface Responsible {
    mother: string
    father: string
    emailInvite: string
    kgFood: number

    students: [
        {
            ra: string
            name: string
            course: string
        }
    ]


}

export default function Convidados() {

    const [search, setSearch] = useState('')
    const [responsible, setResponsible] = useState<Responsible>({
        kgFood: 0,
        father: '',
        mother: '',
        emailInvite: '',
        students: [{
            ra: '', name: '', course: ''
        }]

    })
    const [responsibles, setResponsibles] = useState<Responsible[]>([])
    const [reloadPage, setReloadPage] = useState(new Date())


    useEffect(() => {

        if (localStorage.getItem('responsibles')) {
            setResponsibles(JSON.parse(localStorage.getItem('responsibles') || ''))
        }
        api.get(`/convidados?search=${search}`)
            .then(({ data }) => {
                setResponsibles(data)
                localStorage.setItem('responsibles', JSON.stringify(data))

            })
            .catch(error => {
                console.log('error')
                console.log(error.response)
                Catch()
            })

    }, [search, reloadPage])


    useEffect(() => {

        const intervel = setInterval(() => {
            setReloadPage(new Date())
        }, 30000)
        return () => clearInterval(intervel)


    }, [])
    return (
        <div>
            <Head>
                <title>Eventos | Convidados</title>
            </Head>
            <Heading>
                Convidados
            </Heading>
            <hr />
            <input type="text"
                className="form-control form-control-lg my-2 p-2"
                placeholder="Aluno, pai ou mãe"
                id="search"
                value={search}
                onChange={event => setSearch(event?.target.value)}

            />


            {responsibles.length === 0 && search.length === 0 &&

                <SpinnerCenter height="45vh" />

            }
            {responsibles.length === 0 && search.length > 3 &&
                <TextCenter
                    text="Nada encontrado :("
                    height="45vh"
                />
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
                                    onClick={() => {
                                        setResponsible(responsible)
                                        setReloadPage(new Date())
                                    }}
                                    className={`btn bg-${responsible.emailInvite ? 'danger' : 'success'}   p-2 text-white rounded fs-3 d-flex align-items-center `}
                                    title={'Gerenciar Envio de Convite'}
                                    role="button"
                                    data-mdb-target="#modalFormGuest"
                                    data-mdb-toggle="modal"

                                >
                                    {responsible.emailInvite == null && <FaArrowRight />}
                                    {responsible.emailInvite != null && <FaArrowLeft />}


                                </button>
                            </div>
                        </div>



                    </li>
                ))}
            </ul>

            {/* {console.log({ responsible })} */}
            <ModalGuest
                responsible={responsible}
                responsibles={responsibles}
                setResponsibles={setResponsibles}
                setReloadPage={setReloadPage}
            />

        </div >
    )
}

