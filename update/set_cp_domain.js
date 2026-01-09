function validate() {
  return VAR1 && VAR2 && VAR3 ? true : false
}

async function count() {
  const org_count = await db.organizations2_locals.find({ _id: VAR1 }).count();
  const customer_count = await db.customerdata1.find({ org_id: VAR2 }).count();

  console.log({
    org_count,
    customer_count
  })
}

async function backup(){

}

async function script() {
  const org_update = await db.organizations2_locals.update({ _id: VAR1 }, {
    $set: {
      customer_portal_url: {
        domain_name: VAR3,
        is_configured: true
      }
    }
  });
// BACKUPS
  //console.log({ org_update })

  const customer_update = await db.customerdata1.update({ org_id: VAR2 }, [{
    $set: {
      customer_portal_url: { $concat: [VAR3, "$customer_portal_hash"] }
    }
  }]);

  console.log({ customer_update })
}