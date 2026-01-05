// ===== Impact Preview =====
db.users.countDocuments({
  email: FILTER_EMAIL
});

// ===== UPDATE OPERATION =====
db.users.updateOne(
<<<<<<< HEAD
  { email: FILTER_EMAIL },
=======
  { email: FILTER },
>>>>>>> b005c58ed7b08571a9b782101f7e2ed8bdc6ddc0
  {
    $set: SET_DATA
  }
);
