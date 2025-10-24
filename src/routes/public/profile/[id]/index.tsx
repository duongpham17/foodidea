import React from 'react';
import UseProfileContext from './Context';

import User from './user';
import Recipes from './recipes';

const ProfileId = () => {
  return (
    <UseProfileContext>
        
        <section>
          <User />
        </section>

        <section>
          <Recipes />
        </section>

    </UseProfileContext>
  )
}

export default ProfileId