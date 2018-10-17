import React from 'react'
import { Meteor } from "meteor/meteor";
import Modal from 'react-modal'
export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            error: ''
        }
        this.handleModalClose = this.handleModalClose.bind(this)
    }
    onSubmit(e) {
        const url = this.refs.url.value.trim();
        e.preventDefault();
        // if (url) {
        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose()
            } else {
                this.setState({ error: 'Please enter a valid url'})
            }
        })
        this.refs.url.value = "";

    }
    handleModalClose(){
        this.setState({ isOpen: false, error: '' })
    }
    render() {
        return (
            <div>
                <button className="button button-hover" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Link"
                    ariaHideApp={false}
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            ref="url"
                            placeholder="Enter URL"
                            />
                        <button className="button button-hover">Add Link</button>
                        <button className="button button--secondary" onClick={this.handleModalClose} type="button ">Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}