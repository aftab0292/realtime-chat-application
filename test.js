const activeChats = [
  {
    "message": "Hello",
    "fromUserName": "Danish",
    "toUserName": "Karan",
    "users": [
      "528b78ff-de0c-4393-bba7-edd1953d91ac",
      "1a75d851-5404-4373-9bb6-3cc3b44cea9c"
    ],
    "createdAt": "5:27 pm"
  },
  {
    "message": "Hello",
    "fromUserName": "Danish",
    "toUserName": "Karan",
    "users": [
      "528b78ff-de0c-4393-bba7-edd1953d91aq",
      "1a75d851-5404-4373-9bb6-3cc3b44cea9c"
    ],
    "createdAt": "5:27 pm"
  }
]

const user1 = { id: "1a75d851-5404-4373-9bb6-3cc3b44cea9c", socket_id: "S4OwWzweKuirOyryAAAH", username: "Danish" }
const user2 = { id: "528b78ff-de0c-4393-bba7-edd1953d91ac", socket_id: "uvF3WIK0YeGHKi2FAAAJ", username: "Karan" }

const result = activeChats.filter(chat => chat.users.includes(user1.id) && chat.users.includes(user2.id))
console.log(result);