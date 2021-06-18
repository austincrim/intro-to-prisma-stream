import { NextApiHandler } from 'next'
import { prisma } from '../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { title, rating, musings } = req.body
    const newReview = await prisma.review.create({
      data: {
        title,
        rating,
        musings
      }
    })
    res.json(newReview)
  } else if (req.method === 'DELETE') {
    const { id } = req.body
    const deletedReview = await prisma.review.delete({
      where: {
        id
      }
    })

    res.json(deletedReview)
  }
}

export default handler
