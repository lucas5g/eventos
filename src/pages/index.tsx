import Head from "next/head"
import { swr } from "../libs/swr"

export default function Home() {
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
