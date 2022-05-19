## E-commerce

an api for an e-commerce store, built with nodejs(express.js) and mongoDB.

### how to run locally:
```sh
> $ git clone https://github.com/adewolejosh/e-commerce.git
> $ cd e-commerce/
> $ npm i
```

create a ".env" file in the root folder and fill in the following

```
PORT = _running__port__e.g__3030_
MONGODB_URI = _mongodb url_
TOKEN_KEY = _random__token__string_
```

You're good to run. Now run

```sh
> $ npm run dev
```

### Documentation:

#### Auth APIs

- POST /api/auth/register/

    - Register a user (requires username, email, password, user_type - buyer/seller) : payload as json.

- POST /api/auth/login/

    - Login a user  (requires email and password) : payload as json.  (retrieve authentication token)

#### APIs for buyers

- GET /api/buyer/list-of-sellers/

    - Get a list of all sellers

- GET /api/buyer/seller-catalog/:seller_id/

    - Get the catalog of a seller by seller_id

- POST /api/buyer/create-order/:seller_id/

    - Send a list of items to create an order for seller with id = seller_id... ( requires a list of product ids from a certain seller's catalog e.g ["6753627837782389", "6777267687881962"]

#### APIs for sellers

- POST /api/seller/create-catalog/

    - Send a list of items to create a catalog for a seller. requires a list of json items(products) and adds them into a category. e.g

    [
        { "name": "Cologne Perf", "price": 5000000 }, 
        { "name": "Naruto's Konoha Coat", "price": 600000 }  
    ]

- GET /api/seller/orders/

    - Retrieve the list of orders received by a seller


### References
- some images are in readme_images/ folder to help see some of the api input and results.
- all routes except auth routes need an authorization token gotten from login to work.
- Apis for Buyers are protected for buyers only, same for Sellers.