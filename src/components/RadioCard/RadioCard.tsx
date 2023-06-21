import { RadioStation } from "../../lib/api/types"

type Props = {
  station: RadioStation
  setFavorites: React.Dispatch<React.SetStateAction<RadioStation[]>>
}

export const RadioCard: React.FC<Props> = ({ station, setFavorites }) => {
  return (
    <div className="flex justify-between">
      <h1>{station.name}</h1>
      <div>
        <button
          onClick={() => {
            setFavorites((prev) =>
              prev.filter(
                (prevStation) => prevStation.stationuuid !== station.stationuuid
              )
            )
          }}
        >
          {/* icone de excluir */} X
        </button>
        <button>{/* icone de editar */}</button>
      </div>
    </div>
  )
}
