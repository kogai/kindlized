"use strict"

const moment = require('moment-timezone')

const PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
const log = require('common/log')
const Book = require('common/Book')()
const Utils = require('common/Utils')()

class SendStatus{
	constructor(){
		this.conditions = {
			RepairImg: {
				$and: [
					{
						$or: [
							{ images: null },
							{ images: { $exists: false } },
							{ $where: "this.images == 0" }
						]
					},
					{
						$or: [
							{ "modifiedLog.RepairImgAt": { $exists: false } },
							{ "modifiedLog.RepairImgAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
						]
					}
				]
			},
			InspectKindlize: {
				$and: [
					{ AuthorityASIN: { $exists: true } },
					{ AuthorityASIN: { $ne: [''] } },
					{ AuthorityASIN: { $ne: null } },
					{ isKindlized: false },
					{
						$or: [
							{ "modifiedLog.InspectKindlizeAt": { $exists: false } },
							{ "modifiedLog.InspectKindlizeAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
						]
					}
				]
			},
			AddASIN: {
				$and: [
					{
						$or: [
							{ AuthorityASIN: { $exists: false } },
							{ AuthorityASIN: [''] },
							{ AuthorityASIN: undefined },
							{ AuthorityASIN: 'UNDEFINED' },
							{ AuthorityASIN: ['UNDEFINED'] }
						]
					},
					{
						$or: [
							{ "modifiedLog.AddASINAt": { $exists: false } },
							{ "modifiedLog.AddASINAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
						]
					}
				]
			},
			UpdateUrl: {
				$and: [
				  { isKindlized: true },
				  { isKindlizedUrl: { $ne: true } },
					{
						$or: [
							{ "modifiedLog.UpdateUrlAt": { $exists: false } },
							{ "modifiedLog.UpdateUrlAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
						]
					}
				]
			}
		}
	}

	sentAllStatus(){
		let val
		for (val in this.conditions) {
			if (this.conditions.hasOwnProperty(val)) {
				let _val = val
				Book.count(this.conditions[val], function(err, count){
					if(err){
						return log.info(err)
					}
					Utils.postSlack('[' + _val + ']の調査対象 ' + count + '冊')
				})
			}
		}
		Book.count(function(err, count){
			if(err){
				return log.info(err)
			}
			Utils.postSlack('[全書籍]の調査対象 ' + count + '冊')
		})
	}

}

module.exports = function(){
	return new SendStatus()
}
