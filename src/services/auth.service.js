import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
    async login(email, password) {
    try { 
      const response = await axios
            .post(API_URL + "login", {
                email,
                password
            });
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
    
    async register(username, 
                   email, 
                   password,
                   age,
                   country
                   ) {
        try { 
          await axios
            .post(API_URL + "register", {
              username,
              email,
              password,
              age,
              country
          });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
      async logout() {
        try {
          localStorage.removeItem("user");
          await axios
            .post(API_URL + "logout")
            .then((response) => {
              return response.data
            })
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
  export default new AuthService();