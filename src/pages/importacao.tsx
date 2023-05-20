import Head from "next/head";
import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, useState } from "react";
export default function Import() {

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
          onClick={handleSubmit}
          >
          Cadastrar
        </button>
      </form>
    </>
  )

  async function handleSubmit(event:FormEvent) {
    event.preventDefault()
    const reader = new FileReader()
    const fileInput = document.querySelector('input') as HTMLInputElement;
    const file = fileInput.files?.[0];
    
    reader.readAsText(file)
    
    reader.onload = (e:ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      const lines = content.split('\n')
      const headers = lines[0].split(',')
      const jsonArray: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');

        if (currentLine.length === headers.length) {
          const obj: { [key: string]: string } = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
          }
          jsonArray.push(obj);
        }
      }

      console.log(jsonArray[0]);

    }
    
  }
}