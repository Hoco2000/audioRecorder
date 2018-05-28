import React from "react";
import "./postWord.css" ;
import AudioRecording  from "../audioRecording/audioRecording"
import Axios from "axios";
// import Bird from "../audioRecording/sounds/birds.mp3";
class PostWord extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      word: "",
      definition: "",
      audioRecorded :[]
    }
    this.audioRecording= React.createRef();
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name] : e.target.value});
 }

 handleSubmit(e){
   e.preventDefault();

   Axios.post("/api/words",{
                           "word":this.state.word,
                           "definition":this.state.definition,
                           "sound":this.state.audioRecorded
                         })
  // .then((res) => res.json())
   .then((data) => console.log(data))
  //pass submitted value to true in order to declench allDelete function

    this.setState({
        word : "",
        definition:""
    })
    alert("Message sent, congratulation =)")
    this.audioRecording.current.deleteAll();


 }

render() {
    return (
      <form onSubmit={this.handleSubmit}>
            <label className="formLabel" htmlFor="word"> Enter a word </label>
            <input
              name="word"
              id="word"
              value={this.state.word}
              placeholder="enter a word"
              type="text"
              onChange={this.handleChange}
              />

            <label className="formLabel"
              htmlFor="definition"> Enter a definition
            </label>
            <textarea
              name="definition"
              value={this.state.definition}
              id="definition"
              cols="30"
              rows="10"
              onChange={this.handleChange}
              ></textarea>

            <label
              className="formLabel"
              htmlFor="audioRecord">
              Enter your audio record of the word
            </label>


            <AudioRecording audioRecorded={this.state.audioRecorded} ref={this.audioRecording} name="audioRecorded"/>


            <input className="formLabel" id="submit" type="submit" name="Submit" value="Submit"/>
      </form>
    )
}
}
export default PostWord
