"use client";

import styles from './Search.module.scss';
import React, { useState } from 'react';
import { IRecipesApi } from '@database/models/recipes';
import { api } from '@database/api';
import Link from 'next/link';
import Loader from '@components/loaders/Style2';
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<IRecipesApi[] | []>([]);

    const fetchResults = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!value) return setResults([]);
        setLoading(true);
        const res = await api.get(`/public/recipes?name=${value}`);
        setResults(res.data.data);
        setLoading(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    return (
        <div className={styles.container}>

        <section className={styles.header}>
            <h1> LETS START COOKING! </h1>
        </section>

        <section className={styles.search}>
            <form onSubmit={fetchResults}>
                <button onClick={fetchResults}><FaSearch/></button>
                <input
                    placeholder="Search recipes"
                    name={value}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                />
            </form>
        </section>
          
        <section className={styles.results}>
            {loading && <Loader center />}
            <h2>{results.length ? `Recipes [ ${results.length} ]` : ""}</h2>
            {results.map(el => 
                <Link href={`/recipes/${el._id}?name=${el.name}&category=${el.category}`} className={styles.element} key={el._id.toString()}>
                    <img src={el.image[0]} alt={el.name} />
                    <div>
                        <p>{el.duration} Minutes | {el.views} Views</p>
                        <p>{el.name}</p>
                    </div>
                </Link>
            )}
        </section>

        </div>
    );
};

export default Search;
