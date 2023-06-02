
# Technical proof 👨‍💻

This is a Technical proof for improve my habilities using Typescript.
# API Documentation 📄

The routes that have (Security) are validated with JWT (Json Web Token), so that's mean you've to make a login to get a unique Token. This Token expires after 2 hours.

#### Register a new user

```http
  POST /api/v1/users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `first_name` | `string` | **Required**. Your first name |
| `last_name`  | `string` | **Required**. Your last name  |
| `email`  | `string` | **Required**. Your email  |
| `password`  | `string` | **Required**. Your password  |
| `date_birth`  | `string` | **Required**. Your date birth  |
| `address`  | `string` | **Not Required**. Your address  |
| `mobile_phone`  | `string` | **Required**. Your mobile phone  |

#### Login

```http
  POST /api/v1/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `mobile_phone`      | `string` | **Required**. Mobile Phone |
| `password`      | `string` | **Required**. Password |

#### Get users

```http
  GET /api/v1/users
```

#### Create users

```http
  POST /api/v1/users (Security)
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `mobile_phone`      | `string` | **Required**. Mobile Phone |
| `password`      | `string` | **Required**. Password |

#### Get user

```http
  GET /api/v1/users/{id} (Security)
```

#### Update user

```http
  UPDATE /api/v1/users/{id} (Security)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `first_name` | `string` | **Required**. Your first name |
| `last_name`  | `string` | **Required**. Your last name  |
| `email`  | `string` | **Required**. Your email  |
| `password`  | `string` | **Required**. Your password  |
| `date_birth`  | `string` | **Required**. Your date birth  |
| `address`  | `string` | **Not Required**. Your address  |
| `mobile_phone`  | `string` | **Required**. Your mobile phone  |

#### Delete users

```http
  DELETE /api/v1/users/{id} (Security)
```

