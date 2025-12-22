db.users.countDocuments({
  email: "user1@shoban.com"
});

db.users.deleteOne({
  email: "user1@shoban.com"
});