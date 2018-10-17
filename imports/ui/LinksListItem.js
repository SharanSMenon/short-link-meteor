import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
export default class LinkListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({
                copied: true
            })
            setTimeout(() => {
                this.setState({
                    copied: false
                })
            }, 2000)
        })
        this.clipboard.on('error', () => {
            alert("Could not copy. Please copy manually.")
        })
    }
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    renderStats() {
        const visitMessage = (this.props.visitedCount == 1) ? 'visit' : 'visits';
        let visitedMessage = null;
        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
        }
        return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    }
    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <div className="item__message">
                    <p>{this.props.shortUrl}</p>
                    {this.renderStats()}
                </div>
                <a href={this.props.shortUrl} target="_blank"
                    className="button button--link button--pill">
                    Visit
                </a>
                <button ref="copy" className="button button--pill" data-clipboard-text={this.props.shortUrl}>{(this.state.copied) ? 'Copied' : 'Copy'}</button>
                <button onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }} className="button button--pill">
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        )
    }
}
LinkListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible:PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
}