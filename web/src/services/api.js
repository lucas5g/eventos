import axios from 'axios'
import url from 'url'


const baseURL = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin
    }
    return process.env.BASE_URL
}
const Authorization = () => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem('eventos-token')
    }
}

export const api = axios.create({
    baseURL: `${baseURL()}/api`,
    headers: {
        Authorization: Authorization()
    }
})
console.log(baseURL())
    // console.log(url)