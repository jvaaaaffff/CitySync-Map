import Place from '../models/Place.js'

// Get all places
export const getAllPlaces = async (req, res) => {
  try {
    const { category, limit = 20, skip = 0 } = req.query
    let query = {}

    if (category) {
      query.category = category
    }

    const places = await Place.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ rating: -1 })

    const total = await Place.countDocuments(query)

    res.status(200).json({
      success: true,
      data: places,
      total,
      page: Math.floor(parseInt(skip) / parseInt(limit)) + 1,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Get place by ID
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)

    if (!place) {
      return res.status(404).json({ success: false, error: 'Place not found' })
    }

    res.status(200).json({ success: true, data: place })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Create place
export const createPlace = async (req, res) => {
  try {
    const place = new Place(req.body)
    await place.save()

    res.status(201).json({ success: true, data: place })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

// Update place
export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!place) {
      return res.status(404).json({ success: false, error: 'Place not found' })
    }

    res.status(200).json({ success: true, data: place })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

// Delete place
export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id)

    if (!place) {
      return res.status(404).json({ success: false, error: 'Place not found' })
    }

    res.status(200).json({ success: true, message: 'Place deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Get nearby places
export const getNearbyPlaces = async (req, res) => {
  try {
    const { latitude, longitude, distance = 5000, category } = req.query

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ success: false, error: 'Latitude and longitude are required' })
    }

    let query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(distance),
        },
      },
    }

    if (category) {
      query.category = category
    }

    const places = await Place.find(query).limit(20)

    res.status(200).json({ success: true, data: places })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Add review to place
export const addReview = async (req, res) => {
  try {
    const { id } = req.params
    const { author, rating, comment } = req.body

    const place = await Place.findById(id)

    if (!place) {
      return res.status(404).json({ success: false, error: 'Place not found' })
    }

    place.reviews.push({ author, rating, comment })
    place.rating = (
      place.reviews.reduce((sum, r) => sum + r.rating, 0) / place.reviews.length
    ).toFixed(1)
    place.reviewCount = place.reviews.length

    await place.save()

    res.status(201).json({ success: true, data: place })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
