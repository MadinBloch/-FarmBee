# FarmBee — Improve Existing React PWA

We already have a working React + Vite PWA prototype for FarmBee.

DO NOT rebuild the application from scratch.

DO NOT remove the existing Farmer and Beekeeper functionality.

The current authenticated dashboards and features are already working. Improve the application by adding a proper public landing page and improving the overall UX/navigation.

The screenshots provided with this prompt show the current UI. Use them as the visual reference for the existing authenticated application.

---

# 1. Main Goal

Currently, when someone opens the application, they directly see the login/dashboard-style application.

Change this.

The root URL:

```text
/
```

must become a **public marketing/landing page** for FarmBee.

The authenticated application should remain available after login.

The final application should have two clearly separated areas:

```text
PUBLIC WEBSITE
      ↓
Landing Page
      ↓
Login
      ↓
Authenticated Application
      ↓
Farmer / Beekeeper Dashboard
```

The application should feel like a real startup/product website rather than only an internal dashboard.

---

# 2. Public Landing Page

Create a polished, responsive landing page at:

```text
/
```

The landing page must work properly on:

* Desktop
* Laptop
* Tablet
* Android
* iPhone

It should be mobile-first and responsive.

Do not make the landing page overly complicated.

The goal is to clearly explain the FarmBee concept within a few seconds.

---

# 3. Header / Navbar

Create a public navbar.

Desktop:

```text
🐝 FarmBee

How It Works
For Farmers
For Beekeepers
About

                    Login
                    Get Started
```

Mobile:

```text
🐝 FarmBee                         ☰
```

Opening the mobile menu should show:

```text
Home
How It Works
For Farmers
For Beekeepers
About
Login
Get Started
```

The navbar should remain clean and compact.

If appropriate, make it sticky while scrolling.

---

# 4. Hero Section

The first section should immediately explain FarmBee.

Headline:

```text
Connecting Farmers with Beekeepers
for Better Pollination
```

Supporting text:

```text
FarmBee helps farmers find beekeepers when their crops are flowering,
and helps beekeepers find suitable farms for their bee colonies.
```

Primary CTA:

```text
Find a Farm
```

Secondary CTA:

```text
I'm a Farmer
```

Also include:

```text
Login
```

near the top/header.

The hero should visually communicate:

* Farm
* Crops
* Bees
* Pollination
* Connection between farmer and beekeeper

Use a clean agricultural visual style.

Do not make it look like a generic SaaS landing page.

Avoid excessive gradients, animations, and unnecessary decorative elements.

---

# 5. Hero Visual

Create a visual on the right side of the desktop hero.

Concept:

```text
Farmer / Farm
      ↓
Flowering Crop 🌻
      ↓
🐝 Bees
      ↓
Beekeeper
```

The visual can use illustrations, cards, simple graphics, or CSS-based elements.

Do not introduce a dependency on an external image API.

If no image assets exist, use clean CSS/emoji/icon-based visuals.

On mobile, stack the visual below the hero text.

---

# 6. Problem Section

Add a section explaining the problem.

Heading:

```text
Finding the right connection is still difficult
```

Explain:

Farmers may need bees during the flowering stage to support pollination, while beekeepers need suitable flowering locations for their colonies.

Today, finding the right farm or beekeeper often depends on:

* Personal contacts
* Local networks
* Manual searching
* Phone calls
* Unorganized information

FarmBee brings this process into one platform.

Keep the language simple.

---

# 7. How FarmBee Works

Create a 3 or 4 step section.

Heading:

```text
How FarmBee Works
```

### Step 1 — Farmers Add Their Farms

```text
Add your crop, farm area, location,
and expected flowering period.
```

### Step 2 — Beekeepers Find Suitable Farms

```text
Search farms based on crop,
location, flowering period and availability.
```

### Step 3 — Send a Request

```text
Discuss bee box placement,
dates and other arrangements.
```

### Step 4 — Connect

```text
Farmer and beekeeper finalize
the arrangement.
```

Use simple icons/illustrations.

---

# 8. For Farmers Section

Create a dedicated section:

```text
For Farmers
```

Explain benefits:

* Find beekeepers when crops are flowering
* Add and manage multiple farms
* Share flowering periods
* Receive beekeeper requests
* Accept or reject requests
* Manage arrangements

CTA:

```text
Join as Farmer
```

This button should open the login/register flow with Farmer selected.

---

# 9. For Beekeepers Section

Create:

```text
For Beekeepers
```

Benefits:

* Find flowering farms
* Search by crop
* Filter by area
* Find suitable locations
* Check flowering periods
* Send farm requests
* Manage bee-box availability
* Track accepted farms

CTA:

```text
Join as Beekeeper
```

This should open the login/register flow with Beekeeper selected.

---

# 10. Main Value Proposition

Add a simple section:

```text
One platform. Two sides. One connection.
```

Show:

```text
👨‍🌾 Farmer
     ↕
   FarmBee
     ↕
🐝 Beekeeper
```

Explain that FarmBee connects supply and demand around the flowering period.

---

# 11. Matching Feature

Create a section explaining FarmBee's matching system.

Heading:

```text
Find farms that fit your needs
```

Show a demo card:

```text
Patel Mustard Farm

Mustard
12 Acres

Flowering
10 Dec – 25 Dec

📍 Rajkot

95% Match

✓ Crop
✓ Flowering Period
✓ Area
✓ Distance
✓ Availability

[View Farm]
```

This should use the existing matching logic already implemented in the application.

Do not create fake AI claims.

Do NOT call this "AI-powered" unless actual AI is implemented.

The current deterministic matching system is enough for the demo.

---

# 12. Demo Section

Because this is a prototype/demo, add a section:

```text
Try the FarmBee Demo
```

Explain:

```text
Explore FarmBee as a Farmer or Beekeeper
using our demo accounts.
```

Show two cards.

### Farmer Demo

```text
Ramesh Patel

Farmer

9000000001
Password: 123456

[Login as Farmer]
```

### Beekeeper Demo

```text
Amit Beekeeper

Beekeeper

9000000002
Password: 123456

[Login as Beekeeper]
```

The buttons should automatically open the login page with the appropriate role/account selected.

Do not expose demo credentials in the main production-style UI unless this is clearly labeled as a demo.

Since this is currently a prototype, showing them in a "Demo" section is acceptable.

---

# 13. Existing Dashboard Must Remain

IMPORTANT:

Do NOT remove the existing dashboard functionality.

The existing Farmer dashboard shown in the screenshots should remain.

The Farmer dashboard currently contains:

```text
Dashboard
My Farms
Requests
Profile
```

and dashboard statistics such as:

```text
My Farms
Active Farms
Pending Requests
Accepted
```

and:

```text
Upcoming Flowering
Recent Requests
```

Keep this functionality.

Improve spacing, typography and responsive behavior only if needed.

---

# 14. Existing Beekeeper Dashboard Must Remain

Keep the existing Beekeeper dashboard.

Current sections:

```text
Dashboard
Find Farms
My Requests
Bee Boxes
Profile
```

Keep:

```text
Available Bee Boxes
Active Requests
Accepted Farms
Nearby Farms
```

and:

```text
Recommended Farms
```

Keep the existing matching functionality.

Do not break the current flow.

---

# 15. Login Flow

The Login page should be accessible from:

```text
Navbar → Login
Hero → Login
Get Started
Farmer CTA
Beekeeper CTA
Demo buttons
```

The login page should support:

```text
Farmer
Beekeeper
```

with role selection.

Existing demo credentials must continue working.

Farmer:

```text
9000000001
123456
```

Beekeeper:

```text
9000000002
123456
```

Keep the localStorage session system.

---

# 16. Routing

Use React Router.

Recommended structure:

```text
/
    Public Landing Page

/login
    Login

/farmer/dashboard
    Farmer Dashboard

/farmer/farms
    My Farms

/farmer/requests
    Requests

/farmer/profile
    Profile

/beekeeper/dashboard
    Beekeeper Dashboard

/beekeeper/farms
    Find Farms

/beekeeper/requests
    My Requests

/beekeeper/bee-boxes
    Bee Boxes

/beekeeper/profile
    Profile
```

Protect authenticated routes.

If an unauthenticated user tries:

```text
/farmer/dashboard
```

redirect to:

```text
/login
```

If a Farmer tries to access Beekeeper-only routes, redirect appropriately.

---

# 17. Navbar Authentication State

On the public landing page:

```text
Login
Get Started
```

After login, do NOT show Login.

Instead show:

```text
Dashboard
Profile
Logout
```

or a compact user menu.

Example:

```text
🐝 FarmBee

Dashboard
Profile
Logout
```

---

# 18. Mobile UX

Mobile is extremely important.

The public website must not simply shrink the desktop page.

Design mobile intentionally.

Example:

```text
🐝 FarmBee                  ☰

Connect Farmers
with Beekeepers

[ Get Started ]

[ Login ]

       🌻
      🐝🐝
       🌾

How FarmBee Works
↓
Step 1
↓
Step 2
↓
Step 3
```

Authenticated mobile application should retain the existing bottom navigation.

Farmer:

```text
Dashboard
Farms
Requests
Profile
```

Beekeeper:

```text
Dashboard
Find Farms
Requests
Bee Boxes
Profile
```

Make sure buttons are large enough for touch.

---

# 19. PWA

Do NOT break the existing PWA.

Keep:

* Manifest
* Service Worker
* Workbox
* Offline cache
* Installability
* App icons
* Theme color

PWA name:

```text
FarmBee
```

Short name:

```text
FarmBee
```

Description:

```text
Connect farmers and beekeepers for better pollination.
```

The public landing page must also be included in the cached application shell where practical.

---

# 20. PWA Install CTA

Add a small install prompt when appropriate.

Example:

```text
Install FarmBee

Get quick access from your phone's home screen.

[ Install ]
```

Only show this when the browser provides the install capability.

Do not show a fake install button.

If installation is not available, don't display the button.

---

# 21. Offline Demo

The application should continue to work offline after it has been cached.

The following demo functionality should work locally:

* Login
* Dashboard
* View fake farms
* Search/filter
* Add farm
* Send request
* Accept/reject request
* View request status
* Reset demo data

Use localStorage as the current data store.

Do not introduce a backend.

---

# 22. Existing Data Must Stay

Do not remove the existing seeded data.

Current data:

```text
5 farmers
4 beekeepers
11 farms
Seeded requests
```

Keep it.

Keep:

```text
farmbee_users
farmbee_farms
farmbee_beekeepers
farmbee_requests
farmbee_session
```

or the existing equivalent storage structure.

---

# 23. Reset Demo Data

Keep:

```text
Reset Demo Data
```

under Profile/Settings.

Reset should restore the original demo scenario.

After reset:

```text
Farmer
→ sees seeded farms

Beekeeper
→ sees seeded farms

Requests
→ return to original seeded state
```

---

# 24. Footer

Create a simple public footer.

Example:

```text
🐝 FarmBee

Connecting farmers and beekeepers
for better pollination.

Product
How It Works
For Farmers
For Beekeepers

Demo
Login

© 2026 FarmBee
Prototype
```

Do not add fake company information, fake addresses, fake phone numbers or fake social media links.

---

# 25. Design Direction

The current application uses green and agricultural colors. Keep that identity but improve consistency.

Primary:

* Green
* Light green
* White
* Soft gray

Secondary:

* Bee yellow/golden

The UI should feel:

* Clean
* Agricultural
* Trustworthy
* Simple
* Modern
* Practical

Avoid:

* Excessive gradients
* Huge text
* Too many animations
* Glassmorphism everywhere
* Excessive shadows
* Generic AI/SaaS design
* Unnecessary charts

The application should look appropriate for a real agriculture platform.

---

# 26. Accessibility

Use:

* Proper button labels
* Semantic HTML
* Good contrast
* Keyboard navigation
* Visible focus states
* Accessible forms
* Proper form labels

Do not rely only on color to communicate status.

For example:

```text
✓ Accepted
⏳ Pending
✕ Rejected
```

rather than only different colors.

---

# 27. Do Not Break Existing Functionality

Before making changes, inspect the existing project.

Do not replace working functionality unnecessarily.

The following must continue working:

```text
Farmer login
Beekeeper login
Farmer dashboard
Add farm
View farms
Requests
Accept request
Reject request
Beekeeper dashboard
Find farms
Filters
Farm details
Send request
Bee box management
Profile
LocalStorage
Reset Demo Data
PWA
```

---

# 28. Final User Journey

The final experience should be:

```text
User opens:

farmbee.vercel.app

        ↓

Landing Page

        ↓

"Connect Farmers with Beekeepers
for Better Pollination"

        ↓

[Get Started] [Login]

        ↓

User chooses:

Farmer / Beekeeper

        ↓

Login

        ↓

Role-specific Dashboard

        ↓

Complete demo workflow
```

---

# 29. Final Demo Workflow

The following MUST work after the changes:

### Public

1. Open `/`
2. See landing page
3. Scroll through sections
4. Click Login
5. Login page opens

### Beekeeper

6. Login as Beekeeper
7. Open Dashboard
8. Open Find Farms
9. Filter Mustard
10. Open Patel Mustard Farm
11. Send request for 20 bee boxes

### Farmer

12. Logout
13. Login as Farmer
14. Open Requests
15. See Amit Beekeeper request
16. Accept request

### Beekeeper

17. Logout
18. Login as Beekeeper
19. Open My Requests
20. See Accepted status
21. See farmer contact

### PWA

22. Install from mobile
23. Open from home screen
24. Application launches in standalone mode
25. Existing demo functionality continues to work

---

# 30. Final Output

After implementation:

1. Run `npm run build`
2. Make sure build succeeds without errors
3. Test the complete demo flow
4. Test desktop layout
5. Test mobile layout
6. Test PWA installation
7. Test localStorage persistence
8. Test Reset Demo Data
9. Make sure no existing feature is broken

Do not add unnecessary features.

The priority is:

**Landing Page → Login → Farmer/Beekeeper Dashboard → Complete Demo Flow → PWA**
