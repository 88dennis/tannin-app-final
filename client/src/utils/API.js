import axios from "axios";

export default {

  // //LOCAL ROUTES
  // signUpSubmit: function (userInfo) {
  //   console.log(userInfo);
  //   return axios.post("http://localhost:3005/api/user/signup", userInfo);
  // },
  // logIn: function (loginInfor) {
  //   console.log(loginInfor);
  //   return axios.post("http://localhost:3005/api/user/login", loginInfor);
  // },
  // logOut: function () {
  //   // console.log(userInfo);
  //   return axios.post("http://localhost:3005/api/user/logout");
  // },
  // getUser: function (userId, curPage) {
  //   console.log(curPage);
  //   return axios.get('http://localhost:3005/api/admin/' + userId.userId + "/"+ curPage.currentPage);
  // },

  // getMaster: function (q) {
  //   return axios.get("http://localhost:3005/api/wine/");
  // },

  // getSavedWine: function (admin) {  
  //   console.log(admin);
  //   return axios.post("http://localhost:3005/api/getwine/", admin);
  // },
  // addEmployee: function (employeeData) {
  //   console.log(employeeData);
  //   return axios.post("http://localhost:3005/api/addEmployee", employeeData)
  // },
  // addWine: function (wineData) {
  //   console.log(wineData);
  //   return axios.put("http://localhost:3005/api/addwine/", wineData);
  // },
  

  // deleteWine: function (delelteWine) {
  //   console.log(delelteWine);
  //   return axios.put("http://localhost:3005/api/restaurant/delete", delelteWine);
  // },
  // deleteEmployee: function (deleteEmp) {//localhost:3005/api/addEmployee/
  //   console.log(deleteEmp);
  //   return axios.put("http://localhost:3005/api/deleteEmployee/", deleteEmp)
  // },

  // addScore: function (scoreData) {//localhost:3005/api/addEmployee/
  //   console.log(scoreData);
  //   return axios.put("http://localhost:3005/api/employees/score", scoreData)
  // },


  
  //LOCAL ROUTES
  signUpSubmit: function (userInfo) {
    console.log(userInfo);
    return axios.post("/api/user/signup", userInfo);
  },
  logIn: function (loginInfor) {
    console.log(loginInfor);
    return axios.post("/api/user/login", loginInfor);
  },
  logOut: function () {
    // console.log(userInfo);
    return axios.post("/api/user/logout");
  },
  getUser: function (userId, curPage) {
    console.log(curPage);
    return axios.get('/api/admin/' + userId.userId + "/"+ curPage.currentPage);
  },

  getMaster: function (q) {
    return axios.get("/api/wine/");
  },

  getSavedWine: function (admin) {  
    console.log(admin);
    return axios.post("/api/getwine/", admin);
  },
  addEmployee: function (employeeData) {
    console.log(employeeData);
    return axios.post("/api/addEmployee", employeeData)
  },
  addWine: function (wineData) {
    console.log(wineData);
    return axios.put("/api/addwine/", wineData);
  },
  

  deleteWine: function (delelteWine) {
    console.log(delelteWine);
    return axios.put("/api/restaurant/delete", delelteWine);
  },
  deleteEmployee: function (deleteEmp) {//localhost:3005/api/addEmployee/
    console.log(deleteEmp);
    return axios.put("/api/deleteEmployee/", deleteEmp)
  },

  addScore: function (scoreData) {//localhost:3005/api/addEmployee/
    console.log(scoreData);
    return axios.put("/api/employees/score", scoreData)
  },


  

//++++++++++++++++++++
//HEROKU DENNIS
//++++++++++++++++++++
  // signUpSubmit: function (userInfo) {
  //   console.log(userInfo);
  //   return axios.post("https://tanninwineapp.herokuapp.com/api/user/signup", userInfo);
  // },
  // logIn: function (loginInfor) {
  //   console.log(loginInfor);
  //   return axios.post("https://tanninwineapp.herokuapp.com/api/user/login", loginInfor);
  // },
  // logOut: function () {
  //   // console.log(userInfo);
  //   return axios.post("https://tanninwineapp.herokuapp.com/api/user/logout");
  // },
  // getUser: function (userId, curPage) {
  //   console.log(curPage);
  //   return axios.get('https://tanninwineapp.herokuapp.com/api/admin/' + userId.userId + "/"+ curPage.currentPage);
  // },

  // getMaster: function (q) {
  //   return axios.get("https://tanninwineapp.herokuapp.com/api/wine/");
  // },

  // getSavedWine: function (admin) {  
  //   console.log(admin);
  //   return axios.post("https://tanninwineapp.herokuapp.com/api/getwine/", admin);
  // },
  // addEmployee: function (employeeData) {
  //   console.log(employeeData);
  //   return axios.post("https://tanninwineapp.herokuapp.com/api/addEmployee", employeeData)
  // },
  // addWine: function (wineData) {
  //   console.log(wineData);
  //   return axios.put("https://tanninwineapp.herokuapp.com/api/addwine/", wineData);
  // },

  // deleteWine: function (delelteWine) {
  //   console.log(delelteWine);
  //   return axios.put("https://tanninwineapp.herokuapp.com/api/restaurant/delete", delelteWine);
  // },
  // deleteEmployee: function (deleteEmp) {
  //   console.log(deleteEmp);
  //   return axios.put("https://tanninwineapp.herokuapp.com/api/deleteEmployee/", deleteEmp)
  // },

  // addScore: function (scoreData) {
  //   console.log(scoreData);
  //   return axios.put("https://tanninwineapp.herokuapp.com/api/employees/score", scoreData)
  // },

};


