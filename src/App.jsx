import { useState } from 'react';
import { NextUIProvider, Link } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/navbar';
import HomePage from './routes/home';
import MoviePage from './routes/movie';
import DashboardPage from './routes/dashboard';
import SearchPage from './routes/search';
import CelebrityPage from './routes/celebrity';

function App() {
  const [search, setsearch] = useState("")

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="App m-auto">
          <NavBar search={search} setsearch={setsearch}/>

          <hr className="mb-4"/>

          <Routes>
            <Route exact path='/'
              element={ <HomePage/> }
            />
            <Route exact path='/movie/:id'
              element={ <MoviePage/> }
            />
            <Route path='/celebrity/:id'
              element={ <CelebrityPage/> }
            />
            <Route exact path='/movies/:id'
              element={ <DashboardPage/> }
            />
            <Route path='/search/:id'
              element={ <SearchPage/> }
            />
            <Route path='*' element={<Navigate to="/"/>}/>
          </Routes>

          <hr className="my-4"/>

          <footer className="flex justify-center text-center mb-2">
          <p>©2023 <Link href="https://camilaguerra.vercel.app/">Camila</Link>. Powered by <Link href="https://www.themoviedb.org/">The Movie DB</Link>. View project on <Link href="https://github.com/camilitis/film-wave">GitHub</Link>.</p>
        </footer>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App