import { useCallback, useState, MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { setDate, getStatusData, setStartTimeStemp, getCurrentTotalData } from 'states/userData'

import GetDay from './getDay'
import Portal from 'components/modal/Potal'
import Modal from 'components/modal/Modal'

import { ItotalDateList } from 'types/dayList'

import cx from 'classnames'
import styles from './calendar.module.scss'

const DAY = ['일', '월', '화', '수', '목', '금', '토']

const Calendar = () => {
  const { currentMonth, currentYear, totalDate, setMonth, setYear } = GetDay()
  const dispatch = useDispatch()
  const getStatusDate = useSelector(getStatusData)
  const completeDate = useSelector(getCurrentTotalData)
  const [modalOpen, setModalOpen] = useState(false)
  const [clickDate, setClickDate] = useState<ItotalDateList>()

  useEffect(() => {
    const qwe = completeDate.filter((a) => {
      if (!a.startDate) return false
      return a.id
    })
    // 최대 두개의 값이 들어갔을 땐 어떻게 처리해야 하는가? 다시 map을 돌려야 하나? 흐으므으으으으으으으으으으으음
    // qwe[0]?.id 에서 qwe[qwe.length - 1]?.id로 바꾸면 된다
    const item = qwe[qwe.length - 1]?.id
    const expectedEndDate = dayjs(item).add(6, 'day').valueOf()
    const beforeStartDate = dayjs(item).subtract(1, 'day').valueOf()
    dispatch(setStartTimeStemp({ expectedEndDate, beforeStartDate, item }))
  }, [dispatch, completeDate])

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

  const handleMonth = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.value === 'past') {
        setMonth(currentMonth - 1)
        if (currentMonth === 1) {
          setMonth(12)
          setYear(currentYear - 1)
        }
      }
      if (e.currentTarget.value === 'next') {
        setMonth(currentMonth + 1)
        if (currentMonth === 12) {
          setMonth(1)
          setYear(currentYear + 1)
        }
      }
    },
    [currentMonth, currentYear, setMonth, setYear]
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
  return (
    <div className={styles.calendarWrap}>
      <div className={styles.calendarNav}>
        <div className={styles.btnWrap}>
          <button type='button' onClick={handleMonth} value='past'>
            이전 달
          </button>
          <button type='button' onClick={handleMonth} value='next'>
            다음 달
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
            <li className={styles.listItem} key={item.id} style={{ backgroundColor: item.todayBg }}>
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
                <p>{item.memo}</p>
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
