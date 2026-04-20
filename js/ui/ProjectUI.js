import { I18nService } from '../services/I18nService.js';

/**
 * Lớp ProjectUI xử lý hoàn toàn phần hiển thị (DOM Manipulation).
 * Tuân thủ Separation of Concerns (Tách biệt UI và Logic).
 */
export class ProjectUI {
    /**
     * Render danh sách dự án vào container.
     * @param {Array} projects Mảng đối tượng dự án
     * @param {HTMLElement} container Vùng chứa để render
     */
    static renderProjects(projects, container) {
        container.innerHTML = ''; // Làm sạch container trước khi render

        if (!projects || projects.length === 0) {
            container.innerHTML = `<p class="empty-state">${I18nService.t('empty_state')}</p>`;
            return;
        }

        const fragment = document.createDocumentFragment();

        projects.forEach(project => {
            const card = this.#createProjectCard(project);
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    /**
     * Render thông báo lỗi nếu fetch thất bại.
     * @param {Error} error 
     * @param {HTMLElement} container 
     */
    static renderError(error, container) {
        container.innerHTML = `
            <div class="error-container">
                <h3>⚠️ Lỗi Hệ Thống</h3>
                <p>Không thể tải danh sách dự án lúc này, vui lòng thử lại sau.</p>
                <p class="error-details">${error.message}</p>
            </div>
        `;
    }

    /**
     * Private method tạo Card dự án (Tính bao đóng - Encapsulation).
     * @param {Object} project Dữ liệu 1 dự án
     * @returns {HTMLElement} Thẻ div card
     */
    static #createProjectCard(project) {
        const lang = I18nService.getLang();
        const title = project.title ? (project.title[lang] || project.title.en) : "";
        const description = project.description ? (project.description[lang] || project.description.en) : "";

        const card = document.createElement('div');
        card.className = 'project-card';

        // Xác định UI tùy thuộc loại dự án (Web vs VR)
        const isVR = !!project.unity_play_url;
        const vrBadge = isVR ? `<span class="badge vr-badge">${I18nService.t('vr_project')}</span>` : '';

        let actionsHtml = '';
        if (isVR) {
            // Tích hợp External Linking ưu tiên cho Unity Play
            actionsHtml = `
                <a href="${project.unity_play_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <span class="btn-icon"></span> ${I18nService.t('vr_experience')}
                </a>`;
        }

        if (project.website_url) {
            actionsHtml += `
                <a href="${project.website_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <span class="btn-icon"></span> ${I18nService.t('visit_website')}
                </a>`;
        }

        if (project.github_url) {
            actionsHtml += `
                <a href="${project.github_url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <span class="btn-icon"></span> ${I18nService.t('source_code')}
                </a>`;
        }

        const techList = project.tech && Array.isArray(project.tech)
            ? project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')
            : '';

        const vrSupport = project.vr_support_type
            ? `<div class="vr-support-info"><strong>${I18nService.t('vr_support')}</strong> ${project.vr_support_type}</div>`
            : '';

        const imageHtml = project.image_url
            ? `
            <div class="card-image-wrapper">
                <!-- Hình ảnh sử dụng Lazy Loading -->
                <img src="${project.image_url}" alt="${title}" class="card-image" loading="lazy" width="800" height="400">
            </div>
            ` : '';

        card.innerHTML = `
            ${imageHtml}
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${title}</h3>
                    ${vrBadge}
                </div>
                <div class="card-body">
                    <p class="card-desc">${description}</p>
                    ${vrSupport}
                    <div class="tech-stack">
                        ${techList}
                    </div>
                </div>
                <div class="card-footer">
                    ${actionsHtml}
                </div>
            </div>
        `;

        return card;
    }
}
