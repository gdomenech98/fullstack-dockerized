import mailgun from 'mailgun-js'

require('dotenv').config();

const DOMAIN = process.env.DOMAIN
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN, host: 'api.eu.mailgun.net' });

export default class Mailgun {

    static async sendTemplateEmail(from: string, to: string, subject: string, templateName?: string, handleBars?: any) {
        let data = {
            "from": from ?? `mailgun@${DOMAIN}`,
            "to": to,
            "subject": subject ?? 'Sixedge email'
        };
        //@ts-ignore
        if (templateName) data = { ...data, "template": templateName }
        if (handleBars) data = { ...data, ...handleBars }
        console.log('data::', data)
        try {
            await mg.messages().send(data)
        } catch (e) {
            console.error(e)
        }
    }
    
    static async sendRecoverEmail (from, to, recoverUrl) {
        console.log('hello')
        const subject = "Recover password"
        const templateName = "recoverpassword";
        const handleBars = {
            'v:COMPANY_NAME': 'sixedge',
            'v:COMPANY_EMAIL': 'communication@sixedge.es',
            'v:COMPANY_ADDRESS': 'Carrer X, BCN',
            'v: COMPANY_LOGO': process.env.SERVER_URL + '/public/logo.png',
            'v:RECOVER_URL': recoverUrl
        }
        await Mailgun.sendTemplateEmail(from, to, subject, templateName, handleBars)
    }
}