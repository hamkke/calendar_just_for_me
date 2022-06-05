import { useState, useEffect } from 'react'
import store from 'store'
import DATA from 'data.json'
import dayjs from 'dayjs'

const Data = () => {
  const qwe = new Date(2022, 5, 1)
  const [myData, setMayData] = useState(DATA)
  console.log(dayjs(qwe).format('YYYY-MM-DD'))
  store.set('MYDATA', DATA)
  return <div>Data</div>
}

export default Data
