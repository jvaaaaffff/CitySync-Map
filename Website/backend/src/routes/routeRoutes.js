import express from 'express'
import {
  calculateRoute,
  getTrafficConditions,
  getAlternativeRoutes,
} from '../controllers/routeController.js'

const router = express.Router()

router.post('/calculate', calculateRoute)
router.get('/traffic', getTrafficConditions)
router.post('/alternatives', getAlternativeRoutes)

export default router
