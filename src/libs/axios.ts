import axios from 'axios'

const Authorization = () => {
	if (typeof window !== 'undefined') {
		return window.localStorage.getItem('events-token')
	}
}

export const api = axios.create({
	// baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
	baseURL: '/api',
	headers: {
		Authorization: `Bearer ${Authorization()}` ?? ''
	}
})
