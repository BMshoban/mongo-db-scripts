//BACKUP_REQUIRED=true
if (typeof DRY_RUN === "undefined") DRY_RUN = true;

const collection = "organizations";

async function backupCollections() {
  return [
    {
      collection: "organizations",
      filter: {
        _id: VAR1
      }
    }
  ];
}
async function count() {
  const org_count = await db[collection].countDocuments({
    _id: VAR1,
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

  const org_update = await db[collection].updateMany(
    { _id: VAR1 },
    { $set: { en_sort: true } }
  );

  print(`UPDATED: ${collection}=${org_update.modifiedCount}`);

  print("acknowledged: true");
}

(async function main() {
  await count();
  await script();
})();
