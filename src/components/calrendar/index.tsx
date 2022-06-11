import { useCallback, useState, MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DATA from 'data.json'
import GetDay from './getDay'
import PORTAL from 'components/modal/Potal'
import TEST from 'components/modal/Modal'

import { cx } from 'styles'
import styles from './calrendar.module.scss'
import { setDate, getPresentData } from 'states/userData'
import { useMount } from 'react-use'

const DAY = ['일', '월', '화', '수', '목', '금', '토']

interface IYearMonthDate {
  todayDate?: string | undefined
  memo?: string | undefined
  todayBg?: string | undefined
  id: string
  year: number
  month: number
  date: number
  currentStatus: string
}
interface IOOO {
  todayDate?: string | undefined
  memo?: string | undefined
  todayBg?: string | undefined
  id: string
  year: number
  month: number
  date: number
  currentStatus: string
}
const Calrendar = () => {
  const { currentMonth, currentYear, totalDate, setMonth, setYear, currentDayLength, pastDayLength } = GetDay()
  const [modalOpen, setModalOpen] = useState(false)
  const [clickDate, setClickDate] = useState<IYearMonthDate>()
  const dispatch = useDispatch()
  const getTotalDate = useSelector(getPresentData)
  console.log(getTotalDate, 'sdfsdfdsf')

  const beforeSetupData = DATA.present

  useEffect(() => {
    const setupTotalDate = totalDate.map((item) => {
      const ccc = beforeSetupData.find((item2) => item2.todayDate === item.id)
      return { ...item, ...ccc }
    })
    dispatch(setDate(setupTotalDate))
  }, [beforeSetupData, dispatch, totalDate])

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

  // console.log(xxx)

  const handleModalOpen = (v: IYearMonthDate) => {
    setClickDate(v)
    setModalOpen(true)
  }
  return (
    <div className={styles.calrendarWrap}>
      <div className={styles.calrendarNav}>
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
        {DAY.map((a, b) => {
          const key = `DAY-list${b}`
          return <li key={key}>{a}</li>
        })}
      </ul>
      <ul className={styles.listWrap}>
        {getTotalDate.map((v) => {
          console.log(v)
          return (
            <li className={styles.listItem} key={v.id}>
              <button
                type='button'
                className={cx(styles.list, styles[v.currentStatus])}
                onClick={() => {
                  handleModalOpen(v)
                }}
                data-date={v.id}
              >
                {v.date}ww
              </button>
            </li>
          )
        })}
        <PORTAL modalOpen={modalOpen}>
          <TEST
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            totalDate={totalDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            clickDate={clickDate}
          />
        </PORTAL>
      </ul>
    </div>
  )
}

export default Calrendar
