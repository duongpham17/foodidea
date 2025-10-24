"use client";

import styles from './Background.module.scss';
import React, { useEffect, useState } from 'react';
import { GiRoastChicken, GiTomato, GiStrawberry, GiOrangeSlice, GiHotDog, GiCakeSlice } from "react-icons/gi";
import { FaHamburger, FaPepperHot } from "react-icons/fa";
import { MdOutlineEggAlt, MdIcecream  } from "react-icons/md";
import { IconType } from 'react-icons';

const Background = () => {
  const foods = [GiRoastChicken, GiTomato, FaHamburger, MdOutlineEggAlt, GiStrawberry, MdIcecream, FaPepperHot, GiOrangeSlice, GiHotDog ,GiCakeSlice];

  const [icons, setIcons] = useState<IconType[] | []>([]);

  const getRandomInt = (max: number) => Math.floor(Math.random() * max);

  useEffect(() => {
    const result = [...Array(20)].map(() => foods[getRandomInt(foods.length)]);
    setIcons(result);
  }, []);

  return (
    <div className={styles.container}>
      {icons.map((IconComponent, i) => (
        <div key={i} className={styles[`item${i + 1}`]}>
          <IconComponent />
        </div>
      ))}
    </div>
  );
};

export default Background;
