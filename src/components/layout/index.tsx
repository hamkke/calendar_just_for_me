import DateList from 'components/dateList'
import Calrendar from 'components/calrendar'
import dayjs from 'dayjs'
import styles from './layout.module.scss'
import DATA from 'data.json'

import GetDay from 'components/calrendar/getDay'

const Layout = () => {
  const { currentMonth, currentYear, totalDate, setMonth, setYear, currentDayLength, pastDayLength } = GetDay()
  // console.log(totalDate)
  // const nTotal = totalDate.reduce(
  //   (a, b, o) => ({ id: dayjs(new Date(currentYear, currentMonth - 1)).format('YYYY-MM-DD'), date: b }),
  //   {}
  // )
  const nTotal = totalDate.reduce((a: object[], b) => a.concat({ id: b, hello: 'hi' }), [])
  const qwe = new Date()
  // console.log(nTotal[0], dayjs(qwe).format('YYYY-MM-DD'))

  // const eee = [{ ert: 2, id: 123 }, { id: 234 }, { id: 345 }]
  // const rrr = [
  //   { id: 345, qwe: 111 },
  //   { id: 24, qwe: 111 },
  //   { id: 123, qwe: 111555 },
  //   { id: 123, qwe: 111555 },
  //   { id: 123, qwe: 111555 },
  // ]
  // const result = [eee, rrr].reduce((a, b) =>
  //   a.map((c, i) => {
  //     // console.log(a[i], 'a')
  //     console.log(b[i], 'b')
  //     console.log({ ...c }, 'c')
  //     console.log({ ...c, ...b[i] }, 'this')
  //     return { ...c, ...b[i] }
  //   })
  // )
  // console.log(result)
  interface IDDDD {
    todayDate: string
    memo: string
    todayBg: string
    id: string
    year: number
    month: number
    date: number
    currentStatus: string
  }

  interface ID {
    todayDate: string
    memo: string
    todayBg: string
  }
  const qq = DATA.present

  // const xxx = totalDate.map((item) => {
  //   const ccc = qq.find((ele) => ele.todayDate === item.id)
  //   return { ...item, ...ccc }
  // })
  // console.log(xxx)
  // const a = [
  //   { fruit: 'banna', price: 100, quality: 'high' },
  //   { fruit: 'orange', quality: 'average', price: 50 },
  //   { fruit: 'b', price: 100, quality: 'high' },
  // ]
  // const b = [
  //   { fruit: 'banana', count: 4 },
  //   { fruit: 'orange', count: 10 },
  // ]

  // console.log(DATA)

  const tt = DATA.past
  // console.log(qq[0])
  // const result = totalDate.map((item, index) => {
  //   console.log(item.id)
  //   if (item.id === qq[index]?.todayDate) {
  //     return { ...item, ...qq[index] }
  //   }
  //   return 11
  //   // return item.concat(totalDate[index])
  //   // return item.concat({ ...totalDate[index] })
  // })

  // const result2 = tt.reduce((n, m, p) => {
  //   // console.log(m)
  //   // if (n[p].todayDate === m.id) return { ...n[p], m }
  //   // console.log({ ...n[p], ...m })

  //   return n[p].todayDate === m.id && { ...n[p], ...m }
  // }, qq)

  // console.log(result2)
  // equivalent to: a.map((item, index) => ({...item, ...b[index]}));
  // console.log(result)

  // const arr = [1, 2, 3]
  // const www = eee.reduce((a, b, c) => {
  //   // console.log(a, 123, b)s
  //   return a, { ...b, qwe: 123 }
  // }, {})
  // console.log(www)

  const a = [
    { fruit: 'banana', price: 100, quality: 'high' },
    { fruit: 'orange', price: 50, quality: 'average' },
    { fruit: 'orange', price: 50, quality: 'average' },
    { fruit: 'orange', price: 50, quality: 'average' },
  ]
  const b = [
    { fruit: 'ba' },
    { fruit: 'banana' },
    { fruit: 'banana' },
    { fruit: 'banana' },
    { fruit: 'banana', count: 4 },
    { fruit: 'banana', count: 4 },
    { fruit: 'banana', count: 4 },
    { fruit: 'banana', count: 4 },
    { fruit: 'orange', count: 10 },
  ]

  // const result = totalDate.map((item, index) => {
  // console.log(index)
  // console.log(item)
  // console.log(item.id === qq[index].todayDate)
  // console.log(item.id)
  // console.log(qq[index].todayDate)
  // })
  // equivalent to: a.map((item, index) => ({...item, ...b[index]}));
  // console.log(result)
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
