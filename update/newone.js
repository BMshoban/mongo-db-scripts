const DRY_RUN = typeof DRY_RUN !== "undefined" ? DRY_RUN : false;

function firstObjectId(v) {
  if (!v) throw new Error("Missing ObjectId");

  if (Array.isArray(v)) {
    if (v.length === 0) throw new Error("Empty ObjectId array");
    return v[0];
  }

  return ObjectId(v.toString().replace(/^ObjectId:/i, "").trim());
}

(async function main() {
  try {
    const orgId = firstObjectId(VAR1);
    const customerId = firstObjectId(VAR2);

    const orgMatched = db.organizations2_locals.countDocuments({ _id: orgId });

    print(`MODIFIED:organizations2_locals=${orgMatched}`);

    if (!DRY_RUN && orgMatched > 0) {
      db.organizations2_locals.updateOne(
        { _id: orgId },
        {
          $set: {
            customer_portal_url: {
              domain_name: VAR3 ?? "",
              is_configured: true
            },
            updatedAt: new Date(),
            updatedBy: typeof UPDATED_BY !== "undefined"
              ? UPDATED_BY
              : "JENKINS"
          }
        }
      );
    }

    const custMatched = db.customerdata1.countDocuments({ _id: customerId });

    print(`MODIFIED:customerdata1=${custMatched}`);

    if (!DRY_RUN && custMatched > 0) {
      db.customerdata1.updateOne(
        { _id: customerId },
        [
          {
            $set: {
              customer_portal_url: {
                $concat: [(VAR3 ?? ""), "$customer_portal_hash"]
              },
              updatedAt: new Date(),
              updatedBy: typeof UPDATED_BY !== "undefined"
                ? UPDATED_BY
                : "JENKINS"
            }
          }
        ]
      );
    }

    print(`TOTAL_MODIFIED=${orgMatched + custMatched}`);
    quit(0);

  } catch (e) {
    print("ERROR:", e.message);
    quit(1);
  }
})();
