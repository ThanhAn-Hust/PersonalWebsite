/**
 * Lớp ProjectService chuyên trách thao tác dữ liệu dự án.
 * Tuân thủ Single Responsibility Principle (SRP).
 */
export class ProjectService {
    /**
     * Tải dữ liệu dự án từ file JSON.
     * @returns {Promise<Array>} Mảng các đối tượng dự án.
     */
    static async fetchProjects() {
        try {
            const response = await fetch('./data/projects.json');
            
            if (!response.ok) {
                throw new Error(`Lỗi tải dữ liệu: HTTP status ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('[ProjectService] Fetch error:', error);
            throw error; // Ném lỗi cho UI layer xử lý
        }
    }
}
