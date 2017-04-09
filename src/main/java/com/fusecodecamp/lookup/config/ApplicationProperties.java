package com.fusecodecamp.lookup.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to JHipster.
 *
 * <p>
 *     Properties are configured in the application.yml file.
 * </p>
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private String apiDataGovKey;

    private String apiDataGovUrl;

    public String getApiDataGovKey() {
        return apiDataGovKey;
    }

    public void setApiDataGovKey(String apiDataGovKey) {
        this.apiDataGovKey = apiDataGovKey;
    }

    public String getApiDataGovUrl() {
        return apiDataGovUrl;
    }

    public void setApiDataGovUrl(String apiDataGovUrl) {
        this.apiDataGovUrl = apiDataGovUrl;
    }
}
