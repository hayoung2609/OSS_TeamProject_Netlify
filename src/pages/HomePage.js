// src/pages/HomePage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import RandomRecipe from '../components/RandomRecipe';
import { useForm } from 'react-hook-form'; // 1. useForm 임포트

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // 2. useState 대신 useForm 사용
    const { register, watch } = useForm({
        defaultValues: {
            searchTerm: '',
            sortOrder: 'latest'
        }
    });

    // 3. watch로 폼 값 실시간 추적
    const searchTerm = watch('searchTerm');
    const sortOrder = watch('sortOrder');

    useEffect(() => {
        const fetchAndSetRecipes = async () => {
            setLoading(true);
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(apiUrl);
                const initialRecipes = response.data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setRecipes(initialRecipes);
                if (initialRecipes.length > 0) {
                    setRandomRecipe(initialRecipes[Math.floor(Math.random() * initialRecipes.length)]);
                }
            } catch (error) {
                console.error("레시피 데이터를 불러오는 데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAndSetRecipes();
    }, []);

    const recommendRandomRecipe = useCallback(() => {
        if (recipes.length > 0) {
            const randomIndex = Math.floor(Math.random() * recipes.length);
            setRandomRecipe(recipes[randomIndex]);
        }
    }, [recipes]);

    const handleCardClick = (id) => navigate(`/recipe/${id}`);
    
    // 4. handleSearchChange 제거 (react-hook-form이 관리)

    // 원본 정렬 로직 그대로 유지
    const filteredAndSortedRecipes = useMemo(() => {
        const filtered = recipes.filter(recipe =>
            recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        let sorted = [...filtered]; 
        switch (sortOrder) {
            case 'popularity':
                 sorted.sort((a, b) => parseInt(b.id) * 2 - parseInt(a.id) * 2);
                break;
            case 'rating':
                 sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
                break;
            case 'reviews':
                 sorted.sort((a, b) => parseInt(a.id) * 2 - parseInt(b.id) * 2);
                break;
            case 'latest':
            default:
                sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                break;
        }
        return sorted;
    }, [recipes, sortOrder, searchTerm]); // 의존성 배열에 react-hook-form state 반영

    if (loading) {
        return <div className="text-center py-20 text-brand-dark font-semibold">🍳 맛있는 레시피를 불러오는 중...</div>;
    }

    return (
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary">오늘 뭐 먹지?</h1>
                <p className="text-text-secondary mt-3 text-lg">버튼을 눌러 오늘의 특별한 레시피를 추천받아보세요!</p>
            </header>

            {randomRecipe && <RandomRecipe recipe={randomRecipe} onClick={() => handleCardClick(randomRecipe.id)} />}

            <div className="text-center my-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                    onClick={recommendRandomRecipe}
                    className="bg-brand-dark text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                    🔄 다른 레시피 추천!
                </button>
                <button
                    onClick={() => navigate('/add-recipe')}
                    className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                    ✨ 레시피 추가하기
                </button>
            </div>

            <section className="mt-16">
                 <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-text-primary">모든 레시피</h2>
                    
                    {/* 5. form 태그로 감싸고 register 적용 */}
                    <form className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="레시피 이름으로 검색..."
                            {...register("searchTerm")} // 6. register 적용
                            className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark w-full sm:w-48"
                        />
                        <select
                            {...register("sortOrder")} // 7. register 적용
                            className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark w-full sm:w-auto"
                        >
                            <option value="latest">최신순</option>
                            <option value="popularity">인기순</option>
                            <option value="rating">평점순</option>
                            <option value="reviews">리뷰 많은 순</option>
                        </select>
                    </form>
                 </div>

                 {filteredAndSortedRecipes.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredAndSortedRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleCardClick(recipe.id)} />
                        ))}
                    </div>
                 ) : (
                     <p className="text-center text-text-secondary py-16">
                         {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : "표시할 레시피가 없습니다."}
                     </p>
                 )}
            </section>
        </main>
    );
}

export default HomePage;