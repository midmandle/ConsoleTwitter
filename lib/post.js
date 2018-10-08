const moment = require('moment');
class Post {
	constructor(username, messageText) {
		this.username = username;
		this.message = messageText;
		this.timePosted = moment();
		customizeMomentFormatting();
	}

	formatPost() {
		const currentTime = moment();
		const timeDifference = getTimeDifference(currentTime, this.timePosted);
		return createFormattedPost(this.username, this.message, timeDifference);
	}
}

function customizeMomentFormatting() {
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

function getTimeDifference(currentTime, postTime) {
	const current = moment(currentTime);
	const posted = moment(postTime);

	const difference =  posted.diff(current, 'seconds');
	
	return difference;
}

function createFormattedPost(username, message, timeDifference) {
	if (timeDifference === 0) {
		return `${username} - ${message}`;
	} else {
		const humanizedDifference = getHumanizedResult(timeDifference);
		return `${username} - ${message} (${humanizedDifference})`;
	}
}

function getHumanizedResult(difference) {
	return moment.duration(difference, 'seconds').humanize(true);
}

module.exports = Post;