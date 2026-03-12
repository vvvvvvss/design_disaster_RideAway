# RideAway: The Ultimate UX Disaster

Welcome to **RideAway**, a cab-booking application meticulously engineered to be the worst possible experience for a human being. This project is a functional "Hall of Shame" that demonstrates how to break every fundamental law of User Experience (UX) and User Interface (UI) design.

---

## The "Drama" Feature Set

RideAway doesn't just have bugs; it has **deliberate psychological traps**:

* **The Teleporting Driver:** A real-time tracking map where the driver jumps randomly across the city, providing zero useful feedback.
* **The "Sike" Discount:** A pop-up that promises 90% off but actually adds a ₹5000 "Convenience Surcharge" upon clicking.
* **The Moving Target:** A "Close" button for ads that physically runs away from your mouse cursor using `onMouseEnter`.
* **Ride-Type Gaslighting:** If you select an 'Auto' (budget), the system silently upgrades you to a 'Car' (expensive) without consent.
* **Financial Ambush:** The checkout system displays a reasonable fare but charges the user 100x that amount in the background.

---

## UX Law Violations

We have successfully violated the following scientific principles of design:

### 1. Fitts’s Law
> *The time to acquire a target is a function of the distance to and size of the target.*
* **Violation:** The "Close" button on the discount modal is only 8px wide and moves its position every time the user attempts to hover over it. This makes target acquisition mathematically impossible for most users.

### 2. Jakob’s Law
> *Users spend most of their time on other sites. They prefer your site to work the same way as all the other sites they already know.*
* **Violation:** We broke the mental model of a booking app. Navigation links are mislabeled (e.g., "Settings" leads to Home), and the component structure is named after a restaurant app (`RestaurantList`, `MenuBrowser`) to confuse both users and developers.

### 3. The Doherty Threshold
> *Productivity soars when a computer and its users interact at a pace (<400ms) that ensures neither has to wait on the other.*
* **Violation:** The "Scam Success" UI uses artificial delays and fake loading bars to keep the user in a state of "System Anxiety," making them wait 5+ seconds for a simple confirmation.

### 4. Hick’s Law
> *The time it takes to make a decision increases with the number and complexity of choices.*
* **Violation:** By providing overlapping, poorly defined ride categories (Auto vs Car vs Premium) and then switching them mid-flow, we increase cognitive load and decision paralysis.

### 5. Visibility of System Status (Nielsen Heuristic)
> *The system should always keep users informed about what is going on.*
* **Violation:** The tracking map provides "unreliable points." The driver pin moves randomly, and the status ticker alternates between "Approaching" and "Lost in Space," giving the user zero actual information.

---

## Tech Stack (The "Spaghetti" Edition)

* **React:** Used to manage the chaotic state of a disappearing "Close" button.
* **CSS:** Specifically crafted for visual noise (Neon yellows, dashed lime borders, and red text).
* **Malice:** 100% pure, unadulterated intent to frustrate.

## Installation

1.  Clone this repository.
2.  Run `npm install`.
3.  Run `npm start`.
4.  Prepare to be annoyed.

---

**DISCLAIMER:** This is an educational project. Do not use these patterns in real-world applications unless you want to be hunted down by the UX Police.
esk-uayq-pwx
