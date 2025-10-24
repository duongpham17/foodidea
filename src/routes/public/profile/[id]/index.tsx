import React, { Suspense } from 'react';
import UseProfileContext from './Context';
import Loader from '@components/loaders/Style1';
import User from './user';
import Recipes from './recipes';

const ProfileId = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <UseProfileContext>
          
          <section>
            <User />
          </section>

          <section>
            <Recipes />
          </section>

      </UseProfileContext>
    </Suspense>
  )
}

export default ProfileId