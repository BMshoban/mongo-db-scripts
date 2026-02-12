[
  {
    $match: {
      is_valid_primary_sms: false,
      contacts: {
        $elemMatch: {
          is_valid_phone: false,
          "phone.status": {
            $in: ["VALID", "LEAD"]
          },
          "phone.sms_status": {
            $in: ["VALID", "LEAD"]
          }
        }
      }
    }
  },
  {
    $group: {
      _id: "$org_id",
      count: {
        $sum: 1
      },
      customerIds: {
        $addToSet: {
          $toString: "$_id"
        }
      }
    }
  }
]