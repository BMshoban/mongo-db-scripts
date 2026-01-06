db.users.countDocuments({
  _id: ObjectId("FILTER_ID")
});

db.users.updateOne(
  { _id: ObjectId("FILTER_ID") },
  {
    $set: SET_DATA
  }
);
