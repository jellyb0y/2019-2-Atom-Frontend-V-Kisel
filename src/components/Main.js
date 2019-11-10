import React from 'react';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';
import Parent from './Parent.Context';
import styles from '../static/styles/Main.module.css';

export class Main extends React.Component {
	constructor(props) {
		super(props);
		const info = this.getInfo();
		this.state = {
			chatsList: info.chatsList,
			messageList: info.messageList,
			myInfo: info.messageList,
			activeChat: null,
			frameStyles: {
				ChatForm: null,
				ChatList: null,
			},
		};
	}

	getInfo() {
		let info = null;
		try {
			info = {
				chatsList: JSON.parse(localStorage.getItem('chatsList')),
				messageList: JSON.parse(localStorage.getItem('messageList')),
				myInfo: JSON.parse(localStorage.getItem('myInfo')),
			};
		} catch {
			info = {
				chatsList: null,
				messageList: null,
				myInfo: null,
			};
		}
		return info;
	}

	closeChat() {
		const { state } = this;
		state.frameStyles.ChatForm = {
			animationName: styles.chatDisapear,
		};
		this.setState(state);
	}

	openChat(chatId) {
		const { state } = this;
		state.frameStyles.ChatForm = {
			animationName: styles.chatApear,
		};
		state.activeChat = chatId;
		this.setState(state);
	}

	formEntered(value) {
		const { activeChat, messageList } = this.state;
		messageList[activeChat - 1].push({
			time: new Date().getTime(),
			text: value,
			self: true,
			status: 0,
		});
		this.setState({
			messageList,
		});
	}

	render() {
		const {
			activeChat,
			frameStyles,
			chatsList,
			messageList,
			myInfo,
		} = this.state;
		return (
			<Parent.Provider value={this}>
				<div className={styles.wrap}>
					<ChatList style={frameStyles.ChatList} chatsList={chatsList} />
					<ChatForm
						style={frameStyles.ChatForm}
						myInfo={myInfo}
						chatInfo={activeChat && chatsList[activeChat - 1]}
						messageList={activeChat && messageList[activeChat - 1]}
					/>
				</div>
			</Parent.Provider>
		);
	}
}
