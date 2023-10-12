import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styles from './Basket.module.scss';
import { basketDisplayState, recipesState, selectLickedRecipes } from '~/state';
import { AiFillDelete } from 'react-icons/ai';
import { recipesApi } from '~/services';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export const Basket = () => {
    const basketRef = useRef<HTMLDivElement>(null);
    const [basketDisplay, setBasketDisplay] = useRecoilState(basketDisplayState);
    const recipes = useRecoilValue(selectLickedRecipes);
    const setRecipes = useSetRecoilState(recipesState);

    const handleDislikeRecipe = async (_id: string) => {
        await recipesApi.updateRecipe(_id, { liked: false });
        setRecipes((state) =>
            state.map((recipe) =>
                recipe._id === _id
                    ? {
                          ...recipe,
                          liked: false,
                      }
                    : recipe
            )
        );
    };

    return (
        <CSSTransition
            in={basketDisplay}
            unmountOnExit
            timeout={300}
            classNames={styles}
            refNode={basketRef}
        >
            <div
                className={styles.container}
                onClick={() => setBasketDisplay(false)}
            >
                <div
                    className={styles.basket}
                    onClick={(e) => e.stopPropagation()}
                    ref={basketRef}
                >
                    <h2>Panier</h2>
                    <ul className={styles.basket__list}>
                        {recipes.map((recipe) => (
                            <li
                                key={recipe._id}
                                className={styles.basket__item}
                            >
                                <span>{recipe.title}</span>
                                <button onClick={() => handleDislikeRecipe(recipe._id)}>
                                    <AiFillDelete size={20} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </CSSTransition>
    );
};
