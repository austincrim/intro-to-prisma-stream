import * as React from 'react'
import { prisma } from '../lib/prisma'
import type { GetServerSideProps } from 'next'
import type { Review } from '@prisma/client'
import styles from '../styles/index.module.css'
import { useRouter } from 'next/dist/client/router'

function Index({ reviews }: { reviews: Review[] }) {
  const [title, setTitle] = React.useState('')
  const [musings, setMusings] = React.useState('')
  const [rating, setRating] = React.useState(0)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (title === '') return

    const response = await fetch('/api/reviews', {
      body: JSON.stringify({ title, rating, musings }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      setTitle('')
      setMusings('')
      setRating(0)
      router.push('/')
    } else {
      alert('error creating movie!')
    }
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
              <button
                onClick={async () => {
                  const response = await fetch('/api/reviews', {
                    body: JSON.stringify({ id: review.id }),
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    method: 'DELETE'
                  })
                  if (response.ok) {
                    router.push('/')
                  } else {
                    alert('error deleting movie!')
                  }
                }}
                aria-label={`delete review ${review.title}`}
                className={styles.deleteButton}
                type='button'
              >
                &times;
              </button>
              <div className={styles.column}>
                <span className={styles.title}>{review.title}</span>
                {review.musings && (
                  <span className={styles.musings}>{review.musings}</span>
                )}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await prisma.review.findMany()

  return {
    props: {
      reviews
    }
  }
}

export default Index
