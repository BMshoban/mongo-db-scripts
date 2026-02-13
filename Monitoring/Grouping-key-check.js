[
  {
    $match: {
      //org_id:{$eq:"642fa1f94d21442226da5b53"},
      pgid: {
        $exists: true
      }
    }
  },
  {
    $group: {
      _id: "$pgid",
      ipgm: {
        $addToSet: "$ipgm"
      },
      org_id: {
        $first: "$org_id"
      },
      cnt: {
        $sum: 1
      },
      cus: {
        $push: "$_id"
      }
    }
  },
  {
    $match: {
      ipgm: {
        $nin: [true]
      }
    }
  },
  {
    $sort: {
      cnt: -1
    }
  },
  {
    $group: {
      _id: "$org_id",
      cus: {
        $push: "$cus"
      }
    }
  }
]