const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const fileDir = `${process.cwd()}/users`;

// storage declaration and configure for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

// file uploader funciton creating
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const serviceDir = `${process.cwd()}/services`;

// storage declaration and configure for file uploading
const servicesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, serviceDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

// file uploader funciton creating
const serviceUpload = multer({
  storage: servicesStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@create-eve.svsmukc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    await client.connect();
    const allServiceCollection = client
      .db("create-eve-db")
      .collection("all-service");

    const allReviewCollection = client
      .db("create-eve-db")
      .collection("all-review");

    // const allBlogsCollection = client
    //   .db("create-eve-db")
    //   .collection("all-Blogs");

    const allVenue = client.db("create-eve-db").collection("all-venue");

    const allBookingCollection = client
      .db("create-eve-db")
      .collection("all-booking");

    const allBookingVenueCollection = client
      .db("create-eve-db")
      .collection("all-booking-venue");

    const userCollection = client.db("create-eve-db").collection("all-users");

    const allFirst4FaqQuestion = client
      .db("create-eve-db")
      .collection("all-first4-faq-question");

    const allSubServicesCollection = client
      .db("create-eve-db")
      .collection("all-sub-services");

    // const allTicketBookingCollection = client
    //   .db("create-eve-db")
    //   .collection("all-ticket-booking");

    // const allCommentCollection = client
    //   .db("create-eve-db")
    //   .collection("all-comment-collection");
    // // for employee
    // const allEmployee = client.db("create-eve-db").collection("all-employee");

    // package collection
    const allPackage = client.db("create-eve-db").collection("all-package");

    // wedding collection
    const allWedding = client.db("create-eve-db").collection("all-wedding");

    // birthday collection
    const allBirthday = client.db("create-eve-db").collection("all-birthday");

    // walima collection
    const allWalima = client.db("create-eve-db").collection("all-walima");

    // iftar party collection
    const allIftarParty = client
      .db("create-eve-db")
      .collection("all-iftar-party");

    // catering collection
    const allCatering = client.db("create-eve-db").collection("all-catering");

    // lighting collection
    const allLighting = client.db("create-eve-db").collection("all-lighting");

    // audio visual collection
    const allAudioVisual = client
      .db("create-eve-db")
      .collection("all-audiovisual");

    // audio visual collection
    const allBannerImages = client
      .db("create-eve-db")
      .collection("all-banner-img");

    // verify admin
    const verifyAdmin = async (req, res, next) => {
      // const uid = req.cookies?.uid;
      const uid = req.headers?.uid;
      const user = await userCollection.findOne({ uid: uid });

      if (user?.role === "admin" || user?.role === "owner") {
        next();
      } else {
        res.status(403).send({ message: "Forbidden access" });
      }
    };

    // verify Owner
    const verifyOwner = async (req, res, next) => {
      // const uid = req.cookies?.uid;
      const uid = req.headers?.uid;
      const user = await userCollection.findOne({ uid: uid });

      if (user?.role === "owner") {
        next();
      } else {
        res.status(403).send({ message: "Forbidden access" });
      }
    };

    // app.post("/post-review", async (req, res) => {
    //   const postReview = await allReviewCollection.insertOne(req.body);
    //   res.send(postReview);
    // });

    // get home banner images
    app.get('/home-banner',async (req,res)=> {
        const result = await allBannerImages.find({}).toArray();
        res.send(result);
    })

    // post home banner images
    app.post('/home-banner', verifyAdmin, async (req,res)=> {
      const banners = req.body;
      await allBannerImages.deleteMany({});
      await allBannerImages.insertMany(banners);
      res.send({upload:true});
    })

    // get sub services api
    app.get("/get-sub-services/:type", async (req, res) => {
      const { type } = req.params;
      const result = await allSubServicesCollection.find({ type }).toArray();
      res.send(result);
    });

    // EVENT LISTING START
    // app.get("/eventlisting", async (req, res) => {
    //   const type = req.query.catagory;
    //   const query = { type: type };
    //   const result = await allEventListCollection.find(query).toArray();
    //   res.send(result);
    // });

    // app.get("/alleventlisting", async (req, res) => {
    //   const query = {};
    //   const result = await allEventListCollection.find(query).toArray();
    //   res.send(result);
    // });

    // // get individual event
    // app.get("/alleventlisting/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const event = await allEventListCollection.findOne({ _id: ObjectId(id) });
    //   res.send(event);
    // });

    // EVENT LISTING END
    // BLOGS SECTION START

    // app.get("/blogs", async (req, res) => {
    //   const query = {};
    //   const result = await allBlogsCollection.find(query).toArray();
    //   res.send(result);
    // });
    // app.get("/blogsdetail/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await allBlogsCollection.findOne(query);
    //   res.send(result);
    // });

    // get all sub-service api

    app.get("/services-get", async (req, res) => {
      const getAllServices = await allServiceCollection.find({}).toArray();
      res.send(getAllServices);
    });

    // get service filter by id
    app.get("/single-service/:id", async (req, res) => {
      const getSingleServiceById = await allServiceCollection.findOne({
        _id: ObjectId(req.params.id),
      });
      res.send(getSingleServiceById);
    });

    // get event venues
    app.get("/venues", async (req, res) => {
      const venues = await allVenue.find({}).toArray();
      res.send(venues);
    });

    // get single event venue
    app.get("/venue/:id", async (req, res) => {
      const id = req.params;
      const venue = await allVenue.findOne({ _id: ObjectId(id) });
      res.send(venue);
    });

    // get  all EventList data
    app.get("/event-details/:id", async (req, res) => {
      const id = req.params;
      const venue = await allEventListCollection.findOne({ _id: ObjectId(id) });
      res.send(venue);
    });

    // booking venue api
    app.post("/venue-booking", async (req, res) => {
      const bookingVenue = await allBookingVenueCollection.insertOne(req.body);
      res.send(bookingVenue);
    });

    // post user package/event bookings
    app.post("/bookings", async (req, res) => {
      const result = await allBookingCollection.insertOne(req.body);
      res.send(result);
    });

    // get all bookings
    app.get("/get-all-booking-info", verifyAdmin, async (req, res) => {
      const { limit, page } = req.query;
      const dataLength = await allBookingCollection.countDocuments();
      const totalPages = Math.ceil(dataLength / limit);
      const bookings = await allBookingCollection
        .find({})
        .sort({ _id: -1 })
        .skip(parseInt(limit) * (parseInt(page) - 1))
        .limit(parseInt(limit))
        .toArray();
      res.send({ bookings, totalPages, totalBookings:dataLength });
    });

    // booking info for user, filter by email
    app.get("/bookings/:uid", async (req, res) => {
      const { uid } = req.params;
      const query = { userId: uid };
      const myBookings = await allBookingCollection.find(query).toArray();
      res.send(myBookings);
    });

    // booking info update by id
    app.put("/payment-info/:id", async (req, res) => {
      const { id } = req.params;
      const result = await allBookingCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: req.body },
        { upsert: false }
      );
    });

    // delete a booking
    app.delete("/bookings/:id", async (req, res) => {
      const result = await allBookingCollection.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });

    // get single user by uid
    app.get("/user/:uid", async (req, res) => {
      const { uid } = req.params;
      const result = await userCollection.findOne({ uid: uid });
      res.send(result);
    });

    // all user start
    app.put("/user/:uid", async (req, res) => {
      const { uid } = req.params;
      const user = req.body;
      const filter = { uid };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.cookie('uid',uid);
      res.send({ result });
    });
    
    // clear cookie after signout
    app.get('/sign-out', async (req,res)=> {
      res.clearCookie('uid');
      res.location(req.headers.referer);
      res.send();
    })

    // get all user for admin dashboard
    app.get("/allusers", verifyAdmin, async (req, res) => {
      const query = {uid:{$ne:req.headers?.uid}};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    // make admin by existing admin
    app.put("/make-admin/:uid", verifyAdmin, async (req, res) => {
      const { uid } = req.params;
      const user = await userCollection.updateOne(
        { uid: uid },
        {
          $set: {
            role: "admin",
          },
        },
        { upsert: false }
      );
      res.send(user);
    });

    // remove admin by owner
    app.put("/remove-admin/:uid", verifyOwner, async (req, res) => {
      const { uid } = req.params;
      const user = await userCollection.updateOne(
        { uid: uid },
        {
          $set: {
            role: "user",
          },
        },
        { upsert: false }
      );
      res.send(user);
    });

    // single user
    app.get("/single-user/:uid", async (req, res) => {
      const { uid } = req.params;
      const query = { uid };
      const result = await userCollection.findOne(query);
      res.send(result);
    });
    // end single user

    // update user
    app.put("/user-update/:uid", async (req, res) => {
      const { uid } = req.params;
      const query = { uid };
      const user = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };

      const userInfo = await userCollection.findOne(query);
      if (user?.userImg) {
        fs.unlink(`${fileDir}/${userInfo?.userImg}`, err => {});
      }

      const result = await userCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // end update user

    app.get("/allQuestion", async (req, res) => {
      const query = {};
      const result = await allFirst4FaqQuestion.find(query).toArray();
      res.send(result);
    });

    // get an admin
    app.get("/admin/:uid", async (req, res) => {
      const { uid } = req.params;
      const user = await userCollection.findOne({ uid });
      if (user?.role === "admin" || user?.role === "owner") {
        res.send({ admin: true });
      } else {
        res.send({ admin: false });
      }
    });

    // get product filter by id for payment
    app.get("/payment/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const booking = await allBookingCollection.findOne(query);
      res.send(booking);
    });

    // payment
    app.post("/create-payment-intent", async (req, res) => {
      const totalPrice = req.body?.totalPrice;
      // const amount = totalPrice>1 && parseInt(totalPrice);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    // get individual blogs comment
    // app.get("/comment/:blogId", async (req, res) => {
    //   const { blogId } = req.params;
    //   const comments = await allCommentCollection.find({ blogId: blogId }).toArray();
    //   res.send(comments);
    // });

    // // get individual blogs comment
    // app.get("/my-comment/:commentId", async (req, res) => {
    //   const { commentId } = req.params;
    //   const comments = await allCommentCollection.find({ commentId: commentId }).toArray();
    //   res.send(comments);
    // });

    // //  write a comment
    // app.put("/comment", async (req, res) => {
    //   const newServices = req.body;
    //   const result = await allCommentCollection.updateOne({ commentId: newServices?.commentId }, { $set: newServices }, { upsert: true });
    //   res.send({ success: result?.acknowledged });
    // });

    // // individual user's ticket booking put method
    // app.put("/ticket-booking/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const { booking } = req.body;
    //   const result = await allTicketBookingCollection.updateOne({ bookingId: id }, { $set: booking }, { upsert: true });
    //   res.send({ success: result?.acknowledged });
    // })

    // // individual user's ticket booking get method
    // app.get("/ticket-booking/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const result = await allTicketBookingCollection.findOne({ bookingId: id });
    //   res.send(result);
    // })

    // // individual tickets get method by userId
    // app.get("/user-booked-ticket/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const result = await allTicketBookingCollection.find({ userId: id }).toArray();
    //   res.send(result);
    // })

    // // delete booked ticket api by eventId
    // app.delete("/delete-booked-ticket/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const deleted = await allTicketBookingCollection.deleteOne({ eventId: id });
    //   res.send(deleted);
    // });

    // // individual booked event get method by eventId
    // app.get("/event-booked-ticket/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const result = await allTicketBookingCollection.find({ eventId: id }).toArray();
    //   res.send(result);
    // })
    // get employed data
    // app.get("/employee/:profession", async (req, res) => {
    //   const { profession } = req.params;
    //   const find = { profession: profession }
    //   const result = await allEmployee.find(find).toArray();
    //   res.send(result);
    // })
    // app.post("/employee", async (req, res) => {
    //   const employee = req.body;
    //   const result = await allEmployee.insertOne(employee);
    //   res.send(result);
    // })

    // app.get("/employee", async (req, res) => {
    //   const result = await allEmployee.find().toArray();
    //   res.send(result);
    // })

    // app.get("/update-employee/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const query = { _id: ObjectId(id) };
    //   const result = await allEmployee.findOne(query);
    //   res.send(result);
    // })
    // app.put("/update-employee/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const filter = { _id: ObjectId(id) };
    //   const option = { upsert: true };
    //   const employee = req.body;
    //   const updateDoc = {
    //     $set: employee,
    //   }
    //   const result = await allEmployee.updateOne(filter,updateDoc,option);
    //   res.send(result);
    // })
    // app.delete("/delete-employee/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const deleted = await allEmployee.deleteOne({ _id: ObjectId(id) });
    //   res.send(deleted);
    // });

    // get all packages

    app.get("/packages", async (req, res) => {
      const result = await allPackage.find().toArray();
      res.send(result);
    });

    // get package through category
    app.get("/packages/:category", async (req, res) => {
      const { category } = req.params;
      const package = await allPackage.findOne({ category: category });
      res.send(package);
    });

    // upsert new category
    app.put("/packages/:category", verifyAdmin, async (req,res)=> {
        const { category } = req.params;
        const selected = await allPackage.findOne({category: category});

        if (selected?.coverPhoto!==req.body?.coverPhoto) {
          fs.unlink(`${serviceDir}/${selected?.coverPhoto}`, err => {});
        }

        const result = await allPackage.updateOne({category: category},{$set: req.body},{upsert:true});
        res.send(result);
    })

    // get packages collection by category
    app.get("/all-packages/:category", async (req, res) => {
      const { category } = req.params;
      const { range, sort } = req.query;

      if (parseInt(range)) {
        const result = await client
          .db("create-eve-db")
          .collection(`all-${category}`)
          .find({ price: { $lte: parseInt(range) } })
          .sort({price:sort})
          .toArray();
        res.send(result);
      } else {
        const result = await client
        .db("create-eve-db")
        .collection(`all-${category}`)
        .find({ })
        .sort({price:sort})
        .toArray();

        res.send(result);
      }
    });

    // get all services by type
    app.get("/services/:type", async (req, res) => {
      const { type } = req.params;
      const result = await client
      .db("create-eve-db")
      .collection(`all-${type}`)
      .find({})
      .sort({price:1})
      .toArray();

      res.send(result);
    });

    // post a service
    app.post("/service/:type", async (req, res) => {
      const { type } = req.params;
      const result = await client
        .db("create-eve-db")
        .collection(`all-${type}`)
        .insertOne(req.body);
      res.send(result);
    });

    // update a service
    app.put("/service/:type/:id", verifyAdmin, async (req, res)=>{
      const { type, id } = req.params;
      const service = req.body;
      const findService = await client
        .db("create-eve-db")
        .collection(`all-${type}`)
        .findOne({ _id: ObjectId(id) })

        if (findService?.img===service?.img) {
          const result = await client
          .db("create-eve-db")
          .collection(`all-${type}`)
          .updateOne({ _id: ObjectId(id) },{ $set:{ ...service } },{upsert:false})

          res.send(result);
        } else {
          fs.unlink(`${serviceDir}/${findService?.img}`, err => {});

          const result = await client
          .db("create-eve-db")
          .collection(`all-${type}`)
          .updateOne({ _id: ObjectId(id) },{ $set:{ ...service } },{upsert:false})

          res.send(result);
        }
    })

    // delete a service by id
    app.delete("/service/:type/:id", verifyAdmin, async (req, res) => {
      const { type, id } = req.params;

      /* const findService = await client
        .db("create-eve-db")
        .collection(`all-${type}`)
        .findOne({ _id: ObjectId(id) }) */
      
        // fs.unlink(`${serviceDir}/${findService?.img}`, err => { });
      
      const result = await client
        .db("create-eve-db")
        .collection(`all-${type}`)
        .deleteOne({ _id: ObjectId(id) })
      
        res.send(result);
    })

    // post a package
    app.post("/package/:category", async (req, res) => {
      const { category } = req.params;
      // console.log(category);
      const result = await client
        .db("create-eve-db")
        .collection(`all-${category}`)
        .insertOne(req.body);
      res.send(result);
    });

    // update a package
    app.put("/package/:category/:id", verifyAdmin, async (req, res)=>{
      const { category } = req.params;
      const { id } = req.params;
      const pkg = req.body;
      const findPkg = await client
        .db("create-eve-db")
        .collection(`all-${category}`)
        .findOne({ _id: ObjectId(id) })

        if (findPkg?.coverPhoto===pkg?.coverPhoto) {
          const result = await client
          .db("create-eve-db")
          .collection(`all-${category}`)
          .updateOne({ _id: ObjectId(id) },{ $set:{ ...pkg } },{upsert:false})

          res.send(result);
        } else {
          fs.unlink(`${serviceDir}/${findPkg?.coverPhoto}`, err => {});

          const result = await client
          .db("create-eve-db")
          .collection(`all-${category}`)
          .updateOne({ _id: ObjectId(id) },{ $set:{ ...pkg } },{upsert:false})

          res.send(result);
        }
    })

    // delete a package by id
    app.delete("/package/:category/:id", verifyAdmin, async (req, res) => {
      const { category } = req.params;
      const { id } = req.params;

      /* const findPkg = await client
        .db("create-eve-db")
        .collection(`all-${category}`)
        .findOne({ _id: ObjectId(id) }) */
      
        // fs.unlink(`${serviceDir}/${findPkg?.coverPhoto}`, err => { });
      
      const result = await client
        .db("create-eve-db")
        .collection(`all-${category}`)
        .deleteOne({ _id: ObjectId(id) })
      
        res.send(result);
    })

    // upload user image
    app.post("/userImg", upload.single("userImg"), (req, res) => {
      res.send({ ...req?.file, uploaded: true });
    });

    // get user image
    app.get("/userImg/:id", async (req, res) => {
      const { id } = req.params;
      const file = `${__dirname}/users/${id}`;
      res.sendFile(file);
    });

    // upload service image
    app.post("/serviceImg", verifyAdmin, serviceUpload.single("img"), (req, res) => {
      res.send({ ...req?.file, uploaded: true });
    });

    // get service image
    app.get("/serviceImg/:id", async (req, res) => {
      const { id } = req.params;
      const file = `${__dirname}/services/${id}`;
      res.sendFile(file);
    });

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("CREATE-EVE server is running");
});

app.listen(port, () => {
  console.log("Listning to port", port);
});
