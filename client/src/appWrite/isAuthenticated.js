// auth.js
import { account } from "./services";

export const isAuthenticated = async () => {
  try {
    const session = await account.get();  // Checks for a logged-in session
    return !!session;  // Returns true if the session exists
  } catch (error) {
    console.error('User is not logged in:', error);
    return false;
  }
};
