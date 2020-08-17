module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: [
          `@import "~@/styles/app.scss";`,
        ],
      },
    }
  }
};
