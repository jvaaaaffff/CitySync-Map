import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
    savedPlaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
    navigationHistory: [
      {
        startPoint: {
          latitude: Number,
          longitude: Number,
          address: String,
        },
        endPoint: {
          latitude: Number,
          longitude: Number,
          address: String,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    homeAddress: {
      address: String,
      location: {
        type: { type: String, enum: ['Point'] },
        coordinates: [Number],
      },
    },
    workAddress: {
      address: String,
      location: {
        type: { type: String, enum: ['Point'] },
        coordinates: [Number],
      },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
