import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Sair() {

    useEffect(() => {

        if (typeof window !== undefined) {

            localStorage.clear()
            window.location.href = '/'

        }

    })
    return (
        <div>

        </div>

    )
}
