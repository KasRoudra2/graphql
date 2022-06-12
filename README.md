## GraphQL

### My GraphQL Testing repository. Implements express-graphql and typescript.

#### A simple books and author api

##### Get author, book by id or all authors and books.
##### Add new authors and books

Query:
```
query {
  book(id: 1) {
    id
    name
    author {
      id
      name
    }
  }
}
```