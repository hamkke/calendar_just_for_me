import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Props } from 'types/dayList'

import { db } from '../../firebase'
import { updateDoc, doc, arrayRemove } from 'firebase/firestore'
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
  const [isCheckOk, setIsCheckOk] = useState(false)
  const [isAlreadyInList, setIsAlreadyInList] = useState(false)
  const clickDateTP = dayjs(clickDate.id).valueOf()
  const docStatusRef = doc(db, 'my-list', 'STATUS')

  useEffect(() => {
    const checkAlreadyInList = statusDate.map((item) => item.todayDate).includes(clickDate.id)
    setIsAlreadyInList(checkAlreadyInList)
  }, [clickDate.id, statusDate])

  const settingDate = useCallback(
    (item: string | undefined) => {
      setStart(true)
      const expectedEndDate = dayjs(item).add(6, 'day').valueOf()
      const beforeStartDate = dayjs(item).subtract(1, 'day').valueOf()
      dispatch(setStartTimeStemp({ expectedEndDate, beforeStartDate, item }))
    },
    [dispatch]
  )

  useEffect(() => {
    const { yesterDay, afteRaverageDay } = TIMESTEMP
    if (yesterDay <= clickDateTP && clickDateTP < afteRaverageDay) {
      setIsCheckOk(true)
    }
  }, [TIMESTEMP, clickDate.id, clickDateTP])

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
    const docRecapRef = doc(db, 'my-list', 'RECAP')
    const formatRaverageDay = dayjs(TIMESTEMP.afteRaverageDay).format('YYYY-M-D')
    const result = dayjs(startDate)
      .to(formatRaverageDay)
      .replace(/[^0-9]/g, '')

    updateDoc(docRecapRef, {
      recapList: [...recapDate, { id: clickDate.id, start: startDate, end: clickDate.id, totalDate: Number(result) }],
    })
  }

  const handleStartEnd = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.id
    if (target === 'start') settingDate(clickDate.id)
    if (target === 'end') setReacpList()
  }

  const handleSave = () => {
    if (isAlreadyInList) {
      const editListItem = statusDate.map((item) => {
        if (item.todayDate === clickDate.id) return { ...item, memo, todayBg: nowColor, startDate: start, endDate: end }
        return item
      })
      updateDoc(docStatusRef, {
        statusList: [...editListItem],
      })
    }

    if (!isAlreadyInList) {
      updateDoc(docStatusRef, {
        statusList: [
          ...statusDate,
          { todayDate: clickDate.id, memo, todayBg: nowColor, startDate: start, endDate: end },
        ],
      })
    }
    dispatch(getStatusListFB())
    setModalOpen(false)
  }

  const handleRemove = () => {
    const removeItem = statusDate.reduce((a, b) => {
      if (b.todayDate === clickDate.id) return { ...a, ...b }
      return { ...a }
    }, {})

    updateDoc(docStatusRef, {
      statusList: arrayRemove(removeItem),
    })
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
              disabled={isCheckOk}
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

        <button type='button' onClick={() => setModalOpen(false)} className={styles.closeBtn}>
          X
        </button>
        <button type='button' className={styles.handleBtn} onClick={handleSave}>
          저장
        </button>

        {isAlreadyInList ? (
          <button type='button' className={styles.handleBtn} onClick={handleRemove}>
            삭제
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default Modal
