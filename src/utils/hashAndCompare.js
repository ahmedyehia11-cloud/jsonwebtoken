import bcrypt from "bcryptjs";
import { parse } from "dotenv";


export  const hash = ({ plaintText = "", saltRound = process.env.SALT_ROUND } = {}) => {
  const hashResult = bcrypt.hashSync(plaintText, parseInt(saltRound));
  return hashResult;
};


export const compare = ({ plaintText = "",hashValue=""} = {}) => {
  const match = bcrypt.compareSync(plaintText,hashValue);
  return match;
};


