[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13208385&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

## Get All Users

**Endpoint**: `/users`

**Method**: `GET`

**Description**: Get a list of all users.

**Response**:

- **Status Code**: 200 OK
- **Body**:

  ```json
  [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john.doe@example.com"
    },
    {
      "id": 2,
      "username": "jane_doe",
      "email": "jane.doe@example.com"
    }
    ...
  ]

  ```

## Get Top Rated Movies

**Endpoint**: `/movies/top-rated`

**Method**: `GET`

**Description**: Get a list of top-rated movies.

**Query Parameters**:

- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Number of movies per page (default: 20)

**Response**:

- **Status Code**: 200 OK
- **Body**:

```json
[
 {
 "id": 123,
 "title": "Inception",
 "rating": 9.3
 },
 {
 "id": 456,
 "title": "The Shawshank Redemption",
 "rating": 9.2
 },
 ...
 ]
```

## Get Detailed Movie

**Endpoint**: `/movies/{id}`

**Method**: `GET`

**Description**:

```json
{
"id": 123,
"title": "Inception",
"overview": "A mind-bending sci-fi thriller...",
"releaseDate": "2010-07-16",
"genres": ["Action", "Sci-Fi"],
"rating": 9.3
...
}
```

**Path Parameters**:

- `{id}`: Movie ID

**Response**:

- **Status Code**: 200 OK
- **Body**: Detailed information about the movie.

## Create Rating

**Endpoint**: `/ratings`

**Method**: `POST`

**Description**: Create a new movie rating.

**Request Body**:

- `userId`: User ID
- `rating`: Rating value
- `imdbid`: IMDb ID of the movie

**Response**:

- **Status Code**: 201 Created
- **Body**:

```json
{
  "id": 789,
  "userId": 1,
  "rating": 4.5,
  "imdbid": "tt1234567"
}
```

## Get All Ratings

**Endpoint**: `/ratings`

**Method**: `GET`

**Description**: Get a list of all movie ratings.

**Response**:

- **Status Code**: 200 OK
- **Body**:

```json
[
  {
  "id": 789,
  "userId": 1,
  "rating": 4.5,
  "imdbid": "tt1234567"
  },
  {
  "id": 890,
  "userId": 2,
  "rating": 3.8,
  "imdbid": "tt2345678"
  },
  ...
  ]
```

## Get Rating by ID

**Endpoint**: `/ratings/{id}`

**Method**: `GET`

**Description**: Get a specific movie rating by ID.

**Path Parameters**:

- `{id}`: Rating ID

**Response**:

- **Status Code**: 200 OK
- **Body**:

```json
{
  "id": 789,
  "userId": 1,
  "rating": 4.5,
  "imdbid": "tt1234567"
}
```

## Update Rating

**Endpoint**: `/ratings/{id}`

**Method**: `PUT`

**Description**: Update a movie rating.

**Path Parameters**:

- `{id}`: Rating ID

**Request Body**: Updated rating information.

**Response**:

- **Status Code**: 200 OK
- **Body**:

```json
{
  "message": "Rating updated successfully"
}
```

## Delete Rating

**Endpoint**: `/ratings/{id}`

**Method**: `DELETE`

**Description**: Delete a movie rating by ID.

**Path Parameters**:

- `{id}`: Rating ID

**Response**: {}

- **Status Code**: 204 No Content

```

```

```

```
