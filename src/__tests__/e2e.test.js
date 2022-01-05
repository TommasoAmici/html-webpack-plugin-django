describe("Django runserver", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:8000");
  });

  it('should display "hello world" on page', async () => {
    await expect(page).toMatch("Hello world");
  });

  it("should display a red square on page", async () => {
    const div = await page.$("div.red-square");
    await expect(div).toBeTruthy();
  });
});
