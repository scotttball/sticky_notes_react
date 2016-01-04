var Note = React.createClass({
  getInitialState: function() {
    return { notes: this.props.notes}
  },

  getDefaultState: function() {
    return { notes: [] }

  },

  showAddForm: function() {
    this.setState({showAdd: !this.state.showAdd});
  },


  addNoteTitle: function(e) {
    this.setState({noteTitle: e.currentTarget.value});
  },

  addNoteDescription: function(e) {
    this.setState({noteDescription: e.currentTarget.value});
  },

  submitNote: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/notes',
      type: 'POST',
      data: {note: {title: this.state.noteTitle, description: this.state.noteDescription}},
      success: function(data) {
        var notes = self.state.notes;
        notes.push({title: data.title, description: data.description});
        self.setState({notes: notes, showAdd: false, noteTitle: null});
      }
    });
  },

  addNoteForm: function() {
  if(this.state.showAdd) {
    return(<div>
            <form onSubmit={this.submitNote}>
              <div className='input-field'>
                <input autoFocus='true' placeholder='Note Title' type='text' onChange={this.addNoteTitle} />
                <input placeholder='Note Description' type='text' onChange={this.addNoteDescription} />
                <button className='btn waves-effects' type='submit'>Submit</button>
              </div>
            </form>
           </div>);
    }
  },

  displayNotes: function() {
    var notes = [];
    for(var i = 0; i < this.state.notes.length; i++){
      notes.push(<div className='col m3'>
                    <div className='card yellow darken-2'>
                      <div className='card-title white-text center'>
                      {this.state.notes[i].title}
                      </div>
                      <div className='card-content'>
                       {this.state.notes[i].description}
                      </div>
                    </div>
                  </div>
                    );
    }
    return notes;
  },

  render: function() {
    return(<div>
             <div className='card blue-grey darken-1'>
              <div className='card-content white-text'>
                <span className='card-title'>Sticky Notes</span><br />
                <a className='waves-effect waves-light btn right-align' onClick={this.showAddForm}>Add Note</a>
                {this.addNoteForm()}
              </div>
             </div>
             <div className='row'>
             {this.displayNotes()}
             </div>
           </div>);
  }


});