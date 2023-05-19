import Head from "next/head"
import { swr } from "../libs/swr"

export default function Home() {
  console.log("Release 2023-05-19 20:22")
  swr('/convidados')

  return (
    <div>
      <Head>
        <title>
          Eventos | Home
        </title>
      </Head>
      <h1>
        Home
      </h1>
      <hr />
      <h3>
        Aplicação para ajudar nas organizações dos eventos do colégio.

      </h3>

    </div>

  )
}
