import { useEffect, useState } from "react"
import moment from "moment"
import { api } from "../services/api"
// import { Modal } from "./Modal"

export function ModalGuest({ responsible, responsibles, setResponsibles, setLoadPage }) {

    const [emailInvite, setEmailInvite] = useState('')
    const [kgFood, setKgFood] = useState('')
    const [numberGuests, setNumberGuests] = useState('')
    const [createdInvite, setCreatedInvite] = useState('')
    const [user, setUser] = useState({})
    const [comments, setComments] = useState('')
    const [unity, setUnity] = useState('')
    const [isSendData, setIsSendData] = useState(false)


    // const dataInvite'

    useEffect(() => {

        setKgFood(responsible.kgFood || '')
        setNumberGuests(responsible.numberGuests || '')
        setEmailInvite(responsible.emailInvite || '')
        setUser(responsible.userName)
        setCreatedInvite(responsible.createdInvite || '')
        setComments(responsible.comments || '')
        setUnity(responsible.unity)



    }, [responsible])

    useEffect(() => {
        navigator.clipboard.writeText(emailInvite.toLocaleLowerCase())
    }, [emailInvite])
    async function handleInvitation(event) {
        event.preventDefault()


        const data = {
            emailInvite,
            motherEmail: responsible.motherEmail,
            numberGuests: Number(numberGuests),
            kgFood: Number(kgFood),
            students: responsible.students.map(student => student.ra),
            unity,
            comments
        }

        const persist = confirm(`Deseja confirmar este registro?`)

        if (!persist) {
            return
        }

        try {
            setIsSendData(true)
            const response = await api.post('/convidados/registros', data)
            setLoadPage(new Date())
            setIsSendData(false)
            alert('Registrado com sucesso')
            console.log(response.data.createdAt)
            setCreatedInvite(response.data.createdAt)
            // setUser('lucas')


        } catch (error) {
            console.log(error.response.data)
            alert(error.response.data.msg)
            setIsSendData(false)
        }

    }

    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"


        >
            {/* <div className="modal-dialog modal-lg"> */}

            <div className="modal-dialog modal-lg ">
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

                                    <div className="form-group row mb-3">
                                        <div className="col-lg-6">
                                            <label htmlFor="numberGuests" className="small">
                                                N° Convites
                                            </label>

                                            <input
                                                type="number"
                                                name="numberGuests"
                                                id="numGuests"
                                                className="form-control"
                                                value={numberGuests}
                                                placeholder="Qtd. Convites"
                                                required
                                                disabled={createdInvite}
                                                min="1"
                                                onChange={() => {
                                                    setNumberGuests(event.target.value)
                                                    setKgFood(event.target.value * 2)
                                                    const { unity } = responsible

                                                    let inviteTotalDisponible = 0
                                                    if (unity === 'Contagem') {

                                                        responsible.students.map(student => {
                                                            if (student.course.startsWith('M') || student.course.startsWith('F9')) {
                                                                inviteTotalDisponible += 3
                                                                return
                                                            }

                                                            if (student.course.startsWith('I')) {
                                                                inviteTotalDisponible += 5
                                                            }
                                                        })
                                                    }

                                                    console.log(responsible.students)
                                                    console.log({ inviteTotalDisponible })

                                                    console.log({ unity })
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="numberGuests" className="small">
                                                Alimentos doados (Kg)
                                            </label>

                                            <input
                                                type="number"
                                                name="kgFood"
                                                id="kgFood"
                                                className="form-control"
                                                value={kgFood}
                                                onChange={() => setKgFood(event.target.value)}
                                                placeholder="Kg. Alimentos"
                                                required
                                                min="1"
                                                disabled={createdInvite}
                                            />
                                        </div>



                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="email" className="small">
                                            E-mail
                                        </label>

                                        <input
                                            type="email"
                                            id="emailInvite"
                                            className="form-control text-lowercase"
                                            name="emailInvite"
                                            value={emailInvite}
                                            onChange={() => setEmailInvite(event.target.value)}
                                            placeholder="E-mail para quem será enviado os convites"
                                            required
                                            disabled={createdInvite}

                                        />
                                    </div>
                                    {(kgFood / numberGuests < 2 || comments !== '') &&
                                        <div className="form-group">

                                            <label htmlFor="comments">
                                                Observações
                                            </label>
                                            <textarea
                                                name="comments"
                                                id="commnets"
                                                className="form-control mb-3"
                                                cols="30"
                                                rows="3"
                                                value={comments}
                                                onChange={() => setComments(event.target.value)}
                                                // required
                                                disabled={createdInvite}
                                                placeholder="Observações"

                                            >
                                            </textarea>
                                        </div>

                                    }

                                    {user &&
                                        <>
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
                                                    value={user}
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="numberGuests" className="small">
                                                    Data de Registro
                                                </label>

                                                <input
                                                    type="date-time"
                                                    name="numberGuests"
                                                    id="numGuests"
                                                    className="form-control text-lowercase"
                                                    disabled
                                                    value={moment(responsible.createdInvite).format('DD/MM/YYYY HH:mm')}

                                                />
                                            </div>
                                        </>
                                    }
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
                                        onClick={() => setEmailInvite(responsible.motherEmail)}

                                    >
                                        {responsible.motherEmail}
                                        <br />
                                    </span>
                                    <span
                                        className="text-lowercase"
                                        title="Clique para copiar"
                                        onClick={() => setEmailInvite(responsible.fatherEmail)}

                                    >
                                        {responsible.fatherEmail}
                                        <br />
                                    </span>
                                    {responsible.students?.map(student => (
                                        <span key={student.ra}
                                            className="text-lowercase"
                                            title="Clique para copiar"
                                            onClick={() => setEmailInvite(student.email)}
                                        >
                                            {student.email} <br />
                                        </span>
                                    ))}
                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="modal-footer">

                        {!createdInvite &&
                            <button
                                type="submit"
                                className="btn btn-primary"
                                form="form"
                                disabled={isSendData}
                            // data-mdb-toggle="modal"
                            // data-mdb-target="#modalConfirm"

                            >
                                {isSendData ? 'Carregando ...' : 'Salvar'}
                            </button>
                        }

                        {createdInvite &&
                            <button
                                className="btn btn-danger"
                                disabled={isSendData}
                                onClick={async () => {
                                    const email = prompt('Tem certeza de deletar o registro de envio do convite?\n\nDigite o e-mail de quem foi registrado:')

                                    console.log({ email, emailInvite: emailInvite.toLowerCase() })

                                    if (email === null) {
                                        return
                                    }
                                    if (email !== emailInvite.toLowerCase()) {
                                        alert('E-mail errado!')
                                        return
                                    }

                                    const data = {
                                        emailInvite,
                                        idInvite: responsible.idInvite
                                    }
                                    try {
                                        await api.delete('/convidados/registros', { data })
                                        alert('Deletado com sucesso!')
                                        window.location.reload()

                                    } catch (error) {
                                        console.log(error.response.data)
                                        Catch()
                                    }

                                    // confirm
                                }}

                            >
                                Deletar Registro
                            </button>
                        }

                        <button type="button"
                            className="btn btn-secondary"
                            data-mdb-dismiss="modal">
                            Fechar
                        </button>
                        {/* <button
                            type="button"
                            className="btn btn-primary"
                            data-mdb-toggle="modal"
                            data-mdb-target="#modalConfirm"
                        >
                            Launch demo modal
                        </button> */}
                    </div>
                </div>
            </div>


            {/* <div
                className="modal fade mt-5"
                id="modalConfirm"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel1"
                aria-hidden="true"

            > */}
            {/* <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalConfirm">Modal title</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    )

}