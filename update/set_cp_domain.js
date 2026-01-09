function validate() {
  if (typeof VAR1 === "undefined") {
    print("ERROR: VAR1 is required");
    return false;
  }

  if (!VAR2 || !VAR3) {
    print("ERROR: VAR2 and VAR3 are required");
    return false;
  }

  return true;
}



async function count() {
  const org_count = await db.organizations2_locals
    .find({ _id: { $in: VAR1 } })
    .count();

  const customer_count = await db.customerdata1
    .find({ org_id: VAR2 })
    .count();

  print({
    org_count,
    customer_count
  });
}


//async function backup(){

//}

async function script() {
  const org_update = await db.organizations2_locals.updateOne({ _id:{ $in: VAR1 } }, {
    $set: {
      customer_portal_url: {
        domain_name: VAR3,
        is_configured: true
      }
    }
  });
// BACKUPS
  //console.log({ org_update })

  const customer_update = await db.customerdata1.updateOne({ org_id: VAR2 }, [{
    $set: {
      customer_portal_url: { $concat: [VAR3, "$customer_portal_hash"] }
    }
  }]);

  console.log({ customer_update })
}


(async function main() {
  try {
    if (!validate()) {
      quit(1);   // abort Jenkins
    }

    await count();   // optional
    await script();  // main logic

    quit(0);         // continue Jenkins
  } catch (e) {
    print("ERROR:", e.message);
    quit(1);         // abort Jenkins
  }
})();
