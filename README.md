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
```diff
-  X-Reference-Id (this is any string auto generated to work as the ID of the application)
-  Content-Type (application/json)
-  Ocp-Apim-Subscription-Key (this is the primary key that is found on your profile when you create the account with MTN)
```
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
```diff
- Hold tight to that Authorization, its going to be the circle of Everything!
```

## Making Request for Payment
Now that we are done creating a default User and provided Authorization to that User, We now 
want to invoke payments. Each time a payment has to be made, we first need to make a request to get a token 
for that particular transaction.
So lets get started, shall we...

### Request payment Token
We are going to make a request to `https://sandbox.momodeveloper.mtn.com/collection/token/`
In the **Headers**, we will provide the `Ocp-Apim-Subscription-Key` and the `Authorization`
This token is supposed to Authorize the payment that is going to take place

Just to take note, this token expires in about 5 minutes of request.

### Make request to Pay
This operation is used to request a payment from a consumer (Payer). The payer will be asked to authorize the payment. The transaction will be executed once the payer has authorized the payment. The requesttopay will be in status PENDING until the transaction is authorized or declined by the payer or it is timed out by the system.

Here we make a POST request to `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay`
In the Header we pass the following:
```diff
- Authorization
- X-Reference-Id (The id of the Clients to the application)
- X-Target-Environment (URl of Application)
- Content-Type
- Ocp-Apim-Subscription-Key
```

And in the body of the request:
{
  "amount": "string",
  "currency": "string",
  "externalId": "string",
  "payer": {
    "partyIdType": "MSISDN",
    "partyId": "string"
  },
  "payerMessage": "string",
  "payeeNote": "string"
}

### To confirm the status of the Payment

