import { celebrate, Joi, Segments } from 'celebrate'

// GET list
export const getAnnouncementsValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    search: Joi.string().optional().allow(''),
    sort: Joi.string().valid('newest', 'oldest').optional(),
    page: Joi.number().min(1).optional(),
  }),
})

// ID param
const idParam = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().required(),
  }),
}

export const idValidator = celebrate(idParam)

// POST
export const createAnnouncementValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().greater(0).required(),
    category: Joi.string().valid('sale', 'service', 'job', 'other').required(),
    contactInfo: Joi.string().min(5).required(),
  }),
})

// PATCH
export const updateAnnouncementValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(100),
    description: Joi.string().min(10),
    price: Joi.number().greater(0),
    category: Joi.string().valid('sale', 'service', 'job', 'other'),
    contactInfo: Joi.string().min(5),
  }).min(1), // важливо: хоча б одне поле
})
