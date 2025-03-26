## Restaurant Model
- id: Int
- name: String
- description: String
- thumbnail: String
- gallery: String[]
- location: String
- owner: ObjectId
- deliveryTime: Object{
    max: Number, 
    min: Number
}
- deliveryCharge: Number
- Tags: ObjectId[]
- createdAt: DateTime

## Menu Model
- id: Int
- name: String
- description: String
- thumbnail: String
- price: Number
- restaurant: ObjectId
- createdAt: DateTime

## User Model
- id: Int
- name: String
- bio: String
- avatar: String
- email: String
- password: String
- address: String
- phone: String
- createdAt: DateTime

## Restaurant Owner Model
- id: Int
- userId: ObjectId
- restaurantId: ObjectId
- area: String
- currency: String
- createdAt: DateTime


## Payment Method Model
- id: Int
- name: String
- cardNumber: Number
- expiryDate: DateTime
- cvv: String
- createdAt: DateTime

## Order Model
- id: Int
- item: Object {
    menu: ObjectId,
    quantity: Number
}[]
- status: String
- deliveryTime: Number
- userId: ObjectId
- copunId: ObjectId
- createdAt: DateTime

## Cart Model
- id: Int
- item: Object {
    menu: ObjectId,
    quantity: Number
}[]
- userId: ObjectId
- createdAt: DateTime

## Review Model
- id: Int
- rating: Number
- reviewText: String
- createdAt: DateTime
- reviewerId: ObjectId
- restaurantId: ObjectId


## Settings Model
- id: Int
- restaurantId: ObjectId
- orderConfirm: Boolean
- orderStatusChange: Boolean
- orderDelivered: Boolean
- emailNotification: Boolean
- smsNotification: Boolean
- pushNotification: Boolean
- createdAt: DateTime

## Coupon Model
- id: Int
- code: String
- discount: Number
- restaurantId: ObjectId
- createdAt: DateTime
