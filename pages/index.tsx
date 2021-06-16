import * as React from 'react'
import { prisma } from '../lib/prisma'
import type { GetServerSideProps } from 'next'
import type { Review } from '@prisma/client'
import styles from '../styles/index.module.css'

function Index({ reviews }: { reviews: Review[] }) {
  const [title, setTitle] = React.useState('')
  const [musings, setMusings] = React.useState('')
  const [rating, setRating] = React.useState(0)

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (title === '') return

    const response = await fetch('/api/reviews', {
      body: JSON.stringify({ title, rating }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const newReview = await response.json()
    reviews.push(newReview)

    setTitle('')
    setRating(0)
  }

  return (
    <div className={styles.appWrapper}>
      <header>
        <h1>Rotten Potatoes</h1>
      </header>
      <main className={styles.main}>
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.review}>
              <div className={styles.column}>
                <span className={styles.title}>{review.title}</span>
                <span className={styles.musings}>{review.musings}</span>
              </div>
              <span>{review.rating}/10</span>
            </li>
          ))}
        </ul>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor='title'>
            Title
          </label>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            type='text'
            id='title'
            autoComplete='off'
          />
          <label className={styles.label} htmlFor='musings'>
            Musings
          </label>
          <textarea
            className={styles.textarea}
            value={musings}
            onChange={(e) => setMusings(e.currentTarget.value)}
            id='musings'
          />
          <label className={styles.label} htmlFor='rating'>
            Rating
          </label>
          <input
            value={rating}
            onChange={(e) => setRating(e.currentTarget.valueAsNumber)}
            type='range'
            min='0'
            max='10'
            step='1'
            id='rating'
          />
          <button className={styles.button} type='submit'>
            Add review
          </button>
        </form>
      </main>
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await prisma.review.findMany()

  return {
    props: {
      reviews
    }
  }
}
