import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Health from 'components/health'
import Home from 'components/home'
import Graph from 'components/graph'
import Layout from 'components/layout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route element={<Health />} />
          <Route element={<Graph />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
