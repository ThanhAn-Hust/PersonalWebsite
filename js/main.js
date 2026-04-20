import { ProjectService } from './services/ProjectService.js';
import { ProjectUI } from './ui/ProjectUI.js';
import { I18nService } from './services/I18nService.js';

/**
 * Controller chính khởi chạy ứng dụng.
 * Kết nối Data Layer và UI Layer.
 */
class AppController {
    static async initialize() {
        // Khởi tạo I18nService
        I18nService.init();

        const container = document.getElementById('projects-container');
        if (!container) {
            console.error('[AppController] Không tìm thấy phần tử #projects-container');
            return;
        }

        try {
            // Tải dữ liệu thông qua Service
            this.projects = await ProjectService.fetchProjects();
            
            // Render giao diện thông qua UI Layer
            this.render();

            // Thiết lập sự kiện cho nút ngôn ngữ
            this.setupLanguageToggle();
            
        } catch (error) {
            // Hiển thị lỗi nếu quá trình tải thất bại
            ProjectUI.renderError(error, container);
        }
    }

    static render() {
        const container = document.getElementById('projects-container');
        ProjectUI.renderProjects(this.projects, container);
    }

    static setupLanguageToggle() {
        const buttons = document.querySelectorAll('.lang-btn');
        
        // Cập nhật trạng thái active button ban đầu
        buttons.forEach(btn => {
            if (btn.dataset.lang === I18nService.getLang()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                
                // Cập nhật UI nút
                buttons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Thay đổi ngôn ngữ và render lại dự án
                I18nService.setLang(lang);
                this.render();
            });
        });
    }
}

// Khởi chạy ứng dụng khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
    AppController.initialize();
});
