import { atom } from "recoil";
import { Recipe } from "types";

export const recipesState = atom<Recipe[]>({
    key: 'recipesState',
    default: [],
});

