import DateList from 'components/dateList'
import Calendar from 'components/calendar'

import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1>🦖 나만을 위한 달력 🦖</h1>
        </header>
        <main className={styles.main}>
          <Calendar />
          <DateList />
        </main>
        <footer className={styles.footer} role='contentinfo'>
          <h2>202206</h2>
        </footer>
      </div>
    </div>
  )
}

export default Layout
