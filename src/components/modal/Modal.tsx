import { useState, useRef, useEffect, useCallback, ChangeEventHandler } from 'react'
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
  const { id, memo, todayBg, startDate, endDate, year, month, date } = clickDate
  const dispatch = useDispatch<AppDispatch>()
  const TIMESTEMP = useSelector(getStartTimeStemp)
  const statusDate = useSelector(getStatusData)
  const recapDate = useSelector(getRecapData)
  const modalOutside = useRef<HTMLDivElement>(null)

  const [nowColor, setNowcolor] = useState(todayBg || '#ffffff')
  const [hexadecimalColor, setHexadecimalColor] = useState(nowColor)
  const [nowMemo, setNomMemo] = useState(memo || '')
  const [start, setStart] = useState(startDate || false)
  const [end, setEnd] = useState(endDate || false)
  const [isCheckOk, setIsCheckOk] = useState(false)
  const [isAlreadyInList, setIsAlreadyInList] = useState(false)

  const clickDateTP = dayjs(id).valueOf()
  const docStatusRef = doc(db, 'my-list', 'STATUS')

  useEffect(() => {
    const checkAlreadyInList = statusDate.map((item) => item.todayDate).includes(id)
    setIsAlreadyInList(checkAlreadyInList)
  }, [id, statusDate])

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
  }, [TIMESTEMP, id, clickDateTP])

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (modalOpen && !modalOutside.current?.contains(e.target)) setModalOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [modalOutside, modalOpen, setModalOpen])

  const handleMemo: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNomMemo(e.currentTarget.value)
  }

  const handleColor: ChangeEventHandler<HTMLInputElement> = (e) => setHexadecimalColor(e.currentTarget.value)
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
    const reacpStartDate = TIMESTEMP.standardDate
    const docRecapRef = doc(db, 'my-list', 'RECAP')
    const formatRaverageDay = dayjs(TIMESTEMP.afteRaverageDay).format('YYYY-M-D')
    const result = dayjs(reacpStartDate)
      .to(formatRaverageDay)
      .replace(/[^0-9]/g, '')

    updateDoc(docRecapRef, {
      recapList: [...recapDate, { id, start: reacpStartDate, end: id, totalDate: Number(result) }],
    })
  }

  const handleStartEnd: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget.id
    if (target === 'start') settingDate(id)
    if (target === 'end') setReacpList()
  }

  const handleSave = () => {
    if (isAlreadyInList) {
      const editListItem = statusDate.map((item) => {
        if (item.todayDate === id) return { ...item, memo: nowMemo, todayBg: nowColor, startDate: start, endDate: end }
        return item
      })
      updateDoc(docStatusRef, {
        statusList: [...editListItem],
      })
    }

    if (!isAlreadyInList) {
      updateDoc(docStatusRef, {
        statusList: [...statusDate, { todayDate: id, nowMemo, todayBg: nowColor, startDate: start, endDate: end }],
      })
    }
    dispatch(getStatusListFB())
    setModalOpen(false)
  }

  const handleRemove = () => {
    const removeItem = statusDate.reduce((a, b) => {
      if (b.todayDate === id) return { ...a, ...b }
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
          {year}년 {month}월 {date}일
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

        <textarea className={styles.modalMemo} placeholder='메모 메모' value={nowMemo} onChange={handleMemo} />

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
