var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");


var Definition = React.createClass({    
    mixins: [StateMixin],
    save: function(cb) {
      var rfqId = getId(window.location.hash);
      data = {"definitions": this.state.definitions};
      put_data(1, rfqId, data, cb);
    },
    // React functions
    getInitialState: function(){
      return {
        definitions: "",
      };
    },
    componentDidMount: function() {
      var rfqId = getId(window.location.hash);
      get_data(1, rfqId, function(data){
        console.log(data);
        this.setState({
          definitions: data["data"]["definitions"],
        });
      }.bind(this));
    },

    render: function() {
        return (
            <div>
                <div className="main-heading">Definitions</div>
                <p>These are the standard definitions for agile development terms in alignment with the USDS Playbook. You can also modify the definitions and add additional terms. When you are done click the "Next" button at the bottom of the page.</p>
                <EditBox
                    text={this.state.definitions}
                    editing={this.state.edit === 'definitions'}
                    onStatusChange={this.toggleEdit.bind(this, 'definitions')}
                    onTextChange={this.handleChange.bind(this, 'definitions')}>
                </EditBox>

            </div>
        );
    },
});

module.exports = Definition;