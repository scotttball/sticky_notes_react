var Note = React.createClass({
  getInitialState: function() {
    return { notes: this.props.notes}
  },

  getDefaultState: function() {
    return { notes: [] }

  },

  showAddForm: function() {
    this.setState({showAdd: !this.state.show/Add});
  },


  addNoteName: function(e) {
    this.setState({noteName: e.currentTarget.value});
  },

  submitNote: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/notes',
      type: 'POST',
      data: {note: {name: this.state.noteName}},
      success: function(data) {
        var notes = self.state.notes;
        notes.push({name: data.name, completed: data.complete});
        self.setState({notes: notes, showAdd: false, noteName: null});
      }
    });
  },

  displayNotes: function() {
    var notes = [];
    for(var i = 0; i < this.state.notes.length; i++){
      notes.push(<li>
                  <div className='row'>
                    <div className='col s10'>
                     {this.state.notes[i].name}
                    </div>  
                    <div className='col s2'>
                      <input type='checkbox' checed={this.state.notes[i].complete} />
                      <label>Complete?</label>
                    </div>
                  </div>
                  </li>);
    }
    return notes;
  },

  render: function() {
    return(<div>
             <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Note</a>
             {this.addNoteForm()}
             <div className='card blue-grey darken-1'>
              <div className='card-content white-text'>
                <span className='card-title'>To Do</span>
                {this.displayNotes()}
              </div>
             </div>
           </div>);
  }


});