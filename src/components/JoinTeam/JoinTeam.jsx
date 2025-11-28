import './JoinTeam.css'
import joinTeamMain from '../../assets/img/career/Rectangle 34625876 (1).png'
import joinCtaBg from '../../assets/img/career/joinus.png'
import joinTeamSecondary from '../../assets/img/career/join.png'
const JoinTeam = ()=>{
    return(
        <>
          {/* Join Team Section */}
        <section className="join-team-section mb-64">
          <div className="join-team-content">
            <p className="join-team-eyebrow">
              <span></span>Join Team<span></span>
            </p>
            <h2 className="join-team-title">Why Join Our Team</h2>
            <p className="join-team-text">
            At Molana Tariq Jamil Foundation, we are dedicated to serving humanity and making a positive impact on society.
            As a non-profit organization, we are driven by our mission to promote peace, tolerance, and compassion through various charitable initiatives.
            Joining our team means becoming part of a noble cause and contributing to the well-being of others
            Joining our team means becoming part of a noble cause and contributing to the well-being of
            others.
            </p>
        
          </div>
          <div className="join-team-media">
            <div className="join-team-image join-team-image--main">
              <img src={joinTeamMain} alt="Molana Tariq Jamil" />
            </div>
            <div className="join-team-image join-team-image--secondary">
              <img src={joinTeamSecondary} alt="Team collaboration" />
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section
          className="join-cta-section"
          style={{
            backgroundImage: `linear-gradient(105deg, rgba(0, 0, 0, -8.33), rgba(0, 0, 0, -39.4)), url(${joinCtaBg})`
          }}
        >
          <div className="join-cta-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 8l9-5 9 5v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path>
              <path d="M3 8l9 5 9-5"></path>
              <path d="M12 16.5l-3.2-3a2.6 2.6 0 0 1 0-3.7 2.7 2.7 0 0 1 3.8 0 2.7 2.7 0 0 1 3.8 0 2.6 2.6 0 0 1 0 3.7L12 16.5z"></path>
            </svg>
          </div>
          <div className="join-cta-content">
            <h3>How to Join Our Team?</h3>
            <p>
              You can also submit your resume and cover letter to <a href="mailto:hr@mtjfoundation.org">hr@mtjfoundation.org</a> to be
              considered for future opportunities. Join us at Molana Tariq Jamil Foundation and be part of our efforts
              to promote peace, tolerance, and compassion in the world.Together, we can make a positive impact on humanity!
            </p>
           
          </div>
          <button className="join-cta-btn">Join Now</button>
        </section>
        </>
    )
}
export default JoinTeam 