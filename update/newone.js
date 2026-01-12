function toObjectId(v) {
  if (!v) throw new Error("Missing ObjectId");
  return ObjectId(v.toString().replace(/^ObjectId:/i, "").trim());
}


(async function main() {
  try {
    const orgId = toObjectId(VAR1);
    const customerId = toObjectId(VAR2);

    // ---- ORG UPDATE (ONE DOCUMENT) ----
    const orgResult = db.organizations2_locals.updateOne(
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

    print(`MODIFIED:organizations2_locals=${orgResult.matchedCount}`);

    // ---- CUSTOMER UPDATE (ONE DOCUMENT) ----
    const custResult = db.customerdata1.updateOne(
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

    print(`MODIFIED:customerdata1=${custResult.matchedCount}`);

    const total =
      orgResult.matchedCount + custResult.matchedCount;

    print(`TOTAL_MODIFIED=${total}`);

    quit(0);
  } catch (e) {
    print("ERROR:", e.message);
    quit(1);
  }
})();
