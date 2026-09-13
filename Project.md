# Build a Complete React PWA Demo — FarmBee

## 1. Project Overview

Build a polished, fully functional **React Progressive Web App (PWA)** demo for a startup called **FarmBee**.

FarmBee is a platform that connects:

1. Farmers who have flowering crops
2. Beekeepers who have bee boxes/colonies and are looking for suitable farms

The concept is similar to a marketplace/matching platform, but instead of connecting passengers and drivers, FarmBee connects farmers and beekeepers based on:

* Location
* Crop
* Flowering period
* Farm area
* Bee box availability
* Availability dates

This is currently a **demo/prototype only**.

Do NOT build a backend.

All application data must work locally using browser storage so that the entire application can be demonstrated without internet, database, API, or server-side authentication.

---

# 2. Main Technical Requirements

Use:

* React
* Vite
* JavaScript or TypeScript
* React Router
* Tailwind CSS
* PWA support using a proper Vite PWA plugin
* LocalStorage for persistent demo data
* Service Worker for PWA/offline support
* Responsive design
* Mobile-first UI

The project must be runnable with:

```bash
npm install
npm run dev
```

and should also support:

```bash
npm run build
npm run preview
```

The production build must be installable as a PWA.

---

# 3. Important Demo Requirement

The application must work as a **self-contained local demo**.

Do NOT require:

* Laravel
* Node backend
* MySQL
* PostgreSQL
* Firebase
* Supabase
* External authentication
* External API
* Real payment gateway
* Real SMS
* Real email

The demo must work using fake/local data.

The only requirement should be Node.js/npm for running the React project.

---

# 4. User Roles

There are two roles:

## Farmer

Farmers can:

* Login
* View dashboard
* Add farms
* Edit farms
* View farm details
* Add crop information
* Set expected flowering period
* View beekeeper requests
* Accept requests
* Reject requests
* View accepted arrangements
* View profile

## Beekeeper

Beekeepers can:

* Login
* View dashboard
* View available farms
* Search farms
* Filter farms
* View farm details
* Send a request to a farmer
* Specify number of bee boxes
* Add a message
* View sent requests
* View request status
* View profile
* Manage bee-box availability

---

# 5. Login System

Create a beautiful login screen.

Allow the user to select:

```text
Continue as

[ Farmer ]
[ Beekeeper ]
```

For demo purposes, provide demo accounts.

## Farmer Demo

Name:
Ramesh Patel

Mobile:
9000000001

Password:
123456

## Beekeeper Demo

Name:
Amit Beekeeper

Mobile:
9000000002

Password:
123456

Also show a small:

"Demo Accounts"

section on the login screen so the person testing the application knows how to login.

Authentication is only simulated locally.

Store the logged-in user in localStorage.

---

# 6. Application Layout

Create a common responsive layout.

Desktop:

```text
------------------------------------------------
FarmBee                    User     Logout
------------------------------------------------
Sidebar       Main Content
              ...
              ...
------------------------------------------------
```

Mobile:

Use a clean bottom navigation or hamburger navigation.

Farmer navigation:

* Dashboard
* My Farms
* Requests
* Profile

Beekeeper navigation:

* Dashboard
* Find Farms
* My Requests
* Bee Boxes
* Profile

---

# 7. Farmer Dashboard

Create a professional dashboard.

Show summary cards:

```text
My Farms        3

Active Farms    2

Pending Requests 2

Accepted        1
```

Show:

## Upcoming Flowering

Example:

```text
Patel Mustard Farm

Mustard
12 Acres

Flowering:
10 Dec 2026

7 days remaining
```

Show a "Add Farm" button.

Show recent beekeeper requests.

---

# 8. Farmer — Add Farm

Create a proper form.

Fields:

### Basic Information

* Farm Name
* Village/City
* District
* State
* Farm Area
* Farm Location

### Crop Information

* Crop
* Crop Variety
* Sowing Date
* Expected Flowering Start
* Expected Flowering End
* Expected Harvest Date

### Additional Information

* Irrigation Available
* Farming Method
* Pesticide Usage
* Notes

For location, initially allow:

* Latitude
* Longitude

and optionally a simple map-style placeholder.

Do not require a real map API.

After saving, store the farm in localStorage.

Show a success message.

---

# 9. Farm Details Page

Create a detailed farm page.

Example:

```text
Patel Farm

📍 Rajkot, Gujarat

12 Acres

Crop
Mustard

Sowing Date
15 Nov 2026

Expected Flowering
10 Dec – 25 Dec 2026

Expected Harvest
15 Jan 2027

Status
Available
```

Show a section:

## Suitable For

* Honey bees
* Pollination
* 20–30 bee boxes

Also show:

```text
Farm Owner
Ramesh Patel
```

For the demo, show only approximate location publicly.

---

# 10. Farmer — Requests

Create a request management page.

Example:

```text
Amit Beekeeper

20 Bee Boxes

10 Dec 2026 → 25 Dec 2026

Message:
I would like to place 20 bee boxes
during the flowering period.

[ Accept ]
[ Reject ]
```

Request statuses:

* Pending
* Accepted
* Rejected
* Completed

When Farmer accepts:

* Change request status to Accepted
* Update UI immediately
* Save to localStorage

When rejected:

* Change status to Rejected

---

# 11. Beekeeper Dashboard

Create:

```text
Available Bee Boxes
50

Active Requests
3

Accepted Farms
1

Nearby Farms
12
```

Show recommended farms.

Example:

```text
🌻 Patel Farm

Mustard
12 Acres

Flowering:
10 Dec – 25 Dec

📍 Rajkot
18 km away

[ View Farm ]
```

---

# 12. Beekeeper — Find Farms

This is one of the most important pages.

Create a marketplace/search interface.

Filters:

### Crop

* All
* Mustard
* Sunflower
* Guava
* Apple
* Almond
* Cotton

### Location

* City/Village
* Maximum distance

### Flowering

* Next 7 days
* Next 30 days
* Next 60 days
* Custom date

### Farm Area

* Minimum acres

### Status

* Available
* Requested
* Booked

Results should update instantly.

Use local fake data.

---

# 13. Matching / Recommendation

Create a simple local matching algorithm.

Each farm should receive a match score based on:

* Crop preference
* Flowering period
* Distance
* Farm area
* Beekeeper availability

Example:

```text
95% Match

Mustard ✓
Flowering Date ✓
Distance ✓
Farm Area ✓
Availability ✓
```

Show the match percentage on farm cards.

This does NOT need AI.

Use a simple deterministic JavaScript scoring function.

---

# 14. Beekeeper — Send Request

On farm details page:

Button:

```text
Request This Farm
```

Open a modal/form:

Fields:

* Number of Bee Boxes
* Start Date
* End Date
* Message

Example:

```text
Bee Boxes:
20

Start:
10 Dec 2026

End:
25 Dec 2026

Message:
I would like to place 20 bee boxes
during the flowering period.
```

Submit.

Create a request in localStorage.

Show:

"Request sent successfully."

---

# 15. Beekeeper — My Requests

Show all requests.

Example:

```text
Patel Farm

20 Boxes

10 Dec – 25 Dec

Status:
Pending
```

Accepted:

```text
Status:
Accepted

Farmer:
Ramesh Patel

Contact:
9000000001
```

Rejected:

```text
Status:
Rejected
```

---

# 16. Bee Box Management

Beekeeper can manage:

* Total bee boxes
* Available bee boxes
* Currently deployed
* Available from
* Available until
* Preferred crops

Example:

```text
Total Boxes       100
Available         50
Deployed          50
```

Allow editing these values.

---

# 17. Profile

Create profiles for both roles.

Farmer:

```text
Ramesh Patel

Rajkot, Gujarat

3 Farms
2 Active Farms
```

Beekeeper:

```text
Amit Beekeeper

Rajkot, Gujarat

100 Bee Boxes
50 Available
```

Allow basic profile editing.

---

# 18. Fake Data

Seed the application with realistic fake data.

Create at least:

## Farmers

1. Ramesh Patel — Rajkot
2. Mahesh Parmar — Gondal
3. Bharat Solanki — Junagadh
4. Ketan Shah — Morbi
5. Harish Jadeja — Jamnagar

## Beekeepers

1. Amit Beekeeper
2. Patel Honey Farms
3. Gujarat Bee Services
4. Raj Bee Keepers

## Farms

Create at least 10 farms.

Example:

```text
Patel Mustard Farm
Crop: Mustard
Area: 12 acres
Location: Rajkot
Flowering: Dec 10–25

Mahesh Sunflower Farm
Crop: Sunflower
Area: 8 acres
Location: Gondal
Flowering: Nov 25–Dec 10

Bharat Guava Farm
Crop: Guava
Area: 6 acres
Location: Junagadh
Flowering: Oct 15–30
```

Make dates realistic relative to the demo.

---

# 19. Local Storage Architecture

Create a small storage utility.

Example keys:

```text
farmbee_users
farmbee_farms
farmbee_beekeepers
farmbee_requests
farmbee_session
farmbee_settings
```

Create reusable functions:

```javascript
getUsers()
getFarms()
getRequests()
saveFarm()
updateFarm()
createRequest()
updateRequest()
getCurrentUser()
setCurrentUser()
logout()
```

Do not directly use localStorage everywhere.

Centralize storage operations.

---

# 20. Reset Demo Data

Add an option in Profile or Settings:

```text
Reset Demo Data
```

When clicked:

Show confirmation.

Then restore the original fake data.

This is VERY important for demonstrations because the demo can be reset before showing it to someone.

Also add:

```text
Load Demo Scenario
```

if useful.

---

# 21. PWA Requirements

Make the application a proper PWA.

Include:

* Web App Manifest
* Service Worker
* App icons
* Installable application
* Offline shell/cache
* Standalone display mode
* Theme color
* Proper app name
* Splash/startup configuration where supported

The PWA should be called:

**FarmBee**

Short name:

**FarmBee**

Description:

"Connect farmers and beekeepers for better pollination."

The app must work after installation without requiring an internet connection for already-cached demo functionality.

---

# 22. UI Design

The design should look like a real startup product, not a college HTML project.

Use:

* Clean white/gray background
* Green as the primary agricultural color
* Yellow/golden accent for bees
* Rounded cards
* Good spacing
* Clear typography
* Responsive layouts
* Proper empty states
* Loading states where appropriate
* Toast notifications
* Confirmation dialogs
* Mobile-friendly buttons

Avoid excessive animations.

Do not over-design.

The interface should be simple enough that a farmer or beekeeper can understand it.

---

# 23. Important UX

Every major action should provide feedback.

Examples:

After adding farm:

"Farm added successfully."

After request:

"Request sent to Ramesh Patel."

After accepting:

"Request accepted."

After rejecting:

"Request rejected."

If there is no data:

"Your farms will appear here."

---

# 24. Demo Scenario

The application must support this complete demo flow:

## Step 1

Open FarmBee.

## Step 2

Login as Beekeeper.

## Step 3

See available bee boxes.

## Step 4

Open "Find Farms".

## Step 5

Filter:

```text
Crop: Mustard
```

## Step 6

Open Patel Mustard Farm.

## Step 7

See farm details.

## Step 8

Send request:

```text
20 bee boxes
```

## Step 9

Logout.

## Step 10

Login as Farmer.

## Step 11

Open Requests.

## Step 12

See Amit Beekeeper's request.

## Step 13

Accept request.

## Step 14

Logout.

## Step 15

Login again as Beekeeper.

## Step 16

See:

```text
Patel Farm
Status: Accepted
```

This complete flow MUST work without backend.

---

# 25. Code Quality

Keep the project organized.

Use reusable components:

```text
Button
Card
Modal
Input
Select
Badge
FarmCard
RequestCard
DashboardCard
Navbar
Sidebar
BottomNavigation
```

Avoid putting the entire application in one file.

Use sensible folder structure.

Keep business logic separate from UI.

Add comments only where useful.

---

# 26. No Fake Functionality

Do not create buttons that do nothing.

Every visible button must either:

* Navigate somewhere
* Open a modal
* Update local data
* Perform an action
* Show a useful message

If a feature is not implemented, don't show the button.

---

# 27. Responsive Testing

The application must work on:

* Desktop
* Laptop
* Android mobile browser
* iPhone mobile browser

The mobile interface is especially important because the eventual users are farmers and beekeepers who will primarily use phones.

---

# 28. Demo Documentation

Create a README.md containing:

## Requirements

* Node.js
* npm

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview production PWA

```bash
npm run preview
```

## Demo Accounts

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

## PWA Installation

Explain how to install the PWA from Chrome/Edge after running the production preview server.

Also explain that opening the HTML file directly with `file://` is NOT the correct way to test PWA functionality.

---

# 29. Final Requirement

Before finishing, verify the complete application from start to finish.

Test:

1. Farmer login
2. Beekeeper login
3. Farm listing
4. Farm filtering
5. Farm details
6. Request creation
7. Farmer request acceptance
8. Farmer request rejection
9. Request status update
10. LocalStorage persistence
11. Logout/login persistence
12. Reset demo data
13. Responsive UI
14. Production build
15. PWA installation
16. Offline cached shell

The final result should feel like a **real clickable startup prototype** that can be demonstrated to friends, mentors, judges, or potential users.

Do not add unnecessary enterprise features.

Focus on making the core Farmer ↔ Beekeeper workflow complete, stable, and easy to demonstrate.
