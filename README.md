# Naad Leela — static website

Plain HTML, CSS and a single small JS file. No build step, no dependencies.
Open `index.html` in a browser, or upload the whole folder to any host
(Netlify, Vercel, GitHub Pages, cPanel, Hostinger — all work as-is).

## Folder structure

```
naad-leela-site/
├── index.html          Homepage
├── services.html       4 services
├── courses.html        3 courses
├── about.html          Story, mission, founder, certifications, contact
├── privacy.html        Privacy policy
├── css/
│   └── styles.css      All styling (colour theme lives at the top in :root)
├── js/
│   └── main.js         Menu, scroll reveal, testimonial slider, booking modal
└── images/             <-- PUT YOUR PHOTOS HERE (see list below)
```

## Where to put your images

Drop files into `images/` using **exactly these names** and they appear
automatically. Until a file exists, the site shows a labelled dashed
placeholder in its place — nothing breaks.

| File | Used on | Suggested size |
| --- | --- | --- |
| `logo.png` | Header, footer, statement band (already included) | 600 × 600, square |
| `hero.jpg` | Homepage hero | 1200 × 1500 (portrait) |
| `testimonial-1.jpg` … `testimonial-4.jpg` | Testimonial avatars | 300 × 300, square, face centred |
| `service-1.jpg` | 1:1 Healing Session | 1200 × 750 |
| `service-2.jpg` | Sound Bath | 1200 × 750 |
| `service-3.jpg` | Chakra Healing | 1200 × 750 |
| `service-4.jpg` | Vibro-Acoustic Massage | 1200 × 750 |
| `course-1.jpg` | Sound Healing course | 1200 × 675 |
| `course-2.jpg` | Energy Healing course | 1200 × 675 |
| `course-3.jpg` | Tuning Fork Therapy course | 1200 × 675 |
| `founder.jpg` | About page portrait | 1000 × 1250 (portrait) |

Want a different filename? Change the `src` on the `<img>` **and** the
`data-label` on its `<figure class="slot">` in the page.

## Changing the colours

Everything reads from CSS variables at the top of `css/styles.css`:

```css
:root{
  --plum:      #4A1032;  /* primary maroon */
  --plum-deep: #2E0A1E;  /* footer */
  --wine:      #6E1230;  /* secondary maroon */
  --gold:      #B98436;  /* brand gold */
  --cream:     #FCF2E7;  /* page background */
  --sand:      #F7E7D6;  /* alternate background */
}
```

Change those six and the whole site follows.

## Changing text and prices

All copy is plain HTML in the page files — edit in any text editor.
Services live in `services.html`, courses in `courses.html`, testimonials
in `index.html` inside `<div class="t-track">`.

## Hooking up the booking form

`js/main.js`, section 5, has a marked spot inside the `submit` handler:

```js
/* ---- Hook up your backend / form service here ---- */
```

Drop in a `fetch()` to your API, or swap the `<form>` for a Formspree /
Google Form / WhatsApp link. Right now it validates and shows the
confirmation panel.

## Responsive behaviour

- **< 1000px** — single column, hamburger menu, one testimonial per view.
- **≥ 720px** — two-column grids, two testimonials per view.
- **≥ 1000px** — inline desktop navbar, two-column hero and practice section,
  three-column benefits and courses, three testimonials, centred booking dialog.

## Contact details to update

Phone `+91 90110 09613`, email `hello@naadleela.in` and the studio address
appear in the footer (all pages) and on `about.html`. Search and replace.
