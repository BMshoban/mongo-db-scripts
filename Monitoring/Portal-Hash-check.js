[
  {
    $match: {
      customer_portal_hash: {
        $exists: true
      }
    }
  },
  {
    $group: {
      _id: "$customer_portal_url",
      count: {
        $sum: 1
      },
      customers: {
        $addToSet: "$_id"
      },
      org: {
        $addToSet: "$org_id"
      }
    }
  },
  {
    $match: {
      count: {
        $gt: 1
      }
    }
  }
  // {
  //   $addFields: {
  //     customer: {
  //       $first: "$customers"
  //     }
  //   }
  // },
  // {
  //   $group: {
  //     _id: null,
  //     ids: {
  //       $addToSet: {
  //         $toString: "$customer"
  //       }
  //     }
  //   }
  // }
]