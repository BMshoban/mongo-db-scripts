//SCRIPT TO ENABLE SORT

if (typeof DRY_RUN === "undefined") DRY_RUN = true;

const collection = "organizations2_locals";

async function count() {
  const org_count = await db[collection].countDocuments({
    _id: ObjectId(VAR1),
  });

  print(`MATCHED:${collection}=${org_count}`);
  print(`TOTAL_MATCHED=${org_count}`);

  return { org_count };
}

async function script() {
  if (DRY_RUN) {
    print("DRY_RUN=true — no updates executed");
    return;
  }

  print("Executing updates...");

  const org_update = await db[collection].updateOne(
    { _id: ObjectId(VAR1) },
    { $set: { en_sort: true } }
  );

  print(`UPDATED: ${org_collection}=${org_update}`);

  print("Acknowledged: true");
}

(async function main() {
  await count();
  await script();
})();
