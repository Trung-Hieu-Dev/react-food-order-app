import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";

import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-order-32dad-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Oop! Something went wrong. Please come back later.");
      }

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <h2 className={classes.loading}>Loading...</h2>
        </Card>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.meals}>
        <Card>
          <h2 className={classes.error}>{httpError}</h2>
        </Card>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
