import axios from 'axios';
import { parse } from 'node-html-parser';
import { users } from './users.js';

function getDateString(date) {
    return date.toISOString().substring(0, 10);
}

async function getNumberOfCommits(user, date) {
    const response = await axios.get("https://github.com/" + user)
    const document = parse(response.data)
    const dateStr = getDateString(date)
    const rect = document.querySelector('rect[data-date="' + dateStr + '"]')
    return Number(rect.getAttribute('data-count'))
}

const webhookUrl = process.env.WEBHOOK_URL

const date = new Date()
date.setDate(date.getDate() - 1)
const yesterday = date

const results = await Promise.all(users.map(async (user) => {
    const [githubUsername, slackId] = user.split(':')
    const count = await getNumberOfCommits(githubUsername, yesterday)
    const emoji = count > 0 ? ':white_check_mark:' : ':warning:'
    return `<@${slackId}> ${emoji}`
}))

const text = `
${getDateString(yesterday)} 커밋 현황
${results.join('\n')}
`.trim()

await axios.post(webhookUrl, {
    username: 'github-bot',
    icon_url: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
    text
})
