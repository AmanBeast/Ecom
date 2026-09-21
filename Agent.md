# Build a Production-Ready Marketplace App

## Role

You are a **senior full-stack engineer, frontend architect, and UI implementation specialist**.

I have designed a mobile-first marketplace UI in Stitch. Your task is to convert the design into a **fully functional, production-quality web application**.

The application combines two marketplace experiences:

1. **Find and book workspaces/desks**
2. **Buy and sell used electronics**

The UI should closely follow the provided Stitch designs while improving usability where necessary.

---

# 1. TECH STACK

Use the following stack unless there is a strong technical reason to change something:

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate
* Lucide React for icons
* Framer Motion for animations

### Backend

Use Next.js API routes / Route Handlers for the backend initially.

Structure the backend so it can later be extracted into a separate FastAPI/Node.js service if required.

### Database

Use:

* PostgreSQL
* Prisma ORM

### Authentication

Implement:

* Email/password authentication
* Secure password hashing
* Session/JWT-based authentication
* Protected routes

Structure authentication so it can later support Google OAuth.

---

# 2. CORE PRODUCT

The application has two major modules.

## Module A — Workspace Marketplace

Users can:

* Browse workspaces
* Search workspaces
* Filter workspaces
* View workspace details
* View pricing
* View amenities
* Select booking date
* Select duration
* Book a desk
* View their bookings

Workspace owners can:

* Create listings
* Upload workspace images
* Set daily price
* Add amenities
* Manage availability
* View bookings

---

## Module B — Electronics Marketplace

Users can:

* Browse electronics
* Search products
* Filter products
* View product details
* Save products
* Message sellers
* Make offers
* Buy products
* View orders

Sellers can:

* Create product listings
* Upload multiple images
* Set price
* Set condition
* Add specifications
* Manage listings
* Mark products as sold

---

# 3. IMPORTANT PRIVACY REQUIREMENT

This requirement is mandatory.

## NEVER expose personal phone numbers.

Workspace owners' phone numbers must NEVER appear in:

* Workspace listings
* Workspace detail pages
* Owner profiles
* API responses
* HTML
* JavaScript
* Metadata
* JSON responses

The workspace detail page must only provide:

### "Book Desk"

There must be no:

* Call button
* WhatsApp button
* Phone number
* "Contact owner" button

For electronics sellers, use platform-controlled communication:

* Message Seller
* Make Offer
* Buy Now

Do not expose seller phone numbers.

---

# 4. PROJECT STRUCTURE

Create a clean scalable architecture.

Suggested structure:

```text
app/
├── (auth)/
│   ├── login/
│   ├── register/
│
├── (marketplace)/
│   ├── page.tsx
│   ├── workspaces/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── marketplace/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── bookings/
│   ├── orders/
│   └── profile/
│
├── dashboard/
│   ├── workspace-owner/
│   └── seller/
│
├── api/
│   ├── auth/
│   ├── workspaces/
│   ├── bookings/
│   ├── products/
│   ├── orders/
│   ├── messages/
│   └── users/
│
components/
├── ui/
├── home/
├── workspace/
├── marketplace/
├── booking/
├── product/
├── navigation/
└── shared/

lib/
├── auth/
├── db/
├── validations/
├── services/
└── utils/

prisma/
└── schema.prisma
```

Keep business logic out of UI components.

Use reusable service functions.

---

# 5. DATABASE DESIGN

Create a proper relational PostgreSQL schema.

At minimum create:

## User

```text
User
- id
- name
- email
- passwordHash
- avatar
- role
- createdAt
- updatedAt
```

Roles:

```text
USER
WORKSPACE_OWNER
SELLER
ADMIN
```

A user can eventually have multiple capabilities, so avoid designing the authorization system in a way that makes future roles impossible.

---

## Workspace

```text
Workspace
- id
- ownerId
- title
- description
- location
- latitude
- longitude
- dailyPrice
- rating
- reviewCount
- status
- createdAt
- updatedAt
```

Do NOT store phone number in the workspace entity.

---

## WorkspaceImage

```text
WorkspaceImage
- id
- workspaceId
- url
- position
```

---

## WorkspaceAmenity

```text
WorkspaceAmenity
- id
- workspaceId
- name
- icon
```

---

## WorkspaceAvailability

```text
WorkspaceAvailability
- id
- workspaceId
- date
- available
```

---

## Booking

```text
Booking
- id
- userId
- workspaceId
- bookingDate
- duration
- totalPrice
- status
- createdAt
```

Statuses:

```text
PENDING
CONFIRMED
CANCELLED
COMPLETED
```

Prevent double booking through proper database constraints and transactional logic.

---

# 6. ELECTRONICS DATABASE

## Product

```text
Product
- id
- sellerId
- title
- description
- price
- originalPrice
- condition
- category
- status
- createdAt
- updatedAt
```

Conditions:

```text
NEW
LIKE_NEW
GOOD
FAIR
```

Statuses:

```text
ACTIVE
SOLD
RESERVED
REMOVED
```

---

## ProductImage

```text
ProductImage
- id
- productId
- url
- position
```

---

## ProductSpecification

```text
ProductSpecification
- id
- productId
- key
- value
```

---

# 7. ORDERS

Create:

```text
Order
- id
- buyerId
- productId
- sellerId
- amount
- status
- createdAt
- updatedAt
```

Statuses:

```text
PENDING
PAID
PROCESSING
COMPLETED
CANCELLED
```

For the initial version, implement a **mock payment flow** rather than integrating a real payment gateway.

Structure the code so Razorpay/Stripe/etc. can be added later.

---

# 8. MESSAGING

Create a platform-controlled messaging system.

Models:

```text
Conversation
- id
- createdAt

ConversationParticipant
- conversationId
- userId

Message
- id
- conversationId
- senderId
- content
- createdAt
- readAt
```

Users can message sellers.

Do not expose phone numbers.

---

# 9. HOME PAGE

Implement the Stitch design.

Hero:

```text
Good morning 👋

Work better. Shop smarter.

Find your perfect workspace or discover great deals on electronics.
```

Create two major cards.

### Workspace card

```text
Find a Workspace

Desks, private offices & meeting spaces near you.

Explore Workspaces →
```

### Electronics card

```text
Buy & Sell Electronics

Find great deals on laptops, phones and gadgets.

Explore Marketplace →
```

Add:

* Category carousel
* Trending products
* Featured workspaces
* Recently viewed products if data exists

Use realistic seed data.

---

# 10. WORKSPACE LISTING PAGE

Create:

```text
Workspaces
```

Features:

* Search
* Location filter
* Price filter
* Amenities filter
* Sort
* Workspace cards

Each card should show:

* Image
* Workspace title
* Location
* Rating
* Daily price
* Important amenities
* Favorite button

Use responsive grid:

Desktop:

```text
3–4 columns
```

Tablet:

```text
2 columns
```

Mobile:

```text
1 column
```

---

# 11. WORKSPACE DETAIL PAGE

Implement the Stitch design.

Top:

* Image gallery
* Back button
* Favorite button
* Image counter

Information:

```text
Premium Window Desk

Sector 17, Chandigarh

★★★★★ 4.8
24 reviews
```

Pricing:

```text
₹499 / day
```

Amenities:

* High-Speed Wi-Fi
* Power Backup
* Air Conditioning
* Coffee
* Meeting Room
* Ergonomic Chair
* 24/7 Access
* Parking

Owner:

```text
Listed by Rahul
✓ Verified Host
Member since 2024
```

IMPORTANT:

Never show the owner's phone number.

---

# 12. BOOKING FLOW

Clicking:

```text
Book Desk
```

opens a booking interface.

Steps:

### Step 1

Select date.

### Step 2

Select duration.

Example:

```text
1 day
2 days
3 days
1 week
```

### Step 3

Show price calculation.

Example:

```text
₹499 × 2 days
----------------
₹998
```

### Step 4

Confirm booking.

After successful booking:

Show confirmation screen:

```text
Booking Confirmed ✓

Premium Window Desk

12 October 2026

2 days

₹998
```

---

# 13. MARKETPLACE PAGE

Create a marketplace discovery page.

Header:

```text
Marketplace
```

Search bar:

```text
Search laptops, phones, tablets...
```

Categories:

```text
Laptops
Phones
Tablets
Monitors
Accessories
Gaming
```

Filters:

* Price
* Condition
* Category
* Brand
* Location

Product cards:

```text
MacBook Air M1

₹42,000

Like New

Seller verified ✓
```

Use responsive layouts.

---

# 14. PRODUCT DETAIL PAGE

Implement:

```text
MacBook Air M1

₹42,000

₹74,900

Like New
```

Add:

* Image gallery
* Product specifications
* Description
* Seller information
* Trust section
* Message Seller
* Make Offer
* Buy Now

Specifications:

```text
Processor → Apple M1
RAM → 8 GB
Storage → 256 GB SSD
Display → 13.3-inch
Battery → Excellent
Purchase Year → 2022
```

---

# 15. RESPONSIVE DESIGN

This is extremely important.

The application must work properly on:

### Mobile

```text
375px
390px
414px
```

### Tablet

```text
768px
1024px
```

### Desktop

```text
1280px
1440px
1920px
```

Do not simply scale the mobile design.

Adapt layouts appropriately.

---

# 16. NAVIGATION

Mobile bottom navigation:

```text
Home
Workspaces
Marketplace
Orders
Profile
```

Desktop navigation:

```text
Logo

Home
Workspaces
Marketplace

        Search

Orders
Profile
```

Use responsive navigation.

---

# 17. ANIMATIONS

Use Framer Motion.

Animations should be subtle and purposeful.

Implement:

### Page transitions

Smooth fade/slide.

### Cards

Small scale/translate interaction.

### Buttons

Press feedback.

### Images

Smooth image transitions.

### Favorite

Heart animation.

### Bottom navigation

Animated active indicator.

### Booking

Smooth modal/bottom-sheet transition.

Avoid excessive animations.

Performance is more important than visual effects.

---

# 18. ACCESSIBILITY

Follow accessibility best practices.

Implement:

* Semantic HTML
* Keyboard navigation
* Focus states
* Accessible labels
* ARIA where required
* Sufficient color contrast
* Touch targets of at least ~44px
* Proper heading hierarchy
* Form validation messages

Images must have meaningful alt text.

---

# 19. SECURITY

Implement proper security from the beginning.

Requirements:

* Hash passwords
* Validate all inputs
* Server-side authorization
* Protect API routes
* Prevent unauthorized listing modifications
* Prevent unauthorized bookings
* Prevent users from modifying another user's products
* Prevent IDOR vulnerabilities
* Sanitize user-generated content
* Rate-limit sensitive endpoints where appropriate
* Never return private user information unnecessarily
* Never return phone numbers
* Never trust client-side price calculations

All important calculations must be validated server-side.

---

# 20. API DESIGN

Create REST-style endpoints.

Examples:

```text
GET    /api/workspaces
GET    /api/workspaces/:id
POST   /api/workspaces
PATCH  /api/workspaces/:id
DELETE /api/workspaces/:id

POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:id
PATCH  /api/bookings/:id

GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id

POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

POST   /api/conversations
GET    /api/conversations
POST   /api/messages
```

Use proper HTTP status codes.

Return consistent error responses.

---

# 21. VALIDATION

Use Zod or an equivalent validation library.

Validate:

* Authentication forms
* Workspace creation
* Product creation
* Booking requests
* Order requests
* Messages
* Search/filter parameters

Never rely exclusively on frontend validation.

---

# 22. SEED DATA

Create realistic seed data.

At least:

### Workspaces

10–15 workspace listings.

Different:

* Prices
* Locations
* Amenities
* Images
* Ratings

### Products

20+ electronics listings.

Include:

* MacBooks
* Windows laptops
* iPhones
* Android phones
* iPads
* Monitors
* Keyboards
* Headphones

Use realistic prices and conditions.

---

# 23. LOADING / ERROR / EMPTY STATES

Do not build only the happy path.

Implement:

### Loading

Skeleton loaders.

### Empty

Example:

```text
No workspaces found

Try changing your filters.
```

### Error

Example:

```text
Something went wrong.

Try again
```

### Network failure

Provide retry functionality.

---

# 24. IMAGE HANDLING

Use optimized responsive images.

If using Next.js:

Use:

```text
next/image
```

Configure image domains correctly.

Images should:

* Maintain aspect ratio
* Lazy load where appropriate
* Use appropriate sizes
* Avoid layout shifts

---

# 25. PERFORMANCE

Optimize for:

* Fast initial page load
* Minimal unnecessary client components
* Server-side data fetching where appropriate
* Image optimization
* Database indexes
* Pagination
* Debounced search
* Efficient API queries

Do not fetch all products/workspaces when only 20 are displayed.

Implement pagination or cursor-based loading.

---

# 26. DATABASE OPTIMIZATION

Add indexes for commonly queried fields.

Examples:

```text
Workspace.location
Workspace.dailyPrice
Workspace.status

Product.category
Product.price
Product.condition
Product.status

Booking.workspaceId
Booking.bookingDate

Order.buyerId
Order.sellerId
```

Avoid N+1 queries.

Use Prisma `include/select` carefully.

Return only required fields.

---

# 27. UI COMPONENT SYSTEM

Create reusable components instead of duplicating UI.

Examples:

```text
WorkspaceCard
ProductCard
PriceDisplay
Rating
Badge
ImageGallery
SearchBar
FilterSheet
BookingSheet
ProductSpecifications
SellerCard
BottomNavigation
DesktopNavigation
EmptyState
LoadingSkeleton
ErrorState
```

Keep components modular.

---

# 28. DESIGN CONSISTENCY

Match the Stitch designs closely.

Use:

* Same spacing philosophy
* Same typography hierarchy
* Same card style
* Same border radius
* Same CTA hierarchy
* Same navigation behavior
* Same visual language

Do not replace the design with generic Bootstrap-like components.

The result should feel like the same product shown in the Stitch designs.

---

# 29. DESKTOP EXPERIENCE

On desktop, create a proper professional marketplace experience.

Home:

```text
Header
Hero
Workspace section
Marketplace section
Trending
Footer
```

Workspace detail:

```text
Image gallery          Booking card
                        ₹499/day
                        Date
                        Duration
                        Book Desk
```

Product detail:

```text
Image gallery          Product information
                       Price
                       Seller
                       Buy Now
                       Make Offer
```

Use sticky side panels where appropriate.

---

# 30. DASHBOARD

Create basic dashboards.

## Workspace Owner Dashboard

Show:

```text
Total Bookings
Revenue
Active Workspaces
Upcoming Bookings
```

Owner can:

* Create workspace
* Edit workspace
* Manage availability
* View bookings

---

## Seller Dashboard

Show:

```text
Active Listings
Sold Items
Total Sales
Pending Offers
```

Seller can:

* Create product
* Edit product
* Delete product
* Mark as sold
* View offers

---

# 31. TESTING

Add basic tests for critical functionality.

At minimum test:

### Authentication

* Registration
* Login
* Unauthorized access

### Workspace

* Create workspace
* Fetch workspace
* Booking
* Double-booking prevention

### Marketplace

* Create product
* Update product
* Purchase product
* Seller authorization

### Security

Verify that:

```text
phoneNumber
```

is never returned from public workspace APIs.

---

# 32. ENVIRONMENT VARIABLES

Create:

```text
.env.example
```

Include placeholders such as:

```env
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
```

Never hardcode secrets.

Never commit `.env`.

---

# 33. README

Create a comprehensive README containing:

* Project overview
* Features
* Tech stack
* Architecture
* Database setup
* Environment variables
* Installation
* Development commands
* Database migration
* Seed commands
* Testing
* Production build
* Deployment instructions

---

# 34. DEVELOPMENT APPROACH

Do not try to build everything in one giant component.

Build incrementally.

Recommended order:

### Phase 1

Project setup

### Phase 2

Design system + global layout

### Phase 3

Home page

### Phase 4

Workspace marketplace

### Phase 5

Workspace detail

### Phase 6

Booking system

### Phase 7

Electronics marketplace

### Phase 8

Product detail

### Phase 9

Orders

### Phase 10

Messaging

### Phase 11

Dashboards

### Phase 12

Authentication + authorization hardening

### Phase 13

Testing

### Phase 14

Performance optimization

---

# 35. IMPORTANT IMPLEMENTATION RULE

Before writing large amounts of code:

1. Inspect the existing repository.
2. Determine whether a project already exists.
3. Reuse existing components where appropriate.
4. Do not unnecessarily rewrite working code.
5. Identify missing dependencies.
6. Create a clear implementation plan.
7. Then implement incrementally.

If Stitch screenshots/design files are available in the repository, inspect them and use them as the primary visual reference.

If the design contains a component that isn't explicitly described above, reproduce its behavior and visual hierarchy rather than ignoring it.

---

# 36. DEFINITION OF DONE

The project is complete only when:

* All 3 Stitch screens are implemented.
* The application is responsive.
* Workspace browsing works.
* Workspace detail works.
* Booking works.
* Double bookings are prevented.
* Marketplace browsing works.
* Product detail works.
* Seller listings work.
* Orders work.
* Authentication works.
* Authorization works.
* Messaging works.
* Dashboards work.
* Loading states work.
* Error states work.
* Empty states work.
* Animations work smoothly.
* Database migrations work.
* Seed data works.
* Critical APIs are validated.
* Security requirements are implemented.
* No personal phone numbers are exposed.
* The application can be run locally from a fresh setup.

---

# FINAL INSTRUCTION

Build this as a **real full-stack product**, not a static frontend mockup.

Prioritize:

**UI fidelity → UX → functionality → security → performance → maintainability.**

Do not use fake buttons that do nothing.

Whenever a button represents an important user action, implement the underlying functionality or clearly define the missing backend dependency.

Keep the architecture clean enough that the application can eventually support thousands of listings and users without requiring a complete rewrite.

Start by inspecting the repository and then implement the project incrementally.
