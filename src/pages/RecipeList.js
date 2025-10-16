import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList() {
    // 1. 데이터를 담을 state를 생성합니다. 처음에는 빈 배열입니다.
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    // 2. useEffect를 사용해 컴포넌트가 처음 마운트될 때 한 번만 데이터를 불러옵니다.
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // 3. 공공데이터 API를 호출합니다.
                const response = await axios.get('여기에-공공데이터-API-URL-입력');
                const rawData = response.data.COOKRCP01.row; // 실제 데이터 배열에 접근

                // 4. API에서 받은 데이터를 가공(mapping)합니다.
                const processedData = rawData.map((recipe) => ({
                    ...recipe, // 원본 데이터 필드는 그대로 유지
                    
                    // 관리용 데이터 필드에 초기값 추가
                    views: 0,
                    rating: 0,
                    comment: "",
                    // ... 기타 필요한 필드 추가
                }));

                // 5. 가공된 데이터로 state를 업데이트합니다.
                setRecipes(processedData);

            } catch (error) {
                console.error("레시피 데이터를 불러오는 데 실패했습니다.", error);
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchRecipes(); // 함수 실행
    }, []); // 의존성 배열을 비워두어 최초 1회만 실행되게 합니다.

    if (loading) {
        return <div>레시피를 불러오는 중...</div>;
    }

    // 6. state에 저장된 데이터를 화면에 렌더링합니다.
    return (
        <div>
            <h1>오늘의 레시피</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.RCP_SEQ}>
                        <img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} width="100" />
                        <p>{recipe.RCP_NM}</p>
                        <p>조회수: {recipe.views}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeList;