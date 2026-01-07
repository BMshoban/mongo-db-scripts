db.todos.countDocuments({
  org_id: "VAR1",
  _id: { $in: VAR2 }
});

db.todos.updateMany(
  {
    org_id: "VAR1",
    _id: { $in: VAR2 }
  },
  {
    $set: SET_DATA
  }
);
