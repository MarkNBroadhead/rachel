
import $ from 'jquery';
import moment from 'moment';
import chrono from 'chrono-node';

export default class FacebookParserUtility {

    static getFirstName(html) {
        const name = $(html).find('#fb-timeline-cover-name').text();
        
        return name.split(' ')[0];
    }

    static getLastName(html) {
        const name = $(html).find('#fb-timeline-cover-name').text();
        let lastName = name.split(' ');
        lastName.splice(0, 1);
        return lastName.join(' ');
    }

    static getPicture(html) {

        const $html = $(html);

        const $pictureContainer = $html.find('.profilePicThumb');
        const $picture = $pictureContainer.length && $pictureContainer.find('.profilePic');

        if (!$picture) {
            return false;
        }

        return $picture.attr('src');
    }

    static getBirthdate(html) {
        const $infosContainer = $(html).find('.fbProfileEditExperiences');

        let birthday = $infosContainer.find('span:contains("Anniversaire")').closest('div').next().text();
        birthday = moment(chrono.parseDate(birthday));
        
        if (!birthday.isValid()) {
            return false;
        }

        return birthday.format('YYYY-MM-DD');
    }

    static getGender(html) {
        const $infosContainer = $(html).find('.fbProfileEditExperiences');
        const gender = $infosContainer.find('span:contains("Sexe")').closest('div').next().text();

        if (gender === 'Masculin') {
            return 'male';
        }
        if (gender === 'Femme') {
            return 'female';
        }
        return 'unknown';
    }
}