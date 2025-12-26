db.users.countDocuments({
  email: {
    $in: [
      "user2@shoban.com",
      "user3@shoban.com",
      "user4@shoban.com"
    ]
  }
});

db.users.insertMany([
  {
    username: "shoban_user2",
    email: "user2@shoban.com",
    role: "USER",
    status: "ACTIVE",
    createdAt: new Date()
  },
  {
    username: "shoban_user3",
    email: "user3@shoban.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date()
  },
  {
    username: "shoban_user4",
    email: "user4@shoban.com",
    role: "USER",
    status: "INACTIVE",
    createdAt: new Date()
  }
]);
