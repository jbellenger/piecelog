move models functions to redux selectors?
separate formatters for table vs graphs
graph: draw mean time with a distinct style
combine graphs+tables with a composite component
victory: sort graph with same criteria as table
victory: workout graph: draw vertical scatter+line for each event. Draw mean.
victory: colorize people and events
victory: consolidate graphs
victory: toggleable data series (with animation)
victory: test separating formatters for graph/table
WorkoutTable: how to show count of how many events?
results-table: conditionally include mean entry
linegraph: line labels
linegraph: repeated pieces
fix ":local rect" css poisoning
person/piece-type sparkline
piece/multi-people distribution
field editing
record entry
data sync
figure out queries to replicate spreadsheet functionality
eslint airbnb rules: https://www.npmjs.com/package/eslint-config-airbnb
decorator support
smarter filtering
figure out a story for user identity
figure out a story for rower identity
db state storage
integrate redux-devtools
git lint/test hooks
a11y
styling:
  fonts/spacing/colors/footer: https://zeit.co/blog/async-and-await
  gradients: https://lernajs.io/
hosting: zeit now, aws lambda, gcp, heroku
deployment
sentry?

# webpack-dev-server
# router: page switching
  App needs to render children
# router: deep linking
  pass --history-api-fallback to webpack-dev-server
# linting
# redux
# api server
# data-loading from api
# production build
# fine-grained data loading: client
# fine-grained data serving: server
# breakpointable source maps
  use dev-tool: 'source-map'. Previous 'eval-source-map' would
  not fire breakpoints
# move bootstrap api munging to client
# table height sizing
# FlexSizing component: fill width and height, handle window resize
  have to zero-out dimensions before remeasuring on resize
# debounce window resizing
# unbind window resizing: find a helper lib
  WindowResizeListener
# rename bootstrap api
# tests
# fix alasql/webpack loading
# query experimentation: alasql, jsinq, breeze, jbj
# migrate plumbing: log -> query
# query editor w/ preview
# clickable example queries
# person racing DOB
# table headers
# remove fixed-data-table?
# person model
# calculated fields
# value formatting
# person DOB
# migrate query editor to use new views
# easier syntax for querying computed fields: LogTableContainer/Piece.View/Person.View
# fix alasql
# sortable columns
# fix person/piece views
# sort direction indicator
# unify log queries into a component
# piece-type view
# graphing: remove plotly, try react-boxplot or react-d3
# piece type view
# piece-type: summary stats
# sparkline: fix compressed x-positions
# linegraph: rendering
# linegraph: fix coordinate system
# linegraph: draw lines
# linegraph: clickable point/line
# evaluate path-svg: https://www.npmjs.com/package/path-svg
# linegraph: fix zoom level
# linegraph: pull out Point component, then do labels
# linegraph: this is turning into a lot of work. revisit using react-d3
# linegraph: this is turning into a lot of work. Revisit issues with using user-space coordinates and viewBoxes
# linegraph: use consistent shape for rect, viewBox, and ranges used in geom.scale
# linegraph: change geom.coords to be usable by Axis
# linegraph: axes
# linegraph: extract line component
# linegraph: labels
# rename cols to fields?
# flesh out user stories
# sparkline: remove/deprecate
# resulttable: fix layout of 'sub-table' columns
# model: repeated pieces
# logtable: adapt for use with results
# repeating piece types
# figure out where racingage fits into logevent
# sortable ResultsTable
# results table: include mean values in extracted array
# figure out where RESULT_ENTRY fields belong
# smart query errors
# smart table columns
# person view: fix up bad cell collapsing
# remove dep on alasql
# person view: investigate why misc-6k pieces are erroneously grouped by date
# importer: remove log entries
# remove query editor
# field: move LogTableFields to components/LogTable
# model: cleanup importer legacy objects, piece
# revisit d3 for charting
# test Victory charts with inverted y axis
# fix weird growing precision on victory chart y-ticks
# victory: calculate y-domain
# victory: test with multi-piece workouts
# import-spreadsheet: investigate missing 5x1k users (me, don)
#   - result objects are missing event_id
#   - my/dons 1k entries are showing up under 6k
# victory: event graph
# victory: set tick label angles
# re-evaluate d3
# importer: prune gregs dnf 6k, chases unweighted 6k
# bad adjustments: http://127.0.0.1:8080/event/1450483200000
# use ScatterLine in EventView
# use ScatterLine in PersonView
