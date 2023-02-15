# Eenie Meenie

## How to run

From the root directory, run `python manage.py runserver`

From the eenie-meenie-fe directory, run `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Distinctiveness and Complexity

**Overview**

Eenie Meenie helps expecting parents choose a name for their baby.

The app was built with Djano for the backend and React for the frontend. Using React added complexity to the project because it required a separate server and integration between the front and backend that would have been automatic with Django and vanilla javascript.

**Authentication**

While the app uses some of Django's built in authentication features, I added token authentication and saved the token in local storage in the browser. I also had to figure out a good way to pass the token with each call to the Django API from the frontend. I did so by creating an axios instance with an interceptor which fetches the token from local storage and adds it to the api call header. In the backend, the API uses the token to fetch the appropriate user's data.

**Database**

The app uses a PostgreSQL database rather than the built in SQLite database. I set up the PostgreSQL database and added the database connection information to the environment variables and settings file.

**Data**

The app uses naming data from the Social Security Administration going back to 1880. I wrote a script to convert the .txt files provided by the SSA (one file per year) into a python dictionary. When a user sets or updates her settings to determine the pool of names she will choose from, the API accesses the appropriate year and gender from the dictionary, and slices the names within the selected popularity percentiles.

## Files

**Backend (eenie-meenie-be)**

- models.py
- serializers.py
- text_to_dict.py
- urls.py
- views.py

**Frontend (eenie-meene-fe/src)**

- components/\*
- routes/index.jsx
- routes/error-page-jsx
- util/axios.js
