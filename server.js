// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Add this line
const app = express();
const port = 3000;

const multer = require("multer");
const path = require("path");

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Add this line

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "D:/ruslan/danylo/pics");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

const upload = multer({ storage: storage });

// User data
let users = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    description: {
      gender: "Male",
      age: 25,
      hobby: "Reading",
      education: "Bachelor",
    },
  },
  {
    id: 2,
    name: "Jane",
    surname: "Doe",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    description: {
      gender: "Female",
      age: 28,
      hobby: "Traveling",
      education: "Master",
    },
  },
  {
    id: 3,
    name: "Alice",
    surname: "Smith",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    description: {
      gender: "Female",
      age: 22,
      hobby: "Cooking",
      education: "Associate",
    },
  },
  {
    id: 4,
    name: "Bob",
    surname: "Brown",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    description: {
      gender: "Male",
      age: 30,
      hobby: "Hiking",
      education: "Bachelor",
    },
  },
  {
    id: 5,
    name: "Charlie",
    surname: "Davis",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    description: {
      gender: "Male",
      age: 35,
      hobby: "Fishing",
      education: "High School",
    },
  },
  {
    id: 6,
    name: "Dave",
    surname: "Wilson",
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
    description: {
      gender: "Male",
      age: 40,
      hobby: "Photography",
      education: "Bachelor",
    },
  },
  {
    id: 7,
    name: "Eve",
    surname: "Miller",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    description: {
      gender: "Female",
      age: 27,
      hobby: "Painting",
      education: "Doctorate",
    },
  },
  {
    id: 8,
    name: "Frank",
    surname: "Taylor",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    description: {
      gender: "Male",
      age: 33,
      hobby: "Gaming",
      education: "Master",
    },
  },
  {
    id: 9,
    name: "Grace",
    surname: "Anderson",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    description: {
      gender: "Female",
      age: 24,
      hobby: "Dancing",
      education: "Bachelor",
    },
  },
  {
    id: 10,
    name: "Hank",
    surname: "Thomas",
    photo: "https://randomuser.me/api/portraits/men/6.jpg",
    description: {
      gender: "Male",
      age: 29,
      hobby: "Cycling",
      education: "Associate",
    },
  },
  {
    id: 11,
    name: "Ivy",
    surname: "Jackson",
    photo: "https://randomuser.me/api/portraits/women/5.jpg",
    description: {
      gender: "Female",
      age: 26,
      hobby: "Running",
      education: "Bachelor",
    },
  },
  {
    id: 12,
    name: "Jack",
    surname: "White",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
    description: {
      gender: "Male",
      age: 31,
      hobby: "Swimming",
      education: "High School",
    },
  },
  {
    id: 13,
    name: "Karen",
    surname: "Harris",
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
    description: {
      gender: "Female",
      age: 34,
      hobby: "Yoga",
      education: "Master",
    },
  },
  {
    id: 14,
    name: "Leo",
    surname: "Martin",
    photo: "https://randomuser.me/api/portraits/men/8.jpg",
    description: {
      gender: "Male",
      age: 23,
      hobby: "Climbing",
      education: "Bachelor",
    },
  },
  {
    id: 15,
    name: "Mona",
    surname: "Thompson",
    photo: "https://randomuser.me/api/portraits/women/7.jpg",
    description: {
      gender: "Female",
      age: 25,
      hobby: "Drawing",
      education: "Associate",
    },
  },
  {
    id: 16,
    name: "Nina",
    surname: "Garcia",
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
    description: {
      gender: "Female",
      age: 32,
      hobby: "Knitting",
      education: "Doctorate",
    },
  },
  {
    id: 17,
    name: "Oscar",
    surname: "Martinez",
    photo: "https://randomuser.me/api/portraits/men/9.jpg",
    description: {
      gender: "Male",
      age: 28,
      hobby: "Running",
      education: "Master",
    },
  },
  {
    id: 18,
    name: "Paul",
    surname: "Robinson",
    photo: "https://randomuser.me/api/portraits/men/10.jpg",
    description: {
      gender: "Male",
      age: 26,
      hobby: "Reading",
      education: "Bachelor",
    },
  },
  {
    id: 19,
    name: "Quincy",
    surname: "Clark",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    description: {
      gender: "Male",
      age: 35,
      hobby: "Fishing",
      education: "High School",
    },
  },
  {
    id: 20,
    name: "Rachel",
    surname: "Lewis",
    photo: "https://randomuser.me/api/portraits/women/9.jpg",
    description: {
      gender: "Female",
      age: 27,
      hobby: "Photography",
      education: "Bachelor",
    },
  },
];

// CRUD Routes
// Create a new user
app.post("/users", upload.single("photo"), (req, res) => {
  console.log("req.file", req.file);
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    surname: req.body.surname,
    photo: req.file
      ? req.file.path
      : "https://via.placeholder.com/150/0000FF/808080?text=John+Doe",
    description: req.body.description,
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

// Read all users
app.get("/users", (req, res) => {
  const usersWithFullPhotoPath = users.map((user) => ({
    ...user,
    photo: user.photo ? `http://localhost:${port}${user.photo}` : null,
  }));
  res.send(usersWithFullPhotoPath);
});

// Read a user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  if (user.photo.startsWith("D:/ruslan/danylo/pics")) {
    fs.readFile(user.photo, (err, data) => {
      if (err) return res.status(500).send("Error reading photo file");
      user.photo = `data:image/${path
        .extname(user.photo)
        .slice(1)};base64,${data.toString("base64")}`;
      res.send(user);
    });
  } else {
    res.send(user);
  }
});

// Update a user by ID
app.put("/users/:id", upload.single("photo"), (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name || user.name;
  user.surname = req.body.surname || user.surname;
  if (req.file) {
    // Optionally delete the old photo file if it exists
    if (user.photo.startsWith("D:/ruslan/danylo/pics")) {
      fs.unlink(user.photo, (err) => {
        if (err) console.error("Failed to delete old photo:", err);
      });
    }
    user.photo = req.file.path;
  }
  user.description = req.body.description || user.description;

  res.send(user);
});

// Delete a user by ID
app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
