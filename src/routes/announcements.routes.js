import express from 'express'
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcements.controller.js'

import {
  getAnnouncementsValidator,
  idValidator,
  createAnnouncementValidator,
  updateAnnouncementValidator,
} from '../validators/announcements.validator.js'

const router = express.Router()

router.get('/', getAnnouncementsValidator, getAnnouncements)
router.get('/:id', idValidator, getAnnouncementById)
router.post('/', createAnnouncementValidator, createAnnouncement)
router.patch('/:id', updateAnnouncementValidator, updateAnnouncement)
router.delete('/:id', idValidator, deleteAnnouncement)

export default router
