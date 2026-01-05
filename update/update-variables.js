// ===== Impact Preview =====
db.users.countDocuments({
  email: FILTER
});

// ===== UPDATE OPERATION =====
db.users.updateOne(
  { email: FILTER },
  {
    $set: SET_DATA
  }
);
