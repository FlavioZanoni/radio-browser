import { useEffect, useState } from "react"
import { RadioList } from "./components/RadioList"
import { RadioStation } from "./lib/api/types"

export const RadioBrowser = () => {
  const [favorites, setFavorites] = useState<RadioStation[]>([])

  useEffect(() => {
    const favorites = localStorage.getItem("favorites")
    if (favorites) {
      setFavorites(JSON.parse(favorites))
    }
  }, [])

  return (
    <>
      <RadioList list={favorites} />
    </>
  )
}
