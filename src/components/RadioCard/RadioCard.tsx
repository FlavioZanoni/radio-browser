import { useState } from "react"
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
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(station.name)

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
          {isEditing ? (
            <input
              className="rounded-sm w-full"
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value)
              }}
            />
          ) : (
            <>
              <p>{station.name}</p>
              <p className="text-xs">
                {station.country} {station.tags && " - " + station.tags}
              </p>
            </>
          )}
        </div>
      </div>
      <div>
        {isEditing ? (
          <button
            onClick={() => {
              setFavorites((prev) =>
                prev.map((prevStation) =>
                  prevStation.stationuuid === station.stationuuid
                    ? { ...prevStation, name: newName }
                    : prevStation
                )
              )

              setIsEditing(false)
            }}
          >
            <img className="w-6" src="/icons/check.svg" alt="salvar" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsEditing(true)
              }}
            >
              <img className="w-6" src="/icons/edit.svg" alt="editar" />
            </button>
            <button
              onClick={() => {
                setFavorites((prev) =>
                  prev.filter(
                    (prevStation) =>
                      prevStation.stationuuid !== station.stationuuid
                  )
                )
              }}
            >
              <img className="w-6" src="/icons/trash.svg" alt="excluir" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
