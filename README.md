# bambuDemo

## Description:

After git clone,do `bash docker_rebuild.sh` in the root directory
this will create docker containers, install the dependencies and start the node server


## Api urls:

POST /login :

> URL : http://localhost:8080/api/login

> METHOD : POST

> Req Body : {
                "email":"ashishnair57@gmail.com",
                "password":"12345"
            }
> DESCRIPTION: Api to login and generate the token

GET /products

> URL : http://localhost:8080/api/products

> METHOD : GET

> Params : 
   - itemsPerPage (number)
   - pageNumber (number)
   - showAssetClassBreakdown (“true” or “false”)
   - showGeographicalBreakdown (“true” or “false)
   - filterByCodes (“list”)
   - filterByNames (“list”)
   - showOnly (“list”)

> headers params :
    - x-access-token: (string) 
     
    example 
    x-access-token:b07d52c7372f9953f1ec882d434351e1c6d808661e8cc9c02542b50c7c33edfc82e26423684e515423a519e7a3fa76b8fdb434deaae8b69d45d9360b48c44966ab46df31df7664fa15c397d4c2c44d686eade46be81b14125ca34e3c6061f5c4f4864446514554fd89964d031f3b043046606d9801c1eae0801b26bb3deea6fcecc8ab9bfb64bcb041eb35cecfbfc37772e0a704815da8e2621f01e769bc13fffec3eedc35066e6fd5fd1091031a8016e100fe01d5698da678e995fc387f12040d25e158dae629e9263aa2fd53739df2

> DESCRIPTION: Api to get all the products
