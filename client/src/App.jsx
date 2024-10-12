import {Routes, Route} from 'react-router-dom'
import { Header } from './components/Header'
import Notes from './components/Notes'
import { ShowNotes } from './components/ShowNotes'
import './css/App.css'

function App() {

  return (
    <>
    <Header />
    <main className="main">
      <section className="main-section">
       
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/notes/:id' element={<ShowNotes />} />
        </Routes>
      </section>
    </main>
    </>
  )
}

export default App
