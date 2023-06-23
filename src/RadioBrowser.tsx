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
    if (!favorites.length) return

    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  return (
    <main
      className={`w-full h-screen flex gap-4 p-4 ${!isDesktop && "flex-col"} `}
    >
      {!isDesktop ? (
        <button
          className="flex justify-end"
          onClick={() => setShowSearch(!showSearch)}
        >
          <img className="w-6" src="/icons/menu.svg" alt="menu" />
        </button>
      ) : (
        <section className={isDesktop ? "w-1/4" : "w-full"}>
          <SearchBar favorites={favorites} setFavorites={setFavorites} />
        </section>
      )}

      <section
        className={`${isDesktop ? "w-3/4 p-4" : "w-full "} flex flex-col gap-2`}
      >
        <h1 className="text-xl font-semibold">Favoritos</h1>

        <RadioList setFavorites={setFavorites} favorites={favorites} />
      </section>

      {showSearch && !isDesktop && (
        <SearchBar
          favorites={favorites}
          setFavorites={setFavorites}
          setShowSearch={setShowSearch}
        />
      )}
    </main>
  )
}
