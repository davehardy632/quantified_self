# Quantified Self
An API for meal and calorie tracking using Node.Js and Express.

## Setup

* Download this project into a working directory.

* Install the requirements using npm:
> npm install

  This will install the required pacakges for the project.

* Create and migrate the local database using sequelize:
> npx sequelize db:create
> npx sequelize db:migrate

* As an Express app, you are able to start the server using the following command:
> npm start

* This application is deployed [here](https://floating-savannah-19561.herokuapp.com/).
* The project board for this application is located [here](https://github.com/davehardy632/quantified_self/projects/1).

## Endpoints

The following endpoints are exposed on this API:

* /api/v1/foods
* /api/v1/foods/:id
* /api/v1/meals
* /api/v1/meals/:meal_id/foods
* /api/v1/meals/:meal_id/foods/:food_id

#### /api/v1/foods
This endpoint takes a get request or a post request. If a get request is sent, it returns a list of all food items in the database, and an error message if no items are present in the database.

If a post request is sent, a body must be included in the following format: { "food": { "name": "Name of food here", "calories": "Calories here"} }. If a food item is successfully created, the food item will be returned. If the food is not successfully created, a 400 status code will be returned. Both name and calories are required fields.

#### /api/v1/foods/:id
This endpoint takes a get, patch or delete request. If a get request is sent, it returns the food item with that ID in the database, and an error message if no item with the input ID is present in the database.

If a patch request is sent, a body must be included in the following format: { "food": { "name": "Name of food here", "calories": "Calories here"} }. If the food object is successfully updated (name and calories are required fields), the food item will be returned. If the food is not successfully updated, a 400 status code will be returned.

If a delete request is sent, the endpoint will delete the food with the id passed in and return a 204 status code. If the food can’t be found, a 404 status code will be returned.

#### /api/v1/meals
This endpoint takes a get request, and it returns a list of all meal items in the database. If no meal items are found, it returns an error message.

#### /api/v1/meals/:meal_id/foods
This endpoint takes a get request is sent, and it returns the meal item with that ID in the database, as well as all food items associated with that meal. It will return an error message if no item with the input ID is present in the database.

#### /api/v1/meals/:meal_id/foods/:food_id
This endpoint takes a post or delete request. If a post request is sent, a food item with the passed food id will be associated with the meal object. If the food object is successfully added to the meal object, a 201 status code and success message will be the response. If the meal or food cannot be found, a 404 status code will be returned.

If a delete request is sent, the endpoint will delete the association the food with the id passed has with the meal that has the id that was passed, and return a 204 status code. If the food or meal object can’t be found, a 404 status code will be returned.
