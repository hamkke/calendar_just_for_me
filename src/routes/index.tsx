import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'states'
import { getStatusListFB, getRecapListFB } from 'states/userData'
import Layout from 'components/layout'

import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'
import DATA from 'data.json'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  // useEffect(() => {
  //   setDoc(doc(db, 'my-list', 'STATUS'), {
  //     // recapList: [...DATA.recapList],
  //     statusList: [...DATA.statusList],
  //   })
  // })

  useEffect(() => {
    dispatch(getStatusListFB())
    dispatch(getRecapListFB())
  }, [dispatch])
  return (
    <div>
      <Layout />
    </div>
  )
}

export default App
