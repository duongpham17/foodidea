"use client";

import React, { useContext } from 'react';
import { Context } from '../Context';
import Link from '@components/links/Style1';
import Button from '@components/buttons/Style1';
import Loader from '@components/loaders/Style1';

const Delete = () => {
  const {mode, removeRecipes, loading, recipes} = useContext(Context);

  if( mode !== "delete" ) return <div></div>;

  if( loading ) return <Loader />;

  if( !recipes ) return <Link href={`/dashboard`} value="Recipe has been deleted, go back to dashboard." color="light" />
 
  return (
    <div>
      <Button 
        label1="Delete" 
        warning 
        onClick={removeRecipes} 
      />
    </div>
  )
}

export default Delete