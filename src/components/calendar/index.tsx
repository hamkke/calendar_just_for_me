import { useCallback, useState, useEffect, MouseEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { setDate, getStatusData, setStartTimeStemp, getCurrentTotalData, getRecapData } from 'states/userData'

import GetDay from './getDay'
import Portal from 'components/modal/Potal'
import Modal from 'components/modal/Modal'

import { ItotalDateList } from 'types/dayList'

import cx from 'classnames'
import styles from './calendar.module.scss'

const DAY = ['일', '월', '화', '수', '목', '금', '토']

const Calendar = () => {
  const { YEAR, MONTH, currentMonth, currentYear, totalDate, setMonth, setYear } = GetDay()
  const dispatch = useDispatch()
  const getStatusDate = useSelector(getStatusData)
  const completeDate = useSelector(getCurrentTotalData)
  const [modalOpen, setModalOpen] = useState(false)
  const [clickDate, setClickDate] = useState<ItotalDateList>()
  const userData = useSelector(getRecapData)
  const average = Math.floor(userData.reduce((item, idx) => item + idx.totalDate, 0) / userData.length)

  useEffect(() => {
    const checkStartDate = completeDate.filter((a) => {
      if (!a.startDate) return false
      return a.id
    })

    const item = checkStartDate[checkStartDate.length - 1]?.id
    const expectedEndDate = dayjs(item).add(average, 'day').valueOf()
    const beforeStartDate = dayjs(item).subtract(1, 'day').valueOf()
    dispatch(setStartTimeStemp({ expectedEndDate, beforeStartDate, item }))
  }, [dispatch, completeDate, average])

  useEffect(() => {
    const setupTotalDate = totalDate.map((item) => {
      const ccc = getStatusDate.find((item2) => item2.todayDate === item.id)
      return { ...item, ...ccc }
    })
    dispatch(setDate(setupTotalDate))
  }, [dispatch, getStatusDate, totalDate])

  const handleModalOpen = (item: ItotalDateList) => {
    setClickDate(item)
    setModalOpen(true)
  }

  const handleMonth: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { value } = e.currentTarget
      if (value === 'past') {
        setMonth(currentMonth - 1)
        if (currentMonth === 1) {
          setMonth(12)
          setYear(currentYear - 1)
        }
      }
      if (value === 'next') {
        setMonth(currentMonth + 1)
        if (currentMonth === 12) {
          setMonth(1)
          setYear(currentYear + 1)
        }
      }
      if (value === 'today') {
        setMonth(MONTH)
        setYear(YEAR)
      }
    },
    [MONTH, YEAR, currentMonth, currentYear, setMonth, setYear]
  )
  const handleEmojiMark = (item: ItotalDateList) => {
    if (item.startDate === true) return '(꒪⌓꒪)'
    if (item.endDate === true) return '( ᐛ )'
    return ''
  }
  const isToday = (item: string) => {
    if (item === dayjs().format('YYYY-M-D')) return true
    return false
  }
  const changeBG = (hexColor: any) => {
    if (hexColor === undefined) return false
    const r = parseInt(hexColor.substring(1, 3), 16)
    const g = parseInt(hexColor.substring(3, 5), 16)
    const b = parseInt(hexColor.substring(5, 7), 16)
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b
    return brightness < 155
  }

  return (
    <div className={styles.calendarWrap}>
      <div className={styles.calendarNav}>
        <div className={styles.btnWrap}>
          <button type='button' onClick={handleMonth} value='past'>
            &lt; 이전 달
          </button>
          <button type='button' onClick={handleMonth} value='today' className={styles.goTodayBtn}>
            오늘
          </button>
          <button type='button' onClick={handleMonth} value='next'>
            다음 달 &gt;
          </button>
        </div>
        <h2>
          {currentYear}년 {currentMonth}월
        </h2>
      </div>
      <ul className={styles.dayListWrap}>
        {DAY.map((item, idx) => {
          const key = `DAY-LIST-${idx}`
          return <li key={key}>{item}</li>
        })}
      </ul>
      <ul className={styles.listWrap}>
        {completeDate.map((item: ItotalDateList) => {
          return (
            <li
              className={cx(styles.listItem, { [styles.isBGdark]: changeBG(item.todayBg) })}
              key={item.id}
              style={{ backgroundColor: item.todayBg }}
            >
              <button
                type='button'
                className={cx(styles.list, styles[item.currentStatus], { [styles.isToday]: isToday(item.id) })}
                onClick={() => {
                  handleModalOpen(item)
                }}
                data-date={item.id}
              >
                {item.date}
                <p className={styles.startendTxt}>{handleEmojiMark(item)}</p>
                <p className={cx()}>{item.memo}</p>
              </button>
            </li>
          )
        })}
        {clickDate ? (
          <Portal modalOpen={modalOpen}>
            <Modal setModalOpen={setModalOpen} modalOpen={modalOpen} clickDate={clickDate} />
          </Portal>
        ) : (
          <div />
        )}
      </ul>
    </div>
  )
}

export default Calendar
