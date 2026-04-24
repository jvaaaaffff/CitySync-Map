import express from 'express'
import {
  searchPlaces,
  advancedSearch,
  searchByCategory,
  searchByLocation,
} from '../controllers/searchController.js'

const router = express.Router()

router.get('/', searchPlaces)
router.get('/advanced', advancedSearch)
router.get('/category', searchByCategory)
router.get('/location', searchByLocation)

export default router
