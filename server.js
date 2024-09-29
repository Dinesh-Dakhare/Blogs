import app from "./app.js";
import  { config } from 'dotenv'

config({path:"./config.env"})
// console.log(process.env)

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
