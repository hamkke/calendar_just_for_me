import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Props } from 'types/dayList'

import { db } from '../../firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { AppDispatch } from 'states'
import { getStartTimeStemp, setStartTimeStemp, getStatusData, getRecapData, getStatusListFB } from 'states/userData'

import cx from 'classnames'
import styles from './modal.module.scss'

dayjs.extend(relativeTime)

const Modal = ({ setModalOpen, modalOpen, clickDate }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const TIMESTEMP = useSelector(getStartTimeStemp)
  const statusDate = useSelector(getStatusData)
  const recapDate = useSelector(getRecapData)
  const modalOutside = useRef<HTMLDivElement>(null)
  const [nowColor, setNowcolor] = useState(clickDate.todayBg || '#ffffff')
  const [hexadecimalColor, setHexadecimalColor] = useState(nowColor)
  const [memo, setMemo] = useState(clickDate.memo || '')
  const [start, setStart] = useState(clickDate.startDate || false)
  const [end, setEnd] = useState(clickDate.endDate || false)
  const [isOk, setIsOk] = useState(false)
  const rrrr = dayjs(clickDate.id).valueOf()

  const settingDate = useCallback(
    (item: string | undefined) => {
      setStart(true)
      const expectedEndDate = dayjs(item).add(6, 'day').valueOf()
      const beforeStartDate = dayjs(item).subtract(1, 'day').valueOf()
      dispatch(setStartTimeStemp({ expectedEndDate, beforeStartDate, item }))
    },
    [dispatch]
  )

  // useEffect(() => {
  //   if (clickDate.startDate) settingDate(clickDate.id)
  // }, [clickDate.id, clickDate.startDate, settingDate])

  useEffect(() => {
    const { yesterDay, afteRaverageDay } = TIMESTEMP
    if (yesterDay <= rrrr && rrrr < afteRaverageDay) {
      setIsOk(true)
    }
  }, [TIMESTEMP, clickDate.id, rrrr])

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

  const handleColor = (e: ChangeEvent<HTMLInputElement>) => setHexadecimalColor(e.currentTarget.value)
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (hexadecimalColor.length < 6) return setNowcolor(nowColor)
      return setNowcolor(hexadecimalColor)
    }, 500)
    return () => {
      clearTimeout(debounce)
    }
  }, [hexadecimalColor, nowColor])

  const setReacpList = () => {
    setEnd((prev) => !prev)
    const startDate = TIMESTEMP.standardDate
    const docRef = doc(db, 'my-list', 'RECAP')
    const formatRaverageDay = dayjs(TIMESTEMP.afteRaverageDay).format('YYYY-M-D')
    const result = dayjs(startDate)
      .to(formatRaverageDay)
      .replace(/[^0-9]/g, '')

    updateDoc(docRef, {
      recapList: [...recapDate, { id: clickDate.id, start: startDate, end: clickDate.id, totalDate: Number(result) }],
    })
  }

  const handleStartEnd = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.id
    if (target === 'start') settingDate(clickDate.id)
    if (target === 'end') setReacpList()
  }

  const handleSave = () => {
    const docRef = doc(db, 'my-list', 'STATUS')
    const isAlreadyInList = statusDate.map((a) => a.todayDate).includes(clickDate.id)

    if (isAlreadyInList) {
      const qwe = statusDate.map((item) => {
        if (item.todayDate === clickDate.id) return { ...item, memo, todayBg: nowColor, startDate: start, endDate: end }
        return item
      })
      updateDoc(docRef, {
        statusList: [...qwe],
      })
    }
    if (!isAlreadyInList) {
      updateDoc(docRef, {
        statusList: [
          ...statusDate,
          { todayDate: clickDate.id, memo, todayBg: nowColor, startDate: start, endDate: end },
        ],
      })
    }
    dispatch(getStatusListFB())
    setModalOpen(false)
  }

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
              onChange={handleStartEnd}
              className={cx({ [styles.checked]: start })}
              checked={start}
              disabled={isOk}
            />
          </label>
          <label htmlFor='end'>
            종료:
            <input
              id='end'
              type='checkbox'
              checked={end}
              className={cx({ [styles.checked]: end })}
              onChange={handleStartEnd}
            />
          </label>
          <label htmlFor='colorInput'>
            오늘의 색:
            <input type='color' id='colorInput' value={nowColor} onChange={handleColor} />
          </label>
          <label htmlFor='textInput'>
            입력:
            <input type='text' id='textInput' value={hexadecimalColor} onChange={handleColor} />
          </label>
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

export default Modal
