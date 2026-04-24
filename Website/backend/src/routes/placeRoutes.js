import express from 'express'
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getNearbyPlaces,
  addReview,
} from '../controllers/placeController.js'

const router = express.Router()

router.get('/', getAllPlaces)
router.get('/nearby', getNearbyPlaces)
router.get('/:id', getPlaceById)
router.post('/', createPlace)
router.put('/:id', updatePlace)
router.delete('/:id', deletePlace)
router.post('/:id/reviews', addReview)

export default router
