import { useEffect, useState } from "react";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:3000/meals');
            const meals = await response.json();

            setLoadedMeals(meals);
        })();
    }, []);

    return (
        <ul id="meals">
            {loadedMeals.map(meal => {
                return <li key={meal.id}>{meal.name}</li>
            })}
        </ul>
    );
};