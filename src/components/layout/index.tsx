import DateList from 'components/dateList'
import Calrendar from 'components/calrendar'

import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1>🦖 내가 만든 달력 🦖</h1>
        </header>
        <main className={styles.main}>
          <Calrendar />
          <DateList />
        </main>
        <footer className={styles.footer} role='contentinfo'>
          <h2>이거 내가 만듦</h2>
        </footer>
      </div>
    </div>
  )
}

export default Layout
