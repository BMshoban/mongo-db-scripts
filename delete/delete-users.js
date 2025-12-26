db.users.countDocuments({
  email: "user2@shoban.com"
});

db.users.deleteOne({
  email: "user2@shoban.com"
});
