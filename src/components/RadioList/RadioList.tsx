import React, { useEffect, useState } from "react"
import { RadioStation } from "../../lib/api/types"
import { RadioCard } from "../RadioCard"

type Props = {
  favorites: RadioStation[]
  setFavorites: React.Dispatch<React.SetStateAction<RadioStation[]>>
}

export const RadioList: React.FC<Props> = ({ favorites, setFavorites }) => {
  const [currentPlaying, setCurrentPlaying] = useState<RadioStation | null>(
    null
  )
  const [isPlaying, setIsPlaying] = useState(true)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!currentPlaying) return
    audio?.pause()
    setLoading(true)
    setAudio(new Audio(currentPlaying.url_resolved))
  }, [currentPlaying])

  useEffect(() => {
    if (!audio) return

    audio?.addEventListener("loadeddata", () => {
      setLoading(false)
    })

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }

    return () => {
      audio.removeEventListener("loadeddata", () => {
        setLoading(false)
      })
    }
  }, [audio, isPlaying])

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {currentPlaying && (
        <div className="w-full flex flex-row items-center bg-slate-200 rounded-md p-2 gap-2 sticky">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying)
            }}
          >
            {loading ? (
              <div className="w-6 animate-spin">
                <img src="/icons/spin.svg" alt="loading" />
              </div>
            ) : isPlaying ? (
              <img className="w-6" src="/icons/pause.svg" alt="pause" />
            ) : (
              <img className="w-6" src="/icons/play.svg" alt="play" />
            )}
          </button>

          <p>{currentPlaying.name}</p>
          <p className="text-xs">
            {currentPlaying.country}
            {currentPlaying.tags && " - " + currentPlaying.tags}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4 w-full">
        {favorites.length ? (
          favorites.map((station) => {
            return (
              <RadioCard
                setCurrentPlaying={setCurrentPlaying}
                setFavorites={setFavorites}
                key={station.stationuuid}
                station={station}
              />
            )
          })
        ) : (
          <p className="text-center">Nenhuma estação foi salva como favorita</p>
        )}
      </div>
    </div>
  )
}
