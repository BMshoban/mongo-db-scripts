// ===== Impact Preview =====
db.users.countDocuments({
  email: {
    $in: USERS
  }
});

// ===== DELETE OPERATION =====
db.users.deleteMany({
  email: {
    $in: USERS
  }
});
