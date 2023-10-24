import "../index.css";
import { Input, Link } from '@nextui-org/react';
import { useNavigate } from "react-router-dom";

import {SearchIcon} from "../components/searchIcon";

function NavBar({search, setsearch}) {
  const navigate = useNavigate()

  return (
    <header 
      className="flex flex-row justify-between items-center h-24
      max-[500px]:flex-col max-[500px]:h-28 max-[500px]:justify-center"
    >
      <Link size="lg" href="/"><h1 className="font-bold max-[500px]:mb-1">FilmWave</h1></Link>

      <div className="max-[500px]:w-full">
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
            inputWrapper: [
              "dark:bg-default/60",
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