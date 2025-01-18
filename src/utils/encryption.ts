import bcrypt from "bcrypt";

export const encrypt = async (password: string): Promise<string> => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const isMatchPassword = await bcrypt.compare(password, hash);
  return isMatchPassword;
};
