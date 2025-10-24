"use client";

import React from 'react';
import UseRecipesIdContext from './Context';
import Edit from './edit';
import Preview from './preview';
import Mode from './mode';
import Delete from './delete';

const RecipesIdRoute = () => {  

  return (
    <UseRecipesIdContext>
      <Mode />
      <Edit />
      <Preview />
      <Delete />
    </UseRecipesIdContext>
  )
}

export default RecipesIdRoute