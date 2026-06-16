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
  const take = perPage

  const [data, total] = await Promise.all([
    prisma.announcement.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.announcement.count({ where }),
  ])

  const totalPages = Math.ceil(total / perPage)

  res.json({
    data,
    pagination: {
      total,
      page,
      totalPages,
      perPage,
    },
  })
}

// GET /announcements/:id
export const getAnnouncementById = async (req, res) => {
  const id = Number(req.params.id)

  const announcement = await prisma.announcement.findUniqueOrThrow({
    where: { id },
  })

  res.json(announcement)
}

// POST /announcements
export const createAnnouncement = async (req, res) => {
  const data = req.body

  const created = await prisma.announcement.create({
    data,
  })

  res.status(201).json(created)
}

// PATCH /announcements/:id
export const updateAnnouncement = async (req, res) => {
  const id = Number(req.params.id)

  const updated = await prisma.announcement.update({
    where: { id },
    data: req.body,
  })

  res.json(updated)
}

// DELETE /announcements/:id
export const deleteAnnouncement = async (req, res) => {
  const id = Number(req.params.id)

  await prisma.announcement.delete({
    where: { id },
  })

  res.status(204).end()
}
