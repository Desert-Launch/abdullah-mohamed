# app/fonts

TrueType copies of the site's two faces, checked in for **social-card
rendering only**.

`app/lib/og.tsx` renders the OG images through satori (`next/og`), which runs
outside the browser and cannot use `next/font`. With no font supplied it falls
back to a generic sans — the card would be typeset in a face the site never
uses, and Arabic would come out as blank boxes.

- `DMSans-Regular.ttf`, `DMSans-Medium.ttf` — Latin (`--font-sans`)

SIL Open Font License 1.1, from Google Fonts.

No Arabic face here on purpose: satori reverses the word order of Arabic text
runs, so the cards are Latin-only and `/ar` shares the English one. Shipping
Cairo would only buy a scrambled card.

The **web** fonts are unrelated: they still come from `next/font/google` in
`app/lib/site.tsx`. If the site's typeface ever changes, change it there and
drop the matching TTF here so the cards follow.
