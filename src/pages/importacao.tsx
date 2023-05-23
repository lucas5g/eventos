import Head from "next/head";
import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, useState } from "react";
import { api } from "../libs/axios";
import { createSchema } from "../services/GuestService";
import { z } from "zod";
import { sleep } from "../helpers";
export default function Import() {

  const [loading, setLoading] = useState(false)

  return (
    <>
      <Head>
        <title>Eventos | Importação</title>
      </Head>
      <h1>Importação</h1>
      <hr />
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-50" >
        <input
          type="file"
          className="form-control"
        />
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Registrando convidados ...' : 'Cadastrar'}
        </button>
      </form>
    </>
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    const reader = new FileReader()
    const fileInput = document.querySelector('input') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if(file.type !== 'text/csv'){
      return alert('A extensão do arquivo tem que ser .csv')
    }
    reader.readAsText(file)

    reader.onload = async(e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      const lines = content.split('\n')
      const headers = lines[0].replace('\r', '').split(',')

      const guests = lines.map(line => {
        let guest: any = {}
        headers.forEach((header: string, index) => {

          guest[header] = line
            .replace('\r', '')
            .replace('GUTIERREZ', 'Gutierrez')
            .split(',')[index]
        })
        return {
          ...guest,
          alumni: guest.alumni.toLowerCase()
        }

      }).filter((_, index) => index > 0)

      try{
        await api.post('convidados', guests)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }

      // let errors: any = {}
      // let shouldSkip = false;

      // const timeWait = 300
      // guests.forEach(async (guest, index) => {
      //   await sleep(timeWait * index)
      //   // await sleep(index * timeWait)
        
      //   if (shouldSkip) return
      //   try {
      //     await api.post('convidados', guest)

      //   } catch (e) {
      //     shouldSkip = true
      //     console.log({shouldSkip})
      //     setLoading(false)
      //   } finally {
      //   }
      // })

      // await sleep(guests.length * (timeWait + 7))
      // setLoading(false)
      // alert('Atualizado com sucesso!')

      //   if (!errors[0]) {
      //     alert('Cadastrados ou atualizados com Sucesso!.')
      //     return
      //   }

      //   console.log(errors)
      //   alert(errors[0].message
      //     .replace('Invalid enum value. Expected', 'Opção Errada. É esperado')
      //     .replace('received', 'e recebeu')
      //   )

    }

  }
}