import { useCallback, useState } from 'react'
import GetDay from './getDay'
import PORTAL from 'components/modal/Potal'
import TEST from 'components/modal/Modal'
import styles from './calrendar.module.scss'

const DAY = ['일', '월', '화', '수', '목', '금', '토']

const Calrendar = () => {
  const { currentMonth, currentYear, totalDate, setMonth, setYear, currentDayLength, pastDayLength } = GetDay()
  const [modalOpen, setModalOpen] = useState(false)

  const handleMonth = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.currentTarget.value === 'past') {
        setMonth(currentMonth - 1)
        if (currentMonth === 1) {
          setMonth(12)
          setYear(currentYear - 1)
        }
      }
      if (event.currentTarget.value === 'next') {
        setMonth(currentMonth + 1)
        if (currentMonth === 12) {
          setMonth(1)
          setYear(currentYear + 1)
        }
      }
    },
    [currentMonth, currentYear, setMonth, setYear]
  )

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
        {totalDate.map((a, b) => {
          const key = `date-list${b}`
          if (b < pastDayLength && b !== 7) {
            return (
              <li className={styles.listItem} key={key}>
                <button type='button' className={styles.listItemPast} onClick={() => setModalOpen(true)}>
                  {a}
                </button>
              </li>
            )
          }
          if (b >= pastDayLength && b < pastDayLength + currentDayLength) {
            return (
              <li className={styles.listItem} key={key}>
                <button type='button' className={styles.listItemCurrent} onClick={() => setModalOpen(true)}>
                  {a}
                </button>
              </li>
            )
          }
          return (
            <li className={styles.listItem} key={key}>
              <button type='button' className={styles.listItemNext} onClick={() => setModalOpen(true)}>
                {a}
              </button>
            </li>
          )
        })}
        <PORTAL modalOpen={modalOpen}>
          <TEST setModalOpen={setModalOpen} />
        </PORTAL>
      </ul>
    </div>
  )
}

export default Calrendar
