import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// PLACE API_KEY HERE
const API_KEY = '';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedVideo: null,
            videos: []
        };

        this.videoSearch = this.videoSearch.bind(this);
        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term}, (videos) => {
            // ES6 Syntax allows to only provide value if key
            // and value variable names are the same.
            this.setState({
                selectedVideo: videos[0],
                videos
            })
        });
    }

    render() {
        const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300);
        return (
            <div>
                <SearchBar onTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo: selectedVideo })}
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));
