import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { editDate } from 'states/userData'

import styles from './modal.module.scss'

interface ItotalDateList {
  id: string
  todayDate?: string | undefined
  memo?: string | undefined
  todayBg?: string | undefined
  year: number
  month: number
  date: number
  currentStatus: string
}

type Props = {
  setModalOpen: any
  modalOpen: boolean
  clickDate?: ItotalDateList | undefined
}

const Test: React.FC<Props> = ({ setModalOpen, modalOpen, clickDate }: Props) => {
  const dispatch = useDispatch()
  const [nowColor, setNowcolor] = useState<string | undefined>('#000000')
  const [memo, setMemo] = useState('')
  const modalOutside = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setNowcolor(clickDate?.todayBg)
    const handleOutsideClick = (e: any) => {
      if (modalOpen && !modalOutside.current?.contains(e.target)) setModalOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [modalOutside, modalOpen, setModalOpen, setNowcolor, clickDate?.todayBg])

  const handleMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.currentTarget.value)
    setMemo(e.currentTarget.value)
  }
  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    setNowcolor(e.currentTarget.value)
  }
  const handleSave = () => {
    dispatch(editDate({ ...clickDate, memo, nowColor }))
    setModalOpen(false)
  }

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalBox} ref={modalOutside}>
        <h2 className={styles.todayDateTitle}>
          {clickDate?.year}년 {clickDate?.month}월 {clickDate?.date}일
        </h2>
        <div className={styles.inputWrap}>
          <label htmlFor='start'>
            시작:
            <input id='start' type='checkbox' value='sdds' />
          </label>
          <label htmlFor='end'>
            종료:
            <input id='end' type='checkbox' value='sdds' />
          </label>
          <div className={styles.colorInputWrap}>
            <h3>오늘의 색:</h3>
            <input type='color' value={nowColor} onChange={handleColor} />
            <p>&quot; {nowColor} &quot;</p>
          </div>
        </div>

        <textarea className={styles.modalMemo} placeholder='메모 메모' value={memo} onChange={handleMemo} />

        <button type='button' onClick={handleSave} className={styles.closeBtn}>
          X
        </button>
        <button type='button' className={styles.saveBtn} onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  )
}

export default Test
