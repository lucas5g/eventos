import { useRouter } from "next/router"

export function Catch(){
    localStorage.clear()
    window.location.reload
    useRouter().push('/')


    return(
        <h1>Logout</h1>
    )
}