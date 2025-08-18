# Project: Chijiuba_CMS
# 📁 Collection: Posts 
undefined 


## End-point: addPost
### Method: POST
>```
>{{base_url}}post/
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{authToken}}|


### Body (**raw**)

```json
{
    "title": "We are born equall",
    "content": "We are born equal, but it’s the choices we make that shape who we become."
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 201
```json
{
    "message": "Post created successfully",
    "post": {
        "id": 5,
        "title": "Great things takes time",
        "content": "Be patient with the process—great things take time.",
        "slug": "great-things-takes-time",
        "status": "draft",
        "authorId": 1,
        "updatedAt": "2025-08-18T09:45:55.898Z",
        "createdAt": "2025-08-18T09:45:55.898Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Post
### Method: PATCH
>```
>{{base_url}}post/{{postId}}
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{authToken}}|


### Body (**raw**)

```json
{
    "title": "We are born equal"
    // "content": "Rome wasn’t built in a day—progress may be slow, but every step counts"
}
```

### Response: 200
```json
{
    "message": "Post updated successfully",
    "result": {
        "id": 6,
        "title": "Rome was not built in a day",
        "content": "Not everything that looks attractive or valuable on the outside is truly valuable inside.",
        "slug": "rome-was-not-built-in-a-day",
        "authorId": 1,
        "status": "draft",
        "createdAt": "2025-08-18T09:50:31.847Z",
        "updatedAt": "2025-08-18T10:37:16.886Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: deletePost
### Method: DELETE
>```
>{{base_url}}post/{{postId}}
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{authToken}}|


### Body (**raw**)

```json

```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "message": "Post deleted successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getPost
### Method: GET
>```
>{{base_url}}post/{{postId}}
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{authToken}}|


### Body (**raw**)

```json

```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "message": "Post retrieved successfully",
    "post": {
        "id": 6,
        "title": "Rome was not built in a day",
        "content": "Remember, Rome was not built in a day—great achievements require patience and persistence",
        "slug": "rome-was-not-built-in-a-day",
        "authorId": 1,
        "status": "draft",
        "createdAt": "2025-08-18T09:50:31.847Z",
        "updatedAt": "2025-08-18T09:50:31.847Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Comments 
undefined 


## End-point: AddComment
### Method: POST
>```
>{{base_url}}post/{{postId}}/comment
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{authToken}}|


### Body (**raw**)

```json
{
    "content": "This is another very funny post"
}
```

### Response: 201
```json
{
    "success": "Comment created successfully",
    "comment": {
        "isApproved": false,
        "isDeleted": false,
        "id": 2,
        "content": "This is a very funny post",
        "postId": 7,
        "userId": 1,
        "updatedAt": "2025-08-18T11:50:49.124Z",
        "createdAt": "2025-08-18T11:50:49.124Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: GetComment
### Method: GET
>```
>{{base_url}}post/{{postId}}/comment/{{commentId}}
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{authToken}}|


### Body (**raw**)

```json

```

### Response: 200
```json
{
    "message": "comments retrieved successfully",
    "comment": {
        "id": 5,
        "postId": 7,
        "userId": 1,
        "content": "This is another very funny post",
        "isApproved": false,
        "isDeleted": false,
        "createdAt": "2025-08-18T12:23:59.200Z",
        "updatedAt": "2025-08-18T12:23:59.200Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: UpdateComment
### Method: PATCH
>```
>{{base_url}}post/{{postId}}/comment/{{commentId}}
>```
### Body (**raw**)

```json
{
    "content": ""
}
```

### Response: 200
```json
{
    "message": "Comment updated successfully",
    "result": {
        "id": 5,
        "postId": 7,
        "userId": 1,
        "content": "I just want to change this comment",
        "isApproved": false,
        "isDeleted": false,
        "createdAt": "2025-08-18T12:23:59.200Z",
        "updatedAt": "2025-08-18T13:07:21.030Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: DeleteComment
### Method: PATCH
>```
>{{base_url}}post/{{postId}}/comment/{{commentId}}
>```
### Body (**raw**)

```json

```

### Response: 200
```json
{
    "message": "Post deleted successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Auth 
undefined 


## End-point: login
### Method: POST
>```
>{{base_url}}auth/login
>```
### Body (**raw**)

```json
{
    "email": "kosara@gmail.com",
    "password": "{{password}}"
}
```

### Response: 200
```json
{
    "message": "Logged in successful",
    "data": {
        "user": {
            "id": 1,
            "firstName": "Nwafor",
            "lastName": "Kosara",
            "email": "kosara@gmail.com",
            "isVerified": false,
            "createdAt": "2025-08-16T14:32:35.252Z",
            "updatedAt": "2025-08-16T14:32:35.252Z"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiTndhZm9yIiwibGFzdE5hbWUiOiJLb3NhcmEiLCJlbWFpbCI6Imtvc2FyYUBnbWFpbC5jb20iLCJpc1ZlcmlmaWVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNS0wOC0xNlQxNDozMjozNS4yNTJaIiwidXBkYXRlZEF0IjoiMjAyNS0wOC0xNlQxNDozMjozNS4yNTJaIiwiaWF0IjoxNzU1NTA5ODUzLCJleHAiOjE3NTU1NDU4NTN9.ZStVUDjoVTosMA65TMP4YCmYrK_onJI9Bb-KUydkpB8"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: registerUser
### Method: POST
>```
>{{base_url}}auth/register
>```
### Body (**raw**)

```json
{
    "firstName": "Chijiuba",
    "lastName": "Victory",
    "email": "chijiuba@gmail.com",
    "password": "{{password}}"
}
```

### Response: 201
```json
{
    "message": "User created successfully",
    "data": {
        "user": {
            "id": 2,
            "email": "chijiuba@gmail.com",
            "firstName": "Chijiuba",
            "lastName": "Victory",
            "isVerified": false,
            "updatedAt": "2025-08-18T09:38:32.340Z",
            "createdAt": "2025-08-18T09:38:32.340Z"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7ImlkIjoyLCJlbWFpbCI6ImNoaWppdWJhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDV5V2piRVdVeEJqLzFYc3ZlMkNmWHVQaWJSVEs3M2E3YWp2NzRxSUNFL09YQkRNenJ3MXZLIiwiZmlyc3ROYW1lIjoiQ2hpaml1YmEiLCJsYXN0TmFtZSI6IlZpY3RvcnkiLCJpc1ZlcmlmaWVkIjpmYWxzZSwidXBkYXRlZEF0IjoiMjAyNS0wOC0xOFQwOTozODozMi4zNDBaIiwiY3JlYXRlZEF0IjoiMjAyNS0wOC0xOFQwOTozODozMi4zNDBaIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiZW1haWwiOiJjaGlqaXViYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ1eVdqYkVXVXhCai8xWHN2ZTJDZlh1UGliUlRLNzNhN2Fqdjc0cUlDRS9PWEJETXpydzF2SyIsImZpcnN0TmFtZSI6IkNoaWppdWJhIiwibGFzdE5hbWUiOiJWaWN0b3J5IiwiaXNWZXJpZmllZCI6ZmFsc2UsImlkIjoyLCJjcmVhdGVkQXQiOiIyMDI1LTA4LTE4VDA5OjM4OjMyLjM0MFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA4LTE4VDA5OjM4OjMyLjM0MFoifSwidW5pcW5vIjoxLCJfY2hhbmdlZCI6e30sIl9vcHRpb25zIjp7ImlzTmV3UmVjb3JkIjp0cnVlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIn0sImlzTmV3UmVjb3JkIjpmYWxzZSwiaWF0IjoxNzU1NTA5OTEyLCJleHAiOjE3NTU1NDU5MTJ9.FFkb9ctwJS6EkoGIFvg4y1eBQxcHsojailnPfO6bBRk"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: index
### Method: GET
>```
>{{base_url}}
>```
### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|||


### Response: 200
```json
{
    "message": "Welcome to my Content Management System API",
    "data": {
        "environment": "development",
        "version": "1.0.0"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
