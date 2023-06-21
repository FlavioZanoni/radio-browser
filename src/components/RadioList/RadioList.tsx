import { RadioStation } from "../../lib/api/types"
import { RadioCard } from "../RadioCard"

export const RadioList = ({ list }: { list: RadioStation[] }) => {
  return (
    <>
      {list.length ? (
        list.map((station) => {
          return <RadioCard key={station.stationuuid} station={station} />
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
