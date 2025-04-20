# gideon
System for managing gideon employees

# deployment notes

- need to setup cron job to create slots from default slots
  - should run every day
  - send a POST request with no body/headers to /api/slots/generate
