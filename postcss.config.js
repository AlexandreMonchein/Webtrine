import postcssCustomMedia from "postcss-custom-media";

export default {
  plugins: [
    postcssCustomMedia({
      importFrom: "./src/custom-media.css",
    }),
  ],
};
