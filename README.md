# MyService App momoApi Integration
To get started with making the API, first you need to make an account on 
the MTN Developer Website. After that you need to subscribe to the specific 
services. In this case, we subscribed to Collections and this service enables
us to make collect payments from users through the Application

Lets get started in the Integration.

## Create a default User
Usually this default user can be called the Application that is going to
consume the API.
To create this user, we make a `POST` Request to:
`https://sandbox.momodeveloper.mtn.com/v1_0/apiuser`

We pass the following in the `HEADER` along with the request.
-  X-Reference-Id (this is any string auto generated to work as the ID of the application)
-  Content-Type (application/json)
-  Ocp-Apim-Subscription-Key (this is the primary key that is found on your profile when you create the account with MTN)

Then in the Body of the request we will have:
**{ "providerCallbackHost": "string" }**

The providerCallbackHost id the URL of your application, for testing cases you can use **localhost:5000**

### Verify User creation
After making a request to create the user, we need to also comfirm the user was created and exists in the System.
To do that, we make a `GET` request to `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/{X-Reference-Id}`.

As you can see, the `X-Reference-Id` is passed as a parameter, this is the very refence ID we used when creating the User.

### Create a API Key for the User Created
The next step is to create an API Key for the user we just created, to do this we are going to make a request to 
`https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/{X-Reference-Id}/apikey`

The **X-Reference-Id** is passed as the Parameter and then along with the Headers we are going to provide the `Ocm-Apmin-Subscription-Key`
Again, this is the primary key on your Profile

The `API Key` and the `X-Reference-Key` is are going to be combined create an `Authorization Key`
To do this just combine the two ie `APIKey + X-Reference-Key` and then encode them to **Base64**.
- ![#f03c15] (https://placehold.it/15/f03c15/000000?text=+) `Hold tight to that Authorization, its going to be the circle of Everything!`
