"use client";

import React, { Suspense, lazy } from 'react';
import UseRecipesIdContext from './Context';

import Edit from './edit';
import Mode from './mode';
import Loader from '@components/loaders/Style2';

const Delete = lazy(() => import('./delete'));
const Preview = lazy(() => import('./preview'));

const RecipesIdRoute = () => {  

  return (
    <Suspense fallback={<Loader/>}>
      <UseRecipesIdContext>
        <Mode />
        <Edit />
        <Preview />
        <Delete />
      </UseRecipesIdContext>
    </Suspense>
  )
}

export default RecipesIdRoute