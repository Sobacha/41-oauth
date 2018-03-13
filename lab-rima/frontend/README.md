## Signin/Signup
> localhost:8080/ to sign up/login with Google OAuth

#### Usage
1. Create an app on the google dev console
2. Configure oauth credential to support a client app on http://localhost
3. Configure oauth credentials to support a server redirect uri to http://localhost:3000/oauth/google

4. Clone this repo in your desired location.
5. Run
```
npm install
```
6. Run
```
npm run build
```
7. Go to localhost:8080/
8. Click a link
9. Select your desired google account to sign up/login

#### Config
In .env for backend
```
MONGODB_URI='mongodb://localhost:27017/<your prefered db name>'
PORT='3000'
CLIENT_URL='http://localhost:'
GOOGLE_OAUTH_ID='<your google oauth id>'
GOOGLE_OAUTH_SECRET='<your google oauth secret>'
API_URL='http://localhost:8080/api/v1'
```
