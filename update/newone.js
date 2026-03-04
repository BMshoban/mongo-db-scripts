if (typeof DRY_RUN === 'undefined') DRY_RUN = true;

async function count() {
  // 1. Wrap the variables in ObjectId() here so MongoDB can actually find them!
  const count1 = await db.organization.countDocuments({ _id: ObjectId(VAR1) });
  const count2 = await db.organization.countDocuments({ _id: ObjectId(VAR2) });
  const count3 = await db.organization.countDocuments({ _id: ObjectId(VAR3) });

  const totalCount = count1 + count2 + count3;

  // Required outputs for Jenkins Security Validation
  print(`MATCHED:organization=${totalCount}`);
  print(`TOTAL_MATCHED=${totalCount}`);

  return { totalCount };
}

// 2. EXECUTION PHASE
async function script() {
  if (DRY_RUN) {
    print("DRY_RUN=true — no updates executed");
    return;
  }

  print("Executing updates...");

  // ENABLE SORT
  await db.organization.updateOne({_id: ObjectId(VAR1)}, {$set: {en_sort: true}});
  
  // CONSUMER GROUPING ENABLE
  await db.organization.updateOne({_id: ObjectId(VAR2)}, {$set: {"cgs.icg": true, "cgs.gid_prefix": "", "cgs.grp_count": 1 }});
  
  // PROCESS GROUPING ENABLE
  await db.organization.updateOne({_id: ObjectId(VAR3)}, {$set: {"cgs.ipg": true, "cgs.ipg_auto": true}});

  print("acknowledged: true");
}

// 4. MAIN TRIGGER
(async function main() {
  await count();   // Preview always runs
  await script();  // Executes only if DRY_RUN=false
})();
