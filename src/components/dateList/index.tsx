import { useSelector } from 'react-redux'
import styles from './dateList.module.scss'
import { getRecapData } from 'states/userData'

const DateList = () => {
  const userData = useSelector(getRecapData)
  // 예전 코드
  // 이렇게 하면 값이 더해지기도 전에 나누기가 되서 값이 이상하게 나왔던 거임
  // const average = userData.reduce((a, b) => Math.floor((a + b.totalDate) / userData.length), 0)
  const average = Math.floor(userData.reduce((item, idx) => item + idx.totalDate, 0) / userData.length)

  return (
    <div className={styles.dataListWrap}>
      <h2>평균 생리일: {average}일</h2>
      <ul className={styles.listWrap}>
        {userData.map((item, idx) => {
          const key = `day-recap-list-${item.id}-${idx}`
          return (
            <li key={key} className={styles.listItem}>
              <p className={styles.listItemDate}>{item.start}</p>
              <span>&nbsp; ---&gt; &nbsp;</span>
              <p className={styles.listItemDate}>{item.end}</p>
              <p>&nbsp;= &nbsp;{item.totalDate}일</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DateList
