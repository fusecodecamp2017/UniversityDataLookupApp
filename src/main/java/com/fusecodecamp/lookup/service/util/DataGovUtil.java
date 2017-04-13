package com.fusecodecamp.lookup.service.util;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URISyntaxException;

/**
 * Created by stephan.haller on 4/6/17.
 */
public class DataGovUtil {

    public static boolean isStringNullOrEmpty(String str) {

        if( null == str || str.isEmpty() ) {
            return true;
        }
        return false;
    }

    public static String processDataGovUrl( String url, String name, String city, String state, String zip, String inStateCost, String outStateCost, Pageable pageable, String sort ) {

        boolean queryParamAppended = false;
        StringBuffer processedUrl = new StringBuffer(url + "?");

        if(!isStringNullOrEmpty(name)) {
            processedUrl.append("school.name=");
            processedUrl.append(name.replace(" ", "%20"));
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(city)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("school.city=");
            processedUrl.append(city.replace(" ", "%20"));
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(state)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("school.state=");
            processedUrl.append(state);
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(zip)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("school.zip=");
            processedUrl.append(zip);
            queryParamAppended = true;
        }

        if(queryParamAppended) {
            processedUrl.append("&");
        }
        processedUrl.append("_fields=id,school.name,school.city,school.state,school.zip,school.school_url,school.price_calculator_url,school.degrees_awarded.highest,school.ownership");
        queryParamAppended = true;

        return appendPageableAndSortParams(pageable, sort, queryParamAppended, processedUrl);
    }

    private static String appendPageableAndSortParams(Pageable pageable, String sort, boolean queryParamAppended, StringBuffer processedUrl) {

        if(queryParamAppended) {
            processedUrl.append("&");
        }
        processedUrl.append("page=");
        processedUrl.append(pageable.getPageNumber());
        processedUrl.append("&");
        processedUrl.append("per_page=");
        processedUrl.append(pageable.getPageSize());
        if(!isStringNullOrEmpty(sort)) {
            processedUrl.append("&");
            processedUrl.append("_sort=");
            processedUrl.append(sort);
        }

        return processedUrl.toString();
    }

    public static HttpHeaders generatePaginationHttpHeaders(int total, int page, int perPage, String baseUrl)
        throws URISyntaxException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", "" + Integer.toString(total));
        String link = "";
        if ((page + 1) < total) {
            link = "<" + generateUri(baseUrl, page + 1, perPage) + ">; rel=\"next\",";
        }
        // prev link
        if ((page) > 0) {
            link += "<" + generateUri(baseUrl, page - 1, perPage) + ">; rel=\"prev\",";
        }
        // last and first link
        int lastPage = 0;
        if (total > 0) {
            lastPage = total - 1;
        }
        link += "<" + generateUri(baseUrl, lastPage, perPage) + ">; rel=\"last\",";
        link += "<" + generateUri(baseUrl, 0, perPage) + ">; rel=\"first\"";
        headers.add(HttpHeaders.LINK, link);
        return headers;
    }

    private static String generateUri(String baseUrl, int page, int size) throws URISyntaxException {
        return UriComponentsBuilder.fromUriString(baseUrl).queryParam("page", page).queryParam("size", size).toUriString();
    }
}
