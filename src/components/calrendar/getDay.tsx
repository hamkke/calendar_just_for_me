import { useEffect, useState } from 'react'

import { useMount } from 'react-use'

const DATE: Date = new Date()
const YEAR: number = DATE.getFullYear()
const MONTH: number = DATE.getMonth() + 1

const GetDay = () => {
  const [currentMonth, setMonth] = useState<number>(MONTH)
  const [currentYear, setYear] = useState<number>(YEAR)
  const [totalDate, setTotalDate] = useState<number[]>([])
  const [currentDayLength, setCurrentDayLength] = useState<number>(0)
  const [pastDayLength, setPastDayLength] = useState<number>(0)

  const changeDate = (month: number) => {
    // 이전 달의 요일과 날짜
    const previousLastDay = new Date(currentYear, month - 1, 0).getDay()
    const previousLastDate = new Date(currentYear, month - 1, 0).getDate()
    // 현재 달의 요일과 날짜
    const currentLastDay = new Date(currentYear, month, 0).getDay()
    const currentLastDate = new Date(currentYear, month, 0).getDate()

    const pastDateList = [...Array(previousLastDay + 1)]
      .reduce((a, b, c) => a.concat(previousLastDate - c), [])
      .sort((a: number, b: number) => a - b)
    const nextDateList = [...Array(6 - currentLastDay)].reduce((a, b, c) => a.concat(c + 1), [])
    const currentDateList = [...Array(currentLastDate)].reduce((a, b, c) => a.concat(c + 1), [])

    const totalDateList = [...pastDateList, ...currentDateList, ...nextDateList]

    setCurrentDayLength(currentDateList.length)
    setPastDayLength(pastDateList.length)

    return totalDateList
  }

  useMount(() => {
    setTotalDate(changeDate(currentMonth))
  })

  useEffect(() => {
    setTotalDate(changeDate(currentMonth))
  }, [currentMonth, currentYear])

  return { currentMonth, currentYear, totalDate, setMonth, setYear, currentDayLength, pastDayLength }
}

export default GetDay
