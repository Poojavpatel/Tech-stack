## Mongodb

## Installation and setup
To install mongodb
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install mongodb
```

To check the status type

```bash
sudo systemctl status mongodb
```


MongoDB is a systemd service, To check and modify it’s state : 
```bash
sudo systemctl status mongodb
sudo systemctl stop mongodb
sudo systemctl start mongodb
sudo systemctl restart mongodb
```

You can also change if MongoDB automatically starts when the system starts up (default: enabled):
```bash
sudo systemctl disable mongodb
sudo systemctl enable mongodb
```

To start working with (creating and editing) databases, type:
```bash
mongo
```
---
## Querying documents

List all collection names in a db   
```
db.getCollectionNames()
```

list all documents in a collection
```
db.Fruits.find()
``` 

Find documents based on conditions
```
db.Fruits.find({ name:'apple'})
db.Fruits.find({ name:'apple'}, {color:'green'})
db.Students.find({"division" : { $in : ["A","P","R"]}})
db.Inventory.find({reviews:{$exists: true, $ne: []}})

db.Products.find({
  createdOn: {
    $gte: ISODate("2010-04-29T00:00:00.000Z"),
    $lt: ISODate("2010-05-01T00:00:00.000Z")
  }
})
```

Count documents based on conditions
```
db.Fruits.find({ "status": "RIPE" }).count()
db.Students.countDocuments({ "division": { $in: ["A","P","R"] } })
```

Limit query
```
db.Fruits.find().limit(2)
```

Sort query / Return Latest
```
db.Courses.find().sort({"createdOn":-1}).limit(1);
```

Exists query
```
db.Inventory.find({ qty: { $exists: true } })
db.Car.find({'insurance.expiryDate': {$exists:true}})
db.test.find({'a.b':null})
```

Return only unique values, no duplicates
```
db.collection.distinct('NetworkID')
db.Payments.distinct('STATUS')
```

Print out more than 20 documents in MongoDB's shell
```
db.foo.find().forEach(function(f){print(tojson(f, '', true));})

db.foo.find().forEach(function(f){printjsononeline(f)});

db.foo.find().toArray()

while(cursor.hasNext()){
    printjsononeline(cursor.next());
}
```

Creating and listing Indexes
```
db.Pincode.getIndexes()
db.Pincode.createIndex({state: 1})
```
---
## Updating Documents

Syntax
```
db.collection.update(query, update operator, options)
query - determine which record that will be update
update - a set of operators for update the collection
option - optional operator that support the update operator
```

Unset attribute, remove attribute from document
To remove all collection records change the query to empty bracket "{}"
```
db.Users.find({telephone:{$exists: true}})
db.Users.update({_id:'1569833715022954'},{$unset:{"telephone": ""}})
db.city.update( { _id: 123 }, { $unset: { cityCode: 1 } } )
db.city.update( {}, { $unset: { cityCode: 1 } } )
```

MongoDB Update a Specific Fields - use the $set operator.
```
db.city.update({_id:ObjectId("584a13d5b65761be678d4dd4")}, {$set: {"citiName":"Jakarta Pusat"}})
```

Updates the whole document to the new value specified, "upsert: true" option use to check if there is no matching _id it will create a new document.
```
db.city.update({_id:ObjectId("584a13d5b65761be678d4dd4")}, {"citiName" : "Jakarta Selatan", "provName" : "DKI Jakarta"}, {upsert:true}) 
```

Update an entire collection
```
db.Bar.update({}, {$set: {"country":"Indonesia"}}, {multi:true})
```

Incremental Value Update -  will increase the population field value of city collection by 100 based on the record with an ID 123.
```
db.city.update({ _id: 123 }, { $inc: { population: 100 } })
```

---
## Mongo Aggregations


Count using aggregations
```
db.Products.aggregate([ 
  { $match: {} },
  { $group: { _id: null, count: { $sum: 1 }} },
])
```

Count with filters
```
db.Products.aggregate([ 
  { $match: { "status": { $nin : ["SOLD", "EXPIRED", "BOOKED"]} } },
  { $group: { _id: null, count: { $sum: 1 }} },
])
```

Calculate Sum of all product's amount
```
db.Products.aggregate([{
    $match: {
      "status": { $nin: ["SOLD", "EXPIRED"] },
      "userId": { $nin: [ "1511939075291359", "1511946194517313", "1512054023955887"] }
    }
  },
  {
    $group: {
      _id: null,
      totalAmount: { $sum: "$summary.totalAmountAfterTax" },
      count: { $sum: 1 }
    }
  },
])
```

---
## Import Export Data

Dump data from a specified host and port
```bash
$ mongodump --host 11.234.251.185 --port 27017 --db db_users --out output
```

Error - Failed to parse Unrecognized field 'snapshot'.
```bash
$ mongodump --forceTableScan --host 11.234.251.185 --port 27017 --db db_users --out output 
```