db.users.countDocuments({
  email: "user4@shoban.com"
});

db.users.deleteOne({
  email: "user4@shoban.com"
});