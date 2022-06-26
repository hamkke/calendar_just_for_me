import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  modalOpen: boolean
  children: ReactNode
}
const Potal = ({ modalOpen, children }: Props) => {
  if (!modalOpen) return null

  return createPortal(
    <div>
      <div>{children}</div>
    </div>,
    document.body
  )
}

export default Potal
