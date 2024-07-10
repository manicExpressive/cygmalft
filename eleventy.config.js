// Import prior to `module.exports` within `.eleventy.js`
import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("nicerDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS);
  });
}
