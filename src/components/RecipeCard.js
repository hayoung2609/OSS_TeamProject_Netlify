import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
            onClick={onClick}
        >
            <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-48 object-cover" 
                 onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/F7F7F7/CCC?text=Image\nNot\nFound' }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{recipe.recipeName}</h3>
                <p className="text-sm text-gray-600 mt-1">{recipe.category}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{recipe.cookingMethod}</span>
                    <span>{recipe.calorie} kcal</span>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;