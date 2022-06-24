import { useCallback, useState, MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setDate, getPresentData } from 'states/userData'
import DATA from 'data.json'

import GetDay from './getDay'
import PORTAL from 'components/modal/Potal'
import TEST from 'components/modal/Modal'

import cx from 'classnames'
import styles from './calrendar.module.scss'

const DAY = ['일', '월', '화', '수', '목', '금', '토']

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

const Calrendar = () => {
  const dispatch = useDispatch()
  const getTotalDate = useSelector(getPresentData)
  const beforeSetupData = DATA.present
  const { currentMonth, currentYear, totalDate, setMonth, setYear } = GetDay()
  const [modalOpen, setModalOpen] = useState(false)
  const [clickDate, setClickDate] = useState<ItotalDateList | undefined>()
  // console.log(getTotalDate)
  useEffect(() => {
    const setupTotalDate = totalDate.map((item) => {
      const ccc = beforeSetupData.find((item2) => item2.todayDate === item.id)
      return { ...item, ...ccc }
    })
    dispatch(setDate(setupTotalDate))
  }, [beforeSetupData, dispatch, totalDate])

  const handleModalOpen = (v: ItotalDateList) => {
    // console.log(v)
    setClickDate(v)
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
  const qwe = (v: ItotalDateList) => {
    if (v.startDate === true) return '💔'
    if (v.endDate === true) return '❤️'
    return ''
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
        {getTotalDate.map((v: ItotalDateList) => {
          return (
            <li className={styles.listItem} key={v.id} style={{ backgroundColor: v.todayBg }}>
              <button
                type='button'
                className={cx(styles.list, styles[v.currentStatus])}
                onClick={() => {
                  handleModalOpen(v)
                }}
                data-date={v.id}
              >
                {v.date}
                <p className={styles.startendTxt}>{qwe(v)}</p>
                <p>{v.memo}</p>
              </button>
            </li>
          )
        })}
        <PORTAL modalOpen={modalOpen}>
          <TEST setModalOpen={setModalOpen} modalOpen={modalOpen} clickDate={clickDate} />
        </PORTAL>
      </ul>
    </div>
  )
}

export default Calrendar
