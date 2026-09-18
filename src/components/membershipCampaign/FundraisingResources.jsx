import fundraiserListImage from '../../assets/img/fundraising/top-fundraisers01.png'

const ResourceList = ({ title, items, href }) => <div><h2>{title}</h2><ul>{items.map((item) => <li key={item.title}><a href={href}><img src={fundraiserListImage} alt="" /><span><strong>{item.title}</strong><span className="education-fundraiser__list-progress"><i style={{ width: `${item.progress}%` }} /></span><small>Impacting {item.impact} children</small></span></a></li>)}</ul></div>

const FundraisingResources = ({ lists }) => <section className="education-fundraiser__lists" id="faq" aria-label="Fundraising resources"><ResourceList title="Top fundraisers" items={lists.fundraisers} href="#fundraiser-start" /><ResourceList title="Our teams" items={lists.teams} href="#the-team" /></section>

export default FundraisingResources
