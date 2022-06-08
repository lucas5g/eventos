import Head from "next/head";
import { useRouter } from "next/router";
import { Catch } from "../../../components/Catch";
import { SpinnerCenter } from "../../../components/SpinnerCenter";
import { useFetch } from "../../../hooks/useFetch";

export default function Invite({ }) {
    const { data, error } = useFetch(`/convidados/convites/${useRouter().query.id}`)

    if (true) {
        return (
            <>
                <h1>Ainda não terminei está tela &#128517;. </h1>
                <h1>Volte mais tarde &#128521;.</h1>
                <hr />
                <img src={'https://viagemeturismo.abril.com.br/wp-content/uploads/2016/12/onlineshopping.gif?quality=70&strip=info&resize=680,453'} alt="giflegal" />
            </>
        )
    }

    if (error) {
        console.log(error.response.data)
        Catch()
    }

    if (!data) {
        return (
            <>
                <Head>
                    <title>
                        Eventos | Convidados &gt; Convites
                    </title>
                </Head>
                <SpinnerCenter height="60vh" />
            </>
        )
    }

    return (
        <div>
            <Head>
                <title>
                    Eventos | Convidados &gt; Convites
                </title>
            </Head>
            <h1>Editar Informações do Convite</h1>
            <hr />

            {JSON.stringify(data, null, 4)}



        </div>
    )
}

