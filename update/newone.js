function validate() {
  if (typeof VAR1 === "undefined") {
    print("ERROR: VAR1 is required");
    return false;
  }

  if (typeof VAR2 === "undefined") {
    print("ERROR: VAR2 is required");
    return false;
  }

  return true;
}

function toArray(v) {
  return Array.isArray(v) ? v : [v];
}

async function count() {
  const orgIds = toArray(VAR1);
  const customerIds = toArray(VAR2);

  const org_count = await db.organizations2_locals.countDocuments({
    _id: { $in: orgIds }
  });

  const customer_count = await db.customerdata1.countDocuments({
    _id: { $in: customerIds }
  });

  print(`INFO: org_count=${org_count}, customer_count=${customer_count}`);
  return { org_count, customer_count };
}

async function script() {
  const orgIds = toArray(VAR1);
  const customerIds = toArray(VAR2);

  await db.organizations2_locals.updateOne(
    { _id: { $in: orgIds } },
    {
      $set: {
        customer_portal_url: {
          domain_name: VAR3 ?? "",
          is_configured: true
        }
      }
    }
  );

  await db.customerdata1.updateMany(
    { _id: { $in: customerIds } },
    [
      {
        $set: {
          customer_portal_url: {
            $concat: [(VAR3 ?? ""), "$customer_portal_hash"]
          }
        }
      }
    ]
  );
}

(async function main() {
  try {
    if (!validate()) quit(1);

    await count();   // preview
    await script();  // execute

    quit(0);
  } catch (e) {
    print("ERROR:", e.message);
    quit(1);
  }
})();
