import * as React from 'react'
import styles from '../styles/index.module.css'

let id = 0

function Index() {
  const [reviews, setReviews] = React.useState([
    { id: id++, title: 'Babe: Pig in the City', rating: 6 }
  ])
  const [title, setTitle] = React.useState('')
  const [rating, setRating] = React.useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (title === '') return

    setReviews([...reviews, { id: id++, title, rating }])
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
                onClick={() => {
                  setReviews(reviews.filter((r) => r.id !== review.id))
                }}
                aria-label={`delete review ${review.title}`}
                className={styles.deleteButton}
                type='button'
              >
                &times;
              </button>
              <div className={styles.column}>
                <span className={styles.title}>{review.title}</span>
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
