// Import prior to `module.exports` within `.eleventy.js`
import { DateTime } from "luxon";
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./_components/**.*");
  eleventyConfig.addPlugin(pluginWebc, {
    components: "_components/**/*.webc",
  });
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("open-graph.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addFilter("nicerDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(
      DateTime.DATETIME_HUGE_WITH_SECONDS,
    );
  });
}
