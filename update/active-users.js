db.users.countDocuments({
  email: "user1@shoban.com"
});

db.users.updateOne(
  { email: "user1@shoban.com" },
  {
    $set: {
      phone: "+91-9000000001",
      updatedAt: new Date()
    }
  }
);