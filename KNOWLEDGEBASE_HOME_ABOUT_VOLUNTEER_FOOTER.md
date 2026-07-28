# MTJ Foundation Knowledgebase

Scope: This file documents only these areas of the frontend:
- `src/pages/Home.jsx`
- `src/pages/About.jsx`
- `src/components/volunteer/`
- `src/components/footer/`

Use this file as a bot-friendly reference for page composition, responsibilities, and important content/behavior.

## Home Page

File: `src/pages/Home.jsx`

Purpose:
- Renders the public homepage.
- Composes the hero, donation form, content sections, testimonials, newsletter, CTA, and footer.

Main structure:
- `Hero`
- `DonationForm`
  - Uses `layout="vertical"`
  - Uses `formId="home-donation-form"`
  - Receives `projects={ALL_PROJECTS_DATA}`
  - Enables project selection with `showProjectSelect={true}`
- `HeroContent`
- `DonationFeatures`
- `CtaCircles`
- `Projects`
- `Stats`
- `BrandArea`
- `ProjectsTestimonial`
  - Uses `home_testimonials` from `src/utils/variables`
- Optional `HomeInfoSection`
  - Controlled by prop: `showHomeInfoSection`
- `Newsletter`
- `DonationCta`
- `Footer`

Behavior notes:
- Uses `useIntersectionObserver`, but most sections are currently rendered directly.
- `QuickBlogs` and `Events` are imported/commented and not actively rendered.

Important dependency:
- Homepage donation entry depends on `ALL_PROJECTS_DATA` from `src/data/projectsData.js`.

## About Page

File: `src/pages/About.jsx`

Purpose:
- Renders the About Us page.
- Presents organizational story, mission, leadership, team, reports, newsletter, CTA, and footer.

Main structure:
- `PageHeader`
  - Title: `About Us`
  - Uses about hero image
- `OurStory`
- `Mission`
- `CoreValues`
- `Directors`
  - Chairman block
- `Directors`
  - Vice Chairman block
  - Name: `Molana Yousaf Jamil`
  - Includes custom `directorTexts`
- `Team`
- `FinancialReports`
- `Newsletter`
- `DonationCta`
- `Footer`

Behavior notes:
- `Events` and `QuickBlogs` are present but commented out.
- `useIntersectionObserver` is imported and set up, but sections are mostly rendered directly.

## Volunteer Components

Folder: `src/components/volunteer/`

Files:
- `VolunteerSection.jsx`
- `VolunteerGuide.jsx`
- `VolunteerForm.jsx`
- `VolunteerForm.css`

### VolunteerSection

File: `src/components/volunteer/VolunteerSection.jsx`

Purpose:
- Wrapper section that displays the volunteer page content in a two-part card layout.

Structure:
- `VolunteerGuide`
- `VolunteerForm`

Layout notes:
- Uses shared contact-section styling via `../contact/ContactSection.css`.

### VolunteerGuide

File: `src/components/volunteer/VolunteerGuide.jsx`

Purpose:
- Displays intro copy for volunteering.

Default content:
- Subtitle: `Join Us Now`
- Title: `Register yourself as our volunteer.`
- Description encourages cause-based participation.
- Benefits list:
  - Help those in need
  - Learn and grow
  - Make a real impact

UI notes:
- Uses `FaCheck` icons for benefit bullets.
- Also relies on shared contact-section styles.

### VolunteerForm

File: `src/components/volunteer/VolunteerForm.jsx`

Purpose:
- Multi-step volunteer registration form.
- Submits data to backend endpoint: `/register_volunteer`

Steps:
1. Personal
2. Availability
3. Skills
4. Additional

State and validation:
- Uses local `useState`
- Validates each step before progressing
- Shows inline error messages
- Shows success/error submit states

Key form fields:
- Personal:
  - `name`
  - `cnic`
  - `date_of_birth`
  - `gender`
  - `phone`
  - `email`
  - `city`
  - `area`
- Availability:
  - `availability_days`
  - `hours_per_week`
  - `willing_to_travel`
  - `schedule`
- Skills:
  - `skills`
  - `interest_areas`
  - `motivation`
- Additional:
  - `agreed_to_policy`
  - `declaration_accurate`

Submission behavior:
- Sends payload with `source: 'website'`
- Uses `axiosInstance.post('/register_volunteer', payload)`
- Resets form on success
- Calls optional `onSubmit(formData, response.data)`

Notable data shaping:
- `availability_days` is converted into `availability`
- Several backend fields are sent as `null` placeholders:
  - `cv_url`
  - `emergency_contact_name`
  - `emergency_contact_phone`
  - `emergency_contact_relation`
  - `comments`

Important UX notes:
- Step progress UI is built into the component.
- Checkbox chips are used for skills, availability, and interest areas.

## Footer

Folder: `src/components/footer/`

Primary file:
- `src/components/footer/Footer.jsx`

Purpose:
- Global footer used across many pages.
- Combines branding, legal details, quick links, social links, app link, and regional office contacts.

Main sections:
1. Brand / Social / App download
2. Legal information
3. Blogs / Registration links
4. Quick Links
5. Regional Offices

### Brand and social

Includes:
- MTJ Foundation footer logo
- Social links:
  - WhatsApp
  - Facebook
  - X
  - Instagram
  - LinkedIn
  - YouTube
- Google Play app link

### Legal information

Displays:
- National Taxation Number: `I652261-4`
- Registration Number: `I652261`
- SECP License No.: `SECP/LRD/Co42/350/2025`
- Corporate Unique Identification No.: `0329787`
- Small legal note:
  - `MTJ Foundation is a Registered NGO under section 42 of Companies Act. 2017 (As Non-Profit Company)`

### Quick links

Includes:
- Home
- About Us
- Our Programs
- Volunteer
- Careers
- Contact Us
- Privacy Policy

### Blogs area

Includes:
- Blogs
- Registration

### Regional offices

Displayed offices:
- Tulamba (Head Office)
- Karachi
- Multan
- Faisalabad
- Lahore

Head office includes:
- Address
- UAN
- Phone
- Email
- Feedback number

Footer notes:
- Footer content is hardcoded in `Footer.jsx`.
- Footer styling is handled by `Footer.css`.
- Many pages lazy-load this component near the bottom of page composition.

## High-Level Relationships

- `Home.jsx` and `About.jsx` both end with:
  - `Newsletter`
  - `DonationCta`
  - `Footer`
- Volunteer UI is separated into:
  - descriptive left panel: `VolunteerGuide`
  - functional form panel: `VolunteerForm`
- `Footer` acts as a reusable sitewide footer rather than page-specific logic.

## Good Bot Entry Points

If a bot needs to work only in this scope, start here:
- Home page composition: `src/pages/Home.jsx`
- About page composition: `src/pages/About.jsx`
- Volunteer registration logic: `src/components/volunteer/VolunteerForm.jsx`
- Volunteer layout wrapper: `src/components/volunteer/VolunteerSection.jsx`
- Volunteer intro content: `src/components/volunteer/VolunteerGuide.jsx`
- Footer structure/content: `src/components/footer/Footer.jsx`
