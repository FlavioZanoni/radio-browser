import { RadioStation } from "../../lib/api/types"

type Props = {
  station: RadioStation
}

export const RadioCard: React.FC<Props> = ({ station }) => {
  return (
    <>
      <h1>{station.name}</h1>
    </>
  )
}
