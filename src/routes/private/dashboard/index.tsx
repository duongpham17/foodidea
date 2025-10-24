"use client";

import { useContext } from 'react';
import UseDashboardContext from './Context';
import Recipes from './recipes';
import { Context } from '@context/useAuthentication';

import Information from './information';

const DashboardRoute = () => {

  const {protect} = useContext(Context);
  protect(["admin", "user"]); 

  return (
    <UseDashboardContext>

      <section>
        <Information />
      </section>
      
      <section>
        <Recipes />
      </section>
    
    </UseDashboardContext>
  )
};

export default DashboardRoute