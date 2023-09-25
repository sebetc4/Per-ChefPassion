const deletAllRecipes = async () => {
    try {
        const res = await fetch('https://restapi.fr/api/recipes');
        const allRecipes = await res.json();
        allRecipes.forEach(async (recipe) => {
            await fetch(`https://restapi.fr/api/recipes/${recipe._id}`, {
                method: 'DELETE',
            });
        });
        console.log('Recipes deleted successfully');
    } catch (err) {
        console.log(err);
    }
};

deletAllRecipes();
