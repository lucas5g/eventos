import Link from 'next/link'
import Head from 'next/head'
import { Catch } from '../../components/Catch'
import { TextCenter } from '../../components/TextCenter'
import { useEffect, useState } from 'react'
import { api } from '../../libs/axios'
import { sleep } from '../../helpers'
import jwtDecode from 'jwt-decode'
import { SpinnerCenter } from '../../components/SpinnerCenter'
import { Heading } from '@chakra-ui/react'
import { swr } from '../../libs/swr'


interface User {
  id: number
  name: string
  email: string
  unity: string
  profile: string

}

export default function Users() {
  const [search, setSearch] = useState('')
  const [authenticatedProfile, setAuthenticatedProfile] = useState('')

  useEffect(() => {
    if (localStorage.getItem('events-token')) {
      const token = localStorage.getItem('events-token') || ''
      const tokenDecode: { profile: string } = jwtDecode(token)

      setAuthenticatedProfile(tokenDecode.profile || '')
    }
  }, [])

  const { data, error }: { data: User[], error: any } = swr('usuarios')

  if(error) return <p>Erro ao conectar com o servidor</p>

  if (!data) return <SpinnerCenter height="60vh" />

  const users = data.filter(user => {
    return (
      user.unity.toLowerCase() === search.toLowerCase() ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.includes(search) ||
      user.profile.includes(search)
    )
  })

  return (
    <>
      <Head>
        <title>Eventos | Usuários</title>
      </Head>
      <div className="d-flex justify-content-between">
        <h1>Usuários</h1>
        {authenticatedProfile === 'Admin' &&
          <Link href='/usuarios/criar'>
            <a className="btn btn-outline-primary h-25">Criar</a>
          </Link>
        }
      </div>
      <hr />
      <div className="list-group" role="button" >
        <input type="text"
          className="form-control form-control-lg my-2"
          placeholder="Nome, email ou unidade"
          id="search"
          value={search}
          onChange={event => setSearch(event?.target.value)}

        />

        {users.length === 0 && search.length > 0 &&

          <TextCenter
            text='Nada Encontrado :('
            height='45vh'
          />

        }

        {users.map(user => (
          <Link
            key={user.id}
            href={`/usuarios/${user.id}`}>
            <a
              className="list-group-item list-group-item-action"
              title={`Editar ${user.name}`}
            >
              <div className="row">

                <div className="col-lg-4 col-9">
                  {user.name}
                </div>
                <div className="col-lg-4 col">
                  {user.email}
                </div>
                <div className="col-lg-2 col">
                  {user.unity}
                </div>
                <div className="col-lg-2 col" style={{ textAlign: 'right' }}>
                  {user.profile}
                </div>
              </div>
            </a>
          </Link>
        ))}


      </div>


    </>
  )
}

export async function getServerSideProps() {


  return {
    props: {
      // data
    }
  }

}