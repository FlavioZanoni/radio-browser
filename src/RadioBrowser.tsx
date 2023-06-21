import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { RadioList } from "./components/RadioList"
import { SearchBar } from "./components/SearchBar"
import { RadioStation } from "./lib/api/types"

export const RadioBrowser = () => {
  const [favorites, setFavorites] = useState<RadioStation[]>([])
  const [showSearch, setShowSearch] = useState(false)

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  })

  useEffect(() => {
    const favorites = localStorage.getItem("favorites")
    if (favorites) {
      setFavorites(JSON.parse(favorites))
    }
  }, [])

  useEffect(() => {
    if (!favorites) return

    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  return (
    <div className="w-full h-full flex flex-row gap-4">
      {!isDesktop ? (
        <button onClick={() => setShowSearch(!showSearch)}>
          {/* Sandwich menu icon */} ---
        </button>
      ) : (
        <div className="w-full">
          <SearchBar setFavorites={setFavorites} />
        </div>
      )}

      <div className="w-full">
        <RadioList setFavorites={setFavorites} favorites={favorites} />
      </div>

      {showSearch && !isDesktop && (
        <SearchBar setFavorites={setFavorites} setShowSearch={setShowSearch} />
      )}
    </div>
  )
}
