const { test } = require("@playwright/test");

test("Open website", async ({ page }) => {
  await page.goto(
    "https://www.youtube.com/watch?v=RR5Y_b9VajM&list=RDRR5Y_b9VajM&start_radio=1",
    { timeout: 60000, waitUntil: "networkidle" }
  );

  await page.addScriptTag({
    content: require("./single-file-bundle").script,
  });

  const htmlResult = await page.evaluate(async () => {
    const { content } = await singlefile.getPageData({
      removeHiddenElements: false,
      removeUnusedStyles: false,
      removeUnusedFonts: false,
      removeImports: false,
      blockScripts: true,
      blockAudios: true,
      blockVideos: true,
      compressHTML: false,
      removeAlternativeFonts: false,
      removeAlternativeMedias: false,
      removeAlternativeImages: false,
      groupDuplicateImages: false,
      insertSingleFileComment: true,
      filenameTemplate: "{date-iso}_{time-locale}.html", // also available: {page-title}
    });

    return {
      htmlContent: content,
    };
  });

  console.log(htmlResult)

  await page.screenshot({ path: "screenshot.png", fullPage: true });
});
