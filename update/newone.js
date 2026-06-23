//BACKUP_REQUIRED=true
if (typeof DRY_RUN === "undefined") DRY_RUN = true;

const cus_collection = "customerdata1";

const ORG_IDS = [
  "6394640c117bb38fdd8372e5",
  "6394640c117bb38fdd8372e5"
];
async function backupCollections() {
  return [
    {
      collection: "customerdata1",
      filter: {
        org_id: { $in: ORG_IDS }
      }
    }
  ];
}
async function count() {
  const cus_cont_count = await db[cus_collection].countDocuments({
    org_id: { $in: ORG_IDS }
  });

  print(`MATCHED:cus_cont_count=${cus_cont_count}`);
  print(`TOTAL_MATCHED=${cus_cont_count}`);

  return { cus_cont_count };
}

async function script() {
  if (DRY_RUN) {
    print("DRY_RUN=true — no updates executed");
    return;
  }

print("Executing updates...");

 const cus_cont_update_1 = await db[cus_collection].updateMany(
  { org_id: { $in: ORG_IDS } },
  [
    {
      $set: {
        days_since_created: {
          $cond: [
            { $and: ["$dspd", { $ne: ["$dspd", 0] }] },
            {
              $dateDiff: {
                startDate: {
                  $dateFromString: {
                    dateString: {
                      $dateToString: {
                        date: { $toDate: "$dspd" },
                        format: "%Y-%m-%d",
                        timezone: "CST6CDT",
                      },
                    },
                    format: "%Y-%m-%d",
                    timezone: "CST6CDT",
                  },
                },
                timezone: "CST6CDT",
                endDate: "$$NOW",
                unit: "day",
              },
            },
            0,
          ],
        },
        dspr: {
          $cond: [
            {
              $and: [
                "$dsprd",
                { $ne: ["$dsprd", 0] },
                { $gt: ["$dsprd", 10000] },
              ],
            },
            {
              $dateDiff: {
                startDate: {
                  $dateFromString: {
                    dateString: {
                      $dateToString: {
                        date: { $toDate: "$dsprd" },
                        format: "%Y-%m-%d",
                        timezone: "CST6CDT",
                      },
                    },
                    format: "%Y-%m-%d",
                    timezone: "CST6CDT",
                  },
                },
                timezone: "CST6CDT",
                endDate: "$$NOW",
                unit: "day",
              },
            },
            0,
          ],
        },
      },
    },
  ],
  { multi: true }
);

const cus_cont_update_2 = await db[cus_collection].updateMany(
      { org_id: { $in: ORG_IDS },ipgm: true },
  [
    {
      $set: {
        "pgbg.dspr": {
          $cond: [
            {
              $and: [
                "$pgbg.dsprd",
                { $ne: ["$pgbg.dsprd", 0] },
                { $gt: ["$pgbg.dsprd", 10000] },
              ],
            },
            {
              $dateDiff: {
                startDate: {
                  $dateFromString: {
                    dateString: {
                      $dateToString: {
                        date: { $toDate: "$pgbg.dsprd" },
                        format: "%Y-%m-%d",
                        timezone: "CST6CDT",
                      },
                    },
                    format: "%Y-%m-%d",
                    timezone: "CST6CDT",
                  },
                },
                timezone: "CST6CDT",
                endDate: "$$NOW",
                unit: "day",
              },
            },
            0,
          ],
        },
      },
    },
  ],
  { multi: true }
);
print(`UPDATED_1:${cus_collection}=${cus_cont_update_1.modifiedCount}`);

print(`UPDATED_2:${cus_collection}=${cus_cont_update_2.modifiedCount}`);
print(
  `UPDATED:${cus_collection}=${
    cus_cont_update_1.modifiedCount +
    cus_cont_update_2.modifiedCount
  }`
);

print("acknowledged: true");
}

(async function main() {
  await count();
  await script();
})();
