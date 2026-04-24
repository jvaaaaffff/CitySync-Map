import Place from '../models/Place.js'

// Full text search
export const searchPlaces = async (req, res) => {
  try {
    const { query, category, limit = 20, skip = 0 } = req.query

    if (!query) {
      return res.status(400).json({ success: false, error: 'Search query is required' })
    }

    let searchQuery = {
      $text: { $search: query },
    }

    if (category) {
      searchQuery.category = category
    }

    const places = await Place.find(searchQuery, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(parseInt(limit))
      .skip(parseInt(skip))

    const total = await Place.countDocuments(searchQuery)

    res.status(200).json({
      success: true,
      data: places,
      total,
      query,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Search with filters
export const advancedSearch = async (req, res) => {
  try {
    const { query, category, minRating, maxPrice, limit = 20, skip = 0 } = req.query

    let searchQuery = {}

    if (query) {
      searchQuery.$text = { $search: query }
    }

    if (category) {
      searchQuery.category = category
    }

    if (minRating) {
      searchQuery.rating = { $gte: parseFloat(minRating) }
    }

    if (maxPrice) {
      const priceMap = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
      searchQuery.priceLevel = { $lte: maxPrice }
    }

    const places = await Place.find(searchQuery)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ rating: -1 })

    const total = await Place.countDocuments(searchQuery)

    res.status(200).json({
      success: true,
      data: places,
      total,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Get places by category
export const searchByCategory = async (req, res) => {
  try {
    const { category, limit = 20, skip = 0 } = req.query

    if (!category) {
      return res.status(400).json({ success: false, error: 'Category is required' })
    }

    const places = await Place.find({ category })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ rating: -1 })

    const total = await Place.countDocuments({ category })

    res.status(200).json({
      success: true,
      data: places,
      total,
      category,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// Search by location
export const searchByLocation = async (req, res) => {
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

    const places = await Place.find(query).limit(50)

    res.status(200).json({
      success: true,
      data: places,
      count: places.length,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
