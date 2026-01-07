db.customers.countDocuments({
  org_id: "VAR1",
  _id: { $in: VAR2 },
  "payments._id": { $in: VAR3 }
});

db.customers.updateMany(
  {
    org_id: "VAR1",
    _id: { $in: VAR2 },
    "payments._id": { $in: VAR3 }
  },
  {
    $set: {
      "payments.$[p].amount": VAR4,
      updatedBy: "VAR5",
      updatedAt: new Date()
    }
  },
  {
    arrayFilters: [
      { "p._id": { $in: VAR3 } }
    ]
  }
);
