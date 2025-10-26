"use client";

import styles from './Preview.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';
import Loader from '@components/loaders/Style1';
import Link from 'next/link';

const Edit = () => {

  const {mode, recipes} = useContext(Context);

  if(mode !== "preview") return <div></div>

  if(!recipes) return <Loader />

  const lines = recipes.instructions.split("\n");

  const removeWhiteSpace = (text: string) => {
    return text.split("\n").filter(el => el !== "")
  };

  const conditions = {
    header: (line: string) => line.startsWith("#"),
    break: (line: string) => line.trim() === "",
    https: (line: string) => line.includes("https://")
  };

  const Header = ({line, index}: {line: string, index: number}) => {
    return ( <h2 key={index}>{line.slice(1).trim()}</h2>) 
  };
  const Break = ({index}: {index: number}) => {
    return ( <br key={index} /> ) 
  };
  const Paragraph = ({line, index}: {line: string, index: number}) => {
    return ( <p key={index}>{line}</p>) 
  };
  const Https = ({line, index}: {line: string, index: number}) => {
    const parts = line.split(" ");
    const url = parts.find((part) => part.startsWith("https://")) || "";
    const rest = parts.filter((part) => part !== url).join(" ");
    return (
      <p key={index}>
        <Link className={styles.link} href={url as string} target="_blank" rel="noopener noreferrer">Link</Link>
        {" "}{rest}
      </p>
    ) 
  };

  function renderLine(line: string, index: number) {
    if (conditions.header(line)) {
      return <Header key={index} line={line} index={index} />;
    }
    if (conditions.break(line)) {
      return <Break key={index} index={index} />;
    }
    if (conditions.https(line)) {
      return <Https key={index} line={line} index={index} />;
    }
    return <Paragraph key={index} line={line} index={index} />;
  };

  return ( 
    <div className={styles.container}> 

      <section className={styles.header}>
        <h1>{recipes.name} ({recipes.category})</h1>
      </section>

      <section className={styles.image}>
        <img src={recipes.image[0]} alt={recipes.name} />
        <div>
          <p>{recipes.duration} Min | {recipes.views} Views</p>
        </div>
      </section>

      <section className={styles.ingredients}>
        <h1>Ingredients {removeWhiteSpace(recipes.ingredients).length}</h1>
        <p>{recipes.ingredients}</p>
      </section>

      <section className={styles.instructions}>
        <h1>Instructions</h1>
        {lines.map((line, index) => renderLine(line, index))}
      </section>

    </div>
  );
};

export default Edit;