# Mongodb

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [BSON](#bson-binary-json)
- [Mongodb Ids](#mongodb-ids)
- [Querying Documents](#querying-documents)
- [Updating Documents](#updating-documents)
- [Populate()](#populate)
- [Mongo Aggregations](#mongo-aggregations)
  - [Interview question](#interview-question)
- [$lookup](#lookup)
- [Mongo aggregate groupby preserve sort](#mongo-aggregate-groupby-preserve-sort)
- [Import Export Data](#import-export-data)
- [Lean](#lean)
- [$pull](#pull)
- [Mongodb Schema Design](#mongodb-schema-design)
  - [Normalization](#normalization)
  - [One to Many (Finite) relationships](#one-to-many-finite-relationships)
  - [One to Many (InFinite) relationships](#one-to-many-infinite-relationships)
  - [Many to Many relationships](#many-to-many-relationships)
- [Advanced schema design Patterns](#advanced-schema-design-patterns)

<br/>
<br/>
<br/>



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

<br/>
<br/>

---

### Mongodb

[MongoDB in 100 Seconds | Fireship](https://www.youtube.com/watch?v=-bt_y4Loofg)

MongoDB is an open-source NoSQL database written in C++ language

<br/>
<br/>

---

### BSON (Binary JSON) 

* BSON is a binary-encoded serialization format used by MongoDB to represent JSON-like documents. It stands for "Binary JSON," and it extends the JSON model to provide additional data types and to be more efficient for storage and data exchange

* BSON represents JSON-like documents in a binary format, which makes it more compact and efficient for storage and transmission compared to plain text JSON.

* BSON supports a broader range of data types than JSON. In addition to the standard JSON data types (string, number, object, array, true, false, null), BSON includes additional types such as Date, Binary Data, Regular Expression, and more.

* BSON preserves the order of elements in a document, which is not guaranteed in standard JSON. This is important for applications that rely on the order of fields in a document.

* The binary format of BSON is designed to be more space-efficient compared to the text-based JSON format, making it well-suited for storage in databases like MongoDB.

Here's a simple example of a JSON document and its BSON equivalent:
```js
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

BSON (simplified representation):
```js
\x16\x00\x00\x00           // Document length
\x02                       // String type
name\x00                   // Field name
\x05\x00\x00\x00John\x00   // String value
\x10\x00\x00\x00           // 32-bit integer type
age\x00                    // Field name
\x1E\x00\x00\x00           // Integer value 30
\x02\x00\x00\x00           // String type
city\x00                   // Field name
\x0B\x00\x00\x00New York\x00  // String value
\x00                       // Null terminator
```


<br/>
<br/>

---

### Mongodb Ids

MongoDB uses a BSON (Binary JSON) format for storing documents in its database.    
Each document in a MongoDB collection has a unique identifier called an "_id" field.   
This "_id" field is used as the primary key and is automatically created if not provided explicitly when inserting a document.

By default, MongoDB uses a 12-byte ObjectId structure for the "_id" field

The ObjectId "5f8a49b81d1b2a56c7f0caba" is represented in hexadecimal format

The ObjectId consists of
1. A 4-byte timestamp representing the ObjectId's creation, measured in seconds since the Unix epoch
1. A 5-byte random value
1. A 3-byte incrementing counter, initialized to a random value

This structure helps ensure uniqueness across distributed systems, as the combination of timestamp, random value, and incrementing counter reduces the likelihood of collisions.

```js
// Example of an ObjectId
5f8a49b81d1b2a56c7f0caba

/*
(2 characters represent 1 byte)
"5f8a49b8" represents the Unix timestamp indicating the ObjectId's creation time in seconds
"1d1b2a56c7" represents the random value generated to reduce the likelihood of collisions
"f0caba" represents the incrementing counter. It is initialized to a random value and incremented for each ObjectId generated within the same second to further reduce the chance of collisions
*/
```

<br/>
<br/>

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

<br/>
<br/>


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

<br/>
<br/>

## Populate()

[Reference](https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean)

Populate will automatically replace the specified path in the document, with document(s) from other collection(s).

Let's take your example:
```
Story.findOne({ title: Nintendo })

{
  _creator : A0jfdSMmEJj9, 
    title    : Nintendo,
    fans     : [r432i900fds09809n, fdsjifdsjfueu88]
  }
}
```
in the case where i need that _creator's name, I'll need to make another request to find it in database. Except, that here in mongoose we have a clever function called populate() that we can chained to our previous request in order to directly get that information in our answer without explictly doing an additional request.


```
Story.findOne({ title: Nintendo }).populate('_creator')

{
  _creator : {
       _id : A0jfdSMmEJj*9,
       name: Sai,
       age: 100,
       stories : [fdsfdsfdsew38u, 89hr3232, ...]
    },
    title    : Nintendo,
    fans     : [r432i900fds09809n, fdsjifdsjfueu88]
  }
}
```

But maybe, that's too much information, and we don't want the stories that he wrote and his age and name are enough. Populate can then take an other argument containing the field that we need

```
Story.findOne({ title: Nintendo }).populate('_creator', 'name age')

{
  _creator : {
       name: Sai,
       age: 100,
    },
    title    : Nintendo,
    fans     : [r432i900fds09809n, fdsjifdsjfueu88]
  }
}
```

---

<br/>
<br/>


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

```
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"),isDeleted: false}}
]);


db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $facet: {uniqueGivers: [{$group: {_id: "$from"}}]}
  }
]);

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $facet: {
      allComments: [{  $group: {_id: "$_id", count: { $sum: 1 }}}],
      uniqueGivers: [{$group: {_id: "$from", count: { $sum: 1 }}}]
    }
  }
]);

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {$count: "total replies"}
]);

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {$count: "total replies"},
  {$group: {_id: "$from", count: { $sum: 1 }}},
  {$count: "unique replies"},
]);


db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  { $group: { _id: "$from", myCount: { $sum: 1 } } },
  { $project: { _id: 0 } }
])

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $facet: {
      allComments: [
        {
          $group: {_id: "$_id",count: { $sum: 1 }}
        }
      ],
      uniqueGivers: [
        {
          $group: { _id: "$from"}
        }
      ]
    }
  }
])

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $facet: {
      allComments: [
        {
          $group: {_id: "$_id",count: { $sum: 1 }}
        }
      ],
      uniqueGivers: [
        {
          $group: { _id: "$from"}
        }
      ]
    }
  },
  { $project: { allCommentsTotal: {  $size: "$allComments"},uniqueGiversTotal: {  $size: "$uniqueGivers"} } }
])


db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $facet: {
      allComments: [
        {
          $group: {_id: "$_id",count: { $sum: 1 }}
        }
      ],
      uniqueGivers: [
        {
          $group: { _id: "$from"}
        }
      ],
      lastReplied: [
        {
          $ma
        }
      ]
    }
  }
])

// Match all comments with post Id and !deleted
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"),isDeleted: false}}
]);

// populate from member
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  }
])

// populate from member name, avatar and status
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      as: "fromUser",
      let: {abc: '$from'},
      pipeline : [
        { $match: { $expr: { $eq: [ "$_id", "$$abc" ] } }, },
        { $project : { _id:1, state:1, "profile.firstName": 1, "profile.lastName": 1 } }
      ]
    }
  }
])

// lets keep only comment id and from member name, avatar and status
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  },
  { $project : { _id:1, "fromUser._id":1, "fromUser.state":1, "fromUser.profile.firstName":1, "fromUser.profile.lastName":1  } }
])

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  },
  { $project : { _id:1, createdAt:1, updatedAt:1 ,"fromUser._id":1, "fromUser.state":1, "fromUser.profile.firstName":1, "fromUser.profile.lastName":1  } },
  {$sort:{updatedAt : 1}}
])


db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  },
  {
    $facet: {
      allComments: [
        {$group: {_id: "$_id",count: { $sum: 1 }}}
      ],
      uniqueGivers: [
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        {$sort:{updatedAt : 1}}
      ]
    }
  },
  {
    $project: {
      allCommentsTotal: {  $size: "$allComments"},
      uniqueGiversTotal: {  $size: "$uniqueGivers"}
    }
  }
])

// finding the latest comment
db.comments.aggregate([
  {
    $match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}
  },
  {
    $sort:{updatedAt : 1}
  },
  {
    $group: {
      _id: "$item",
      lastRepliedDate: { $last: "$updatedAt" }
    }
  }
])

// { _id: null, lastRepliedDate: 2022-07-12T09:22:33.360Z }


db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $facet: {
      allComments: [
        {$group: {_id: "$_id",count: { $sum: 1 }}}
      ],
      uniqueGivers: [
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        {
          $sort:{updatedAt : 1}
        },
        {
          $group: {
            _id: "$item",
            lastRepliedDate: { $last: "$updatedAt" }
          }
        }
      ]
    }
  },
  {
    $project: {
      allCommentsTotal: {  $size: "$allComments"},
      uniqueGiversTotal: {  $size: "$uniqueGivers"},
      "lastReplied.lastRepliedDate": 1
    }
  }
])

// response
{ lastReplied: [ { lastRepliedDate: 2022-07-12T09:22:33.360Z } ],
  allCommentsTotal: 10,
  uniqueGiversTotal: 7 }

// changing variable names
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  },
  {
    $facet: {
      allReplies: [
        {$group: {_id: "$_id",count: { $sum: 1 }}}
      ],
      uniqueRespondents: [
        {
          $match: {"fromUser.state" : "ACTIVE"}
        },
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        {
          $sort:{updatedAt : 1}
        },
        {
          $group: {
            _id: "$item",
            lastRepliedAt: { $last: "$updatedAt" }
          }
        }
      ]
    }
  },
  {
    $project: {
      count: {  $size: "$allReplies"},
      respondentsCount: {  $size: "$uniqueRespondents"},
      "lastReplied.lastRepliedAt": 1
    }
  }
])

// response
{ lastReplied: [ { lastRepliedAt: 2022-07-12T20:05:38.015Z } ],
  count: 11,
  respondentsCount: 7 }

// Adding initial respondents

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  },
  {
    $facet: {
      initialRespondents: [
        { $match: {"fromUser.state" : "ACTIVE"} },
        { $sort:{updatedAt : 1} },
        { $limit : 5 },
        {
          $project: {
            "fromUser._id" : 1,
            "fromUser.profile.firstName": 1,
            "fromUser.profile.lastName": 1,
            "fromUser.profile.image.original.relativeUrl":1
          }
        }
      ]
    }
  },
  {
    $project: {
      "initialRespondents": 1
    }
  }
])


db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  },
  {
    $facet: {
      allReplies: [
        {$group: {_id: "$_id",count: { $sum: 1 }}}
      ],
      uniqueRespondents: [
        {
          $match: {"fromUser.state" : "ACTIVE"}
        },
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        {
          $sort:{updatedAt : 1}
        },
        {
          $group: {
            _id: "$item",
            lastRepliedAt: { $last: "$updatedAt" }
          }
        }
      ],
      initialRespondents: [
        { $match: {"fromUser.state" : "ACTIVE"} },
        { $sort:{updatedAt : 1} },
        { $limit : 5 },
        {
          $project: {
            "fromUser._id" : 1,
            "fromUser.profile.firstName": 1,
            "fromUser.profile.lastName": 1,
            "fromUser.profile.image.original.relativeUrl":1
          }
        }
      ]
    }
  },
  {
    $project: {
      count: {  $size: "$allReplies"},
      respondentsCount: {  $size: "$uniqueRespondents"},
      "lastReplied.lastRepliedAt": 1,
      "initialRespondents": 1
    }
  }
])


{ lastReplied: [ { lastRepliedAt: 2022-07-12T20:05:38.015Z } ],
  initialRespondents:
   [ { _id: ObjectId("62cd38f87cf7152329f7abef"),
       fromUser:
        [ { _id: ObjectId("6203a2e53c43531b0cc5dd68"),
            profile: { firstName: 'Pooja', lastName: 'Patel' } } ] },
     { _id: ObjectId("62cd39b47cf7152329f7ac0d"),
       fromUser:
        [ { _id: ObjectId("620a12fa95041953038592cd"),
            profile:
             { firstName: 'Test2',
               lastName: 'Pooja',
               image: { original: { relativeUrl: 'https://s3.amazonaws.com/duploservices-dev02-assembly-profile-image-333387423585/5ae639b425ca241b3e2d4b07/620a12fa95041953038592cd/20220710_084502.jpg' } } } } ] },
     { _id: ObjectId("62cd3a32d90555d9b48b922c"),
       fromUser:
        [ { _id: ObjectId("621e3a8202c0a7082b1c4a96"),
            profile: { firstName: 'Test5', lastName: 'Pooja' } } ] },
     { _id: ObjectId("62cd3a60d90555d9b48b923f"),
       fromUser:
        [ { _id: ObjectId("6253e7b4d12fa9de008e17e3"),
            profile: { firstName: 'Test7', lastName: 'Pooja' } } ] },
     { _id: ObjectId("62cd3aa3d90555d9b48b924b"),
       fromUser:
        [ { _id: ObjectId("620a12fa95041953038592cd"),
            profile:
             { firstName: 'Test2',
               lastName: 'Pooja',
               image: { original: { relativeUrl: 'https://s3.amazonaws.com/duploservices-dev02-assembly-profile-image-333387423585/5ae639b425ca241b3e2d4b07/620a12fa95041953038592cd/20220710_084502.jpg' } } } } ] } ],
  count: 11,
  respondentsCount: 7 }

// Measuring execution time

var before = new Date();
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser"
    }
  },
  {
    $facet: {
      allReplies: [
        {$group: {_id: "$_id",count: { $sum: 1 }}}
      ],
      uniqueRespondents: [
        {
          $match: {"fromUser.state" : "ACTIVE"}
        },
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        {
          $sort:{createdAt : 1}
        },
        {
          $group: {
            _id: "$item",
            lastRepliedAt: { $last: "$createdAt" }
          }
        }
      ],
      initialRespondents: [
        { $match: {"fromUser.state" : "ACTIVE"} },
        { $sort:{createdAt : 1} },
        { $limit : 5 },
        {
          $project: {
            "fromUser._id" : 1,
            "fromUser.profile.firstName": 1,
            "fromUser.profile.lastName": 1,
            "fromUser.profile.image.original.relativeUrl":1
          }
        }
      ]
    }
  },
  {
    $project: {
      count: {  $size: "$allReplies"},
      respondentsCount: {  $size: "$uniqueRespondents"},
      "lastReplied.lastRepliedAt": 1,
      "initialRespondents": 1
    }
  }
]);
var after = new Date();var execution_mills = after - before;

execution_mills - 20, 25, 22




// Adding pipeline to from users for project
var before = new Date();
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {
    $facet: {
      allReplies: [
        {$group: {_id: "$_id",count: { $sum: 1 }}}
      ],
      uniqueRespondents: [
        {
          $match: {"fromUser.state" : "ACTIVE"}
        },
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        {
          $sort:{createdAt : 1}
        },
        {
          $group: {
            _id: "$item",
            lastRepliedAt: { $last: "$createdAt" }
          }
        }
      ],
      initialRespondents: [
        { $match: {"fromUser.state" : "ACTIVE"} },
        { $sort:{createdAt : 1} },
        { $limit : 5 },
        { $project: { "fromUser" : 1 }}
      ]
    }
  },
  {
    $project: {
      count: {  $size: "$allReplies"},
      respondentsCount: {  $size: "$uniqueRespondents"},
      "lastReplied.lastRepliedAt": 1,
      "initialRespondents": 1
    }
  }
]);
var after = new Date();var execution_mills = after - before;

execution_mills - 28, 24, 11

// not returning total replies count as its already present in post
var before = new Date();
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $facet: {
      uniqueRespondents: [
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        { $sort:{createdAt : 1} },
        {
          $group: {
            _id: "$item",
            lastRepliedAt: { $last: "$createdAt" }
          }
        }
      ],
      initialRespondents: [
        { $sort:{createdAt : 1} },
        { $limit : 5 },
        { $project: { "fromUser" : 1 }}
      ]
    }
  },
  {
    $project: {
      respondentsCount: {  $size: "$uniqueRespondents"},
      "lastReplied.lastRepliedAt": 1,
      "initialRespondents": 1
    }
  }
]).explain();
var after = new Date();var execution_mills = after - before;

// execution_mills 25 34 61








// trying to get fromUser as one field and not array
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $facet: {
      uniqueRespondents: [
        {$group: { _id: "$from"}}
      ],
      lastReplied: [
        { $sort:{createdAt : 1} },
        {
          $group: {
            _id: "$item",
            lastRepliedAt: { $last: "$createdAt" }
          }
        }
      ],
      initialRespondents: [
        { $sort:{createdAt : 1} },
        { $limit : 5 },
        { $project: { "fromUser" : 1 }}
      ]
    }
  },
  {
    $project: {
      respondentsCount: {  $size: "$uniqueRespondents"},
      "lastRepliedAt": "$lastReplied.lastRepliedAt",
      "initialRespondents": 1
    }
  }
])

// getting last replied at better way
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $facet: {
      lastReplied: [
        { $sort:{createdAt : 1} },
        {
          $group: {
            _id: "$item",
            lastRepliedAt: { $last: "$createdAt" }
          }
        }
      ]
    }
  }
])


// fixing repetition in initial respondents
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $facet: {
      initialRespondents: [
        { $sort:{createdAt : 1} },
        { $project: { "fromUser.profile.firstName" : 1 }}
      ]
    }
  }
])

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $facet: {
      initialRespondents: [
        { $sort:{createdAt : 1} },
        { $group: {_id: "$fromUser._id"}}
      ]
    }
  }
])

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  { $sort:{createdAt : 1} },
  {
    $group: {
      _id: "$fromUser._id",
      respondent: { $first: "$fromUser.profile.firstName" }
    }
  }
])

// When you $group after a $sort in the pipeline, the previous sort is lost. You'd have to do something like this instead so that the date you want to sort by is available after the grouping:

db.summary.aggregate(
    {$match: {circles: 2}},
    {$group: {_id: '$cid', date: {$max: '$date'}}},
    {$sort: {date: -1}});

db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $group: {
      _id: "$fromUser._id",
      repliedAt : {$min : "$createdAt"},
      respondent: { $first: "$fromUser.profile.firstName" }
    }
  },
  {$sort: {repliedAt: 1}}
])

// output
{ _id: [ ObjectId("6203a2e53c43531b0cc5dd68") ],
  repliedAt: 2022-07-12T09:03:52.524Z,
  respondent: [ 'Pooja' ] }
{ _id: [ ObjectId("620a12fa95041953038592cd") ],
  repliedAt: 2022-07-12T09:07:00.811Z,
  respondent: [ 'Test2' ] }
{ _id: [ ObjectId("621e3a8202c0a7082b1c4a96") ],
  repliedAt: 2022-07-12T09:09:06.838Z,
  respondent: [ 'Test5' ] }
{ _id: [ ObjectId("6253e7b4d12fa9de008e17e3") ],
  repliedAt: 2022-07-12T09:09:52.471Z,
  respondent: [ 'Test7' ] }
{ _id: [ ObjectId("62207b569ef064c409073bf0") ],
  repliedAt: 2022-07-12T09:11:45.063Z,
  respondent: [ 'Test8' ] }
{ _id: [ ObjectId("6220f3e6d4de887a13c2490f") ],
  repliedAt: 2022-07-12T09:13:19.459Z,
  respondent: [ 'Test11' ] }
{ _id: [ ObjectId("61e9f5ff46a1da510e8ad564") ],
  repliedAt: 2022-07-12T20:05:38.015Z,
  respondent: [ 'Rukku' ] }

// using $facet
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $facet: {
      initialRespondents: [
        {
          $group: {
            _id: "$fromUser._id",
            repliedAt : {$min : "$createdAt"},
            respondent: { $first: "$fromUser.profile.firstName" }
          }
        },
        {$sort: {repliedAt: 1}},
        { $limit : 5 }
      ]
    }
  }
])


Pooja
Test2
Test5
Test7
Test8

```


<br/>

### Interview question

For pagination, I need total product count and first 10 products, how do i get them in a single query?   
Using Facets    
The $facet stage allows you to run multiple pipelines within a single aggregation stage. It computes the total count and the subset of products in parallel.   
```js
const pageSize = 10; // Number of products per page
const pageNumber = 1; // Page number you want to retrieve

db.products.aggregate([
  {
    $facet: {
      "totalCount": [
        {
          $count: "total"
        }
      ],
      "products": [
        {
          $skip: (pageNumber - 1) * pageSize
        },
        {
          $limit: pageSize
        }
      ]
    }
  }
]);
```

Without using facets   
```js
const pageSize = 10;
const pageNumber = 1;
const skipCount = (pageNumber - 1) * pageSize;

db.products.aggregate([
  {
    $group: {
      _id: null,
      totalCount: { $sum: 1 },
      products: { $push: "$$ROOT" }
    }
  },
  {
    $project: {
      _id: 0,
      totalCount: 1,
      products: {
        $slice: ["$products", skipCount, pageSize]
      }
    }
  }
]);
```


<br/>
<br/>

---

### $lookup

```
db.orders.insertMany( [
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
   { "_id" : 3  }
] )

db.inventory.insertMany( [
   { "_id" : 1, "sku" : "almonds", "description": "product 1", "instock" : 120 },
   { "_id" : 2, "sku" : "bread", "description": "product 2", "instock" : 80 },
   { "_id" : 3, "sku" : "cashews", "description": "product 3", "instock" : 60 },
   { "_id" : 4, "sku" : "pecans", "description": "product 4", "instock" : 70 },
   { "_id" : 5, "sku": null, "description": "Incomplete" },
   { "_id" : 6 }
] )
```

```
db.orders.aggregate( [
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
] )

{
   "_id" : 1,
   "item" : "almonds",
   "price" : 12,
   "quantity" : 2,
   "inventory_docs" : [
      { "_id" : 1, "sku" : "almonds", "description" : "product 1", "instock" : 120 }
   ]
}
{
   "_id" : 2,
   "item" : "pecans",
   "price" : 20,
   "quantity" : 1,
   "inventory_docs" : [
      { "_id" : 4, "sku" : "pecans", "description" : "product 4", "instock" : 70 }
   ]
}
{
   "_id" : 3,
   "inventory_docs" : [
      { "_id" : 5, "sku" : null, "description" : "Incomplete" },
      { "_id" : 6 }
   ]
}
```

Below given is the pseudo-SQL statement to which the operation corresponds

```sql
SELECT *, inventory_docs
FROM orders
WHERE inventory_docs IN (
   SELECT *
   FROM inventory
   WHERE sku = orders.item
);
```

---

<br/>
<br/>

### Mongo aggregate groupby preserve sort

https://stackoverflow.com/questions/14513185/mongo-aggregation-framework-sort-and-then-group-not-working

When you $group after a $sort in the pipeline, the previous sort is lost. You'd have to do something like this instead so that the date you want to sort by is available after the grouping:

```
db.summary.aggregate(
    {$match: {circles: 2}},
    {$group: {_id: '$cid', date: {$max: '$date'}}},
    {$sort: {date: -1}});
```

```
result:

[ { _id: 2, date: 5 }, 
  { _id: 1, date: 2 }, 
  { _id: 3, date: 0 } ]
```

---

Fixed initial respondents had duplicate from users

```
db.comments.aggregate([
  {$match: {post: ObjectId("62cd38dfcfa421004e7347ab"), isDeleted: false}},
  {
    $lookup: {
      from: "users",
      localField: "from",
      foreignField: "_id",
      as: "fromUser",
      pipeline: [
        { $project : { _id:1, state:1, "profile.firstName":1, "profile.lastName": 1, "profile.image.original.relativeUrl":1} }
      ]
    }
  },
  {$match: {"fromUser.state" : "ACTIVE"}},
  {
    $facet: {
      initialRespondents: [
        {
          $group: {
            _id: "$fromUser._id",
            repliedAt : {$min : "$createdAt"},
            respondent: { $first: "$fromUser.profile.firstName" }
          }
        },
        {$sort: {repliedAt: 1}},
        { $limit : 5 }
      ]
    }
  }
])
```

---

<br/>
<br/>


## Import Export Data

Dump data from a specified host and port
```bash
$ mongodump --host 11.234.251.185 --port 27017 --db db_users --out output
```

Error - Failed to parse Unrecognized field 'snapshot'.
```bash
$ mongodump --forceTableScan --host 11.234.251.185 --port 27017 --db db_users --out output 
```

---

<br/>
<br/>

### lean()

lean() is not needed on an aggregate function as the documents returned are plain JavaScript objects, and not Mongoose objects. This is because any shape of document can be returned

---

<br/>
<br/>

### $pull
The 
$pull
 operator removes from an existing array all instances of a value or values that match a specified condition.

Create the stores collection:
```js
db.stores.insertMany( [
   {
      _id: 1,
      fruits: [ "apples", "pears", "oranges", "grapes", "bananas" ],
      vegetables: [ "carrots", "celery", "squash", "carrots" ]
   },
   {
      _id: 2,
      fruits: [ "plums", "kiwis", "oranges", "bananas", "apples" ],
      vegetables: [ "broccoli", "zucchini", "carrots", "onions" ]
   }
] )
```

The following operation removes   
"apples" and "oranges" from the fruits array
"carrots" from the vegetables array

```js
db.stores.updateMany(
    { },
    { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }
)
```

After 

```js
{
  _id: 1,
  fruits: [ 'pears', 'grapes', 'bananas' ],
  vegetables: [ 'celery', 'squash' ]
},
{
  _id: 2,
  fruits: [ 'plums', 'kiwis', 'bananas' ],
  vegetables: [ 'broccoli', 'zucchini', 'onions' ]
}
```

<br/>
<br/>
<br/>

## Mongodb Schema Design

Refer - [MongoDB Schema Design Best Practices](https://www.youtube.com/watch?v=QAqK-R9HUhc)   

### Normalization

In SQL, It would make more sense to save them into different tables as such    
In Mongodb, It would make more sense to save them in array or array of objects as such   

<img src="../Auth/img/sql_schema_mongodb_schema.png" width="53%" />

<br/>

> In Mongodb (NoSQL) we prefer to embed unless there is a compelling reason not to 


### One to Many (Finite) relationships

Assume one vehicle is made with a few parts   
One vehicle, many parts   
We can save parts id as an array in vehicle collection 

> Note : In this case, one vehicle has finite (<50) number of parts and parts of a vehicle are rarely updated, so it would make sense to save them in an array in vehicle collection


```js
// vehicle
{
  _id: 
  name: ""
  manufacturer: "",
  catalog_number: "",
  parts: [
    ObjectId(part1Id),
    ObjectId(part2Id),
    ObjectId(part3Id),
    ObjectId(part4Id),
    ObjectId(part5Id)
  ]
}
```

```js
// part
{
  _id: part1Id
  name: ""
  cost: ""
}
```

### One to Many (InFinite) relationships

Assume you need to save server logs related to a machine   
One machine, many logs   

But in this case, we cannot save it as an array into machine collection, as the logs would keep growing   
For every new log, we would need to update machine collection too   
> Mongodb documents can be of max 16MB, saving reference of so many logs might break the system   

In this case we use reverse reference

```js
// machine
{
  _id: ObjectId(machine1),
  name: "",
  stats: ",
}
```

```js
// logs
{
  _id: ObjectId(),
  machineId: ObjectId(machine1),   // reference to machine id
  error: ""
}
```

While fetching logs from a machine we use    
```js
Logs.find({where: {machineId: machineId}})
```

### Many to Many relationships

In this case we can either use cross reference    
Or create a new relationship table, depending on needs of the specific application  


### LexoRanks

While working on Notebook project at Assembly, we wanted to allow users to rank their tasks manually   
Eg - There are 3 tasks under todo, Task3 Task2 Task1, listed in descending order by date creation   
We wanted to allow the users to rank their tasks manually, eg Task2, Task1, Task3   

Approach 1 - Using numbers for ranks   
Lets think how we can save this rank in db   
```js
{task: Task2, rank: 1}
{task: Task1, rank: 2}
{task: Task3, rank: 3}
```
Now what if the user wants to place Task4 between Task2 and Task1
```js
{task: Task2, rank: 1}
{task: Task4, rank: 2}
{task: Task1, rank: 3}
{task: Task3, rank: 4}
```
Here we had to change the rank of all following tasks for the user, and this is not ideal or scalable

Approach 2 - Using point numbers   
One approach that comes to our mind is to use decimal values for rank, and rank of new number = average of up and down rank
```js
{task: Task2, rank: 1}
{task: Task4, rank: 1.5}
{task: Task1, rank: 2}
{task: Task3, rank: 3}

// OR
{task: Task2, rank: 100}
{task: Task4, rank: 150}
{task: Task1, rank: 200}
{task: Task3, rank: 300}
```
With this approach we donot need to update other tasks, but the ranks are very uneven,   
its possible that there are 10 ranks between 1 and 2 and only 1 rank between 3 and 4   
Here we are also limited by numbers, we can place at max 100 tasks between 200 and 300   

Approach 2 - Using LexoRanks

LexoRanks are used by Jira too

* Each task is assigned a unique Lexorank identifier
* The identifier consisted of two parts
  * Bucket Number: This was a single digit (0, 1, or 2) indicating the data storage location for the issue.
  * Encoded Issue Key: This part used a combination of letters and numbers, potentially with a colon separating additional information, to uniquely identify the issue within its bucket.

Example: 1|hzztzz:i

1: Bucket number (data storage location)   
hzztzz: Encoded issue key   
i: Additional information (optional)   

[Reference blog - LexoRanks](https://medium.com/whisperarts/lexorank-what-are-they-and-how-to-use-them-for-efficient-list-sorting-a48fc4e7849f)

<br/>
<br/>
<br/>

---


## Advanced schema design Patterns

https://www.youtube.com/watch?v=bxw1AkH2aM4

https://www.mongodb.com/blog/post/building-with-patterns-a-summary


---

https://www.interviewbit.com/mongodb-interview-questions/
https://www.interviewbit.com/sql-interview-questions/