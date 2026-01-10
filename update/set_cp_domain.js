function validate() {
  if (!Array.isArray(VAR1) || VAR1.length === 0) {
    print("ERROR: VAR1 is required and must be a non-empty array");
    return false;
  }

  if (!VAR2 || typeof VAR2 !== "string") {
    print("ERROR: VAR2 is required");
    return false;
  }

  return true;
}




async function count() {
  const org_count = await db.organizations2_locals.countDocuments({
    _id: { $in: VAR1 }
  });

  const customer_count = await db.customerdata1.countDocuments({
    _id: { $in: VAR1 }
  });

  print(`INFO: org_count=${org_count}, customer_count=${customer_count}`);

  return { org_count, customer_count };
}

async function preview() {
  await count();
}

if (typeof MODE !== "undefined" && MODE === "PREVIEW") {
  preview().then(() => quit(0)).catch(e => {
    print("ERROR:", e.message);
    quit(1);
  });
}

//async function backup(){

//}

async function script() {
  const org_update = await db.organizations2_locals.updateOne({ _id:{ $in: VAR1 } }, {
    $set: {
      customer_portal_url: {
        domain_name: VAR2,
        is_configured: true
      }
    }
  });
// BACKUPS
  //console.log({ org_update })

  const customer_update = await db.customerdata1.updateOne({ _id: { $in: VAR1 } }, [{
    $set: {
      customer_portal_url: { $concat: [VAR2, "$customer_portal_hash"] }
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
// NEW
