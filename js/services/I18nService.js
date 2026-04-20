/**
 * I18nService xử lý ngôn ngữ và văn bản tĩnh trong ứng dụng
 */
export class I18nService {
    static currentLang = 'en';

    static dictionary = {
        en: {
            page_title: "Project Portfolio",
            header_title: "Thanh An's Projects",
            header_subtitle: "Bringing ideas to life through code.",
            projects_title: "Projects",
            loading: "Syncing database...",
            empty_state: "No projects updated yet.",
            vr_project: "Game Project",
            vr_experience: "Play Game",
            visit_website: "Visit Website",
            source_code: "Source Code",
            vr_support: "VR Support:",
            footer_text: "© 2026 Le Van Thanh An. All rights reserved."
        },
        vi: {
            page_title: "Danh Mục Dự Án",
            header_title: "Các Dự án của Thành An",
            header_subtitle: "Hiện thực hóa ý tưởng qua code.",
            projects_title: "Các Dự Án",
            loading: "Đang đồng bộ cơ sở dữ liệu...",
            empty_state: "Hiện tại chưa có dự án nào được cập nhật.",
            vr_project: "Dự Án Game",
            vr_experience: "Trải nghiệm Game",
            visit_website: "Xem Website",
            source_code: "Xem Mã Nguồn",
            vr_support: "Hỗ trợ VR:",
            footer_text: "© 2026 Lê Văn Thành An. All rights reserved."
        }
    };

    /**
     * Khởi tạo dịch vụ, tải ngôn ngữ từ localStorage.
     */
    static init() {
        const savedLang = localStorage.getItem('app_lang');
        if (savedLang && (savedLang === 'en' || savedLang === 'vi')) {
            this.currentLang = savedLang;
        } else {
            this.currentLang = 'en';
            localStorage.setItem('app_lang', 'en');
        }
        document.documentElement.lang = this.currentLang;
        this.updateDOM();
    }

    /**
     * Đổi ngôn ngữ
     * @param {string} lang 'en' hoặc 'vi'
     */
    static setLang(lang) {
        if (lang === 'en' || lang === 'vi') {
            this.currentLang = lang;
            localStorage.setItem('app_lang', lang);
            document.documentElement.lang = this.currentLang;
            this.updateDOM();
        }
    }

    static getLang() {
        return this.currentLang;
    }

    /**
     * Lấy văn bản theo từ khóa
     * @param {string} key 
     */
    static t(key) {
        return this.dictionary[this.currentLang][key] || key;
    }

    /**
     * Cập nhật tất cả các thẻ có thuộc tính data-i18n
     */
    static updateDOM() {
        document.title = this.t('page_title');
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.dictionary[this.currentLang][key]) {
                el.innerText = this.t(key);
            }
        });
    }
}
