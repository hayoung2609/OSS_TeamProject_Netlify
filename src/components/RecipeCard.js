// src/components/RecipeCard.js
import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
    return (
        <div
            className="bg-surface rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer"
            onClick={onClick}
        >
            <div className="overflow-hidden">
                <img
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/FFF7ED/CCC?text=Image\nNot\nFound' }}
                />
            </div>
            <div className="p-5">
                <p className="text-sm text-brand-dark font-semibold">{recipe.category}</p>
                <h3 className="text-lg font-bold text-text-primary mt-1 truncate" title={recipe.recipeName}>{recipe.recipeName}</h3>
                <p className="text-xs text-text-secondary mt-2">{recipe.cookingMethod}</p>
            </div>
        </div>
    );
};

export default RecipeCard;