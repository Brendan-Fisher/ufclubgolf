import React, { Component } from 'react';
import { getTourney } from '../redux/actions/contentActions';
import DOMPurify from 'dompurify';



function splitDate(dateTime){
    var parts = dateTime.split('-')
  
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}


async function getTourneyObject(id){
    let tourneyObj = await getTourney(id);
    let tourneyHTML = buildTourney(tourneyObj.data);

    return tourneyHTML;
}

function createMarkup(html) {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

function buildTourney(tourney){

    return (
        <div className="main-wrap">
                <div className="header-wrap">
                    <div className="officer-header-image event-header-image"><img id="officer-header" alt="Mark Bostick GC"></img></div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row aside">
                            <div className="col s12 home-about">
                                <h1>{tourney.title}</h1>
                                <h3>Tournament Date: {splitDate(tourney.startDate)}</h3>
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup(tourney.body)} className="col s12 event-body home-about" style={{backgroundColor: "rgba(255, 255, 255, 1)"}}></div>
                        </div>
                    </div>                    
                </div>
            </div>
    )
}

class Tournament extends Component{
    constructor(props){
        super(props)
        this.state = {
            tourney: <div></div>,
        }
    }

    async componentDidMount(){
        let id = this.props.match.params.id
        console.log(id)

        let tourney = await getTourneyObject(id)

        this.setState({
            tourney: tourney,
        })

    }

    render() {
        return(
            <div>{this.state.tourney}</div>
        )
    }

    
}

export default Tournament;
