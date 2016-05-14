WORKOUT
  - a manager can define a workout, specifying a collection of pieces
  - users can see outstanding workouts and log results against those workouts

  Example workouts:
    - 2x22min
    - 6k
    - 2k
    - 3x4k
    - 5x5min
    - 3x20min
    - 3x25min

  Workouts have:
    - id
    - name
    - a description
    - a collection of pieces
      - may be empty, in which case users need not log it?

  They look like:
    {
      name: '2 x 22min',
      description: '...',
      pieces: [
        {minutes: 22},
        {minutes: 22},
      ]
    }

    {
      name: '3 x 4k',
      description: '...',
      pieces: [
        {meters: 4000},
        {meters: 4000},
        {meters: 4000},
      ]
    }

    {
      name: 'core circuits'
      description: '...',
    }

SCHEDULE:
  A collection of items that instance workouts with dates.
  Schedule items can override most fields in a workout.

  Entry:
    - date
    - workout-id

  A Schedule item looks like:
  {
    created_stamp_millis: 1234,
    date: 2016-01-01,
    workout_id: 'SOME_WORKOUT_ID',
  }

LOG:
  A log contains rows that connect users to a schedule
  Log rows are results. They look like
  {
    person_id: 'James Bellenger',
    schedule_id: 'SOME_SCHEDULE_ID',
    workout_id: 'SOME_WORKOUT_ID',
    weight_kilos: 60.3,
    stamp_millis: 12345,
    entries: [
      {time_millis: 123},
      {time_millis: 456},
    ],
  }


QUERIES:
  - as a user, show me the upcoming schedule
  - as a user, show me scheduled workouts that I haven't logged
