model: repeated pieces
field: move LogTableFields to components/LogTable
linegraph: line labels
linegraph: repeated pieces
sparkline: remove/deprecate
fix ":local rect" css poisoning
person/piece-type sparkline
piece/multi-people distribution
fix LogTable/Table 'cols' prop warning 
log query wizard
log comparisons
repeating piece types
field editing
record entry
data sync
figure out where racingage fits into logevent
figure out queries to replicate spreadsheet functionality
similar piece comparison view
query editor persists query between component mounts
smart table columns
smart query errors
eslint airbnb rules: https://www.npmjs.com/package/eslint-config-airbnb
decorator support
smarter filtering
figure out a story for user identity
figure out a story for rower identity
flesh out user stories
db state storage
integrate redux-devtools
git lint/test hooks
a11y
styling
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
