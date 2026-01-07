db.customerdata1.countDocuments({
  _id: { $in: VAR1 }
});

db.customerdata1.updateMany(
  {
    _id: { $in: VAR1 }
  },
  {
    $set: SET_DATA
  }
);
