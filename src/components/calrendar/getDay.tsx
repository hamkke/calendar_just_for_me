import { useCallback, useEffect, useState } from 'react'

import { IsetDateList } from 'types/dayList'

const DATE: Date = new Date()
const YEAR: number = DATE.getFullYear()
const MONTH: number = DATE.getMonth() + 1

const GetDay = () => {
  const [currentMonth, setMonth] = useState(MONTH)
  const [currentYear, setYear] = useState(YEAR)
  const [totalDate, setTotalDate] = useState<IsetDateList[]>([])
  const [currentDayLength, setCurrentDayLength] = useState(0)
  const [pastDayLength, setPastDayLength] = useState<number>(0)

  const changeDate = useCallback(
    (month: number) => {
      // 이전 달의 요일과 날짜
      const setPrevMonth = new Date(currentYear, month - 1, 0)
      const previousLastDay = setPrevMonth.getDay()
      const previousLastDate = setPrevMonth.getDate()
      // 현재 달의 요일과 날짜
      const setCurrentMonth = new Date(currentYear, month, 0)
      const currentLastDay = setCurrentMonth.getDay()
      const currentLastDate = setCurrentMonth.getDate()

      const pastDateList = [...Array(previousLastDay + 1)]
        .reduce((a, _, c) => a.concat(previousLastDate - c), [])
        // .sort((a: number, b: number) => a - b)
        // 조금 더 간편하게 배열 뒤집는 방법이 있넹
        .reverse()

      const nextDateList = [...Array(6 - currentLastDay)].reduce((a, _, c) => a.concat(c + 1), [])

      const currentDateList = [...Array(currentLastDate)].reduce((a, _, c) => a.concat(c + 1), [])

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
  }, [changeDate, currentMonth, currentYear])

  return { currentMonth, currentYear, totalDate, setMonth, setYear, currentDayLength, pastDayLength }
}

export default GetDay
