const express = require('express');
const path = require("path");
const app = express();
var cors = require('cors');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// loads our connection to the mongo database
const passport = require('./passport')
// const db = require('./models/Employees');
// const routes = require("./routes");
const PORT = process.env.PORT || 3005;
const mongoose = require('mongoose');
var mailer = require("nodemailer");
const db = require('./models');
const { Restaurants } = require('./models');
const wineSeed = require('./Seedin').wineSeed
const empSeed = require('./EmployeeSeed').empSeed 
const restaurantSeed = require ('./RestaurantSeed').restaurantSeed
const User = require('./models/Employees');

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/wines', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

// if (process.env.NODE_ENV === 'production') {
//     const path = require('path');
//     console.log('YOU ARE IN THE PRODUCTION ENV')
//     app.use('/static', express.static(path.join(__dirname, './build/static')));
//     app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './build/'));
//     })
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));


  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

//====================================
//USER ROUTES - LOGIN, SIGNUP, LOGOUT
//====================================



app.get("/api/admin/:id/:name", function(req, res){
  User.findOne(
    { _id:  req.params.id},
    'firstName lastName email restaurantName restaurantId scores',
    (err, user) => {
      console.log('======= DESERILAIZE USER CALLED ======');
      console.log(user, "hehehe");
      console.log('----------asdasd----');
      res.json(user);
    }
  )
})

app.post('/api/user/signup', function (req, res) {
    const { restaurant, firstName, lastName, email, password } = req.body
    // ADD VALIDATION
    db.Restaurants.findOne({ email: email }, (err, userMatch) => {
        if (userMatch) {
            return res.json({
                error: `Sorry, already a user with the email: ${email}`
            })
        }
        else {
          const newRestaurant = new Restaurants({name: restaurant, email: email});
            newRestaurant.save((err, saveRestaurant) => {
                if (err) return res.json(err)
                db.Employees.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    restaurantName: saveRestaurant.name,
                    restaurantId: saveRestaurant._id,
                    isAdmin: true
                }).then(newEmployee => res.json(newEmployee))
                    .catch(err => res.status(422).json(err));
                // return res.redirect('/api/user/getUser')
            })
        }
    })
})

app.post('/api/user/login', passport.authenticate('local'), function (req, res) {
	// console.log("REQ.USER: ", req.user);
  res.json(req.user);	
  // console.log('========++++++++++==')
});



app.post("/api/user/logout", function (req, res) {
    console.log(req.user, "LOGOUT")
    if (req.user) {
        req.session.destroy()
        res.clearCookie('connect.sid') // clean up!
        return res.json({ msg: 'OK' })
    } else {
        return res.json({ msg: 'no user to log out!' })
    }
})

//===========================================
// END - USER ROUTES - LOGIN, SIGNUP, LOGOUT
//===========================================


//=================
//EMPLOYEES ROUTES
//=================
app.get("/api/employees", function (req, res) {
    db.Employees.find()
      .then(dbEmp => res.json(dbEmp))
      .catch(err => res.status(422).json(err));
  });

app.post("/api/employees", function (req, res) {
    db.Employees.create(req.body)
      .then(dbEmp => res.json(dbEmp))
      .catch(err => res.status(422).json(err));
  });

app.put("/api/employees/score", function (req, res) {
    var queryPromise=db.Employees.findOne({_id: req.body.userId}).exec();
      queryPromise.then(function(data) {
        const results = data.scores;
        const res1 = results.filter(dbScore => dbScore.wine === req.body.wine)
        if(res1 && res1.length>0) {
          if(parseFloat(res1[0].score) < parseFloat(req.body.score)){
           const queryPromise2= db.Employees.findOneAndUpdate({_id: req.body.userId, 'scores.wine':req.body.wine}, {$set:{'scores.$.score': req.body.score}}, {new: true}).exec();
           queryPromise2.then(dbupdate=>{
            res.json(dbupdate);
           })
          }
         else if(parseFloat(res1[0].score) >= parseFloat(req.body.score)) {
            res.json(data);
          }
        }
        else {
          const queryPromise1= db.Employees.findOneAndUpdate({ _id: req.body.userId }, { $push: { scores: { wine: req.body.wine, score: req.body.score }}}, {new: true}).exec();
          queryPromise1.then(dbData => {
          res.json(dbData);
         });
        }
        });
      });

app.get("/api/employees/:id", function (req, res) {
    db.Employees.findById(req.params.id)
        .then(dbEmp => res.json(dbEmp))
        .catch(err => res.status(422).json(err));
      });

      app.put("/api/employees/:id", function (req, res) {
        db.Employees.findOneAndUpdate({ id: req.params.id }, req.body)
          .then(dbEmp => res.json(dbEmp))
          .catch(err => res.status(422).json(err));
      });

      app.delete("/api/employees/:id", function (req, res) {
        db.Employees.findById(req.params.id)
          .then(dbEmp => dbEmp.remove())
          .then(dbEmp => res.json(dbEmp))
          .catch(err => res.status(422).json(err));
      });
      
//======================
//END - EMPLOYEES ROUTES
//======================

//=================
//RESTAURANT ROUTES
//=================

app.get("/api/restaurant/", function(req, res) {
    db.Restaurants.find()
      .then(dbResto => res.json(dbResto))
      .catch(err => res.status(422).json(err));
});

app.post("/api/restaurant/", function(req, res) {
    db.Restaurants.create(req.body)
      .then(dbResto => res.json(dbResto))
      .catch(err => res.status(422).json(err));
});

app.put("/api/restaurant/", function(req, res) {
    db.Restaurants.findOneAndUpdate({}, { $push: { Wines: req.body._id } }, { new: true })
    // db.Restaurants.findOneAndUpdate({ id: req.params.id }, req.body)
    .then(dbResto => res.json(dbResto))
    .catch(err => res.status(422).json(err));
});

app.get("/api/restaurant/:id", function(req, res) {
    db.Restaurants.findById(req.params.id)
      .then(dbResto => res.json(dbResto))
      .catch(err => res.status(422).json(err));
});

//DELETE WINE CORRECT
app.put("/api/restaurant/delete", function(req, res) {
    console.log(req.body);
        const {id, restaurantId} = req.body
        console.log(restaurantId);
      db.Restaurants.updateOne({_id:restaurantId},{$pull:{Wines:id}}).then(restaurant=>{
        console.log("?????????????")
          console.log(restaurant)
          console.log("?????????????")
          // res.json(restaurant);
              res.json(restaurant)
          })
      } 
);

//=======================
//END - RESTAURANT ROUTES
//=======================


//===========
//WINE ROUTES
//===========
  app.get("/api/wine", function(req, res) {
    db.MasterWineList.find()
      .then(dbWine => res.json(dbWine))
      .catch(err => res.status(422).json(err));
});

app.post("/api/wine", function(req, res) {
    db.MasterWineList.create(req.body)
      .then(dbWine => res.json(dbWine))
      .catch(err => res.status(422).json(err));
});

app.get("/api/wine/:id", function(req, res) {
    db.MasterWineList.findById(req.params.id)
      .then(dbWine => res.json(dbWine))
      .catch(err => res.status(422).json(err));
});

app.put("/api/wine/:id", function(req, res) {
    db.MasterWineList.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbWine => res.json(dbWine))
      .catch(err => res.status(422).json(err));
});

// app.delete("/api/wine/:id", function(req, res) {
//     db.MasterWineList.findById(req.params.id)
//       .then(dbWine => dbWine.remove())
//       .then(dbWine => res.json(dbWine))
//       .catch(err => res.status(422).json(err));
// });


//==================
//END OF WINE ROUTES
//==================


//===================
//ADDWINE ROUTES
//==================
app.put("/api/addwine", function (req, res) {
    const {wineId, restaurantId}= req.body;
     console.log("////////////////");
     console.log(req.body);
     console.log("////////////////");
     db.Restaurants.findOne({_id:restaurantId}).then(wine=>{
       console.log("((((((((((((((((((((");
         console.log(wine);
         console.log("))))))))))))))))))))))");

         console.log(wine.$)
         if(!wine.Wines.includes(wineId)){
          console.log(wineId);

          db.Restaurants.findOneAndUpdate({_id:restaurantId}, { $push: { Wines: wineId } }, { new: true })
     .then(data=>{
         console.log(data);
             res.json(data);
     });  
 }
 else {
     res.json("This wine already exists");
 }
})         
 });


//  app.put("/api/addwine", function(req, res) {
//     console.log(req.body);
//     db.Restaurants.findOneAndUpdate({}, { $push: { Wines: req.body.Wines } }, { new: true })
//     // db.Restaurants.findOneAndUpdate({ id: req.params.id }, req.body)
//     .then(dbResto => res.json(dbResto))
//     .catch(err => res.status(422).json(err));
//     });

// app.delete("/api/addwine", function(req, res) {
//         console.log(req.body);
//         db.Restaurants.findOneAndUpdate({},
//           { "$pull": { "Restaurants.$.Wines": req.body } } 
//       )
//         // db.Restaurants.update(
//         //   { _id: req.body },
//         //   { $pull: { Wines: req.body  } }
//         // )
//         // db.Restaurants.findOneAndDelete({}, { $pull: { Wines: req.body.Wines } })
//         // db.Restaurants.findOneAndUpdate({ id: req.params.id }, req.body)
//          .then(dbResto => res.json(dbResto))
//       .catch(err => res.status(422).json(err));
//         });

//=====================
//END OF ADDWINE ROUTES
//=====================

//==============================
//ADD AND DELETE EMPLOYEE ROUTES
//==============================

app.post("/api/addEmployee", function (req, res) {
    const { name, lastName, email, password, restaurantName, restaurantId } = req.body;
    console.log("////////////////");
    // console.log(req.body);
    console.log("////////////////");
    db.Employees.findOne({ email: email }).then(employee => {
        console.log(employee);
        if (!employee) {
            db.Employees.create({
                firstName: name,
                lastName: lastName,
                email: email,
                password: password,
                restaurantName:restaurantName,
                restaurantId: restaurantId,
                isAdmin: false
            }).then(employee => {
                console.log("DENNIS")
                console.log(employee);
                console.log("DENNIS")
                // var mailOptions = {
                //     from: "uoautomailer@gmail.com",
                //     to: employee.email,
                //     subject: "Your accout information",
                //     text: 'Hey, ' + employee.firstName + ' Your account is successful created and ready to use. Your username is ' + employee.email + ' and password is '
                //      + password +'.  Please use this link to login  http://tannin.herokuapp.com/. Thanks you, ' + employee.restaurantName

                //     //  "Hey, " +employee.firstName + "Your account is successful created, and ready to use. " + "Your username is: " +employee.email +","
                //     //   + req.body.lenderName + " has set a due date of " + req.body.dueDate + ". Please login to UO to confirm this transaction. Thank you, UO."
                //   };
                  // transporter.sendMail(mailOptions, function (error, info) {
                  //     console.log(mailOptions);
                  //   if (error) {
                  //     console.log(error);
                  //   } else {
                  //     console.log('Email sent: ' + info.response);
                  //   }
                  // });

                db.Restaurants.findOneAndUpdate({ _id: employee.restaurantId }, { $push: { Employees: employee._id } }, { new: true }).then(resturant => {
                    console.log(employee, resturant);
                    res.json({ employee, resturant });
                });
            });
        }
        else {
            res.json("Employee already exists");
        }
        // res.json("hello")
    })
});

//DELETE EMPLOYEE ROUTE CORRECT
app.put('/api/deleteEmployee', function (req, res) {
    console.log(req.body, "DELETEDEMPLOYEe");
    const {id, restaurantId} = req.body
    console.log(restaurantId);
    //first, find User to get restartnt id,
    //next, delete user
    //then, find Restartn by id we grabbed in step one and update employees array to remove that employee
    // db.Restaurants.findOne({_id:restaurantId},{$pull:{Employees:id}}).then(restaurant=>{
    //     console.log(restaurant)
    //     // res.json(restaurant);
    // })

    // 5ef2a3cceacc066c180344cd
    db.Employees.deleteOne({_id:id}).then(emp=>{
      console.log("DELETEEMP")
      console.log(emp)
      res.json(emp)
  })

//   db.Employees.findOne({_id:id}).then(emp=>{
//     console.log("CHECKEMP")
//     console.log(emp)
//     // res.json(emp)
// })
    
});

//DELETE WINE CORRECT
// app.put("/api/restaurant/delete", function(req, res) {
//   console.log(req.body);
//       const {id, restaurantId} = req.body
//       console.log(restaurantId);
//     db.Restaurants.updateOne({_id:restaurantId},{$pull:{Wines:id}}).then(restaurant=>{
//       console.log("?????????????")
//         console.log(restaurant)
//         console.log("?????????????")
//         // res.json(restaurant);
//             res.json(restaurant)
//         })
//     } 
// );

//=================
//GET WINE ROUTE
//================

//ROUTE FOR getSavedWine
app.post("/api/getwine", function(req, res) {
    // Find all users
    console.log("////////////////");
    console.log(req.body);
    console.log("////////////////");
    db.Restaurants.findOne({_id: req.body.restaurantId})
      // Specify that we want to populate the retrieved users with any associated notes
      .populate("Wines")
      .populate("Employees")
      .then(function(dbUser) {
        console.log(dbUser);
        // If able to successfully find and associate all Users and Notes, send them back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });



//================
//SEEDING ROUTES
//================

app.get("/api/wineseed", function(req, res){
        db.MasterWineList.collection.deleteMany({})
        .then(() => db.MasterWineList.collection.insertMany(wineSeed))
        .then(data => {
        res.send('Wine successfully Seeded!')
    })
    .catch(err => {
        console.error(err);
    });

});

app.get("/api/restaurantseed", function(req, res){
    db.Restaurants.remove({})
    .then(() => db.Restaurants.collection.insertMany(restaurantSeed))
    .then(data => {
    res.send('Restaurants successfully Seeded!')
})
.catch(err => {
    console.error(err);
});
});

app.get("/api/empseed", function (req, res) {
  db.Employees.remove({})

    db.Employees.collection.insert(empSeed)
      .then(data => {
        res.send('Joe was successfully Seeded!')
      })
      .catch(err => {
        console.error(err);
      });
  });

//======================
//END OF SEEDING ROUTES
//======================

// app.use(routes);

// app.use(function (err, req, res, next) {
//     console.log('====== ERROR =======')
//     console.error(err.stack)
//     res.status(500)
// })

app.listen(PORT, function(){
    console.log("Listening on port %s.", PORT)
});