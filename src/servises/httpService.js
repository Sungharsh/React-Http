import axios from 'axios';
import {toast} from "react-toastify";
import errorLog from "./logService";


axios.interceptors.response.use(null, error => {
    const expectedError = 
    error.response && 
    error.response.status >= 400 && 
    error.response.status < 500;
    if (!expectedError) {
        errorLog.log(error);
      //console.log("Logging the error", error);
      toast.error("An unexpected error occourred.");
   }
      return Promise.reject(error); // this will be passed to try/catch block in handleDelete
  });

  export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
  };