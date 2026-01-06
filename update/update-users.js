// STEP 2.1: FILTER PLACEHOLDER
const filter = {
  email: FILTER_EMAIL
};

// STEP 2.2: PREVIEW COUNT (MANDATORY)
db.users.countDocuments(filter);

// STEP 2.3: UPDATE
db.users.updateOne(
  filter,
  {
    $set: SET_DATA
  }
);

