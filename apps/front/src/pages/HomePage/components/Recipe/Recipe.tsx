// Styles
import styles from './Recipe.module.scss';
// Libs
import  { MouseEvent } from 'react';
import { Recipe as TRecipe } from 'types';
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai';

type RecipeProps = {
    recipe: TRecipe;
    updateRecipe: (updatedRecipe: TRecipe) => void;
    deleteRecipe: (_id: string) => void;
};

export const Recipe = ({ recipe, updateRecipe, deleteRecipe }: RecipeProps) => {
    const handleClickLicke = () => {
        updateRecipe({ ...recipe, liked: !recipe.liked });
    };

    const handleClickDelete = (e: MouseEvent) => {
        e.stopPropagation();
        deleteRecipe(recipe._id);
    };

    return (
        <article
            className={styles.recipe}
            onClick={handleClickLicke}
        >
            <button
                className={styles.recipe__deleteButton}
                onClick={handleClickDelete}
            >
                <AiOutlineClose size={25} />
            </button>
            <div className={styles.recipe__imageContainer}>
                <img
                    src={recipe.image}
                    alt='recette'
                />
            </div>
            <div className={styles.recipe__content}>
                <h3>{recipe.title}</h3>
                <AiFillHeart
                    size={20}
                    className={recipe.liked ? styles.active : ''}
                />
            </div>
        </article>
    );
};
