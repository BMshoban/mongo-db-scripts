db.users.countDocuments({
  email: {
    $in: USERS
  }
});
