import MealItem from "./MealItem.jsx";
import useFetch from "../hooks/useFetch.js";
import Error from "./Error.jsx";

const requestConfig = {}

export default function Meals() {
    const url = 'http://localhost:3000/meals';

    const { data: loadedMeals, isLoading, error } = useFetch(url, requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map(meal => {
                return <MealItem key={meal.id} meal={meal} />
            })}
        </ul>
    );
};