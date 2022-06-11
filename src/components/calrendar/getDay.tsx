import { useCallback, useEffect, useState } from 'react'

import { useMount } from 'react-use'

const DATE: Date = new Date()
const YEAR: number = DATE.getFullYear()
const MONTH: number = DATE.getMonth() + 1
interface IQWE {
  id: string
  year: number
  month: number
  date: number
  currentStatus: string
}
const GetDay = () => {
  const [currentMonth, setMonth] = useState(MONTH)
  const [currentYear, setYear] = useState(YEAR)
  const [totalDate, setTotalDate] = useState<IQWE[]>([])
  const [currentDayLength, setCurrentDayLength] = useState(0)
  const [pastDayLength, setPastDayLength] = useState<number>(0)
  const changeDate = useCallback(
    (month: number) => {
      // 이전 달의 요일과 날짜
      const previousLastDay = new Date(currentYear, month - 1, 0).getDay()
      const previousLastDate = new Date(currentYear, month - 1, 0).getDate()
      // 현재 달의 요일과 날짜
      const currentLastDay = new Date(currentYear, month, 0).getDay()
      const currentLastDate = new Date(currentYear, month, 0).getDate()

      const pastDateList = [...Array(previousLastDay + 1)]
        .reduce((a, b, c) => a.concat(previousLastDate - c), [])
        .sort((a: number, b: number) => a - b)

      const nextDateList = [...Array(6 - currentLastDay)].reduce((a, _b, c) => a.concat(c + 1), [])

      const currentDateList = [...Array(currentLastDate)].reduce((a, _b, c) => a.concat(c + 1), [])

      setPastDayLength(pastDateList.length)
      setCurrentDayLength(currentDateList.length)

      const totalDateList = [...pastDateList, ...currentDateList, ...nextDateList].reduce((a, b, c) => {
        if (c < pastDateList.length) {
          if (currentMonth === 1) {
            return a.concat({
              id: `${currentYear - 1}-12-${b}`,
              year: currentYear - 1,
              month: 12,
              date: b,
              currentStatus: 'pastMonth',
            })
          }
          return a.concat({
            id: `${currentYear}-${currentMonth - 1}-${b}`,
            year: currentYear,
            month: currentMonth - 1,
            date: b,
            currentStatus: 'pastMonth',
          })
        }
        if (c >= pastDateList.length && c < pastDateList.length + currentDateList.length) {
          return a.concat({
            id: `${currentYear}-${currentMonth}-${b}`,
            year: currentYear,
            month: currentMonth,
            date: b,
            currentStatus: 'thisMonth',
          })
        }
        if (currentMonth === 12) {
          return a.concat({
            id: `${currentYear + 1}-${1}-${b}`,
            year: currentYear + 1,
            month: 1,
            date: b,
            currentStatus: 'nextMonth',
          })
        }
        return a.concat({
          id: `${currentYear}-${currentMonth + 1}-${b}`,
          year: currentYear,
          month: currentMonth + 1,
          date: b,
          currentStatus: 'nextMonth',
        })
      }, [])

      return totalDateList
    },
    [currentMonth, currentYear]
  )

  useEffect(() => {
    setTotalDate(changeDate(currentMonth))
  }, [])

  useEffect(() => {
    setTotalDate(changeDate(currentMonth))
  }, [changeDate, currentMonth, currentYear])

  return { currentMonth, currentYear, totalDate, setMonth, setYear, currentDayLength, pastDayLength }
}

export default GetDay
