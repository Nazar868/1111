import { prisma } from '../../prisma/client.js'

// GET /announcements
export const getAnnouncements = async (req, res) => {
  const search = req.query.search?.trim()
  const sort = req.query.sort
  const page = Number(req.query.page) || 1
  const perPage = 10

  const where = search
    ? {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      }
    : {}

  const orderBy = {
    createdAt: sort === 'oldest' ? 'asc' : 'desc',
  }

  const skip = (page - 1) * perPage

  const [data, total] = await Promise.all([
    prisma.announcement.findMany({
      where,
      orderBy,
      skip,
      take: perPage,
    }),
    prisma.announcement.count({ where }),
  ])

  res.json({
    data,
    pagination: {
      total,
      page,
      totalPages: Math.ceil(total / perPage),
      perPage,
    },
  })
}

// GET by ID
export const getAnnouncementById = async (req, res) => {
  const id = Number(req.params.id)

  const item = await prisma.announcement.findUniqueOrThrow({
    where: { id },
  })

  res.json(item)
}

// CREATE
export const createAnnouncement = async (req, res) => {
  const created = await prisma.announcement.create({
    data: req.body,
  })

  res.status(201).json(created)
}

// PATCH
export const updateAnnouncement = async (req, res) => {
  const id = Number(req.params.id)

  const updated = await prisma.announcement.update({
    where: { id },
    data: req.body,
  })

  res.json(updated)
}

// DELETE
export const deleteAnnouncement = async (req, res) => {
  const id = Number(req.params.id)

  await prisma.announcement.delete({
    where: { id },
  })

  res.status(204).end()
}
