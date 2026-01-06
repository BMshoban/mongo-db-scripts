
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
    $set: {
      name: "VAR6",
      status: "VAR4",
      updatedBy: "VAR5",
      updatedAt: new Date()
    }
  }
);
