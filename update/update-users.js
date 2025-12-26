db.users.countDocuments({
  email: "user1@shoban.com"
});

db.users.updateOne(
  { email: "user1@shoban.com" },
  {
    $set: {
      role: "ADMIN"
      phone: "+91-9176663569",
      updatedAt: new Date()
    }
  }
);
