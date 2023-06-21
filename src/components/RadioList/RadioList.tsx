import React from "react"
import { RadioStation } from "../../lib/api/types"
import { RadioCard } from "../RadioCard"

type Props = {
  favorites: RadioStation[]
  setFavorites: React.Dispatch<React.SetStateAction<RadioStation[]>>
}

export const RadioList: React.FC<Props> = ({ favorites, setFavorites }) => {
  return (
    <>
      {favorites.length ? (
        favorites.map((station) => {
          return (
            <RadioCard
              setFavorites={setFavorites}
              key={station.stationuuid}
              station={station}
            />
          )
        })
      ) : (
        <p>
          Nenhuma estação foi salva como favorita, clique aqui para procurar uma
          estação
        </p>
      )}
    </>
  )
}
