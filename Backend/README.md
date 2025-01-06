# SwiftRide Backend API Documentation

## Endpoints

### POST /users/register

#### Description

Registers a new user in the system.

#### Request Body

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **201 Created**

  - **Description**: User successfully registered.
  - **Body**: A JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "jwt-token",
      "user": {
        "_id": "user-id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Invalid input data.
  - **Body**: A JSON object containing the validation errors.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

#### Status Codes

- `201 Created`: User successfully registered.
- `400 Bad Request`: Invalid input data.

### POST /users/login

#### Description

Login an existing user.

#### Request Body

The request body must be a JSON object containing the following fields:

- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Must be at least 6 characters long.

Example:

```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

#### Responses

- **200 OK**

  - **Description**: User successfully logged in.
  - **Body**: A JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "jwt-token",
      "user": {
        "_id": "user-id",
        "firstname": "John",
        "lastname": "Doe",
        "email": "user@example.com"
      }
    }
    ```

- **400 Bad Request**

  - **Description**: Invalid input data.
  - **Body**: A JSON object containing the validation errors.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**

  - **Description**: Invalid email or password.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **500 Internal Server Error**
  - **Description**: Internal server error.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

#### Status Codes

- `200 OK`: User successfully logged in.
- `400 Bad Request`: Invalid input data.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: Internal server error.

### GET /users/profile

#### Description

Get the profile information of the currently authenticated user.

#### Authentication Required

Yes

#### Responses

- **200 OK**

  - **Description**: Successfully retrieved user profile.
  - **Body**: A JSON object containing the user profile details.
  - **Example**:
    ```json
    {
      "id": "user-id",
      "username": "john_doe",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "123-456-7890",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
    ```

- **401 Unauthorized**

  - **Description**: Authentication token is missing or invalid.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Unauthorized",
      "error": "Token not found"
    }
    ```

#### Status Codes

- `200 OK`: Successfully retrieved user profile.
- `401 Unauthorized`: Authentication token is missing or invalid.

### GET /users/logout

#### Description

Logout the current user and blacklist the token provided in cookie or headers.

#### Authentication Required

Yes

#### Responses

- **200 OK**

  - **Description**: Successfully logged out.
  - **Body**: A JSON object containing a success message.
  - **Example**:
    ```json
    {
      "message": "Successfully logged out"
    }
    ```

- **401 Unauthorized**

  - **Description**: Authentication token is missing or invalid.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Unauthorized",
      "error": "Token not found"
    }
    ```

#### Status Codes

- `200 OK`: Successfully logged out.
- `401 Unauthorized`: Authentication token is missing or invalid.

### POST /captains/register

#### Description

Registers a new captain in the system.

#### Request Body

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain account. Must be at least 6 characters long.
- `vehicle`: An object containing:
  - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
  - `plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
  - `capacity` (number, required): The capacity of the vehicle. Must be at least 1.
  - `vehicleType` (string, required): The type of the vehicle. Must be one of "car", "motorcycle", or "auto".

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses

- **201 Created**

  - **Description**: Captain successfully registered.
  - **Body**: A JSON object containing the authentication token and captain details.
  - **Example**:
    ```json
    {
      "token": "jwt-token",
      "captain": {
        "_id": "captain-id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Invalid input data.
  - **Body**: A JSON object containing the validation errors.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "Color must be at least 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Plate must be at least 3 characters long",
          "param": "vehicle.plate",
          "location": "body"
        },
        {
          "msg": "Capacity must be at least 1",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": "Invalid vehicle type",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

#### Status Codes

- `201 Created`: Captain successfully registered.
- `400 Bad Request`: Invalid input data.

## Captain Routes

### POST /captains/login

Login Captain.

**Request:**

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f9b1e8b001c8e4b8a",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "red",
      "capacity": 4,
      "plate": "ABC123",
      "vehicleType": "car"
    }
  }
}
```

### GET /captains/profile

Get Captain Profile.

**Request Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "captain": {
    "_id": "60c72b2f9b1e8b001c8e4b8a",
    "email": "captain@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "vehicle": {
      "color": "red",
      "capacity": 4,
      "plate": "ABC123",
      "vehicleType": "car"
    }
  }
}
```

### GET /captains/logout

Logout Captain.

**Request Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```
