# Interview Task: Full Stack Application Development
## Instruction to start back-end system
1. Run `npm install` to install all the node modules.
2. Create a database named my_db using **MySQL**.
3. Modify the credentials for `db.ts` accordingly.
4. Run `npm run start` to start the server.

## API endpoint details
1. GET `/api/items` - To retrieve the entire record of table `items`
2. GET `/api/item/:id` - To retrieve a specific record of item based on id input using query parameter
3. POST `/api/items` - To create new record of item by passing JSON object as request
4. PUT `/api/items/:id` - To update a specific record of item based on the id input
5. DELETE `/api/items/:id` - To delete a specific record of item based on the id input
