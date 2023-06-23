import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getRadioStations } from "../../lib/api/api"
import { RadioStation } from "../../lib/api/types"

type Props = {
  setShowSearch?: React.Dispatch<React.SetStateAction<boolean>>
  setFavorites: React.Dispatch<React.SetStateAction<RadioStation[]>>
  favorites: RadioStation[]
}

export const SearchBar: React.FC<Props> = ({
  setShowSearch,
  setFavorites,
  favorites,
}) => {
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(0)

  const { data, isLoading } = useQuery(["stations", search, page], () =>
    getRadioStations(search, page)
  )

  const buttonStyle = "bg-slate-400 text-white rounded-sm p-2 w-20"

  return (
    <div
      className={`flex flex-col bg-white h-full p-4 gap-2 ${
        setShowSearch && "absolute top-0 left-0 z-10 w-full "
      }`}
    >
      {setShowSearch && (
        <div className="w-full flex justify-end">
          <button onClick={() => setShowSearch(false)}>
            <img className="w-6" src="/icons/close.svg" alt="fechar" />
          </button>
        </div>
      )}

      <h1 className="text-center">Pesquise por sua rádio</h1>

      <input
        type="text"
        className="border border-gray-gray-200 p-2 rounded bg-white text-gray-700 text-lg focus:border focus:border-gray-500 focus:outline-none"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        placeholder="Pesquisar"
      />

      {isLoading && <div>Loading...</div>}

      <div className="flex h-full flex-col items-center p-2 gap-5 justify-between">
        <div className="flex flex-col gap-4 w-full ">
          {data?.map((station) => (
            <div
              key={station.stationuuid}
              className="flex flex-row items-center justify-between bg-slate-200 rounded-md p-2 gap-2"
            >
              <p>{station.name}</p>
              <div className="flex items-center ">
                <button
                  onClick={() => {
                    setFavorites((prevFavorites) => {
                      const isFavorite = prevFavorites.find(
                        (fav) => fav.stationuuid === station.stationuuid
                      )

                      if (isFavorite) {
                        return prevFavorites.filter(
                          (fav) => fav.stationuuid !== station.stationuuid
                        )
                      }

                      return [...prevFavorites, station]
                    })
                  }}
                >
                  {favorites.find(
                    (fav) => fav.stationuuid === station.stationuuid
                  ) ? (
                    <img
                      className="w-6"
                      src="/icons/heart_full.svg"
                      alt="desfavoritar"
                    />
                  ) : (
                    <img
                      className="w-6"
                      src="/icons/heart.svg"
                      alt="favoritar"
                    />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center ">
          <button
            className={buttonStyle}
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 0}
          >
            Voltar
          </button>

          <p className="p-2 px-4 border-y border-gray-200">{page + 1}</p>

          <button
            className={buttonStyle}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}
