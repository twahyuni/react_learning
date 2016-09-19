// HIERARCHY based on app's UI
// ===========================================================================
// COMPONENTS                 | DESCRIPTION                   | STATES
// ===========================================================================
// TimersDashboard            : common owner                  : isOpen
//   EditableTimerList        : list of timers                : Timer properties
//     EditableTimer          : toggle between edit or show   : editFormOpen
//        TimerForm           : edit version                  : -
//        Timer               : show version                  : -
//          TimerActionButton : elapsed time function         : -
//   ToggleableTimerForm      : create new timer
//     TimerForm              : new create form

// DEVELOPMENT PATTERN
  // break app into components
  // build static version of app
  // determine what should be stateful
    // https://facebook.github.io/react/docs/thinking-in-react.html
    // Is it passed in from a parent via props? If so, it probably isn't state.
    // Does it remain unchanged over time? If so, it probably isn't state.
    // Can you compute it based on any other state or props in your component? If so, it isn't state
  // determine in which componenct each piece of state should live
  // hard code initial states
  // add inverse data flow
  // add server communication

// FLOW
  // SHOW LIST OF TIMERS
  // --------------------------------------------------
  // TimersDashboard: getInitialState
  // TimersDashboard: render
  // EditableTimerList: render AND ToggleableTimerForm: render
    // EditableTimer: render
      // TimerForm: render (editFormOpen true)
      // Timer: render (editFormOpen false)
    // TimerForm: render (ToggleableTimerForm isOpen: true)
    // ToggleableTimerForm: render plus icon (ToggleableTimerForm isOpen: false)

  // CREATE NEW TIMER
  // --------------------------------------------------
  // ToggleableTimerForm: getInitialState (isOpen: false)
  // ToggleableTimerForm: handleFormOpen (isOpen: true)
  // ToggleableTimerForm: render
  // TimerForm: render, check if id exist? (false) so render create button
    // TimerForm: render (create)
      // TimerForm: handleSubmit
      // ToggleableTimerForm: handleFormSubmit (isOpen: false)
      // TimersDashboard: handleCreateFormSubmit (ToggleableTimerForm onFormSubmit)
      // TimersDashboard: createTimer
      // TimersDashboard: render
    // TimerForm: render (cancel)
      // ToggleableTimerForm: handleFormClose (isOpen: false)

  // UPDATE TIMER
  // --------------------------------------------------
  // Timer: render (onClick={this.props.onEditClick})
  // EditableTimer: render Timer (onEditClick={this.handleEditClick})
  // EditableTimer: handleEditClick
  // EditableTimer: openForm (editFormOpen: true)
  // EditableTimer: render
    // TimerForm: render, check if id exist? (true) so render update button
      // TimerForm: render (update)
        // TimerForm: handleSubmit
        // EditableTimer: closeForm (editFormOpen: false)
        // EditableTimer: handleSubmit
        // TimersDashboard: handleEditFormSubmit (EditableTimerList onFormSubmit)
        // TimersDashboard: updateTimer
        // TimersDashboard: render
      // TimerForm: render (cancel)
        // EditableTimer: handleFormClose
        // EditableTimer: closeForm (editFormOpen: false)

  // DELETE TIMER
  // --------------------------------------------------
  // Timer: render (onClick={this.handleTrashClick})
  // Timer: handleTrashClick (passed id to EditableTimer)
  // EditableTimer: render (onTrashClick={this.props.onTrashClick})
  // EditableTimerList: render (onTrashClick={this.props.onTrashClick})
  // TimersDashboard: render (onTrashClick={this.handleTrashClick})
  // TimersDashboard: handleTrashClick (take in timerId)
  // TimersDashboard: deleteTimer

  // ELAPSE TIME
  // --------------------------------------------------
  // TimerActionButton: render
    // TimerActionButton: render Stop (onClick={this.props.onStopClick})
      // Timer: handleStopClick (passed id to EditableTimer)
      // EditableTimer: render (onStopClick={this.props.onStopClick})
      // EditableTimerList: render (onStopClick={this.props.onStopClick})
      // TimersDashboard: render (onStopClick={this.handleStopClick})
      // TimersDashboard: handleStopClick
      // TimersDashboard: stopTimer
    // TimerActionButton: render Start (onClick={this.props.onStartClick})
      // Timer: handleStartClick (passed id to EditableTimer)
      // EditableTimer: render (onStartClick={this.props.onStartClick})
      // EditableTimerList: render (onStartClick={this.props.onStartClick})
      // TimersDashboard: render (onStartClick={this.handleStartClick})
      // TimersDashboard: handleStartClick
      // TimersDashboard: startTimer