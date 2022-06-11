// import { useAppSelector } from 'hooks/useAppSelector'
import styles from './dateList.module.scss'
// import { getPastData } from 'states/userData'

const DateList = () => {
  // const userData = useAppSelector(getPastData)

  // const average = userData.reduce((a, b) => Math.floor((a + b.totalDate) / userData.length), 0)

  return (
    <div className={styles.dataListWrap}>
      {/* <h2>평균주기: {average}일</h2>
      <ul className={styles.listWrap}>
        {userData.map((a) => {
          return (
            <li key={a.id} className={styles.listItem}>
              {a.start} - {a.end}
              <p>( {a.totalDate} )일</p>
            </li>
          )
        })}
      </ul> */}
      wqewe
    </div>
  )
}

export default DateList
