import styles from './Home.module.scss';
import React, { useState } from 'react';
import Link from 'next/link';
import { PropsTypes } from 'pages';
import { IRecipesResponse } from '@database/models/recipes';
import { readminutes, ddmmyy } from '@utils/time';
import { AiOutlineClockCircle } from 'react-icons/ai';

import SlideIn from '@components/slidein/Style1';
import Button from '@components/button/Button';
import Observer from '@components/observer/Observer';

interface Props {
  results: IRecipesResponse[] | null,
  setResults: React.Dispatch<React.SetStateAction<IRecipesResponse[] | null>>,
  recipes: IRecipesResponse[] | null
}

const HomeIndex = ({ recipes }: PropsTypes) => {

  const [results, setResults] = useState(recipes);

  const props = {
    results,
    setResults,
    recipes
  }

  return (
    <div className={styles.container}>
      
      <Search {...props}/>
    
      <Sort {...props} />

      <Results {...props} />

    </div>
  )
}

export default HomeIndex;

const Search = ({setResults, recipes}: Props) => {
  const [search, setSearch] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!recipes) return;
    const {value} = e.target;
    setSearch(value);
    const results = recipes.filter(el => el.name.toLowerCase().includes(value.toLowerCase()));
    setResults(results);
  };

  return (
    <div className={styles.search}>
      <input value={search} placeholder="Search for recipes" onChange={onChange} />
    </div>
  )
}

const Sort = ({results, setResults}: Props) => {
  type SortKeys = 'duration' | 'timestamp' | 'views';

  const [sort, setSort] = useState<{selected: SortKeys, value: number}>({ selected: "timestamp", value: -1 });

  const onSort = (selected: SortKeys, value: number) => {
    if (!results) return;
    let r = [...results];
    if (value === 1) r = r.sort((a, b) => a[selected] - b[selected]);
    if (value === -1) r = r.sort((a, b) => b[selected] - a[selected]);
    setResults(r);
    setSort({ selected, value });
  };  

  return (
    <div className={styles.sort}>
      <h3>RESULTS [ {results?.length || 0} ]</h3>
      <SlideIn icon={<Button label1={"SORT"} color="black" />} iconOpen={"SORT RESULTS"}>
        <p>DURATION</p>
        <div className={styles.buttons}>
          <button className={(sort.selected === "duration" && sort.value === -1) ? styles.selected : ""} onClick={() => onSort("duration", -1)}> Longest </button>
          <button className={(sort.selected === "duration" && sort.value === 1) ? styles.selected : ""} onClick={() => onSort("duration", 1)}> Shortest </button>
        </div>
        <p>DATE</p>
        <div className={styles.buttons}>
          <button className={(sort.selected === "timestamp" && sort.value === -1) ? styles.selected : ""} onClick={() => onSort("timestamp", -1)}> Latest </button>
          <button className={(sort.selected === "timestamp" && sort.value === 1) ? styles.selected : ""} onClick={() => onSort("timestamp", 1)}> Oldest </button>
        </div>
        <p>VIEWS</p>
        <div className={styles.buttons}>
          <button className={(sort.selected === "views" && sort.value === -1) ? styles.selected : ""} onClick={() => onSort("views", -1)}> Most </button>
          <button className={(sort.selected === "views" && sort.value === 1) ? styles.selected : ""} onClick={() => onSort("views", 1)}> Least </button>
        </div>
      </SlideIn>
    </div>
  )
}

const Results = ({results}: Props) => {
  return (
    <div className={styles.results}>
      {results?.map(el => 
        <Observer key={el._id}>
          <Link href={`/recipes/${el._id}`} className={styles.recipe}>
            <div className={styles.duration}>
              <p><AiOutlineClockCircle/> {readminutes(el.duration)}</p>
              <p>Views {el.views}</p>
            </div>
            <div className={styles.image}>
              <img src={el.image} alt="recipe" />
            </div>
            <div className={styles.information}>
              <h2>{el.name.toUpperCase() || "UNKNOWN"}</h2>
              <p>{ddmmyy(el.timestamp)}</p>
            </div>
          </Link> 
        </Observer>
      )}
    </div>
  )
}