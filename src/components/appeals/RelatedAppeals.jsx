import AppealCard from './AppealCard'
import './RelatedAppeals.css'

const RelatedAppeals = ({ appeals = [], currentId }) => {
  const related = appeals.filter((a) => a.id !== currentId).slice(0, 4)
  if (!related.length) return null

  return (
    <section className="related-appeals">
      <div className="related-appeals__inner container">
        <h2 className="related-appeals__title">More Appeals You Can Trust</h2>
        <div className="related-appeals__grid">
          {related.map((appeal) => (
            <AppealCard key={appeal.id} appeal={appeal} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedAppeals
