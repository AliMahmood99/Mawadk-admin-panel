import api from "../api";

const SettingsService = {
  // ==================== General Settings ====================

  /**
   * Get general settings
   * @returns {Promise<Object>} Settings data with logo, contact info, fee percent
   */
  async getSettings() {
    const response = await api.get("/get-settings");
    return response.data;
  },

  /**
   * Update general settings
   * @param {Object} data - Settings data
   * @param {File} [data.logo] - Logo file (optional)
   * @param {string} data.phone - Phone number
   * @param {string} data.whatsapp - WhatsApp number
   * @param {number} data.fee_percent - Fee percentage
   * @returns {Promise<Object>} Updated settings
   */
  async updateSettings(data) {
    const formData = new FormData();

    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    }
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    if (data.whatsapp) {
      formData.append("whatsapp", data.whatsapp);
    }
    if (data.fee_percent !== undefined) {
      formData.append("fee_percent", data.fee_percent);
    }

    const response = await api.post("/update-settings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // ==================== FAQs ====================

  /**
   * Get all FAQs with pagination
   * @param {Object} params - Query parameters
   * @param {number} [params.page=1] - Page number
   * @param {number} [params.per_page=10] - Items per page
   * @param {string} [params.search] - Search query
   * @returns {Promise<Object>} FAQs list with pagination
   */
  async getFaqs(params = {}) {
    const response = await api.get("/faqs", { params });
    return response.data;
  },

  /**
   * Get single FAQ by ID
   * @param {number} id - FAQ ID
   * @returns {Promise<Object>} FAQ data
   */
  async getFaqById(id) {
    const response = await api.get(`/faqs/${id}`);
    return response.data;
  },

  /**
   * Create new FAQ
   * @param {Object} data - FAQ data
   * @param {string} data.question_en - Question in English
   * @param {string} data.question_ar - Question in Arabic
   * @param {string} data.answer_en - Answer in English (HTML)
   * @param {string} data.answer_ar - Answer in Arabic (HTML)
   * @param {number} data.order - Display order
   * @param {boolean} data.is_active - Active status
   * @returns {Promise<Object>} Created FAQ
   */
  async createFaq(data) {
    const response = await api.post("/faqs", data);
    return response.data;
  },

  /**
   * Update existing FAQ
   * @param {number} id - FAQ ID
   * @param {Object} data - FAQ data
   * @returns {Promise<Object>} Updated FAQ
   */
  async updateFaq(id, data) {
    const response = await api.post(`/faqs/${id}`, data);
    return response.data;
  },

  /**
   * Delete FAQ
   * @param {number} id - FAQ ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteFaq(id) {
    const response = await api.delete(`/faqs/${id}`);
    return response.data;
  },

  // ==================== Info Pages ====================

  /**
   * Get info page by slug
   * @param {string} slug - Page slug (about-us, terms-and-conditions)
   * @returns {Promise<Object>} Info page data with title and content
   */
  async getInfoPage(slug) {
    const response = await api.get(`/info/${slug}`);
    return response.data;
  },

  /**
   * Update info page
   * @param {string} slug - Page slug (about-us, terms-and-conditions)
   * @param {Object} data - Page data
   * @param {string} data.title_en - Title in English
   * @param {string} data.title_ar - Title in Arabic
   * @param {string} data.content_en - Content in English (HTML)
   * @param {string} data.content_ar - Content in Arabic (HTML)
   * @returns {Promise<Object>} Updated info page
   */
  async updateInfoPage(slug, data) {
    const response = await api.post(`/info/${slug}`, data);
    return response.data;
  },
};

export default SettingsService;
