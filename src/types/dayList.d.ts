export interface ItotalDateList {
  id: string
  todayDate: string
  memo: string
  todayBg: string
  year: number
  month: number
  date: number
  currentStatus: string
  startDate: boolean
  endDate: boolean
}

export interface IsetDateList {
  id: string
  year: number
  month: number
  date: number
  currentStatus: string
}

export interface Props {
  setModalOpen: any
  modalOpen: boolean
  clickDate: ItotalDateList
}
