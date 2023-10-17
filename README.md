# First steps
### Create a `.env` file based on the `.env.example` file.
### Run the following commands:
- `npm install` - install the project dependencies
- `docker-compose up -d` - create and start the database service on the docker-compose file
- `db:migrate` - sync the database schema
- `npm run start` or `npm run start:dev` - run the project

You can access the API **docs** on the browser by accessing [`[YOUR_HOST]`:`[YOUR_PORT]`/api#/](http://localhost:3000/api#/)
