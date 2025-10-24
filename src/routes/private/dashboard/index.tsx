"use client";

import { useContext, Suspense } from 'react';
import UseDashboardContext from './Context';
import { Context } from '@context/useAuthentication';
import Loader from '@components/loaders/Style1';
import Recipes from './recipes';
import Information from './information';


const DashboardRoute = () => {

  const {protect} = useContext(Context);
  protect(["admin", "user"]); 

  return (
    <Suspense fallback={<Loader/>}>
      <UseDashboardContext>

        <section>
          <Information />
        </section>
        
        <section>
          <Recipes />
        </section>
      
      </UseDashboardContext>
    </Suspense>
  )
};

export default DashboardRoute