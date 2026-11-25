# anthonygasparro.com

Portfolio site for production designer Anthony Gasparro. Plain static HTML, CSS and
JavaScript, published with GitHub Pages from this repository (`CNAME` sets the domain).
There is no build step: what is in the repo is what is served.

## Layout

```
index.html, films.html, commercials.html, stills.html, more.html, contact.html
film-stills.html        "Under construction" page; not linked, marked noindex
css/site.css            shared styles: fonts, base, header, footer, navigation
css/home.css            home page only
css/gallery.css         films / commercials / set stills
css/contact.css         contact page only
css/vendor/             Bootstrap 4.3.1, cut down to the rules the site uses
js/site.js              mobile menu, back-to-top button, shared helpers
js/gallery.js           thumbnail grid + player (films, commercials, set stills)
js/more.js              the "+" page gallery
js/films.js, commercials.js, stills.js     CONTENT: the lists shown on each page
js/image-manifest.js    generated, see "Images"
fonts/                  Outfit, Noto Serif Italic, and a 3-icon Font Awesome subset
img/                    original images, plus img/optimized/ (generated)
favicon/
robots.txt, sitemap.xml
tools/                  helper scripts (not published)
_archive/               old and source files (not published; see below)
```

## Editing content

- **Films / commercials**: edit the list in `js/films.js` or `js/commercials.js` and put
  the thumbnail in `img/video_thumbnails/`.
- **Set stills**: edit `js/stills.js`; images live in `img/stills/` and
  `img/stills/thumbnails/`.
- **"+" page**: add `img/more/60.jpeg`, ... and raise `GALLERY_SIZE` in `js/more.js`.
- After the commercials or films list changes, the `<meta name="description">` at the
  top of that page names a few titles/brands and may need a matching edit.
- A new page should also be added to `sitemap.xml`.

## Images

Pages do not load the originals in `img/`. They load resized WebP copies from
`img/optimized/`, looked up through `js/image-manifest.js`. After adding or replacing
an image, regenerate both with:

```bash
python3 tools/optimize-images.py
```

(needs Pillow: `pip install pillow`). If you skip this, the new image still shows,
because the pages fall back to the original file; it is just heavier.

## Local preview

```bash
python3 tools/serve.py
```

then open http://localhost:8765. This behaves like GitHub Pages (`/films` serves
`films.html`). Plain `python3 -m http.server` also works, but only with `.html` URLs.

## Things to know

- **Bootstrap subset.** `css/vendor/bootstrap-4.3.1.subset.css` only contains the
  Bootstrap classes the site uses today. If you use a new Bootstrap class and it has no
  effect, replace the file with the full `bootstrap.min.css` 4.3.1 or regenerate the
  subset: `npx purgecss --css bootstrap.min.css --content "*.html" "js/*.js" --output css/vendor/`.
- **Not published.** GitHub Pages skips folders starting with `_` (so `_archive/`), and
  `_config.yml` excludes `tools/` and this README.
- **Analytics.** Every page carries a Google Analytics tag with the old Universal
  Analytics ID `UA-90328546-6`. Universal Analytics stopped processing data in 2023.
  Google's script currently forwards it to a GA4 ID (`G-VP45898ZQY`), so check in Google
  Analytics whether that property is receiving data, then either switch the tag to the
  GA4 ID or remove it. It is the heaviest script on the site.

## Known quirks (kept on purpose, behaviour is unchanged from the original site)

- In the player, opening the first or last item by clicking its thumbnail still shows
  both arrows; an arrow only hides after it has been pressed at the end of the list.
  On the video pages the mobile arrows never hide.
- Each film/commercial has a `padding` value (its aspect ratio) that is never applied:
  the video frame is always 4:3, so 16:9 videos are letterboxed.
- `films.html` has no back-to-top button; the other long pages do.
