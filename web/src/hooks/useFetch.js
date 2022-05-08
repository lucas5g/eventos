import useSWR from "swr";
import { api } from "../services/api";

export function useFetch(url, paramns) {
    const { data, error, mutate } = useSWR([url, paramns], async url => {

        const { data } = await api.get(url)
            // mutate(data)
            // console.log(data)
        return data
    }, {
        // refreshInterval: 8000,

    })

    return { data, error, mutate }
}