import express from 'express'
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcements.controller.js'

import {
  listValidator,
  idValidator,
  createValidator,
  updateValidator,
} from '../validators/announcements.validator.js'

const router = express.Router()

router.get('/', listValidator, getAnnouncements)
router.get('/:id', idValidator, getAnnouncementById)
router.post('/', createValidator, createAnnouncement)
router.patch('/:id', updateValidator, updateAnnouncement)
router.delete('/:id', idValidator, deleteAnnouncement)

export default router
