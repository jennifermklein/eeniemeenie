# Eenie Meenie

![](/eenie-meenie-fe/public/home.png)

## How to run

To set up your environment:

- activate a virtual environment and run `pip -install -r requirements.txt`
- From within the eenie-meenie-fe directory, run `npm install`.

To set up the database:

- In psql, run `createdb eenie_meenie`

To start the app:

- From the root directory, run `python manage.py runserver` to run the backend server
- From the eenie-meenie-fe directory, run `npm start` to run the frontend server
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Distinctiveness and Complexity

**Overview**

Eenie Meenie helps expecting parents choose a name for their baby.

<img align="right" src='/eenie-meenie-fe/public/mobile.png' width='200'>The app was built with Django for the backend and React and Chakra for the frontend. Using React added complexity to the project because it required a separate server and integration between the front and backend that would have been automatic with Django and vanilla javascript. Chakra was helpful for easily creating nice looking and mobile-responsive components.

**Authentication**

While the app uses some of Django's built in authentication features, I added token authentication and saved the token in local storage in the browser. I also pass the token with each call to the Django API from the frontend. I did so by creating an axios instance with an interceptor which fetches the token from local storage and adds it to the API call header. In the backend, the API uses the token to fetch the appropriate user's data.

**Database**

The app uses a PostgreSQL database rather than the built in SQLite database. I set up the PostgreSQL database and added the database connection information to the environment variables and settings file.

**Data**

The app uses naming data from the Social Security Administration going back to 1880. I wrote a script to convert the .txt files provided by the SSA (one file per year) into a python dictionary. When a user sets or updates her settings to determine the pool of names she will choose from, the API accesses the appropriate year and gender from the dictionary, and slices the names within the selected popularity percentiles.

**Features**

<img align="right" src='/eenie-meenie-fe/public/signin.png' width='250'><img align="right" src='/eenie-meenie-fe/public/settings.png' width='250'>Users can create a new account and login. The user is automatically prompted to enter their name preference settings. Specifically, they are asked to provide a year in which a set of names was popular, the gender with which the names are usually associated, and a popularity percentile range. The user can update their settings at any time.

<img align="left" src='/eenie-meenie-fe/public/play.png' width='250'>After submitting settings, the user is taking to the "play" page in which they are presented with two names. The user clicks on their preferred name is is presented with two more names for as long as they continue to choose. As the user chooses names from a pair, the user's name ranking is continually updated on the backend.

At any point the user can navigate to the favorites page to see their top-10 ranked names. On the favorites page, the user can remove any names they want to exclude from their list. These names will not show up again when playing unless the user updates their settings.

<img align="right" src='/eenie-meenie-fe/public/favorites.png' width='250'>

The user can also select a partner with whom they can compare their name choices. The user can navigate to the partner page asnd then select a partner from a drop down menu. The user will then see their partner's top-10 names and names that overlap on both user's lists. The user can update their partner at any time.

<img align="left" src='/eenie-meenie-fe/public/partner.png' width='250'>

## Key Files

**Backend (eenie_meenie)**

- models.py and serializers.py: Describe the User and Settings models and translate into objects.
- text_to_dict.py: Script to translate the Social Security Administration text name data into a dictionary.
- urls.py: Routes for the Django API layer.
- views.py: All API handler functions, e.g. functions to get update a user's settings or fetch names from the user's name pool.

**Frontend (eenie-meene-fe/src)**

- components/\*: The entire frontend is made up of React components. E.g.,
  - Authenticate provides a form for both login and registration functions and sends a post request upon submission to either log in or create a new user and corresponding token.
  - NameList maps over a list of names provided as a prop. This component is reused within the Favorites and Partners components.
  - Nav shows a navbar with most links hidden if the user is not authenticated.
  - Partner contains a drop down menu to select a partner and send a post request to update the user with the new partner. The component then shows the selected partner's favorite names and the intersection of names between the user's list and the partner's list.
  - Play shows two name cards and allows the user to click on a name to send a post request to update the user's name ranking based on the selected name. If the user has not yet submitted their settings the play page automatically redirects to the settings page.
  - Settings provides a form with a sliders for the year and popularity choces and a radio button for selecting gender. Upon submitting the form the user's settings are updated through a post request to the API's settings view.
- routes/index.jsx: Mapping urls to frontend components.
- routes/error-page-jsx: A simple error page for all unknown frontend routes.
- util/axios.js: Creating an instance to automatically fetch the current users token and add to the API call heading.
