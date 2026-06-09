# ranobehub-parser

Parser for get data from [ranobehub](https://ranobehub.com)

| METHOD  | ENDPOINT               | PARAMETERS                                         | DESCRIPTION                |
| ------- | ---------------------- | -------------------------------------------------- | -------------------------- |
| GET     | `/parser/novela/:id`   | `id` (path parameter)                              | Get novel by id            |
| GET     | `/parser/search`       | `page` (query parameter), `take` (query parameter) | Search for novels          |
| GET     | `/parser/chapter`      | `url` (query parameter)                            | Get chapter details by url |


# 