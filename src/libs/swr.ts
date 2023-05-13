import useSWR from "swr";
import { api } from "./axios";

export function swr(url: string) {
  const { data, error, mutate } = useSWR(url, async url => {
    const { data } = await api.get(url)
    return data
  }, {
    // refreshInterval: 8000,
  })

  return { data, error, mutate }
}