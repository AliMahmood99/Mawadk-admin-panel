import apiClient from "../api/client";

const SettingsService = {
  // ==================== General Settings ====================

  /**
   * Get general settings
   * @returns {Promise<Object>} Settings data with logo, contact info, fee percent
   */
  async getSettings() {
    const response = await apiClient.get("/get-settings");
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

    const response = await apiClient.post("/update-settings", formData, {
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
    const response = await apiClient.get("/faqs", { params });
    return response.data;
  },

  /**
   * Get single FAQ by ID
   * @param {number} id - FAQ ID
   * @returns {Promise<Object>} FAQ data
   */
  async getFaqById(id) {
    console.log("[FAQs getFaqById] Fetching FAQ:", id);
    const response = await apiClient.get(`/faqs/${id}`);
    console.log("[FAQs getFaqById] Response:", response.data);
    return response.data;
  },

  /**
   * Create new FAQ
   * @param {Object} data - FAQ data with ar/en translations
   * @returns {Promise<Object>} Created FAQ
   */
  async createFaq(data) {
    // API expects form-data format with ar[title], ar[description], etc.
    const formData = new FormData();

    if (data.ar) {
      formData.append("ar[title]", data.ar.title || "");
      formData.append("ar[description]", data.ar.description || "");
    }
    if (data.en) {
      formData.append("en[title]", data.en.title || "");
      formData.append("en[description]", data.en.description || "");
    }
    if (data.sort !== undefined) {
      formData.append("sort", data.sort);
    }
    if (data.is_active !== undefined) {
      formData.append("is_active", data.is_active);
    }

    // Debug logging
    console.log("[FAQs createFaq] Sending data:", {
      "ar[title]": data.ar?.title,
      "ar[description]": data.ar?.description,
      "en[title]": data.en?.title,
      "en[description]": data.en?.description,
      sort: data.sort,
      is_active: data.is_active,
    });

    const response = await apiClient.post("/faqs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("[FAQs createFaq] Response:", response.data);
    return response.data;
  },

  /**
   * Update existing FAQ
   * @param {number} id - FAQ ID
   * @param {Object} data - FAQ data with ar/en translations
   * @returns {Promise<Object>} Updated FAQ
   */
  async updateFaq(id, data) {
    // API expects form-data format with ar[title], ar[description], etc.
    const formData = new FormData();

    if (data.ar) {
      formData.append("ar[title]", data.ar.title || "");
      formData.append("ar[description]", data.ar.description || "");
    }
    if (data.en) {
      formData.append("en[title]", data.en.title || "");
      formData.append("en[description]", data.en.description || "");
    }
    if (data.sort !== undefined) {
      formData.append("sort", data.sort);
    }
    if (data.is_active !== undefined) {
      formData.append("is_active", data.is_active);
    }

    // Debug logging
    console.log("[FAQs updateFaq] ID:", id, "Sending data:", {
      "ar[title]": data.ar?.title,
      "ar[description]": data.ar?.description,
      "en[title]": data.en?.title,
      "en[description]": data.en?.description,
      sort: data.sort,
      is_active: data.is_active,
    });

    const response = await apiClient.post(`/faqs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("[FAQs updateFaq] Response:", response.data);
    return response.data;
  },

  /**
   * Delete FAQ
   * @param {number} id - FAQ ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteFaq(id) {
    const response = await apiClient.delete(`/faqs/${id}`);
    return response.data;
  },

  // ==================== Info Pages ====================

  /**
   * Get info page by slug
   * @param {string} slug - Page slug (about-us, terms-and-conditions)
   * @returns {Promise<Object>} Info page data with title and content
   */
  async getInfoPage(slug) {
    const response = await apiClient.get(`/info/${slug}`);
    return response.data;
  },

  /**
   * Update info page
   * @param {string} slug - Page slug (about-us, terms-and-conditions)
   * @param {Object} data - Page data with ar/en translations
   * @returns {Promise<Object>} Updated info page
   */
  async updateInfoPage(slug, data) {
    // API expects form-data format with ar[title], ar[description], etc.
    const formData = new FormData();

    if (data.ar) {
      formData.append("ar[title]", data.ar.title || "");
      formData.append("ar[description]", data.ar.description || "");
    }
    if (data.en) {
      formData.append("en[title]", data.en.title || "");
      formData.append("en[description]", data.en.description || "");
    }

    const response = await apiClient.post(`/info/${slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default SettingsService;
