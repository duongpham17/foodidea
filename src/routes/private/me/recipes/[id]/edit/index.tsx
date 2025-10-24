"use client";

import React, { useEffect, useContext } from 'react';
import { Context } from '../Context';
import { upload, remove } from '@thirdparty/pinata';
import { IRecipesApi } from '@database/models/recipes';
import validation from './validation';
import useForm from '@hooks/useForm';
import Form from '@components/forms/Style1';
import Loader from '@components/loaders/Style1';
import Input from '@components/inputs/Style1';
import Textarea from '@components/textareas/Style1';
import Button from '@components/buttons/Style1';
import File from '@components/files/Single';

const Editing = ({recipes}:{recipes: IRecipesApi}) => {

    const { loading, updateRecipes } = useContext(Context);

    const { onSubmit, values, onChange, edited, validationErrors } = useForm(recipes, callback, validation);

    async function callback(){
        await updateRecipes(values);
    };

    const onUpload = async (file: File) => {
        const {url, id} = await upload(file);
        await updateRecipes({...recipes, image: [url, id]});
    };

    const onDelete = async () => {
        await remove([ values.image[1] ]);
        await updateRecipes({...recipes, image: []});
    };

    const height = values.instructions.split("\n").filter(el => el === "").length * 70;

    return (
        <Form onSubmit={onSubmit}>

            <Input 
                label1="Name of recipe"
                placeholder='Enter name of recipe'
                name="name"
                value={values.name}
                onChange={onChange}
                error={validationErrors.name}
            />

            <File
                id={values._id.toString()}
                src={values.image[0]}
                onUpload={onUpload}
                onDelete={onDelete}
            />

            <Input 
                label1="Category"
                placeholder='What category is your recipe?'
                name="category"
                value={values.category}
                onChange={onChange}
                error={validationErrors.category}
            />

            <Input 
                label1="Duration (minutes)"
                placeholder='Approximately in minutes'
                type="number"
                name="duration"
                value={values.duration}
                onChange={onChange}
                error={validationErrors.duration}
            />

            <Textarea 
                label1="Ingredients"
                placeholder='What ingredients are used?'
                name="ingredients"
                value={values.ingredients}
                onChange={onChange}
            />

            <Textarea 
                label1="Instructions"
                placeholder='Use for #header'
                name="instructions"
                height={height}
                value={values.instructions}
                onChange={onChange}
            />

            {edited &&
                <Button 
                    label1="Update" 
                    type="submit" 
                    color="primary"
                    loading={loading} 
                />
            }

        </Form>
    );
};

const Recipe = () => {
  const { recipes, mode } = useContext(Context);

  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return <Loader />;

  if (mode !== "edit") return <div></div>;

  if (!recipes) return <Loader />;

  return <Editing recipes={recipes} />;
};

export default Recipe