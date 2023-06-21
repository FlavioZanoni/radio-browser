import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getRadioStations } from "../../lib/api/api"
import { RadioStation } from "../../lib/api/types"

type Props = {
  setShowSearch?: React.Dispatch<React.SetStateAction<boolean>>
  setFavorites: React.Dispatch<React.SetStateAction<RadioStation[]>>
}

export const SearchBar: React.FC<Props> = ({ setShowSearch, setFavorites }) => {
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(0)

  const { data, isLoading } = useQuery(["stations", search, page], () =>
    getRadioStations(search, page)
  )

  return (
    <div
      className={`flex flex-col ${
        setShowSearch && "absolute top-0 left-0 z-10"
      }`}
    >
      {setShowSearch && (
        <div className="w-full flex justify-end bg-slate-400">
          <button onClick={() => setShowSearch(false)}>
            {/*sandwich menu icon */} ---
          </button>
        </div>
      )}

      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />

      {isLoading && <div>Loading...</div>}

      {data?.map((station) => (
        <div key={station.stationuuid} className="flex flex-row justify-around">
          <div>{station.name}</div>
          <div>{station.url}</div>
          <div>
            <button
              onClick={() => {
                setFavorites((prev) => [...prev, station])
              }}
            >
              {/* icone de salvar */} add
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={page === 0}
        >
          Voltar
        </button>

        <p>{page + 1}</p>

        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Próxima
        </button>
      </div>
    </div>
  )
}
