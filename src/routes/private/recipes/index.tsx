import styles from './Recipes.module.scss';
import React, { useState } from 'react';
import Link from 'next/link';
import { api } from '@database/api';
import { IRecipesResponse } from '@database/models/recipes';
import { readminutes, ddmmyy } from '@utils/time';

import useOpen from '@hooks/useOpen';
import useFetch from '@hooks/useFetch';

import Cover from '@components/cover/Cover';
import Container from '@components/containers/Style1';
import Dropdown from '@components/dropdown/Style1';
import Button from '@components/button/Button';
import Loading from '@components/loading/Loading';
import Line from '@components/line/Style1';

import { AiOutlineClockCircle } from 'react-icons/ai';

interface Props {
  data: IRecipesResponse[] | undefined,
  setData: React.Dispatch<React.SetStateAction<IRecipesResponse[] | undefined>>,
};

const RecipesIndex = () => {

  const {data, setData, loading} = useFetch<IRecipesResponse[]>({url: "/recipes"});

  const props = {
    data, 
    setData, 
  };

  return ( loading ? <Loading /> : 
    <div className={styles.container}>

      <Create {...props} />

      <Recipes {...props} />

    </div>
  )
}

export default RecipesIndex;

const Recipes = ({data, setData}: Props) => {

  const {onOpenValue, openValue} = useOpen({});

  const onDeleteRecipe = async (id: string) => {
    if(!data) return;
    const updated = data.filter(el => el._id !== id);
    await api.delete(`/recipes/${id}`);
    setData(updated);
  };
  
  return (!data ? <div/> :
    <div className={styles.recipes}>
        {data.map(el => 
          <div className={styles.recipe} key={el._id}>
            <Dropdown>
              <Link href={`/me/recipes/${el._id}`}><Button label1="edit" color="light"/></Link>
              <Line />
              <Link href={`/recipes/${el._id}`}><Button label1="live" color="light"/></Link>
              <Line />
              <Button label1="delete" color="red" onClick={() => onOpenValue(el._id)}/>
            </Dropdown>

              <div className={styles.duration}>
                <p><AiOutlineClockCircle/> {readminutes(el.duration)}</p>
                <p>Views {el.views}</p>
              </div>
              <Link href={`/me/recipes/${el._id}`}>
                <div className={styles.image}>
                  <img src={el.image} alt="recipe" />
                </div>
              </Link>
              <Link href={`/me/recipes/${el._id}`}>
                <div className={styles.information}>
                  <h2>{el.name.toUpperCase() || "UNKNOWN"}</h2>
                  <small>{ddmmyy(el.timestamp)}</small>
                </div>
              </Link>

            {openValue === el._id &&
              <Cover onClose={() => onOpenValue("")}>
                <Container style={{"maxWidth": "500px"}}>
                  <Button label1="delete recipe" warning color="red" onClick={() => onDeleteRecipe(el._id)} />
                </Container>
              </Cover>
            }
          </div>  
        )}
    </div>
  )
}

const Create = ({setData, data}: Props) => {

  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    try{
      setLoading(true);
      const response = await api.post("/recipes");
      setData(data => data ? [response.data.data, ...data] : [response.data.data]);
      setLoading(false);
    } catch(err){
      console.log(err)
    }
  };

  return (
    <div className={styles.create}>
      <h3>RECIPES [ {data?.length || 0} ] </h3>
      <Button label1="CREATE" onClick={onCreate} color="black" loading={loading} />
    </div>
  )
};