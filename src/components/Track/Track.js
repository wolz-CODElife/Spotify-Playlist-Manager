
import React from 'react'
import './Track.css'

class Track extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            track: this.props.track
        }

        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)        
    }

    addTrack(){
        this.props.onAdd(this.props.track)
    }

    removeTrack(){
        this.props.onRemove(this.state.track)
    }

    renderAction(){
        if (this.props.isRemoval) {
            return (
                <button className="Track-action" onClick={this.removeTrack}> - </button>
            )
        }
        return (
            <button className="Track-action" onClick={this.addTrack}> + </button>
        )
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>
                        {this.props.track.artist} | {this.props.track.album}
                    </p>
                    <iframe 
                        src={"https://open.spotify.com/embed/track/" + this.props.track.id}
                        width="300" 
                        height="80"
                        frameBorder="0"
                        allowtransparency="True"
                        allow="encrypted-media"
                        title="preview"
                    />
                </div>
                {this.renderAction()}
            </div>
        )
    }
}


export default Track