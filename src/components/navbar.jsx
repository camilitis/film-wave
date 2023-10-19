import "../index.css";
import { Input, Link } from '@nextui-org/react';
import { useNavigate } from "react-router-dom";

import {SearchIcon} from "../components/searchIcon";

function NavBar({search, setsearch}) {
  const navigate = useNavigate()

  return (
    <header className="flex flex-row justify-between items-center NavBar">
      <Link size="lg" href="/"><h1>FilmWave</h1></Link>

      <div className="NavBar-input">
      <Input
        value={search}
        isClearable
        radius="lg"
        onChange={(e) => setsearch(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === 'Enter') {
            setsearch(e.target.value)
            navigate(`/search/${search}`)
          }
        }}
        onClear={() => {setsearch(""); navigate("/")}}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          inputWrapper: [
            "shadow-xl",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </div>
    </header>
  )
}

export default NavBar