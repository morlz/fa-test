import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../i18n'
import moment from 'moment'
//import('moment/locale/ru')

Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: 'ru-RU',
	fallbackLocale: 'ru-RU',
	messages
})

export default ({ app }: any) => {

	moment.locale('ru')

	// Set i18n instance on app
	app.i18n = i18n
}

export { i18n }
