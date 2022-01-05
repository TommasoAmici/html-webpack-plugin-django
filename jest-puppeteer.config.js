module.exports = {
  server: {
    command: process.env.CI
      ? "python example/manage.py runserver"
      : "example/venv/bin/python example/manage.py runserver",
    port: 8000,
  },
  launch: {
    headless: true,
  },
};
