// ===== Impact Preview =====
db.users.countDocuments({
  email: "FILTER_EMAIL"
});

// ===== UPDATE OPERATION =====
db.users.updateOne(
  { email: "FILTER_EMAIL" },
  {
    $set: SET_DATA
  }
);
