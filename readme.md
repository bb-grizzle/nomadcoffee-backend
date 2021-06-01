# nomad instaclone challenge

### Task 1

- On this challenge we are going to build a whole project from start to finish named **Nomad Coffee**.
- On this two day assignment we will set up our project.
- Create a Github Repository named 'nomadcoffee-backend'.
- Set up a Prisma project.
- The project should follow the architecture outlined on the video (.typeDefs.js , .resolvers.js).
- Use babel, nodemon and dotenv

**todo**

- [x] nodemon
- [x] apollo server
- [x] babel
- [x] architecture with apollo migrate
- [x] prisma
- [x] typescript

### Task 2

**Nomad Coffee** will be an app where developers can go and find the best caffes to work from in 한국!!
On your `schema.prisma` let's create the User model, the model must have the following fields:

- id
- username
- email
- name
- location
- password
- avatarURL
- githubUsername
  After you are done, make a createAccount resolver.
  `createAccount` should:
- Create a user
- Hash the password
- Check that the username / email aren't taken
- Return `ok:true` or `ok:false, error:$error` if there is an error.

**todo**

- [x] create user

### Task 3

Now it's time to create the following resolvers:

- editProfile: Change the user's profile, this includes changing password and changing the avatarURL.
- login: Log the user in by returning a JWT or return an error in case the password is wrong.
- seeProfile: See any users profile.

You will also have to write some code to protect your resolvers and inject the logged in user to the resolver's context.

**todo**

- [x] createUser
- [x] seeProfile
- [x] login
- [x] editProfile
- [x] protect resolver
- [x] avatar file upload

### Task 4

- Implement Follow / Unfollow functionality.
- Implement `followers` & `following` computed fields with pagination on the `seeUser` resolver (No extra resolvers).
- Implement `searchUsers` resolver.

**todo**

- [x] add follwers, following on schema
- [x] follow, unfollow user
- [x] computed field ( followers, following)
- [x] search user
