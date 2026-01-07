db.customers.countDocuments({
  org_id: "VAR1",
  _id: { $in: VAR2 }
});

db.customers.updateMany(
  {
    org_id: "VAR1",
    _id: { $in: VAR2 }
  },
  {
    $set: SET_DATA
  }
);
