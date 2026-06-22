# Whitepage Sports Consult GH — Website

A multi-page website for Whitepage Sports Consult GH (football management, sports kits, and local/international match organisation).

## Pages
- `index.html` — Home
- `services.html` — Services
- `team.html` — Management / Team
- `shop.html` — Shop (e-commerce style with cart drawer & filters)
- `gallery.html` — Gallery
- `projects.html` — Projects
- `contact.html` — Contact

## Replacing the Logo / Favicon
1. Open the `images/` folder.
2. Replace `logo.png` with your exact logo file (the circular Whitepage Sports Consult GH crest), keeping the filename **logo.png** (or update all references in the HTML files if you rename it).
3. Replace `images/favicon.png` with a square version of your logo for the browser tab icon.

A placeholder badge has been included so the site works immediately — swap it out with your real logo image.

## Hero Background Images
- `images/hero/home-hero-bg.jpg` — background for the Home page hero (recommended 1920x1080px, players in action / stadium shot).
- `images/hero/page-hero-bg.jpg` — shared background for the smaller page headers on Services, Management, Shop, Gallery, Projects and Contact (recommended 1920x1080px).

Both currently contain placeholder images labelled "ADD BACKGROUND IMAGE" — replace them with your own photos (same filenames) and the dark navy/green overlay will automatically apply on top for text legibility.

## Service Icons (Spectrum of Sports Management)
On the Services page (and the Home page preview), each service card uses a small square image instead of an emoji icon. These live in `images/icons/`:
- `player-management.jpg`
- `boxing.jpg`
- `match-org.jpg`
- `transfers.jpg`
- `kits.jpg`
- `media.jpg`
- `finance.jpg`
- `welfare.jpg`
- `scouting.jpg`

Recommended size: 300x300px (square). Replace each placeholder with a relevant photo or icon graphic — they display inside a circular frame.

## Contact Details
- All enquiry emails go to: **ezekiels5050@gmail.com** (footer, contact page, and the contact form which opens a pre-filled email).
- WhatsApp number: **+233 50 062 7136** — used for the footer link and the floating WhatsApp button visible on every page (bottom-left).

## Adding Your Own Images
Every spot where an image should go is marked with a dashed-border placeholder box that says **"Add Image"** along with the recommended size, e.g.:

```html
<div class="img-placeholder">
  Add Image<span>800x500px</span>
</div>
```

To add a real photo, replace that placeholder `div` with an `<img>` tag, e.g.:

```html
<img src="images/players/player1.jpg" alt="Player Name" style="border-radius:10px; width:100%;">
```

Suggested folders are already created inside `images/`:
- `images/players/`
- `images/team/`
- `images/gallery/`
- `images/projects/`
- `images/shop/`

## Shop / E-commerce
- Products are listed in `shop.html`. Each product card has an "Add to Cart" button.
- The cart uses `localStorage` (saved in the visitor's browser) — no backend required for the demo.
- The "Checkout" button currently shows a demo alert. To accept real payments, connect a gateway such as **Paystack**, **Flutterwave**, or **Stripe**, and wire it into the `checkout-btn` handler in `js/main.js`.
- Filter buttons let visitors filter products by category (Jerseys, Training Kits, Boots, Accessories).

## Customising Colors / Fonts
All design tokens (colors, fonts, spacing) are defined at the top of `css/style.css` inside the `:root { ... }` block. Update these variables to adjust the theme site-wide.

## Animations
- Scroll-reveal fade/slide-in animations on each section (powered by `IntersectionObserver` in `js/main.js`).
- Smooth sticky header that becomes solid on scroll.
- Subtle floating glow effects and scrolling marquee on the homepage.
- Respects users' "reduce motion" accessibility setting.

## Running Locally
Just open `index.html` in a browser, or use a local server (e.g. VS Code's "Live Server" extension) for the best experience with smooth navigation between pages.

## Contact Form
The contact form on `contact.html` opens the visitor's email client with a pre-filled message addressed to **ezekiels5050@gmail.com**. For a fully automated experience (no email client required), connect it to a service like Formspree or EmailJS.

---

**Founder & CEO:** Philip White
**Tagline:** "Players Hub"
