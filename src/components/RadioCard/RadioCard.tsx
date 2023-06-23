import { RadioStation } from "../../lib/api/types"

type Props = {
  station: RadioStation
  setFavorites: React.Dispatch<React.SetStateAction<RadioStation[]>>
  setCurrentPlaying: React.Dispatch<React.SetStateAction<RadioStation | null>>
}

export const RadioCard: React.FC<Props> = ({
  setCurrentPlaying,
  station,
  setFavorites,
}) => {
  return (
    <div className="flex flex-row w-full items-center justify-between bg-slate-200 rounded-md p-2 gap-2">
      <div className="flex gap-4">
        <button
          onClick={() => {
            setCurrentPlaying(station)
          }}
        >
          <img className="w-6" src="/icons/play.svg" alt="play" />
        </button>
        <div className="flex flex-col">
          <p>{station.name}</p>
          <p className="text-xs">
            {station.country} {station.tags && " - " + station.tags}
          </p>
        </div>
      </div>
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
          <img className="w-6" src="/icons/trash.svg" alt="excluir" />
        </button>
        <button>{/* icone de editar */}</button>
      </div>
    </div>
  )
}
