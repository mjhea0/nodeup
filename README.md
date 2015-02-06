# Nodeup

An app to manage daily coding warmup exercises. Powered by Node. Inspired by DBC's Socrates.

## User Workflow

1. User authenticates via Github
1. User pays via Stripe
1. Upon login, the end user is presented with a list of exercises (categorized, easily sortable)
1. When the user clicks a specific exercise, the problem is presented

## Schema

1. One *user* can post multiple *solutions* (1:M)
1. One *problem* can have multiple *solutions* (1:M)

## Templating Documentation

https://github.com/paularmstrong/swig/tree/master/docs/layouts

## To do

1. Convert to SQL/Postgres
1. Refactor app.js, routes
1. CSS/JS minification for production (via gulpfile)
1. Theme/Make pretty
1. Testing
1. Test coverage
1. CI via Travis-CI
1. Add test runner to Gulpfile
1. Add dummy data creation/deletion to Gulpfile
1. Refactor into an API
1. Handle *all* the errors
1. Angular
1. Flash messaging w/ connect-flash