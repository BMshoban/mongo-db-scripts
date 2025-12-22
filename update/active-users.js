db.users.countDocuments({
  email: "user1@shoban.com"
});

db.users.updateOne(
  { email: "user1@shoban.com" },
  {
    $set: {
      role: "ADMIN",
      updatedAt: new Date()
    }
  }
);