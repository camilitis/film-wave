import { useState } from 'react';
import { NextUIProvider, Link } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/navbar';
import HomePage from './routes/home';
import MoviePage from './routes/movie';
import GenrePage from './routes/genre';
import DashboardPage from './routes/dashboard';
import SearchPage from './routes/search';
import ActorPage from './routes/actor';

function App() {
  const [search, setsearch] = useState("")

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="App">
          <NavBar search={search} setsearch={setsearch}/>

          <hr className="py-3"/>

          <Routes>
            <Route exact path='/'
              element={ <HomePage/> }
            />
            <Route exact path='/movie/:id'
              element={ <MoviePage/> }
            />
            <Route exact path='/actor/:id'
              element={ <ActorPage/> }
            />
            <Route exact path='/genre/:id'
              element={ <GenrePage/> }
            />
            <Route exact path='/movies/:id'
              element={ <DashboardPage/> }
            />
            <Route path='/search/:id'
              element={ <SearchPage/> }
            />
            <Route path='*' element={<Navigate to="/"/>}/>
          </Routes>

          <hr/>
        </div>

        <footer className="flex justify-center p-5">©2023 <Link href='https://camilaguerra.vercel.app/' className='ml-1'>Camila</Link>. Powered by <Link href='https://developer.themoviedb.org/docs' className='ml-1'>The Movie DB</Link>. View project on <Link href='https://camilaguerra.vercel.app/' className='ml-1'>GitHub</Link>.</footer>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App