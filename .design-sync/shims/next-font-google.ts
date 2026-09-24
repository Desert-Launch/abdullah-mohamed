// Stand-in for next/font/google in the design-sync bundle. next/font is a
// build-time transform that only exists inside `next build`; here the
// families ship as plain @font-face (.design-sync/fonts/fonts.css) and
// --font-sans / --font-cairo are defined on :root by the generated stylesheet
// (.design-sync/build.mjs), so the loaders only need the right shape.
type FontOptions = {
  subsets?: string[];
  weight?: string | string[];
  variable?: string;
  display?: string;
};

function loader(family: string) {
  return (_options: FontOptions = {}) => ({
    className: "",
    variable: "",
    style: { fontFamily: `"${family}"` },
  });
}

export const DM_Sans = loader("DM Sans");
export const Cairo = loader("Cairo");
