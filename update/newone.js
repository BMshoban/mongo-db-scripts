db.customers.countDocuments({
  org_id: "VAR1",
  _id: { $in: VAR2 },
  "payments._id": { $in: VAR3 }
});

// ===== Update Payments with Different Amounts =====
db.customers.updateMany(
  {
    org_id: "VAR1",
    _id: { $in: VAR2 }
  },
  {
    $set: {
      "payments.$[p1].amount": VAR4,
      "payments.$[p2].amount": VAR5,
      updatedBy: "VAR6",
      updatedAt: new Date()
    }
  },
  {
    arrayFilters: [
      { "p1._id": ObjectId("PAYMENT_ID_1") },
      { "p2._id": ObjectId("PAYMENT_ID_2") }
    ]
  }
);
