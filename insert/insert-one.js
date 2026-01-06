const user = db.users.findOne({ email: FILTER_EMAIL });

if (!user) {
  throw new Error("User not found: " + FILTER_EMAIL);
}

db.user_metadata.insertOne({
  userId: user._id,
  email: user.email,
  INSERT_DATA
});

db.user_metadata.countDocuments({
  email: FILTER_EMAIL
});

