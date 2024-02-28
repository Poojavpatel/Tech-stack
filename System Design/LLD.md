# Low Level Design

### Table of contents
- [Database Design](#database-design)
  - [Mongodb Schema Design](#mongodb-schema-design)
- [Database Design Examples](#database-design-examples)

<br/>
<br/>

## Database Design

### Mongodb Schema Design

[Mongodb Schema Design](../Mongodb/README.md#mongodb-schema-design)


<br/>
<br/>
<br/>

## Database Design Examples

### DB modelling for a Whatsapp Like Chat System

Requirements
- 2 types of chat - 1vs1 chat, Group chat
- 3 types of message: text, image, video
- message will have status: sent, delivered, read
- 1vs1: 1 status for message, group: n status for message, depending on members in group
- user can delete the message: for him, for everyone
- user can delete conversation for himself

In DB Models specify these

- fields
- data types, enums: all values
- Primary keys, foreign keys
- Relationship b/w all schema

```js
// Users
{
  "_id": "",
  "username": { "unique": true },
  "password": "",
  "name": "",
  "profile_picture": "",
  "last_seen": ""
}

// Chats
{
  "_id": "",
  "type": { "enum": ["one_to_one", "group"] },
  "created_at": "", 
  "members": [user1Id, user2Id, user3Id] // references Users collection _id
}

// Messages
{
  "_id": "",
  "chat_id": "", // references Chats collection _id
  "sender_id": "", // references Users collection _id
  "content": "",
  "type": { "enum": ["text", "image", "video"] },
  "created_at": "",
  "deleted_at": "" // for soft deletion
}

// Message_Statuses
{
  "_id": "",
  "message_id": "", // references Messages collection _id
  "user_id": "", // references Users collection _id
  "status": { "enum": ["sent", "delivered", "read"] },
  "updated_at": ""
}

```

Learnings
- Instead of having a model for group, have for chat, chat can be of type 1vs1 or group
- Have a chatMembers collection to know all users in a group, they can then also have the isAdmin key
- This enforces many to many relationship between user and chat