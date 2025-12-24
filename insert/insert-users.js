db.users.createIndex(
  { email: 1 },
  { unique: true }
);

db.users.countDocuments({
  email: "user1@shoban.com"
});

db.users.insertOne({
  username: "shoban_user1",
  email: "user1@shoban.com",
  role: "USER",
  status: "ACTIVE",
  phone: "+91-9000000001",
  createdAt: new Date(),
  updatedAt: new Date()
});
