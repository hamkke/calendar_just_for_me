import { click } from '@testing-library/user-event/dist/click'
import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { editDate } from 'states/userData'
import cx from 'classnames'

import styles from './modal.module.scss'

interface ItotalDateList {
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

interface Props {
  setModalOpen: any
  modalOpen: boolean
  clickDate: ItotalDateList | undefined
}

const Test = ({ setModalOpen, modalOpen, clickDate }: Props) => {
  const dispatch = useDispatch()
  const [nowColor, setNowcolor] = useState(clickDate?.todayBg || '#ffffff')
  const [memo, setMemo] = useState(clickDate?.memo || '')
  const [start, setStart] = useState(clickDate?.startDate || false)
  const [end, setEnd] = useState(clickDate?.endDate || false)
  const modalOutside = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (modalOpen && !modalOutside.current?.contains(e.target)) setModalOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [modalOutside, modalOpen, setModalOpen])

  const handleMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.currentTarget.value)
  }
  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    setNowcolor(e.currentTarget.value)
  }

  const handleStartEnd = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked)
    const target = e.currentTarget.value
    if (target === '시작일') setStart((prev) => !prev)
    if (target === '종료일') setEnd((prev) => !prev)
  }
  const handleSave = () => {
    dispatch(editDate({ ...clickDate, memo, nowColor, start, end }))
    setModalOpen(false)
  }

  if (!clickDate) return <div />
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalBox} ref={modalOutside}>
        <h2 className={styles.todayDateTitle}>
          {clickDate.year}년 {clickDate.month}월 {clickDate.date}일
        </h2>
        <div className={styles.inputWrap}>
          <label htmlFor='start'>
            시작:
            <input
              id='start'
              type='checkbox'
              value='시작일'
              onChange={handleStartEnd}
              className={cx({ [styles.checked]: start })}
              checked={start}
              // defalutchecked
            />
          </label>
          <label htmlFor='end'>
            종료:
            <input
              id='end'
              type='checkbox'
              value='종료일'
              checked={end}
              className={cx({ [styles.checked]: end })}
              onChange={handleStartEnd}
            />
          </label>
          <div className={styles.colorInputWrap}>
            <h3>오늘의 색:</h3>
            <input type='color' value={clickDate.todayBg ? clickDate.todayBg : nowColor} onChange={handleColor} />
            <p>&quot; {clickDate.todayBg ? clickDate.todayBg : nowColor} &quot;</p>
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
