if (typeof DRY_RUN === 'undefined') DRY_RUN = true;

function toIn(v) {
  if (Array.isArray(v)) {
    return { $in: v };
  }

  if (typeof v === 'string' && v.includes(',')) {
    return { $in: v.split(',').map(s => s.trim()) };
  }

  return v;
}


async function count() {
   const org_count = await db.organizations2_locals.countDocuments({
    _id: toOne(VAR1)
  });

  const customer_count = await db.customerdata1.countDocuments({
    org_id: toIn(VAR2)
  });

  print(`MATCHED:organizations2_locals=${org_count}`);
  print(`MATCHED:customerdata1=${customer_count}`);
  print(`TOTAL_MATCHED=${org_count + customer_count}`);

  return { org_count, customer_count };
}

//async function backup(){

//}

async function script() {
  if (DRY_RUN) {
    print("DRY_RUN=true — no updates executed");
    return;
  }

  const org_update = await db.organizations2_locals.updateOne({ _id: toOne(VAR1) }, {
    $set: {
      customer_portal_url: {
        domain_name: VAR3,
        is_configured: true
      }
    }
  });
// BACKUPS
  //console.log({ org_update })

  const customer_update = await db.customerdata1.updateMany({ org_id: toIn(VAR2) }, [{
    $set: {
      customer_portal_url: { $concat: [VAR3, "$customer_portal_hash"] }
    }
  }]);

  console.log({ customer_update })
  print("acknowledged: true");
}
(async function main() {
  await count();   // preview (always runs)
  await script();  // executes only if DRY_RUN=false
})();