// ===== Impact Preview =====
db.users.countDocuments({
  email: FILTER
});

// ===== UPDATE OPERATION =====
db.users.updateMany(
  { email: FILTER },
  {
    $set: SET_DATA
  }
);
