function toOne(v) {
  return Array.isArray(v) ? v[0] : v;
}

async function count() {
  const orgId = toOne(VAR1);

  const org_count = await db.organizations2_locals.countDocuments({
    _id: orgId
  });

  print(`INFO: org_count=${org_count}`);
  return { org_count };
}

async function script() {
  const orgId = toOne(VAR1);

  await db.organizations2_locals.updateOne(
    { _id: orgId },   
    {
      $set: {
        customer_portal_url: {
          domain_name: VAR3,
          is_configured: true
        }
      }
    }
  );
}

(async function main() {
  try {
    await count();   // preview
    await script();  // execute
    quit(0);
  } catch (e) {
    print("ERROR:", e.message);
    quit(1);
  }
})();
