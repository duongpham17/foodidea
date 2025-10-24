"use client";

import styles from './Instructions.module.scss';
import React, { useContext } from 'react';
import { Context } from '../Context';
import Link from 'next/link';

const Instructions = () => {

  const {recipe} = useContext(Context);

  const lines = recipe?.instructions.split("\n");

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
      <h1>Instructions</h1>
      {lines?.map((line, index) => renderLine(line, index))}
    </div>
  );
}

export default Instructions;