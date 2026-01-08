db.customerdata1.countDocuments({
  _id: { $in: VAR1 }
});

db.customerdata1.updateOne(
  {
    _id: { $in: VAR1 }
  },
  {
    $set: {
      display_name: VAR2,
      default_currency: VAR3
    }
  }
);
