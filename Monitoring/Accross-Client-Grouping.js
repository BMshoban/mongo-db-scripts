[
  {
    $match: {
      org_id: "6613b993d4a4441ffb220fda",
      gid: {
        $exists: true
      }
    }
  },
  {
    $group: {
      _id: "$gid",
      businessUnitId: {
        $addToSet: "$business_unit"
      }
    }
  },
  {
    $project: {
      businessUnitId: 1,
      businessUnitSize: {
        $size: "$businessUnitId"
      }
    }
  },
  {
    $match: {
      businessUnitSize: {
        $gt: 1
      }
    }
  }
]