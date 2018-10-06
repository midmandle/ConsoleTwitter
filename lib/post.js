const moment = require('moment');
class Post {
	constructor(username, messageText) {
		this.username = username;
		this.message = messageText;
		this.timePosted = moment();
		this.customizeMomentFormatting();
	}

	customizeMomentFormatting() {
		moment.updateLocale('en', {
			relativeTime : {
				future: 'in %s',
				past:   '%s ago',
				s  : '%d second',
				ss : '%d seconds',
				m:  '%d minute',
				mm: '%d minutes',
				h:  '%d hour',
				hh: '%d hours',
				d:  'a day',
				dd: '%d days',
				M:  'a month',
				MM: '%d months',
				y:  'a year',
				yy: '%d years'
			}
		});

		moment.relativeTimeThreshold('s', 59);
		moment.relativeTimeThreshold('ss', 1);
		moment.relativeTimeThreshold('m', 60);
	}

	formatPost() {
		const currentTime = moment();
		const timeDifference = this.getTimeDifference(currentTime, this.timePosted);

		if (timeDifference === 0) {
			return `${this.username} - ${this.message}`;
		} else {
			const humanizedDifference = this.getHumanizedResult(timeDifference);
			return `${this.username} - ${this.message} (${humanizedDifference})`;
		}
		
	}

	getTimeDifference(currentTime, postTime) {
		const current = moment(currentTime);
		const posted = moment(postTime);

		const difference =  posted.diff(current);
		
		return difference;
	}

	getHumanizedResult(difference) {
		return moment.duration(difference, 'seconds').humanize(true);
	}
}

module.exports = Post;