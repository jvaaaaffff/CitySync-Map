import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    category: {
      type: String,
      enum: ['restaurant', 'hotel', 'gas_station', 'parking', 'cafe', 'shopping', 'hospital', 'bank', 'other'],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        index: '2dsphere',
      },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        author: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    images: [String],
    hours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    priceLevel: {
      type: String,
      enum: ['$', '$$', '$$$', '$$$$'],
    },
    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

placeSchema.index({ 'location': '2dsphere' })
placeSchema.index({ name: 'text', description: 'text', address: 'text' })

export default mongoose.model('Place', placeSchema)
