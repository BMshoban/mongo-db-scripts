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
    { _id: orgIds[0] },
    {
      $set: {
        customer_portal_url: {
          domain_name: VAR3 ?? "",
          is_configured: true
        },
        updatedAt: new Date(),
  updatedBy: typeof UPDATED_BY !== "undefined" ? UPDATED_BY : "JENKINS"
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
