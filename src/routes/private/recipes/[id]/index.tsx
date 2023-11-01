import styles from './Id.module.scss';
import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRecipesResponse } from '@database/models/recipes';
import { upload, remove } from '@thirdparty/nftstorage';
import { api } from '@database/api';
import { ddmmyy, readminutes } from '@utils/time';
import { generateid } from '@utils/function';

import useForm from '@hooks/useForm';
import useFetch from '@hooks/useFetch';
import useOpen from '@hooks/useOpen';

import Loading from '@components/loading/Loading';
import Cover from '@components/cover';
import Container from '@components/containers/Style1';
import File from '@components/file/Single';
import Flex from '@components/flex/Style1';
import Button from '@components/button/Button';
import Round from '@components/button/Round';
import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';
import Choice from '@components/inputs/Choice'
import Line from '@components/line/Style1';

import { AiOutlinePlus } from 'react-icons/ai';
import { HiArrowNarrowLeft } from 'react-icons/hi';

const IDIndex = () => {
  const router = useRouter();
  return (!router.query.id ? <Loading /> : <FetchID id={router.query.id as string} />)
};

export default IDIndex

const FetchID = ({id}: {id: string}) => {
  const {data} = useFetch<IRecipesResponse>({url: `/recipes/${id}`, dependencies: [id]});
  return ( !data ? <Loading /> : <Edit data={data} /> )
};

const Edit = ({data}: {data: IRecipesResponse}) => {

  const [reorderIndex, setReorederIndex] = useState(-1);

  const {onOpenValue, openValue} = useOpen<"name" | "ingredients" | "image" | "steps" | "">({initialState: ""});

  const {values, onChange, onSubmit, edited, loading, onSetValue, setValues} = useForm(data, callback);

  async function callback(){
    try{
      await api.patch("/recipes", values);
    } catch(err){
      console.log(err);
    }
  };

  const onCreateIngredients = async () => {
    try{
      const ingredients = [...values.ingredients, ""];
      await api.patch("/recipes", {...values, ingredients});
      onSetValue({ingredients})
    } catch(err){
      console.log(err);
    }
  };

  const onCreateSteps = async () => {
    try{
      const steps = [...values.steps, {format: "", data: ""}];
      const response = await api.patch("/recipes", {...values, steps});
      setValues(response.data.data);
    } catch(err){
      console.log(err);
    }
  };

  const onUploadImage = async (blob: any) => {
    try{
      const {url} = await upload(blob);
      await api.patch("/recipes", {...values, image: url});
      onSetValue({image: url});
    } catch(err){
      console.log(err);
    }
  };

  const onDeleteImage = async (cid: string) => {
    try{
      await remove(cid);
      await api.patch("/recipes", {...values, image: ""});
      onSetValue({image: ""});
    } catch(err){
      console.log(err);
    }
  };

  const onReorederSteps = async (index: number) => {
    if(reorderIndex === index) return setReorederIndex(-1);
    if(reorderIndex === -1) return setReorederIndex(index);
    const updated = {...values};
    const [newData, oldData] = [ updated.steps[index], updated.steps[reorderIndex] ];
    updated.steps[index]        = oldData;
    updated.steps[reorderIndex] = newData;
    await api.patch("/recipes", updated);
    setValues(updated);
    setReorederIndex(-1);
  };

  return (
    <div className={styles.container}>

      <Link href={"/me/recipes"} className={styles.back}>
        <HiArrowNarrowLeft/>
        <span>back to recipes</span>
      </Link>

      <div className={styles.extra}>
        <p>Views {data.views} </p>
      </div>

      <section className={styles.image} onClick={() => onOpenValue("image")}>
        <img src={values.image || ""} alt="recipe" />
      </section>

      <section className={styles.name} onClick={() => onOpenValue("name")}>
        <h1>{values.name.toUpperCase() || "UNKNOWN RECIPE"}</h1>
        {!!values.duration && <p>  Duration {readminutes(values.duration)} </p>}
        <small>{ddmmyy(values.timestamp)}</small>  
      </section>

      <section className={styles.ingredients}>
       <Flex>
          <h2>INGREDIENTS [{values.ingredients.length}]</h2>
          <Round label1={<AiOutlinePlus size={16}/>} color="black" onClick={onCreateIngredients}/>
        </Flex>
        <Line />
        { values.ingredients.length 
          ? values.ingredients.map((el, index) => 
            <Ingredients 
              key={generateid()}
              parent={data} 
              setValues={setValues} 
              element={el} 
              index={index} 
              />
            )
          : <p>EMPTY</p>
        }
      </section>

      <section className={styles.steps}>
        <header>
          <Flex>
            <h2>STEPS [{values.steps.length}]</h2>
            <Round label1={<AiOutlinePlus size={16}/>} color="black" onClick={onCreateSteps}/>
          </Flex>
        </header>
        <Line />
        { values.steps.length 
          ? values.steps.map((el, index) => 
            <Steps 
              key={el._id} 
              parent={data} 
              setValues={setValues} 
              element={el} 
              index={index} 
              onReorederSteps={onReorederSteps} 
              reorderIndex={reorderIndex}/>
            )
          : <p>EMPTY</p>
        }
      </section>

      {openValue === "image" &&
        <Cover onClose={() => loading ? "" : onOpenValue("")}>
          <Container style={{"maxWidth": "600px"}}>
            <File 
              id="image"
              src={values.image}
              onDelete={onDeleteImage}
              onUpload={onUploadImage}
            />
          </Container>
        </Cover>
      }

      {openValue === "name" &&
        <Cover onClose={() => loading ? "" : onOpenValue("")}>
          <Container style={{"maxWidth": "600px"}}>
            <form onSubmit={onSubmit}>

              <Input label1="Recipe name" placeholder='....' name="name" value={values.name || ""} onChange={onChange} />

              <Input label1="Duration in minutes" type="number" placeholder='....' name="duration" value={values.duration || ""} onChange={onChange} />

              {edited && <Button label1="save" type="submit" loading={loading} color="blue"  />}
            </form>
          </Container>
        </Cover>
      }

    </div>
  )
};

interface PropsIngredientsTypes {
  parent:IRecipesResponse, 
  element: string, 
  index: number, 
  setValues: any
}

const Ingredients = ({parent, element, index, setValues}: PropsIngredientsTypes) => {

  const {onOpenValue, openValue} = useOpen<number>({initialState: -1});

  const {values, onChange, onSubmit, edited, loading} = useForm({text: element}, callback);

  async function callback(){
    try{
      const udpdated = {...parent};
      udpdated.ingredients[index] = values.text;
      await api.patch("/recipes", udpdated);
      setValues(udpdated);
    } catch(err){
      console.log(err);
    }
  };

  const onDelete = async () => {
    try{
      const udpdated = {...parent};
      udpdated.ingredients.splice(index, 1);
      await api.patch("/recipes", udpdated);
      setValues(udpdated);
    } catch(err){
      console.log(err);
    }
  };

  return (
    <div className={styles.ingredientChildren} onClick={() => onOpenValue(index)}>
      <div className={styles.children}>
        <span>{index+1}.</span>
        <span>{element || "unknown"}</span>
      </div>
    
      {openValue === index &&
        <Cover onClose={() => loading ? "" : onOpenValue(-1)}>
          <Container style={{"maxWidth": "600px"}}>
            <form onSubmit={onSubmit}>
              <Flex>
                <p>{index+1}. Ingredient </p>
                <Button label1="remove" onClick={onDelete} warning color='black'  />
              </Flex>

              <Line />

              <Input placeholder='....' name="text" value={values.text || ""} onChange={onChange} />

              {edited && <Button label1="save" type="submit" loading={loading} color="blue"  />}
            </form>
          </Container>
        </Cover>
      }
    </div>
  )
};

interface PropsStepsTypes {
  parent:IRecipesResponse, 
  element: IRecipesResponse["steps"][0], 
  index: number, 
  setValues: React.Dispatch<React.SetStateAction<IRecipesResponse>>,
  reorderIndex: number,
  onReorederSteps: (index: number) => Promise<void>,
}

const Steps = ({parent, element, index, setValues, onReorederSteps, reorderIndex}: PropsStepsTypes) => {

  const {onOpenValue, openValue} = useOpen<number>({initialState: -1});

  const {values, onChange, onSubmit, edited, loading, onSetValue} = useForm(element, callback);

  async function callback(){
    try{
      const udpdated = {...parent};
      udpdated.steps[index] = values;
      await api.patch("/recipes", udpdated);
      setValues(udpdated);
    } catch(err){
      console.log(err);
    }
  };

  const onDelete = async () => {
    try{
      const udpdated = {...parent};
      udpdated.steps.splice(index, 1);
      await api.patch("/recipes", udpdated);
      setValues(udpdated);
    } catch(err){
      console.log(err);
    }
  };

  const onUploadImage = async (blob: any) => {
    try{
      const {url} = await upload(blob);
      await api.patch("/recipes", {...values, data: url});
      onSetValue({data: url});
    } catch(err){
      console.log(err);
    }
  };

  const onDeleteImage = async (cid: string) => {
    try{
      await remove(cid);
      await api.patch("/recipes", {...values, data: ""});
      onSetValue({data: ""});
    } catch(err){
      console.log(err);
    }
  };

  return (
    <div className={styles.stepChildren} onClick={() => onOpenValue(index)}>

      <div className={`${styles.children} ${reorderIndex === index ? styles.selected : ""}`}>
        <h1 onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onReorederSteps(index)}>{index+1}.</button>
        </h1>
        { values.format === "HEADER" ?
            <h2>{values.data}</h2>
          : values.format === "NORMAL" ?
            <p>{values.data}</p>
          : values.format === "SMALL" ? 
            <small>{values.data}</small>
          : values.format === "LIGHT" ?
            <span>{values.data}</span> 
          : values.format === "BOLD" ?
            <b>{values.data}</b> 
          : values.format === "LINK" ?
            <a href={values.data} target="_blank" rel="noopener noreferrer">{values.data}</a> 
          : values.format === "IMAGE" ? 
            <img src={values.data} alt="preview" /> 
          : values.format === "VIDEO" ?
            <video src={values.data} controls />
          : <p>Unknown</p>
        }

      </div>
    
      {openValue === index &&
        <Cover onClose={() => loading ? "" : onOpenValue(-1)}>
          <Container style={{"maxWidth": "600px"}}>
            <form onSubmit={onSubmit}>
              <Flex>
                <p>{index+1}. </p>
                <Button label1="remove" onClick={onDelete} warning color='black'  />
              </Flex>

              <Line />

              <Choice value={values.format} label="" items={["header", "normal", "small", "light", "bold", "link", "image", "video" ]} onClick={(item) => onSetValue({format: item.toUpperCase()})} />

              <Line />

              {(values.format === "HEADER" || values.format === "NORMAL" || values.format === "SMALL" || values.format === "LIGHT" || values.format === "BOLD") &&
                <Textarea placeholder='...' name="data" value={values.data || ""} onChange={onChange} />
              }

              {(values.format === "IMAGE" || values.format === "VIDEO" || values.format === "LINK") &&
                <Input placeholder='URL' name="data" value={values.data || ""} onChange={onChange} />
              }
              {(values.format === "IMAGE" || values.format === "VIDEO") &&
                <File 
                  id={`step${values._id}`}
                  src={values.data}
                  onDelete={onDeleteImage}
                  onUpload={onUploadImage}
                />
              }

              {edited && <Button label1="save" type="submit" loading={loading} color="blue"  />}
            </form>
          </Container>
        </Cover>
      }
    </div>
  )
}