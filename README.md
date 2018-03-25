Objective
===

Create an application that allows users to view parks from around the world, leave reviews, see other users reviews, and see their review affect the aggregate data for that park.
* Use react / redux
* Use google firebase, authorization, and cloud functions
* Bring in data from a 3rd party api (google places and google geocoding)
* Mobile first with responsive design
* Use ReactCSSTransitionGroup to add some animations

Steps Taken
===

Research other websites that would be direct and indirect competition (yelp, AllTrails, National parks). Start with a wireframe sketch of the desired page, and box the components necessary ( search, park list, park detail, reviews, review, user detail, home, header, auth). Then draw out a diagram that shows the flow of state / data through components. Start with one component and build its presentation in the browser. We started with the search, as that powered the entire app. After it successfully rendered in the browser, create actions and reducers. Rinse and repeat in a similar fashion for every following component. Create helpful functionalities:
* allow users to go back to prior searches with the back button (store search query in the url)
* have the review pop up on the park detail page with react-modal.
* allow users to cancel out of editing / leaving a review.
* do not allow users to add another review after they've already left one (disable the action button).
* allow users to edit their reviews either from the park detail page or from their user detail page (show with an editing pencil)
* allow users to delete their reviews.
* calculate aggregate data of average rating and top 5 most common tags / amenities mentioned through google cloud functions.
* allow users to sign in, sign up, and log out. 
* allow a user to add a username and picture to their account upon sign up.
  - the user picture is previewed and users can delete the photo to pick a different one.
* The add review button cannot be accessed unless the user is logged in. 

Reflection / Changes
===

This app was a huge learning experience! We did not realize prior to starting that google places API has CORS issues with front-end requests, so we had to proxy requests through google cloud functions. Creating a cloud function to display aggregate data from user reviews was quite challenging. It required high attention to how user input was filtered / formatted prior to sending to firebase. In hindsight, this could've been accomplished with better limitations on form input.

Working with firebase to format data was very on-the-fly for this project. Unfortunately, this lead to limitations further down the road, such as users not being able to edit their user information after creation. In the future, it is better to keep data in firebase very flat with references to where other pieces of data exists, instead of deeply nesting repetitive data.
