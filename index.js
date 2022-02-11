const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const SSLCommerzPayment = require('sslcommerz')
const app = express()
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").objectId;
// const run = require('nodemon/lib/monitor/run');

const port = process.env.PORT || 8000;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.texip.mongodb.net/randomUsers?retryWrites=true&w=majority`;
// const uri = 
// `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4t39k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// console.log(client)


//midleware 


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send('Hellow world')
})



async function run() {
    try {
        // await client.connect();
        // const ProductsCollection = client.db("eshop").collection("Products");
       



        //  add products Collection

//  app.post("/addProducts", async (req, res) => {
//     console.log(req.body);
//     const result = await ProductsCollection.insertOne(req.body);
//     res.send(result);

    
//   });


  // Payment Initializaiton api 

  //sslcommerz init
app.get('/init', (req, res) => {
  const data = {
      total_amount: 100,
      currency: 'BDT',
      tran_id: 'REF123',
      success_url: 'http://localhost:8000/success',
      fail_url: 'http://localhost:8000/fail',
      cancel_url: 'http://localhost:8000/cancel',
      ipn_url: 'http://localhost:8000/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'cust@yahoo.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
      multi_card_name: 'mastercard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D'
  };
  const sslcommer = new SSLCommerzPayment(process.env.Store_ID, process.env.Store_Password,false) //true for live default false for sandbox
  sslcommer.init(data).then(data => {
      //process the response that got from sslcommerz 
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
      // console.log(data);
      res.redirect(data. GatewayPageURL)
      // console.log(data)
  });
})

app.post('/success',async(req,res) =>{
  console.log(req.body)
  res.status(200).json(req.body)

})
app.post('/fail',async(req,res) =>{
  console.log(req.body)
  res.status(400).json(req.body)

})
app.post('/cancel',async(req,res) =>{
  console.log(req.body)
  res.status(200).json(req.body)

})

  // get all services

  // app.get("/allProducts", async (req, res) => {
  //   const result = await ProductsCollection.find({}).toArray();
  //   res.send(result);
  // });

  // single service
  // app.get("/singleService/:id", async (req, res) => {
  //   // console.log(req.params.id);
  //   const result = await servicesCollection
  //     .find({ _id: ObjectId(req.params.id) })
  //     .toArray();
  //   res.send(result[0]);
  //   // console.log(result);
  // });

//   // insert order and

//   app.post("/addOrders", async (req, res) => {
//     const result = await ordersCollection.insertOne(req.body);
//     res.send(result);
//   });

//   //  my order

//   app.get("/myOrder/:email", async (req, res) => {
//     console.log(req.params.email);
//     const result = await ordersCollection
//       .find({ email: req.params.email })
//       .toArray();
//     res.send(result);
//   });

//   // review
//   app.post("/addSReview", async (req, res) => {
//     const result = await reviewCollection.insertOne(req.body);
//     res.send(result);
//   });

//   app.post("/addUserInfo", async (req, res) => {
//     console.log("req.body");
//     const result = await usersCollection.insertOne(req.body);
//     res.send(result);
//     console.log(result);
//   });
//   //  make admin

//   app.put("/makeAdmin", async (req, res) => {
//     const filter = { email: req.body.email };
//     const result = await usersCollection.find(filter).toArray();
//     if (result) {
//       const documents = await usersCollection.updateOne(filter, {
//         $set: { role: "admin" },
//       });
//       console.log(documents);
//     }
//     // else {
//     //   const role = "admin";
//     //   const result3 = await usersCollection.insertOne(req.body.email, {
//     //     role: role,
//     //   });
//     // }

//     // console.log(result);
//   });

//   // check admin or not
//   app.get("/checkAdmin/:email", async (req, res) => {
//     const result = await usersCollection
//       .find({ email: req.params.email })
//       .toArray();
//     // console.log(result);
//     res.send(result);
//   });

//   /// all order
  // app.get("/allOrders", async (req, res) => {
  //   // console.log("hello");
  //   const result = await ordersCollection.find({}).toArray();
  //   res.send(result);
  // });

//   // status update
//   app.put("/statusUpdate/:id", async (req, res) => {
//     const filter = { _id: ObjectId(req.params.id) };
//     // console.log(req.params.id);
//     const result = await ordersCollection.updateOne(filter, {
//       $set: {
//         status: req.body.status,
//       },
//     });
//     res.send(result);
//     // console.log(result);
//   });


// app.listen(process.env.PORT || 5000);
// app.listen(port,(err)=>{
//   console.log("Listen post here ",port);
// })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



}



finally {

}
}
run().catch(console.dir);




