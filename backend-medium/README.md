```
npm install
npm run dev
```

```
npm run deploy
```

<!-- //make sure you fix the backend routes i.e. /getOtp & /updateUser
getopt bcuz the email should be sent to the specified email
updateUser to make a verified email field false if the email is already verified and still user updates it
and also send the response on the frontend  -->

<!-- why i defined two seperate middleware functions i.e. "accesstokenValidation" in "user.routes" &  a global middleware in blog.routes?? -->
<!--
In user.routes the middleware function was created mainly for 2 purposes. One is I want it for specific routes only and not for all routes i.e creating it as global middleware. Second is to reduce the repetition of the code i.e redundancy. The repetition of refreshing accesstoken logic was being used everywhere and was leading to a verbose and inconsistent code.
In blog.routes the middleware was defined globally because if you see the difference that in user.routes the routes were expecting an accesstoken so that they can return the specific user info to frontend, whereas on the other hand routes in blog.routes weren't expecting an accesstoken but the job was only to perform CRUD operation and some more ops. So the global middleware verifies and generates a new accessToken from the refreshToken and does "await next()" where actual operation would get performed. These routes were supposed to get executed eitherways but since the globalmiddleware says that if you don't have either of the token you are not allowed to go any further.
 -->

<!--  Now the problem is, I am creating /savedBlogs route. This route would return blogs saved by the user. Since it is related to the user i thought this should be defined within the user.routes since its related to the user-particular info. But her  -->

<!-- Main thing about prisma is, the reason why a field in particular model is declared to be @unique because for queries where a we find the field with the findUnique or any other query, the unique id needs to be mentioned -->

<!-- Relationships in schema -->
<!-- // https://stackoverflow.com/questions/67412355/cant-make-two-11-relations-in-one-model-in-prisma-ambiguous-relation-detected
// refer to above stackoverflow if you have any question related to the following -->



<!-- the logic behind adding the isFollower function

the reason adding isFOllower funciton was that i want to hold the state for the follow and unfollow of the user with relation to the author. Since the current route data when received on frontend remains cached, I wasn't able to hold this dynamic state globally. So i updated the res data, added isFollower option and whenever user visits certain post the state for follow would be the latest one initially. After if user unfollows the author then the state is being hold locally. And since we were receiving a cached response(thanks to recoil), there's no chance that the state would get refreshed untill a manual reload happens or user logs out. 
Still after revisit we will again receive fresh data with the updated state.
  -->
