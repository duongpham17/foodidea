"use client";

import styles from './Recipes.module.scss';
import UseContextRecipeId from './Context';
import Creator from './creator';
import Image from './image';
import Header from './header';
import Instructions from './instructionts';
import Ingredients from './ingredients';

const RecipesIdRoute = () => {

  return ( 
    <UseContextRecipeId>
      <div className={styles.container}> 

        <section>
          <Creator />
        </section>

        <section>
          <Image />
        </section>

        <section>
          <Header />
        </section>

        <section>
          <Ingredients />
        </section>

        <section>
          <Instructions />
        </section>

      </div>
    </UseContextRecipeId>
  );
}

export default RecipesIdRoute;