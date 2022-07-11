import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'states'
import { getStatusListFB, getRecapListFB } from 'states/userData'
import Layout from 'components/layout'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getStatusListFB())
    dispatch(getRecapListFB())
  }, [dispatch])
  return <Layout />
}

export default App
