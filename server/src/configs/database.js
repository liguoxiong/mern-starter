// The file server/config/database.js
// #1 Import mongoose
import mongoose from 'mongoose';
// #2 Create a query string to connect to MongoDB server
// const DB_URI = "mongodb://localhost:27017/webapp";
const DB_URI =
  'mongodb+srv://root:mSKvXKsgl5Xd0zV0@dev-malml.gcp.mongodb.net/dev?retryWrites=true&w=majority';

// #3 Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// #4 Add basic event listeners on the mongoose.connection object
mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'));
mongoose.connection.on('error', error => console.error(error));

// #5 Export mongoose. You’ll use it in server/server.js file
export default mongoose;
