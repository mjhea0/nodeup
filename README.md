# Nodeup

An app to manage daily coding warmup exercises. Powered by NodeJs.

- Run: `gulp`
- Test: `make test`

## User Workflow

1. User authenticates via Github
1. User pays via Stripe
1. Upon payment, the end user is presented with a list of ALL exercises (categorized, easily sortable)
1. When the user clicks a specific exercise, the problem is presented

> If user does not pay, s/he can only view 5 exercises. And is reminded via a modal to upgrade.

## Templating Documentation

https://github.com/paularmstrong/swig/tree/master/docs/layouts

## To do

1. Convert to SQL/Postgres
1. Refactor app.js
1. Refactor routes/
1. CSS/JS minification for production (via gulpfile)
1. Theme/Make pretty
1. Add unit tests
1. Add integration tests
1. Mock Stripe
1. Test coverage (with istanbul)
1. CI via Travis-CI
1. Add test runner to Gulpfile
1. Add dummy data creation/deletion to Gulpfile
1. Refactor into an API
1. Handle *all* the errors
1. Angular
1. Flash messaging w/ connect-flash
1. Add other forms of authentictation