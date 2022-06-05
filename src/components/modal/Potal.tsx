import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  modalOpen: boolean
  children: ReactNode
}
const Potal: React.FC<Props> = ({ modalOpen, children }: Props) => {
  if (!modalOpen) return null

  return createPortal(
    <div>
      <div>{children}</div>
    </div>,
    document.body
  )
}

export default Potal
