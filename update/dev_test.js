// SCRIPT TO ADD CUSTOMER PORTAL DOMAIN

if (typeof DRY_RUN === "undefined") DRY_RUN = true;

const org_collection = "organizations2_locals";
const cus_collection = "customerdata1";

async function count() {
  const org_count = await db[org_collection].countDocuments({
    _id: ObjectId(VAR1),      
  });

  const consumer_count = await db[cus_collection].countDocuments({
    org_id: VAR2,               
  });

  print(`MATCHED: ${org_collection}=${org_count}`);
  print(`MATCHED: ${cus_collection}=${consumer_count}`);

  const total = org_count + consumer_count;
  print(`TOTAL_MATCHED=${total}`);

  return { org_count, consumer_count };
}

async function script() {
  if (DRY_RUN) {
    print("DRY_RUN=true — no updates executed");
    return;
  }

  print("Executing updates...");

  const org_update = await db[org_collection].updateOne(
    { _id: ObjectId(VAR1) },  
    {
      $set: {
        customer_portal_url: {
          domain_name: "VAR3",    
          is_configured: true,
        },                  
      },
    }
  );

  const cus_update = await db[cus_collection].updateMany(
    { org_id: VAR2 },           
    [
      {
        $set: {                  
          customer_portal_url: {
            $concat: [VAR3, "$customer_portal_hash"],  
          },                
        },
      },
    ]
  );

  print(`UPDATED: ${org_collection}=${org_update.modifiedCount}`);
  print(`UPDATED: ${cus_collection}=${cus_update.modifiedCount}`);

  print("acknowledged: true");
}

(async function main() {
  await count();
  await script();
})();
