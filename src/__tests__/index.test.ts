import HtmlWebpackPluginDjango from "../index";

test("reads options correctly", () => {
  const plugin = new HtmlWebpackPluginDjango({ bundlePath: "webpack-static" });
  expect(plugin.options).toStrictEqual({ bundlePath: "webpack-static" });

  const plugin2 = new HtmlWebpackPluginDjango();
  expect(plugin2.options).toStrictEqual({ bundlePath: "" });
});

test("transforms links into Django static tags", () => {
  const plugin = new HtmlWebpackPluginDjango({ bundlePath: "" });
  expect(plugin.transformLink("/static/dist/index.css", "/static/")).toBe(
    "{% static 'dist/index.css' %}"
  );
  expect(plugin.transformLink("/static/dist/index.css", "/")).toBe(
    "{% static 'static/dist/index.css' %}"
  );
  expect(plugin.transformLink("not-a-match", "/")).toBe("not-a-match");
  expect(plugin.transformLink(null, "/")).toBe(null);
});
