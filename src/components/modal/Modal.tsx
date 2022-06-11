import { useState, useRef, useEffect } from 'react'
import styles from './modal.module.scss'

interface IQWE {
  id: string
  date: number
  currentStatus: string
}
interface IWER {
  year: number
  month: number
  date: number
}

type Props = {
  setModalOpen: any
  currentMonth: number
  currentYear: number
  totalDate: IQWE[]
  clickDate: IWER | undefined
  modalOpen: boolean
}

const Test: React.FC<Props> = ({ setModalOpen, modalOpen, currentMonth, currentYear, totalDate, clickDate }: Props) => {
  // console.log(setModalOpen)
  const [nowColor, setNowcolor] = useState('#00ff11')
  const BG = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (modalOpen && !BG.current?.contains(e.target)) setModalOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [BG, modalOpen, setModalOpen])

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalBox} ref={BG}>
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
            <input
              type='color'
              value={nowColor}
              onChange={(e) => {
                setNowcolor(e.target.value)
              }}
            />
            <p>&quot; {nowColor} &quot;</p>
          </div>
        </div>

        <textarea className={styles.modalMemo} placeholder='메모 메모' />

        <button type='button' onClick={() => setModalOpen(false)} className={styles.closeBtn}>
          X
        </button>
        <button type='button' className={styles.saveBtn} onClick={() => setModalOpen(false)}>
          저장
        </button>
      </div>
    </div>
  )
}

export default Test
