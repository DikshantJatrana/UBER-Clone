# Backend API Documentation

## Endpoints

### User Registration

**Endpoint:** `/user/register`

**Method:** `POST`

**Description:** This endpoint is used to register a new user.

**Request Body:**

- `email` (string, required): The email address of the user. Must be a valid email.
- `fullName` (object, required): The full name of the user.
  - `firstName` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastName` (string, optional): The last name of the user. Must be at least 3 characters long.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

**Response:**

- `200 OK`: User successfully created. A cookie named `token` containing the JWT token is set.
- `400 Bad Request`: Invalid details or validation errors. The response contains an array of error messages.

**Example Request:**

```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "password123"
}

{
  "message": "user successfully created"
}
```

### User Login

**Endpoint:** `/user/login`

**Method:** `POST`

**Description:** This endpoint is used to log in an existing user.

**Request Body:**

- `email` (string, required): The email address of the user. Must be a valid email.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

**Response:**

- `200 OK`: User successfully logged in. A cookie named `token` containing the JWT token is set.
- `400 Bad Request`: Invalid details or validation errors. The response contains an array of error messages.
- `401 Unauthorized`: Invalid email or password.

**Example Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Example Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com"
  }
}
```

### User Profile

**Endpoint:** `/user/profile`

**Method:** `GET`

**Description:** This endpoint is used to get the profile of the logged-in user.

**Headers:**

- `Authorization` (string, required): The JWT token of the logged-in user.

**Response:**

- `200 OK`: User profile data.
- `401 Unauthorized`: Invalid or missing token.

**Example Request:**

```http
GET /user/profile HTTP/1.1
Authorization: Bearer jwt_token_here
```

**Example Response:**

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "user@example.com"
}
```

### User Logout

**Endpoint:** `/user/logout`

**Method:** `GET`

**Description:** This endpoint is used to log out the user.

**Headers:**

- `Authorization` (string, required): The JWT token of the logged-in user.

**Response:**

- `200 OK`: User successfully logged out.
- `401 Unauthorized`: Invalid or missing token.

**Example Request:**

```http
GET /user/logout HTTP/1.1
Authorization: Bearer jwt_token_here
```

**Example Response:**

```json
{
  "msg": "logout Successfully"
}
```

### Captain Registration

**Endpoint:** `/captain/register`

**Method:** `POST`

**Description:** This endpoint is used to register a new captain.

**Request Body:**

- `email` (string, required): The email address of the captain. Must be a valid email.
- `fullName` (object, required): The full name of the captain.
  - `firstName` (string, required): The first name of the captain. Must be at least 3 characters long.
  - `lastName` (string, optional): The last name of the captain. Must be at least 3 characters long.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.

**Response:**

- `200 OK`: Captain successfully created. A cookie named `token` containing the JWT token is set.
- `400 Bad Request`: Invalid details or validation errors. The response contains an array of error messages.

**Example Request:**

```json
{
  "email": "captain@example.com",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "password": "password123"
}

{
  "message": "captain successfully created"
}
```

### Captain Login

**Endpoint:** `/captain/login`

**Method:** `POST`

**Description:** This endpoint is used to log in an existing captain.

**Request Body:**

- `email` (string, required): The email address of the captain. Must be a valid email.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.

**Response:**

- `200 OK`: Captain successfully logged in. A cookie named `token` containing the JWT token is set.
- `400 Bad Request`: Invalid details or validation errors. The response contains an array of error messages.
- `401 Unauthorized`: Invalid email or password.

**Example Request:**

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

**Example Response:**

```json
{
  "token": "jwt_token_here",
  "captain": {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "captain@example.com"
  }
}
```

### Captain Profile

**Endpoint:** `/captain/profile`

**Method:** `GET`

**Description:** This endpoint is used to get the profile of the logged-in captain.

**Headers:**

- `Authorization` (string, required): The JWT token of the logged-in captain.

**Response:**

- `200 OK`: Captain profile data.
- `401 Unauthorized`: Invalid or missing token.

**Example Request:**

```http
GET /captain/profile HTTP/1.1
Authorization: Bearer jwt_token_here
```

**Example Response:**

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "captain@example.com"
}
```

### Captain Logout

**Endpoint:** `/captain/logout`

**Method:** `GET`

**Description:** This endpoint is used to log out the captain.

**Headers:**

- `Authorization` (string, required): The JWT token of the logged-in captain.

**Response:**

- `200 OK`: Captain successfully logged out.
- `401 Unauthorized`: Invalid or missing token.

**Example Request:**

```http
GET /captain/logout HTTP/1.1
Authorization: Bearer jwt_token_here
```

**Example Response:**

```json
{
  "msg": "logout Successfully"
}
```
