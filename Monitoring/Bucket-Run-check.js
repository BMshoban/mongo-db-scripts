[
  {
    $match: {
      $expr: {
        $gt: ["$lst_amt_chng", "$lst_buckt_run"]
      }
    }
  },
  {
    $group: {
      _id: "$org_id",
      CustomerIds: {
        $addToSet: {
          $toString: "$_id"
        }
      }
    }
  }
]