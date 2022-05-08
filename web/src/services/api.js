import axios from 'axios'

const Authorization = () => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem('eventos-token')
    }
}

export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    headers: {
        Authorization: Authorization()
    }
})
console.log(process.env.NEXT_PUBLIC_API_URL)
    // console.log(url)